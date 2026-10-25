'use client'

import { createContext, useCallback, useContext, useState } from 'react'
import { CheckCircle2, XCircle, Info, X } from 'lucide-react'

type ToastKind = 'success' | 'error' | 'info'

interface ToastItem {
  id: number
  message: string
  kind: ToastKind
}

interface ToastContextValue {
  showToast: (message: string, kind?: ToastKind) => void
}

const ToastContext = createContext<ToastContextValue | null>(null)

const KIND_STYLES: Record<ToastKind, { border: string; icon: JSX.Element }> = {
  success: { border: 'border-emerald-500/50', icon: <CheckCircle2 className="h-5 w-5 text-emerald-300" /> },
  error: { border: 'border-red-500/50', icon: <XCircle className="h-5 w-5 text-red-300" /> },
  info: { border: 'border-stone-100/40', icon: <Info className="h-5 w-5 text-stone-200" /> },
}

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = useState<ToastItem[]>([])

  const dismiss = useCallback((id: number) => {
    setToasts((prev) => prev.filter((t) => t.id !== id))
  }, [])

  const showToast = useCallback((message: string, kind: ToastKind = 'info') => {
    const id = Date.now() + Math.random()
    setToasts((prev) => [...prev, { id, message, kind }])
    setTimeout(() => dismiss(id), 3500)
  }, [dismiss])

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      <div className="fixed bottom-6 right-6 z-[100] flex flex-col gap-3 w-[90vw] max-w-sm">
        {toasts.map((t) => (
          <div
            key={t.id}
            role="status"
            className={`flex items-start gap-3 bg-[#2f1e1e] text-stone-100 border ${KIND_STYLES[t.kind].border} rounded-lg shadow-xl px-4 py-3 animate-fade-in`}
          >
            {KIND_STYLES[t.kind].icon}
            <p className="flex-1 text-sm leading-snug">{t.message}</p>
            <button
              onClick={() => dismiss(t.id)}
              aria-label="Dismiss notification"
              className="text-stone-100/50 hover:text-stone-100 transition-colors"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  )
}

export function useToast() {
  const ctx = useContext(ToastContext)
  if (!ctx) throw new Error('useToast must be used within a ToastProvider')
  return ctx
}
