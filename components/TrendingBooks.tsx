'use client'

import { useState } from 'react'
import { supabase } from '@/lib/supabase'
import { useRouter } from 'next/navigation'
import { addToShelf, type Book } from '@/lib/books'
import { useToast } from '@/components/Toast'
import { BookCard } from '@/components/BookCard'

export default function TrendingBooks({ books }: { books: Book[] }) {
  const router = useRouter()
  const { showToast } = useToast()
  const [pendingId, setPendingId] = useState<string | null>(null)

  const handleAdd = async (book: Book) => {
    const { data: { session } } = await supabase.auth.getSession()
    if (!session) {
      showToast('Sign in to add books to your shelf.', 'info')
      router.push('/login')
      return
    }

    setPendingId(book.id)
    try {
      const result = await addToShelf(supabase, session.user.id, book)
      showToast(result.alreadyOnShelf ? `${book.title} is already on your shelf.` : `${book.title} added to your shelf!`, 'success')
    } catch (err: any) {
      showToast(err.message || 'Failed to add book to shelf.', 'error')
    } finally {
      setPendingId(null)
    }
  }

  if (books.length === 0) return null

  return (
    <section className="py-16 px-4 sm:px-6 flex justify-center items-center w-full">
      <div className="max-w-6xl mx-auto text-center">
        <h2 className="text-3xl sm:text-4xl font-serif font-semibold text-stone-100 mb-3 bg-gradient-to-r from-emerald-600 to-[#4a3728] bg-clip-text text-transparent">
          Trending Right Now
        </h2>
        <p className="text-base sm:text-lg text-gray-100 max-w-2xl mx-auto mb-10">
          What readers everywhere are adding to their shelves today, straight from Open Library.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 place-items-center">
          {books.map((book) => (
            <BookCard
              key={book.id}
              book={book}
              onAdd={pendingId === book.id ? undefined : handleAdd}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
