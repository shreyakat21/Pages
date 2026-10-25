import type { SupabaseClient } from '@supabase/supabase-js'

export interface Book {
  id: string
  title: string
  author: string
  cover_url: string | null
  isbn?: string[]
}

export interface ShelfBook extends Book {
  status: string
}

export type ShelfStatus = 'want' | 'current' | 'read'

export const SHELF_STATUSES: { id: ShelfStatus; label: string }[] = [
  { id: 'want', label: 'Want to Read' },
  { id: 'current', label: 'Currently Reading' },
  { id: 'read', label: 'Read' },
]

/** Adds a book to the signed-in user's "want to read" shelf, creating the shared book row if needed. */
export async function addToShelf(supabase: SupabaseClient, userId: string, book: Book) {
  const bookId = book.isbn?.[0] || book.id

  const { data: existingBook, error: fetchError } = await supabase
    .from('books')
    .select('id')
    .eq('id', bookId)
    .single()

  if (fetchError && fetchError.code !== 'PGRST116') {
    throw new Error(`Failed to check book: ${fetchError.message}`)
  }

  if (!existingBook) {
    const { error: bookError } = await supabase
      .from('books')
      .insert({ id: bookId, title: book.title, author: book.author, cover_url: book.cover_url })
    if (bookError) throw new Error(`Failed to insert book: ${bookError.message}`)
  }

  const { data: existingShelf, error: shelfCheckError } = await supabase
    .from('shelves')
    .select('id')
    .eq('user_id', userId)
    .eq('book_id', bookId)
    .single()

  if (shelfCheckError && shelfCheckError.code !== 'PGRST116') {
    throw new Error(`Failed to check shelf: ${shelfCheckError.message}`)
  }

  if (existingShelf) {
    return { alreadyOnShelf: true }
  }

  const { error: shelfError } = await supabase
    .from('shelves')
    .insert({ user_id: userId, book_id: bookId, status: 'want' })

  if (shelfError) throw new Error(`Failed to add to shelf: ${shelfError.message}`)

  return { alreadyOnShelf: false }
}

export async function updateShelfStatus(supabase: SupabaseClient, userId: string, bookId: string, status: ShelfStatus) {
  const { error } = await supabase
    .from('shelves')
    .update({ status })
    .eq('user_id', userId)
    .eq('book_id', bookId)

  if (error) throw new Error(`Failed to update status: ${error.message}`)
}

export async function removeFromShelf(supabase: SupabaseClient, userId: string, bookId: string) {
  const { error } = await supabase
    .from('shelves')
    .delete()
    .eq('user_id', userId)
    .eq('book_id', bookId)

  if (error) throw new Error(`Failed to remove book: ${error.message}`)
}

/** Fetches today's trending works from Open Library for the homepage. Returns [] on any failure. */
export async function fetchTrendingBooks(limit = 6): Promise<Book[]> {
  try {
    const res = await fetch(`https://openlibrary.org/trending/daily.json?limit=${limit}`, {
      headers: { 'User-Agent': 'PagesApp (contact: pages-app@example.com)' },
      next: { revalidate: 3600 },
    })
    if (!res.ok) return []

    const data = await res.json()
    const works = Array.isArray(data.works) ? data.works.slice(0, limit) : []

    return works.map((w: any) => ({
      id: w.key?.split('/').pop() ?? String(w.cover_edition_key ?? Math.random()),
      title: w.title ?? 'Unknown Title',
      author: w.author_name?.[0] ?? 'Unknown Author',
      cover_url: w.cover_i ? `https://covers.openlibrary.org/b/id/${w.cover_i}-M.jpg` : null,
    }))
  } catch {
    return []
  }
}
