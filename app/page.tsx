import Link from 'next/link'
import { Home, Search, User, BookOpen, Users, Star, TrendingUp } from 'lucide-react'

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#3c2f2f] via-emerald-700 to-stone-600 flex flex-col items-center">
      {/* Sticky Navigation */}
      <nav className="sticky top-0 z-50 w-full bg-[#2f1e1e]/90 backdrop-blur-md border-b border-stone-100/20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-4 flex justify-between items-center">
          {/* Brand */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-stone-100 rounded-lg flex items-center justify-center shadow-lg">
              <span className="text-[#4a3728] font-bold text-lg bg-gradient-to-r from-[#4a3728] to-emerald-600 bg-clip-text text-transparent">P</span>
            </div>
            <span className="text-2xl sm:text-3xl font-bold text-stone-100" style={{ textShadow: '0 0 10px rgba(255,255,255,0.3)' }}>
              Pages
            </span>
          </div>
          
          {/* Navigation */}
          <div className="hidden md:flex items-center gap-6">
            <Link href="/" className="flex items-center gap-2 text-stone-100/90 hover:text-stone-50 transition-all duration-300 text-base hover:shadow-md">
              <Home className="h-5 w-5 text-emerald-300" />
              <span>Home</span>
            </Link>
            <Link href="/search" className="flex items-center gap-2 text-stone-100/90 hover:text-stone-50 transition-all duration-300 text-base hover:shadow-md">
              <Search className="h-5 w-5 text-emerald-300" />
              <span>Search</span>
            </Link>
            <Link href="/profile" className="flex items-center gap-2 text-stone-100/90 hover:text-stone-50 transition-all duration-300 text-base hover:shadow-md">
              <User className="h-5 w-5 text-emerald-300" />
              <span>Profile</span>
            </Link>
          </div>
          
          {/* CTA */}
          <Link 
            href="/login" 
            className="relative overflow-hidden rounded-lg px-6 py-2 text-stone-100 font-semibold bg-gradient-to-r from-[#4a3728] to-emerald-600 hover:from-[#3c2f2f] hover:to-emerald-700 transition-all duration-300 shadow-md hover:shadow-lg hover:-translate-y-1"
          >
            Sign In
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="py-20 px-4 sm:px-6 flex justify-center items-center w-full">
        <div className="max-w-5xl mx-auto text-center">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-stone-100 mb-6 leading-tight bg-gradient-to-r from-emerald-600 to-[#4a3728] bg-clip-text text-transparent">
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

      {/* Features Section */}
      <section className="py-16 px-4 sm:px-6 flex justify-center items-center w-full bg-[#2f1e1e]/90">
        <div className="max-w-6xl mx-auto text-center">
          <div className="mb-12">
            <h2 className="text-3xl sm:text-4xl font-semibold text-stone-100 mb-6 bg-gradient-to-r from-emerald-600 to-[#4a3728] bg-clip-text text-transparent">
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
                description: 'AI-powered recommendations that understand your taste and suggest perfect matches from millions of books.',
                className: 'p-10 scale-105'
              },
              {
                icon: <BookOpen className="h-10 w-10 text-emerald-300" style={{ animation: 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite' }} />,
                title: 'Track Everything',
                description: 'Log your reading progress, rate books, and build your personal library with beautiful organization.',
                className: 'p-8'
              },
              {
                icon: <Users className="h-14 w-14 text-emerald-300" style={{ animation: 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite' }} />,
                title: 'Community Reviews',
                description: 'Connect with fellow readers, share reviews, and discover books through trusted recommendations.',
                className: 'p-12 scale-110'
              }
            ].map((feature, index) => (
              <div key={index} className={`bg-[#2f1e1e]/70 backdrop-blur-md rounded-lg p-6 transition-all duration-300 hover:shadow-lg hover:-translate-y-2 border border-stone-100/20 ${feature.className}`}>
                <div className="flex justify-center mb-4">
                  {feature.icon}
                </div>
                <h3 className="text-xl sm:text-2xl font-semibold text-stone-100 mb-3 bg-gradient-to-r from-emerald-600 to-[#4a3728] bg-clip-text text-transparent">{feature.title}</h3>
                <p className="text-sm sm:text-base text-gray-100">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 px-4 sm:px-6 flex justify-center items-center w-full">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 place-items-center">
            {[
              { number: '10M+', label: 'Books Available', icon: <BookOpen className="h-12 w-12 text-emerald-300" style={{ animation: 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite' }} />, className: 'p-10 scale-110' },
              { number: '50K+', label: 'Active Readers', icon: <Users className="h-10 w-10 text-emerald-300" style={{ animation: 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite' }} />, className: 'p-8' },
              { number: '1M+', label: 'Reviews Shared', icon: <Star className="h-14 w-14 text-emerald-300" style={{ animation: 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite' }} />, className: 'p-12 scale-105' }
            ].map((stat, index) => (
              <div key={index} className={`bg-[#2f1e1e]/70 backdrop-blur-md rounded-lg p-6 transition-all duration-300 hover:shadow-lg hover:-translate-y-2 border border-stone-100/20 ${stat.className}`}>
                <div className="flex justify-center mb-4">
                  {stat.icon}
                </div>
                <div className="text-4xl sm:text-5xl font-bold text-stone-100 mb-2 bg-gradient-to-r from-emerald-600 to-[#4a3728] bg-clip-text text-transparent">{stat.number}</div>
                <div className="text-base sm:text-lg text-gray-100">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-16 px-4 sm:px-6 flex justify-center items-center w-full bg-[#2f1e1e]/90">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl font-semibold text-stone-100 mb-6 bg-gradient-to-r from-emerald-600 to-[#4a3728] bg-clip-text text-transparent">
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
            <h2 className="text-3xl sm:text-4xl font-semibold text-stone-100 mb-6 bg-gradient-to-r from-emerald-600 to-[#4a3728] bg-clip-text text-transparent">
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

      {/* Footer */}
      <footer className="w-full bg-[#2f1e1e]/90 backdrop-blur-md border-t border-stone-100/20 py-12 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto text-center">
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="w-10 h-10 bg-stone-100 rounded-lg flex items-center justify-center shadow-lg">
              <span className="text-[#4a3728] font-bold text-lg bg-gradient-to-r from-[#4a3728] to-emerald-600 bg-clip-text text-transparent">P</span>
            </div>
            <span className="text-2xl sm:text-3xl font-bold text-stone-100" style={{ textShadow: '0 0 10px rgba(255,255,255,0.3)' }}>
              Pages
            </span>
          </div>
          <p className="text-base sm:text-lg text-gray-100">
            © 2025 Pages. All rights reserved. Made with ❤️ for book lovers everywhere.
          </p>
        </div>
      </footer>
    </div>
  )
}