import { describe, expect, it } from 'vitest'
import { Book } from './Book'

const record = {
  id: 1,
  author: 'Octavia E. Butler',
  title: 'Kindred',
  description: 'A time-travel story about slavery.',
  image: 'covers/Kindred.webp',
  published: 1979,
}

describe('Book', () => {
  it('builds from a JSON record', () => {
    const book = Book.fromJSON(record)
    expect(book.title).toBe('Kindred')
    expect(book.author).toBe('Octavia E. Butler')
  })

  it('matches on title, case-insensitively', () => {
    const book = Book.fromJSON(record)
    expect(book.matches('kind')).toBe(true)
    expect(book.matches('KINDRED')).toBe(true)
  })

  it('matches on author', () => {
    const book = Book.fromJSON(record)
    expect(book.matches('butler')).toBe(true)
  })

  it('does not match unrelated terms', () => {
    const book = Book.fromJSON(record)
    expect(book.matches('mercy')).toBe(false)
  })

  it('treats an empty term as a match', () => {
    const book = Book.fromJSON(record)
    expect(book.matches('')).toBe(true)
  })

  it('exposes byline and cover alt helpers', () => {
    const book = Book.fromJSON(record)
    expect(book.byline).toBe('by Octavia E. Butler')
    expect(book.coverAlt).toBe('Book cover for Kindred by Octavia E. Butler')
  })
})
