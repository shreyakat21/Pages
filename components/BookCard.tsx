'use client'

import Image from 'next/image'
import React from 'react'
import { Plus, Trash2 } from 'lucide-react'
import { SHELF_STATUSES, ShelfStatus, type Book } from '@/lib/books'

const STATUS_BADGE: Record<string, string> = {
  read: 'bg-emerald-600/20 text-emerald-300 border border-emerald-600/30',
  current: 'bg-stone-600/20 text-stone-300 border border-stone-600/30',
  want: 'bg-emerald-200/20 text-emerald-100 border border-emerald-200/30',
}

const STATUS_LABEL: Record<string, string> = {
  read: 'Read',
  current: 'Currently Reading',
  want: 'Want to Read',
}

interface BookCardProps {
  book: Book
  className?: string
  status?: string
  onAdd?: (book: Book) => void
  onStatusChange?: (status: ShelfStatus) => void
  onRemove?: () => void
}

function BookCardBase({ book, className, status, onAdd, onStatusChange, onRemove }: BookCardProps) {
  return (
    <div className={`bg-[#2f1e1e]/70 backdrop-blur-md rounded-lg p-6 w-full max-w-sm transition-all duration-300 hover:shadow-lg hover:-translate-y-2 border border-stone-100/20 ${className ?? ''}`}>
      <div className="flex items-start space-x-4">
        {book.cover_url ? (
          <Image
            src={book.cover_url}
            alt={book.title}
            width={70}
            height={105}
            loading="lazy"
            className="rounded-lg object-cover shadow-lg shrink-0"
          />
        ) : (
          <div className="w-[70px] h-[105px] bg-[#2f1e1e]/50 rounded-lg flex items-center justify-center shrink-0">
            <svg className="w-10 h-10 text-stone-100/60" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
            </svg>
          </div>
        )}
        <div className="flex-1 min-w-0">
          <h3 className="text-xl font-serif font-semibold text-stone-100 bg-gradient-to-r from-emerald-600 to-[#4a3728] bg-clip-text text-transparent truncate">{book.title}</h3>
          <p className="text-gray-100 truncate">{book.author}</p>

          {status && (
            <span className={`inline-block mt-2 px-3 py-1 text-sm rounded-full font-medium ${STATUS_BADGE[status] ?? STATUS_BADGE.want}`}>
              {STATUS_LABEL[status] ?? status}
            </span>
          )}

          {onAdd && (
            <button
              onClick={() => onAdd(book)}
              className="mt-2 flex items-center gap-2 text-sm text-stone-100 bg-gradient-to-r from-[#4a3728] to-emerald-600 hover:from-[#3c2f2f] hover:to-emerald-700 rounded-full px-4 py-1 transition-all duration-300"
            >
              <Plus className="h-4 w-4" /> Add to Shelf
            </button>
          )}

          {onStatusChange && (
            <select
              value={status}
              onChange={(e) => onStatusChange(e.target.value as ShelfStatus)}
              className="mt-3 w-full text-sm bg-[#2f1e1e] text-stone-100 border border-stone-100/20 rounded-lg px-2 py-1.5 focus:outline-none focus:ring-2 focus:ring-emerald-600"
            >
              {SHELF_STATUSES.map((s) => (
                <option key={s.id} value={s.id}>{s.label}</option>
              ))}
            </select>
          )}

          {onRemove && (
            <button
              onClick={onRemove}
              aria-label={`Remove ${book.title} from shelf`}
              className="mt-2 flex items-center gap-1.5 text-xs text-stone-100/60 hover:text-red-300 transition-colors duration-200"
            >
              <Trash2 className="h-3.5 w-3.5" /> Remove
            </button>
          )}
        </div>
      </div>
    </div>
  )
}

export const BookCard = React.memo(BookCardBase)
