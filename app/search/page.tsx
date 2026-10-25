'use client'

import { useState, useEffect, useCallback } from 'react'
import { supabase } from '@/lib/supabase'
import { useRouter } from 'next/navigation'
import { Search, ArrowLeft } from 'lucide-react'
import { addToShelf, type Book } from '@/lib/books'
import { BookCard } from '@/components/BookCard'
import { useToast } from '@/components/Toast'

export default function SearchPage() {
  const router = useRouter()
  const { showToast } = useToast()
  const [searchQuery, setSearchQuery] = useState('')
  const [debouncedQuery, setDebouncedQuery] = useState('')
  const [books, setBooks] = useState<Book[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [page, setPage] = useState(1)
  const [user, setUser] = useState<any>(null)

  useEffect(() => {
    const checkUser = async () => {
      const { data: { session }, error } = await supabase.auth.getSession()
      if (error) {
        console.error('Auth error:', error)
        setError('Authentication failed. Please log in.')
        return
      }
      if (session) {
        setUser(session.user)
      } else {
        router.push('/login')
      }
    }
    checkUser()
  }, [router])

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedQuery(searchQuery.trim())
      setPage(1)
    }, 300)
    return () => clearTimeout(handler)
  }, [searchQuery])

  const fetchBooks = useCallback(async () => {
    if (!debouncedQuery) {
      setBooks([])
      return
    }

    setLoading(true)
    setError(null)

    try {
      const isISBN = /^[0-9-]{10,17}$/.test(debouncedQuery)
      let url = ''
      if (isISBN) {
        const isbn = debouncedQuery.replace(/-/g, '')
        url = `https://openlibrary.org/api/books?bibkeys=ISBN:${isbn}&format=json&jscmd=data`
      } else {
        url = `https://openlibrary.org/search.json?q=${encodeURIComponent(debouncedQuery)}&page=${page}&limit=9&fields=key,title,author_name,cover_i,isbn`
      }

      const response = await fetch(url, {
        headers: { 'User-Agent': 'PagesApp (your.email@example.com)' }
      })
      if (!response.ok) throw new Error(`HTTP ${response.status}: Failed to fetch from Open Library`)

      const data = await response.json()
      let formattedBooks: Book[] = []

      if (isISBN) {
        const isbnKey = `ISBN:${debouncedQuery.replace(/-/g, '')}`
        if (data[isbnKey]) {
          const book = data[isbnKey]
          formattedBooks = [{
            id: book.isbn_13?.[0] || book.isbn_10?.[0] || book.key?.split('/').pop() || isbnKey,
            title: book.title || 'Unknown Title',
            author: book.authors?.[0]?.name || 'Unknown Author',
            cover_url: book.cover?.medium || (book.cover_i ? `https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg` : null),
            isbn: book.isbn_13 || book.isbn_10 || []
          }]
        }
      } else {
        formattedBooks = data.docs.map((doc: any) => ({
          id: doc.isbn?.[0] || doc.key.split('/').pop(),
          title: doc.title,
          author: doc.author_name?.[0] || 'Unknown Author',
          cover_url: doc.cover_i ? `https://covers.openlibrary.org/b/id/${doc.cover_i}-M.jpg` : null,
          isbn: doc.isbn || []
        }))
      }

      setBooks(formattedBooks)
    } catch (err: any) {
      console.error('Fetch books error:', err)
      setError('Failed to fetch books. Please try again or check your query.')
    } finally {
      setLoading(false)
    }
  }, [debouncedQuery, page])

  const handleAddToShelf = async (book: Book) => {
    if (!user) {
      showToast('Please log in to add books to your shelf.', 'info')
      return
    }

    try {
      const result = await addToShelf(supabase, user.id, book)
      showToast(result.alreadyOnShelf ? `${book.title} is already on your shelf.` : `${book.title} added to your shelf!`, 'success')
    } catch (err: any) {
      console.error('Add to shelf error:', err)
      showToast(err.message || 'Failed to add book to shelf.', 'error')
    }
  }

  const clearSearch = () => {
    setSearchQuery('')
    setDebouncedQuery('')
    setBooks([])
  }

  useEffect(() => {
    fetchBooks()
  }, [fetchBooks])

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#3c2f2f] via-emerald-700 to-stone-600 flex flex-col items-center py-10 px-4 sm:px-6">
      <div className="w-full max-w-6xl flex justify-between items-center mb-8">
        <h1 className="text-4xl sm:text-5xl font-serif font-bold text-stone-100 bg-gradient-to-r from-emerald-600 to-[#4a3728] bg-clip-text text-transparent animate-fade-in">
          Search Pages
        </h1>
        {user && (
          <button
            onClick={() => router.back()}
            className="relative overflow-hidden rounded-lg px-6 py-2 text-stone-100 font-semibold bg-gradient-to-r from-[#4a3728] to-emerald-600 hover:from-[#3c2f2f] hover:to-emerald-700 transition-all duration-300 shadow-md hover:shadow-lg hover:-translate-y-1 flex items-center gap-2"
          >
            <ArrowLeft className="h-5 w-5" /> Back
          </button>
        )}
      </div>
      <div className="w-full max-w-md relative mb-8">
        <input
          type="text"
          placeholder="Search by title, author, or ISBN..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full p-3 rounded-lg bg-[#2f1e1e]/70 text-stone-100 border border-stone-100/20 focus:outline-none focus:ring-2 focus:ring-emerald-600"
        />
        <Search className="h-5 w-5 text-emerald-300 absolute right-3 top-1/2 -translate-y-1/2" style={{ animation: 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite' }} />
      </div>

      {loading && (
        <div className="text-center">
          <div className="w-20 h-20 bg-gradient-to-br from-[#4a3728] to-emerald-600 rounded-full flex items-center justify-center mx-auto mb-6 animate-pulse">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-stone-100"></div>
          </div>
          <p className="text-stone-100 text-lg">Searching books...</p>
        </div>
      )}

      {error && (
        <div className="text-center text-stone-100 bg-[#2f1e1e]/70 backdrop-blur-md rounded-lg p-6 border border-stone-100/20">
          <p>{error}</p>
        </div>
      )}

      {!loading && !error && books.length === 0 && debouncedQuery && (
        <div className="text-center py-16">
          <div className="w-32 h-32 bg-gradient-to-br from-[#4a3728]/20 to-emerald-600/20 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg className="w-16 h-16 text-stone-100/60" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
            </svg>
          </div>
          <p className="text-gray-100 text-xl mb-8">No books found for "{debouncedQuery}".</p>
          <button
            onClick={clearSearch}
            className="relative overflow-hidden rounded-lg px-8 py-3 text-stone-100 font-semibold bg-gradient-to-r from-[#4a3728] to-emerald-600 hover:from-[#3c2f2f] hover:to-emerald-700 transition-all duration-300 shadow-md hover:shadow-lg hover:-translate-y-1 inline-block"
          >
            Clear Search
          </button>
        </div>
      )}

      {!loading && !debouncedQuery && (
        <div className="text-center py-16">
          <p className="text-gray-100 text-lg">Start typing above to discover your next favorite book.</p>
        </div>
      )}

      {!loading && books.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 place-items-center w-full max-w-6xl">
          {books.map((book, index) => (
            <BookCard
              key={book.id}
              book={book}
              onAdd={handleAddToShelf}
              className={index % 3 === 0 ? 'scale-105' : index % 3 === 1 ? 'scale-100' : 'scale-110'}
            />
          ))}
        </div>
      )}

      {!loading && books.length > 0 && (
        <div className="flex gap-4 mt-8">
          {page > 1 && (
            <button
              onClick={() => setPage(page - 1)}
              className="relative overflow-hidden rounded-lg px-6 py-2 text-stone-100 font-semibold bg-gradient-to-r from-[#4a3728] to-emerald-600 hover:from-[#3c2f2f] hover:to-emerald-700 transition-all duration-300 shadow-md hover:shadow-lg hover:-translate-y-1"
            >
              Previous
            </button>
          )}
          <button
            onClick={() => setPage(page + 1)}
            className="relative overflow-hidden rounded-lg px-6 py-2 text-stone-100 font-semibold bg-gradient-to-r from-[#4a3728] to-emerald-600 hover:from-[#3c2f2f] hover:to-emerald-700 transition-all duration-300 shadow-md hover:shadow-lg hover:-translate-y-1"
            disabled={books.length < 9}
          >
            Next
          </button>
        </div>
      )}
    </div>
  )
}
