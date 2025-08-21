// components/Footer.jsx
import Link from "next/link"

export default function Footer() {
  return (
    <footer className="glass-card border-t border-white/20 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-pink-500/5 rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-8 h-8 bg-gradient-to-br from-purple-500 via-pink-500 to-red-500 rounded-lg flex items-center justify-center shadow-lg">
                <span className="text-white font-bold text-sm">L</span>
              </div>
              <span className="text-xl font-bold gradient-text">LetterboxBooks</span>
            </div>
            <p className="text-white/80 mb-6 max-w-md text-base leading-relaxed">
              Experience the future of reading with our AI-powered book discovery platform. 
              Track your journey and build your personal library with cutting-edge design.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-base font-bold text-white tracking-wider uppercase mb-6">
              Quick Links
            </h3>
            <ul className="space-y-4">
              <li>
                <Link href="/" className="text-white/70 hover:text-white transition-colors duration-300">
                  <span className="text-sm">Home</span>
                </Link>
              </li>
              <li>
                <Link href="/search" className="text-white/70 hover:text-white transition-colors duration-300">
                  <span className="text-sm">Search Books</span>
                </Link>
              </li>
              <li>
                <Link href="/profile" className="text-white/70 hover:text-white transition-colors duration-300">
                  <span className="text-sm">Your Profile</span>
                </Link>
              </li>
              <li>
                <Link href="/login" className="text-white/70 hover:text-white transition-colors duration-300">
                  <span className="text-sm">Sign In</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="text-base font-bold text-white tracking-wider uppercase mb-6">
              Support
            </h3>
            <ul className="space-y-4">
              <li>
                <a href="#" className="text-white/70 hover:text-white transition-colors duration-300">
                  <span className="text-sm">Help Center</span>
                </a>
              </li>
              <li>
                <a href="#" className="text-white/70 hover:text-white transition-colors duration-300">
                  <span className="text-sm">Contact Us</span>
                </a>
              </li>
              <li>
                <a href="#" className="text-white/70 hover:text-white transition-colors duration-300">
                  <span className="text-sm">Privacy Policy</span>
                </a>
              </li>
              <li>
                <a href="#" className="text-white/70 hover:text-white transition-colors duration-300">
                  <span className="text-sm">Terms of Service</span>
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="mt-12 pt-8 border-t border-white/20">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-white/60 text-sm">
              © 2025 LetterboxBooks. All rights reserved.
            </p>
            <p className="text-white/60 text-sm mt-4 md:mt-0">
              Powered by{" "}
              <span className="gradient-text-green">OpenLibrary</span>{" "}
              and{" "}
              <span className="gradient-text-blue">Supabase</span>
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}
