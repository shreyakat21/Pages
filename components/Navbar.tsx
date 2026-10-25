'use client'

import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { useEffect, useRef, useState } from 'react'
import { supabase } from '@/lib/supabase'
import { Home, Search, User, LogOut, Menu, X } from 'lucide-react'

const navItems = [
  { name: 'Home', href: '/', icon: Home },
  { name: 'Search', href: '/search', icon: Search },
  { name: 'Profile', href: '/profile', icon: User },
]

export default function Navbar() {
  const pathname = usePathname()
  const router = useRouter()
  const [user, setUser] = useState<any>(null)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const menuRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => setUser(session?.user ?? null))
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null)
    })
    return () => subscription.unsubscribe()
  }, [])

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) setMenuOpen(false)
    }
    document.addEventListener('mousedown', handleClick)
    return () => document.removeEventListener('mousedown', handleClick)
  }, [])

  const handleSignOut = async () => {
    await supabase.auth.signOut()
    setMenuOpen(false)
    setMobileOpen(false)
    router.push('/')
  }

  return (
    <nav className="sticky top-0 z-50 w-full bg-[#2f1e1e]/90 backdrop-blur-md border-b border-stone-100/20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-4 flex justify-between items-center">
        <Link href="/" className="flex items-center gap-3">
          <div className="w-10 h-10 bg-stone-100 rounded-lg flex items-center justify-center shadow-lg">
            <span className="text-[#4a3728] font-bold text-lg bg-gradient-to-r from-[#4a3728] to-emerald-600 bg-clip-text text-transparent">P</span>
          </div>
          <span className="text-2xl sm:text-3xl font-serif font-bold text-stone-100" style={{ textShadow: '0 0 10px rgba(255,255,255,0.3)' }}>
            Pages
          </span>
        </Link>

        <div className="hidden md:flex items-center gap-6">
          {navItems.map((item) => {
            const active = pathname === item.href
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-2 transition-all duration-300 text-base ${
                  active ? 'text-stone-50 font-semibold' : 'text-stone-100/90 hover:text-stone-50'
                }`}
              >
                <item.icon className={`h-5 w-5 ${active ? 'text-emerald-200' : 'text-emerald-300'}`} />
                <span>{item.name}</span>
              </Link>
            )
          })}
        </div>

        <div className="flex items-center gap-4">
          {user ? (
            <div className="relative hidden md:block" ref={menuRef}>
              <button
                onClick={() => setMenuOpen((v) => !v)}
                className="flex items-center gap-2 rounded-lg px-3 py-2 text-stone-100 hover:bg-stone-100/10 transition-all duration-300"
              >
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#4a3728] to-emerald-600 flex items-center justify-center text-sm font-semibold text-stone-100">
                  {user.email?.charAt(0).toUpperCase()}
                </div>
                <span className="text-sm max-w-[10rem] truncate">{user.email}</span>
              </button>

              {menuOpen && (
                <div className="absolute right-0 mt-2 w-52 bg-[#2f1e1e] border border-stone-100/20 rounded-lg shadow-xl py-2 animate-fade-in">
                  <Link
                    href="/profile"
                    onClick={() => setMenuOpen(false)}
                    className="flex items-center gap-2 px-4 py-2 text-sm text-stone-100 hover:bg-stone-100/10"
                  >
                    <User className="h-4 w-4 text-emerald-300" /> Your Profile
                  </Link>
                  <button
                    onClick={handleSignOut}
                    className="flex items-center gap-2 w-full text-left px-4 py-2 text-sm text-stone-100 hover:bg-stone-100/10"
                  >
                    <LogOut className="h-4 w-4 text-red-300" /> Sign Out
                  </button>
                </div>
              )}
            </div>
          ) : (
            <Link
              href="/login"
              className="hidden md:inline-block relative overflow-hidden rounded-lg px-6 py-2 text-stone-100 font-semibold bg-gradient-to-r from-[#4a3728] to-emerald-600 hover:from-[#3c2f2f] hover:to-emerald-700 transition-all duration-300 shadow-md hover:shadow-lg hover:-translate-y-1"
            >
              Sign In
            </Link>
          )}

          <button
            onClick={() => setMobileOpen((v) => !v)}
            aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
            className="md:hidden text-stone-100 p-2 rounded-lg hover:bg-stone-100/10"
          >
            {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {mobileOpen && (
        <div className="md:hidden border-t border-stone-100/20 bg-[#2f1e1e]/95 px-4 py-4 space-y-3 animate-fade-in">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setMobileOpen(false)}
              className={`flex items-center gap-2 py-2 ${pathname === item.href ? 'text-stone-50 font-semibold' : 'text-stone-100/90'}`}
            >
              <item.icon className="h-5 w-5 text-emerald-300" />
              <span>{item.name}</span>
            </Link>
          ))}
          <div className="border-t border-stone-100/20 pt-3">
            {user ? (
              <>
                <p className="text-sm text-stone-100/60 mb-2 truncate">Signed in as {user.email}</p>
                <button
                  onClick={handleSignOut}
                  className="flex items-center gap-2 text-stone-100 py-2"
                >
                  <LogOut className="h-5 w-5 text-red-300" /> Sign Out
                </button>
              </>
            ) : (
              <Link
                href="/login"
                onClick={() => setMobileOpen(false)}
                className="block text-center rounded-lg px-6 py-2 text-stone-100 font-semibold bg-gradient-to-r from-[#4a3728] to-emerald-600"
              >
                Sign In
              </Link>
            )}
          </div>
        </div>
      )}
    </nav>
  )
}
