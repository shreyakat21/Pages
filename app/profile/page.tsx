'use client'

import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import React from 'react'

interface Book {
  id: string
  title: string
  author: string
  cover_url: string | null
  status: string
}

export default function ProfilePage() {
  const router = useRouter()
  const [user, setUser] = useState<any>(null)
  const [books, setBooks] = useState<Book[]>([])
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState('overview')

  useEffect(() => {
    const checkUser = async () => {
      const { data: { session }, error } = await supabase.auth.getSession()
      if (error) {
        console.error('Auth error:', error)
        router.push('/login')
        return
      }
      if (!session) {
        router.push('/login')
      } else {
        setUser(session.user)
        fetchUserBooks(session.user.id)
      }
    }
    checkUser()
  }, [router])

  const fetchUserBooks = async (userId: string) => {
    try {
      const { data, error } = await supabase
        .from('shelves')
        .select(`
          status,
          books (
            id,
            title,
            author,
            cover_url
          )
        `)
        .eq('user_id', userId)
        .limit(10)

      if (error) throw error

      const formattedBooks = data?.map(item => ({
        ...item.books,
        status: item.status
      })) || []

      setBooks(formattedBooks)
    } catch (error) {
      console.error('Error fetching books:', error)
    } finally {
      setLoading(false)
    }
  }

  const getBooksByStatus = (status: string) => {
    return books.filter(book => book.status === status)
  }

  const getStats = () => {
    const total = books.length
    const read = getBooksByStatus('read').length
    const want = getBooksByStatus('want').length
    const current = getBooksByStatus('current').length

    return { total, read, want, current }
  }

  const BookCard = React.memo(({ book, className }: { book: Book; className?: string }) => (
    <div className={`bg-[#2f1e1e]/70 backdrop-blur-md rounded-lg p-6 transition-all duration-300 hover:shadow-lg hover:-translate-y-2 border border-stone-100/20 ${className}`}>
      <div className="flex items-start space-x-4">
        {book.cover_url ? (
          <Image
            src={book.cover_url}
            alt={book.title}
            width={70}
            height={105}
            loading="lazy"
            className="rounded-lg object-cover shadow-lg"
          />
        ) : (
          <div className="w-[70px] h-[105px] bg-[#2f1e1e]/50 rounded-lg flex items-center justify-center">
            <svg className="w-10 h-10 text-stone-100/60" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
            </svg>
          </div>
        )}
        <div className="flex-1 min-w-0">
          <h4 className="font-bold text-stone-100 text-lg mb-2 line-clamp-2 bg-gradient-to-r from-emerald-600 to-[#4a3728] bg-clip-text text-transparent">{book.title}</h4>
          <p className="text-gray-100 mb-3">{book.author}</p>
          <span className={`inline-block px-3 py-1 text-sm rounded-full font-medium ${
            book.status === 'read' ? 'bg-emerald-600/20 text-emerald-300 border border-emerald-600/30' :
            book.status === 'current' ? 'bg-stone-600/20 text-stone-300 border border-stone-600/30' :
            'bg-emerald-200/20 text-emerald-100 border border-emerald-200/30'
          }`}>
            {book.status === 'read' ? 'Read' :
             book.status === 'current' ? 'Currently Reading' :
             'Want to Read'}
          </span>
        </div>
      </div>
    </div>
  ))

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#3c2f2f] via-emerald-700 to-stone-600 flex items-center justify-center">
        <div className="text-center">
          <div className="w-20 h-20 bg-gradient-to-br from-[#4a3728] to-emerald-600 rounded-full flex items-center justify-center mx-auto mb-6 animate-pulse">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-stone-100"></div>
          </div>
          <p className="text-stone-100 text-lg">Loading your Pages profile...</p>
        </div>
      </div>
    )
  }

  const stats = getStats()

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#3c2f2f] via-emerald-700 to-stone-600 py-12 relative">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-20 w-80 h-80 bg-emerald-600/10 rounded-full blur-3xl animate-float"></div>
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-stone-600/10 rounded-full blur-3xl animate-float-delay-2"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 flex flex-col items-center">
        <div className="w-full flex justify-between items-center mb-12">
          <h1 className="text-5xl md:text-6xl font-bold text-stone-100 bg-gradient-to-r from-emerald-600 to-[#4a3728] bg-clip-text text-transparent animate-fade-in">
            Your Pages Profile
          </h1>
          <button
            onClick={() => router.back()}
            className="relative overflow-hidden rounded-lg px-6 py-2 text-stone-100 font-semibold bg-gradient-to-r from-[#4a3728] to-emerald-600 hover:from-[#3c2f2f] hover:to-emerald-700 transition-all duration-300 shadow-md hover:shadow-lg hover:-translate-y-1 flex items-center gap-2"
          >
            <ArrowLeft className="h-5 w-5" /> Back
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12 animate-fade-in w-full max-w-6xl">
          {[
            { value: stats.total, label: 'Total Books', gradient: 'from-[#4a3728] to-emerald-600', icon: '📚' },
            { value: stats.read, label: 'Books Read', gradient: 'from-emerald-600 to-emerald-700', icon: '✓' },
            { value: stats.current, label: 'Currently Reading', gradient: 'from-stone-600 to-stone-700', icon: '📖' },
            { value: stats.want, label: 'Want to Read', gradient: 'from-emerald-200 to-emerald-300', icon: '🎯' }
          ].map((stat, index) => (
            <div key={index} className={`bg-[#2f1e1e]/70 backdrop-blur-md rounded-2xl p-6 text-center hover:shadow-lg hover:-translate-y-2 transition-all duration-500 ${index % 4 === 0 ? 'scale-105' : index % 4 === 1 ? 'scale-100' : index % 4 === 2 ? 'scale-110' : 'scale-100'}`}>
              <div className={`w-16 h-16 bg-gradient-to-br ${stat.gradient} rounded-2xl flex items-center justify-center mx-auto mb-4 text-2xl shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-110`}>
                {stat.icon}
              </div>
              <div className="text-4xl font-bold text-stone-100 mb-2 bg-gradient-to-r from-emerald-600 to-[#4a3728] bg-clip-text text-transparent">
                {stat.value}
              </div>
              <div className="text-gray-100 text-lg">{stat.label}</div>
            </div>
          ))}
        </div>

        <div className="bg-[#2f1e1e]/70 backdrop-blur-md rounded-3xl mb-8 animate-fade-in w-full max-w-6xl">
          <div className="border-b border-stone-100/20">
            <nav className="flex space-x-8 px-8">
              {[
                { id: 'overview', name: 'Overview', icon: '📊', gradient: 'from-[#4a3728] to-emerald-600' },
                { id: 'read', name: 'Books Read', icon: '✓', gradient: 'from-emerald-600 to-emerald-700' },
                { id: 'current', name: 'Currently Reading', icon: '📖', gradient: 'from-stone-600 to-stone-700' },
                { id: 'want', name: 'Want to Read', icon: '📚', gradient: 'from-emerald-200 to-emerald-300' }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`py-6 px-4 border-b-2 font-medium text-lg flex items-center space-x-3 transition-all duration-300 ${
                    activeTab === tab.id
                      ? 'border-stone-100 text-stone-100'
                      : 'border-transparent text-stone-100/60 hover:text-stone-100/80 hover:border-stone-100/40'
                  }`}
                >
                  <span className="text-2xl">{tab.icon}</span>
                  <span>{tab.name}</span>
                </button>
              ))}
            </nav>
          </div>

          <div className="p-8">
            {activeTab === 'overview' && (
              <div className="space-y-8 animate-fade-in">
                <div className="text-center py-12">
                  <div className="w-32 h-32 bg-gradient-to-br from-[#4a3728]/20 to-emerald-600/20 rounded-full flex items-center justify-center mx-auto mb-6">
                    <svg className="w-16 h-16 text-stone-100" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                  </div>
                  <h3 className="text-3xl font-bold text-stone-100 mb-4 bg-gradient-to-r from-emerald-600 to-[#4a3728] bg-clip-text text-transparent">
                    Welcome back,{' '}
                    <span className="text-emerald-200">{user?.email}</span>
                  </h3>
                  <p className="text-xl text-gray-100">
                    You've read {stats.read} books and have {stats.want} on your Pages wishlist
                  </p>
                </div>

                {stats.total > 0 && (
                  <div className="grid md:grid-cols-2 gap-8">
                    <div>
                      <h4 className="text-2xl font-bold text-stone-100 mb-6 bg-gradient-to-r from-emerald-600 to-[#4a3728] bg-clip-text text-transparent">Recent Additions</h4>
                      <div className="space-y-4">
                        {books.slice(0, 3).map((book, index) => (
                          <BookCard
                            key={book.id}
                            book={book}
                            className={index % 3 === 0 ? 'scale-105' : index % 3 === 1 ? 'scale-100' : 'scale-110'}
                          />
                        ))}
                      </div>
                    </div>

                    <div>
                      <h4 className="text-2xl font-bold text-stone-100 mb-6 bg-gradient-to-r from-emerald-600 to-[#4a3728] bg-clip-text text-transparent">Reading Progress</h4>
                      <div className="space-y-6">
                        <div>
                          <div className="flex justify-between text-lg mb-3">
                            <span className="text-gray-100">Books Read</span>
                            <span className="text-stone-100 font-semibold">{stats.read}/{stats.total}</span>
                          </div>
                          <div className="w-full bg-stone-100/10 rounded-full h-3">
                            <div 
                              className="bg-gradient-to-r from-emerald-600 to-emerald-700 h-3 rounded-full transition-all duration-1000 ease-out"
                              style={{ width: `${stats.total > 0 ? (stats.read / stats.total) * 100 : 0}%` }}
                            ></div>
                          </div>
                        </div>
                        <div>
                          <div className="flex justify-between text-lg mb-3">
                            <span className="text-gray-100">Currently Reading</span>
                            <span className="text-stone-100 font-semibold">{stats.current}/{stats.total}</span>
                          </div>
                          <div className="w-full bg-stone-100/10 rounded-full h-3">
                            <div 
                              className="bg-gradient-to-r from-stone-600 to-stone-700 h-3 rounded-full transition-all duration-1000 ease-out"
                              style={{ width: `${stats.total > 0 ? (stats.current / stats.total) * 100 : 0}%` }}
                            ></div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}

            {activeTab !== 'overview' && (
              <div className="animate-fade-in">
                <h3 className="text-2xl font-bold text-stone-100 mb-8 bg-gradient-to-r from-emerald-600 to-[#4a3728] bg-clip-text text-transparent">
                  {activeTab === 'read' && '📚 Books You\'ve Read'}
                  {activeTab === 'current' && '📖 Books You\'re Currently Reading'}
                  {activeTab === 'want' && '🎯 Books You Want to Read'}
                </h3>
                
                {getBooksByStatus(activeTab).length === 0 ? (
                  <div className="text-center py-16">
                    <div className="w-32 h-32 bg-gradient-to-br from-[#4a3728]/20 to-emerald-600/20 rounded-full flex items-center justify-center mx-auto mb-6">
                      <svg className="w-16 h-16 text-stone-100/60" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                      </svg>
                    </div>
                    <p className="text-gray-100 text-xl mb-8">
                      {activeTab === 'read' && 'You haven\'t marked any books as read yet.'}
                      {activeTab === 'current' && 'You\'re not currently reading any books.'}
                      {activeTab === 'want' && 'Your Pages reading list is empty.'}
                    </p>
                    <Link 
                      href="/search" 
                      className="relative overflow-hidden rounded-lg px-8 py-3 text-stone-100 font-semibold bg-gradient-to-r from-[#4a3728] to-emerald-600 hover:from-[#3c2f2f] hover:to-emerald-700 transition-all duration-300 shadow-md hover:shadow-lg hover:-translate-y-1 inline-block"
                    >
                      Discover Books
                    </Link>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 place-items-center">
                    {getBooksByStatus(activeTab).map((book, index) => (
                      <BookCard
                        key={book.id}
                        book={book}
                        className={index % 3 === 0 ? 'scale-105' : index % 3 === 1 ? 'scale-100' : 'scale-110'}
                      />
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}