'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'
import { Auth } from '@supabase/auth-ui-react'
import { ThemeSupa } from '@supabase/auth-ui-shared'
import { Session } from '@supabase/supabase-js'
import { useRouter } from 'next/navigation'
import { LogOut } from 'lucide-react'
import { useToast } from '@/components/Toast'

export default function SignupPage() {
  const [session, setSession] = useState<Session | null>(null)
  const [loading, setLoading] = useState(true)
  const router = useRouter()
  const { showToast } = useToast()

  useEffect(() => {
    const checkSession = async () => {
      const { data: { session }, error } = await supabase.auth.getSession()
      if (error) {
        console.error('Auth error:', error)
      }
      setSession(session)
      setLoading(false)
    }

    checkSession()

    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session)
    })

    return () => {
      listener.subscription.unsubscribe()
    }
  }, [])

  const handleSignOut = async () => {
    try {
      const { error } = await supabase.auth.signOut()
      if (error) throw error
      setSession(null)
      router.push('/signup')
    } catch (err: any) {
      console.error('Sign-out error:', err)
      showToast('Failed to sign out. Please try again.', 'error')
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#3c2f2f] via-emerald-700 to-stone-600 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-stone-100 mx-auto mb-4"></div>
          <p className="text-stone-100">Loading...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#3c2f2f] via-emerald-700 to-stone-600 flex items-center justify-center px-4 sm:px-6">
      <div className="max-w-md w-full bg-[#2f1e1e]/70 backdrop-blur-md rounded-lg p-8 border border-stone-100/20 animate-fade-in">
        <div className="text-center mb-8">
          <div className="mx-auto h-16 w-16 bg-gradient-to-br from-[#4a3728] to-emerald-600 rounded-xl flex items-center justify-center mb-6">
            <svg className="w-8 h-8 text-stone-100" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
            </svg>
          </div>
          <h2 className="text-3xl font-serif font-bold text-stone-100 bg-gradient-to-r from-emerald-600 to-[#4a3728] bg-clip-text text-transparent">
            Join Pages
          </h2>
          {session ? (
            <p className="text-gray-100 mt-2">
              Signed in as <span className="text-emerald-200">{session.user.email}</span>
            </p>
          ) : (
            <p className="text-gray-100 mt-2">
              Create an account to start tracking your reading
            </p>
          )}
        </div>

        {session ? (
          <div className="space-y-4">
            <button
              onClick={() => router.push('/profile')}
              className="w-full relative overflow-hidden rounded-lg px-8 py-3 text-stone-100 font-semibold bg-gradient-to-r from-[#4a3728] to-emerald-600 hover:from-[#3c2f2f] hover:to-emerald-700 transition-all duration-300 shadow-md hover:shadow-lg hover:-translate-y-1 flex items-center justify-center gap-2"
            >
              Go to Profile
            </button>
            <button
              onClick={handleSignOut}
              className="w-full relative overflow-hidden rounded-lg px-8 py-3 text-stone-100 font-semibold bg-gradient-to-r from-[#4a3728] to-emerald-600 hover:from-[#3c2f2f] hover:to-emerald-700 transition-all duration-300 shadow-md hover:shadow-lg hover:-translate-y-1 flex items-center justify-center gap-2"
            >
              <LogOut className="h-5 w-5" /> Sign Out
            </button>
          </div>
        ) : (
          <div className="bg-[#2f1e1e]/50 rounded-xl p-6 border border-stone-100/20">
            <Auth
              supabaseClient={supabase}
              view="sign_up"
              appearance={{
                theme: ThemeSupa,
                variables: {
                  default: {
                    colors: {
                      brand: '#4a3728',
                      brandAccent: '#3c2f2f',
                      brandButtonText: '#ffffff',
                      defaultButtonBackground: '#2f1e1e',
                      defaultButtonBackgroundHover: '#3c2f2f',
                      defaultButtonBorder: '#ffffff33',
                      defaultButtonText: '#ffffff',
                      dividerBackground: '#ffffff33',
                      inputBackground: '#2f1e1e',
                      inputBorder: '#ffffff33',
                      inputBorderHover: '#ffffff66',
                      inputBorderFocus: '#2f766f',
                      inputText: '#ffffff',
                      inputLabelText: '#ffffff',
                      inputPlaceholder: '#ffffff66',
                      messageText: '#ffffff',
                      messageTextDanger: '#ff6b6b',
                      anchorTextColor: '#2f766f',
                      anchorTextHoverColor: '#5faca5',
                    },
                    space: {
                      inputPadding: '12px',
                      buttonPadding: '12px',
                    },
                    fontSizes: {
                      baseInputSize: '16px',
                      baseLabelSize: '14px',
                      baseButtonSize: '16px',
                    },
                  },
                },
              }}
              theme="dark"
              providers={[]}
              redirectTo={`${window.location.origin}/profile`}
            />
          </div>
        )}

        <div className="text-center mt-6">
          <p className="text-sm text-gray-100">
            {session ? (
              'Want to use a different account?'
            ) : (
              <>
                Already have an account?{' '}
                <a href="/login" className="font-medium text-emerald-300 hover:text-emerald-200">
                  Sign In
                </a>
              </>
            )}
          </p>
        </div>
      </div>
    </div>
  )
}
