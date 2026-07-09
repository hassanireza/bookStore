import { Book, BookRecord } from '../models/Book'

/**
 * Thrown when the catalog fails to load from its data source.
 */
export class BookCatalogError extends Error {
  readonly status?: number

  constructor(message: string, status?: number) {
    super(message)
    this.name = 'BookCatalogError'
    this.status = status
  }
}

/**
 * BookCatalog encapsulates loading and querying the store's book data.
 * It is the single place that knows how books are fetched and filtered,
 * keeping that logic out of React components.
 */
export class BookCatalog {
  private books: Book[] = []
  private readonly sourceUrl: string

  constructor(sourceUrl: string = 'bookshop.json') {
    this.sourceUrl = sourceUrl
  }

  /** Fetch and parse the catalog, caching the resulting Book instances. */
  async load(): Promise<Book[]> {
    const response = await fetch(this.sourceUrl)
    if (!response.ok) {
      throw new BookCatalogError(
        `Failed to load books: ${response.status}`,
        response.status,
      )
    }
    const records = (await response.json()) as BookRecord[]
    this.books = records.map(Book.fromJSON)
    return this.all()
  }

  /** All books currently held by the catalog. */
  all(): Book[] {
    return [...this.books]
  }

  /** Books whose title or author matches the given search term. */
  search(term: string): Book[] {
    if (!term) return this.all()
    return this.books.filter((book) => book.matches(term))
  }

  /** Number of books currently loaded. */
  get size(): number {
    return this.books.length
  }
}
