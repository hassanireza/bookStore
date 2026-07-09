/**
 * Shape of a book record as it appears in the static bookshop.json catalog.
 */
export interface BookRecord {
  id: number
  author: string
  title: string
  description: string
  image: string
  published: number
}

/**
 * Book is the core domain entity of the store. It wraps a raw catalog
 * record and exposes behaviour (matching, display helpers) instead of
 * leaving that logic scattered across components/functions.
 */
export class Book {
  readonly id: number
  readonly author: string
  readonly title: string
  readonly description: string
  readonly image: string
  readonly published: number

  constructor(record: BookRecord) {
    this.id = record.id
    this.author = record.author
    this.title = record.title
    this.description = record.description
    this.image = record.image
    this.published = record.published
  }

  /** Build a Book instance from a plain JSON record. */
  static fromJSON(record: BookRecord): Book {
    return new Book(record)
  }

  /**
   * Case-insensitive check for whether this book's title or author
   * contains the given search term.
   */
  matches(term: string): boolean {
    if (!term) return true
    const needle = term.toLowerCase()
    return (
      this.title.toLowerCase().includes(needle) ||
      this.author.toLowerCase().includes(needle)
    )
  }

  /** Accessible alt text for the book's cover image. */
  get coverAlt(): string {
    return `Book cover for ${this.title} by ${this.author}`
  }

  /** Human-friendly byline, e.g. "by Octavia E. Butler". */
  get byline(): string {
    return `by ${this.author}`
  }
}
