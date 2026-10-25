import Link from 'next/link'
import { Search, BookOpen, Users, TrendingUp } from 'lucide-react'
import { fetchTrendingBooks } from '@/lib/books'
import TrendingBooks from '@/components/TrendingBooks'

export default async function HomePage() {
  const trendingBooks = await fetchTrendingBooks(6)

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#3c2f2f] via-emerald-700 to-stone-600 flex flex-col items-center">
      {/* Hero Section */}
      <section className="py-20 px-4 sm:px-6 flex justify-center items-center w-full">
        <div className="max-w-5xl mx-auto text-center">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-serif font-extrabold text-stone-100 mb-6 leading-tight bg-gradient-to-r from-emerald-600 to-[#4a3728] bg-clip-text text-transparent">
            Your Reading Journey,
            <br />
            <span className="text-3xl sm:text-4xl md:text-5xl text-emerald-200" style={{ textShadow: '0 0 10px rgba(255,255,255,0.3)' }}>
              Beautifully Tracked
            </span>
          </h1>
          <p className="text-base sm:text-lg md:text-xl text-gray-100 mb-10 max-w-3xl mx-auto">
            Discover, track, and share your favorite books with a community of readers.
            The Letterboxd for books you've been waiting for.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/search"
              className="relative overflow-hidden rounded-lg px-8 py-3 text-stone-100 font-semibold bg-gradient-to-r from-[#4a3728] to-emerald-600 hover:from-[#3c2f2f] hover:to-emerald-700 transition-all duration-300 shadow-md hover:shadow-lg hover:-translate-y-1"
            >
              Start Reading
            </Link>
            <Link
              href="/login"
              className="border-2 border-stone-100 text-stone-100 px-8 py-3 rounded-lg font-semibold text-base hover:bg-stone-100/20 transition-all duration-300 hover:-translate-y-1"
            >
              Sign Up Free
            </Link>
          </div>
        </div>
      </section>

      {/* Trending Section (live Open Library data) */}
      <div className="w-full bg-[#2f1e1e]/90">
        <TrendingBooks books={trendingBooks} />
      </div>

      {/* Features Section */}
      <section className="py-16 px-4 sm:px-6 flex justify-center items-center w-full">
        <div className="max-w-6xl mx-auto text-center">
          <div className="mb-12">
            <h2 className="text-3xl sm:text-4xl font-serif font-semibold text-stone-100 mb-6 bg-gradient-to-r from-emerald-600 to-[#4a3728] bg-clip-text text-transparent">
              Why Choose Pages?
            </h2>
            <p className="text-base sm:text-lg text-gray-100 max-w-2xl mx-auto">
              Everything you need to discover your next favorite book and track your reading journey.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 place-items-center">
            {[
              {
                icon: <Search className="h-12 w-12 text-emerald-300" style={{ animation: 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite' }} />,
                title: 'Smart Discovery',
                description: 'Search millions of books by title or ISBN, powered by Open Library, and see what\'s trending right now.',
                className: 'p-10 scale-105'
              },
              {
                icon: <BookOpen className="h-10 w-10 text-emerald-300" style={{ animation: 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite' }} />,
                title: 'Track Everything',
                description: 'Log your reading progress, move books between shelves, and build your personal library with beautiful organization.',
                className: 'p-8'
              },
              {
                icon: <Users className="h-14 w-14 text-emerald-300" style={{ animation: 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite' }} />,
                title: 'Your Shelves, Your Way',
                description: 'Sort books into Want to Read, Currently Reading, and Read, and watch your stats update in real time.',
                className: 'p-12 scale-110'
              }
            ].map((feature, index) => (
              <div key={index} className={`bg-[#2f1e1e]/70 backdrop-blur-md rounded-lg p-6 transition-all duration-300 hover:shadow-lg hover:-translate-y-2 border border-stone-100/20 ${feature.className}`}>
                <div className="flex justify-center mb-4">
                  {feature.icon}
                </div>
                <h3 className="text-xl sm:text-2xl font-serif font-semibold text-stone-100 mb-3 bg-gradient-to-r from-emerald-600 to-[#4a3728] bg-clip-text text-transparent">{feature.title}</h3>
                <p className="text-sm sm:text-base text-gray-100">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-16 px-4 sm:px-6 flex justify-center items-center w-full bg-[#2f1e1e]/90">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl font-serif font-semibold text-stone-100 mb-6 bg-gradient-to-r from-emerald-600 to-[#4a3728] bg-clip-text text-transparent">
            Built for Book Lovers
          </h2>
          <p className="text-base sm:text-lg text-gray-100 mb-8 max-w-3xl mx-auto">
            Pages combines the power of modern technology with the timeless joy of reading.
            Whether you're a casual reader or a bookworm, our platform helps you discover,
            organize, and share your literary adventures.
          </p>
          <Link
            href="/search"
            className="relative overflow-hidden rounded-lg px-8 py-3 text-stone-100 font-semibold bg-gradient-to-r from-[#4a3728] to-emerald-600 hover:from-[#3c2f2f] hover:to-emerald-700 transition-all duration-300 shadow-md hover:shadow-lg hover:-translate-y-1 inline-block"
          >
            Explore Books Now
          </Link>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 sm:px-6 flex justify-center items-center w-full">
        <div className="max-w-5xl mx-auto text-center">
          <div className="bg-[#2f1e1e]/70 backdrop-blur-md rounded-lg p-10 border border-stone-100/20">
            <TrendingUp className="h-16 w-16 text-emerald-300 mx-auto mb-6" style={{ animation: 'bounce 2s infinite' }} />
            <h2 className="text-3xl sm:text-4xl font-serif font-semibold text-stone-100 mb-6 bg-gradient-to-r from-emerald-600 to-[#4a3728] bg-clip-text text-transparent">
              Ready to Start Your Reading Journey?
            </h2>
            <p className="text-base sm:text-lg text-gray-100 mb-8 max-w-3xl mx-auto">
              Join thousands of readers who are already discovering and tracking their favorite books.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/search"
                className="relative overflow-hidden rounded-lg px-8 py-3 text-stone-100 font-semibold bg-gradient-to-r from-[#4a3728] to-emerald-600 hover:from-[#3c2f2f] hover:to-emerald-700 transition-all duration-300 shadow-md hover:shadow-lg hover:-translate-y-1"
              >
                Get Started
              </Link>
              <Link
                href="/login"
                className="border-2 border-stone-100 text-stone-100 px-8 py-3 rounded-lg font-semibold text-base hover:bg-stone-100/20 transition-all duration-300 hover:-translate-y-1"
              >
                Learn More
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
