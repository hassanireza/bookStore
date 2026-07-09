import { afterEach, describe, expect, it, vi } from 'vitest'
import { BookCatalog, BookCatalogError } from './BookCatalog'

const records = [
  { id: 1, author: 'Bryan Stevenson', title: 'Just Mercy', description: '', image: '', published: 2014 },
  { id: 2, author: 'N. K. Jemisin', title: 'The Fifth Season', description: '', image: '', published: 2015 },
]

function mockFetchOk(): void {
  vi.stubGlobal(
    'fetch',
    vi.fn().mockResolvedValue({
      ok: true,
      json: () => Promise.resolve(records),
    }),
  )
}

afterEach(() => {
  vi.unstubAllGlobals()
})

describe('BookCatalog', () => {
  it('loads and wraps records as Book instances', async () => {
    mockFetchOk()
    const catalog = new BookCatalog('bookshop.json')
    const books = await catalog.load()
    expect(books).toHaveLength(2)
    expect(books[0].title).toBe('Just Mercy')
    expect(catalog.size).toBe(2)
  })

  it('throws a BookCatalogError on a failed response', async () => {
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue({ ok: false, status: 404 }))
    const catalog = new BookCatalog('bookshop.json')
    await expect(catalog.load()).rejects.toBeInstanceOf(BookCatalogError)
  })

  it('searches loaded books by title or author', async () => {
    mockFetchOk()
    const catalog = new BookCatalog('bookshop.json')
    await catalog.load()
    expect(catalog.search('mercy')).toHaveLength(1)
    expect(catalog.search('jemisin')).toHaveLength(1)
    expect(catalog.search('')).toHaveLength(2)
    expect(catalog.search('nonexistent')).toHaveLength(0)
  })
})
