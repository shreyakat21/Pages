import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="w-full bg-[#2f1e1e]/90 backdrop-blur-md border-t border-stone-100/20 py-12 px-4 sm:px-6">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 text-center md:text-left">
          <div>
            <div className="flex items-center justify-center md:justify-start gap-3 mb-4">
              <div className="w-10 h-10 bg-stone-100 rounded-lg flex items-center justify-center shadow-lg">
                <span className="text-[#4a3728] font-bold text-lg bg-gradient-to-r from-[#4a3728] to-emerald-600 bg-clip-text text-transparent">P</span>
              </div>
              <span className="text-2xl font-serif font-bold text-stone-100">Pages</span>
            </div>
            <p className="text-sm text-gray-100 max-w-xs mx-auto md:mx-0">
              Discover, track, and share your favorite books with a community of readers.
            </p>
          </div>

          <div>
            <h3 className="text-sm font-bold text-stone-100 tracking-wider uppercase mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><Link href="/" className="text-sm text-gray-100 hover:text-stone-50 transition-colors">Home</Link></li>
              <li><Link href="/search" className="text-sm text-gray-100 hover:text-stone-50 transition-colors">Search Books</Link></li>
              <li><Link href="/profile" className="text-sm text-gray-100 hover:text-stone-50 transition-colors">Your Profile</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-bold text-stone-100 tracking-wider uppercase mb-4">Powered By</h3>
            <ul className="space-y-2">
              <li>
                <a href="https://openlibrary.org" target="_blank" rel="noopener noreferrer" className="text-sm text-gray-100 hover:text-stone-50 transition-colors">
                  Open Library
                </a>
              </li>
              <li>
                <a href="https://supabase.com" target="_blank" rel="noopener noreferrer" className="text-sm text-gray-100 hover:text-stone-50 transition-colors">
                  Supabase
                </a>
              </li>
              <li>
                <a href="https://github.com/shreyakat21/Pages" target="_blank" rel="noopener noreferrer" className="text-sm text-gray-100 hover:text-stone-50 transition-colors">
                  Source on GitHub
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-stone-100/20 text-center">
          <p className="text-sm text-gray-100">
            © {new Date().getFullYear()} Pages. Made with ❤️ for book lovers everywhere.
          </p>
        </div>
      </div>
    </footer>
  )
}
