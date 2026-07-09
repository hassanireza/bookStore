import { afterEach, describe, expect, it, vi } from 'vitest'
import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import App from './App'

const records = [
  {
    id: 1,
    author: 'Bryan Stevenson',
    title: 'Just Mercy',
    description: 'A story about justice.',
    image: 'covers/just-merc.webp',
    published: 2014,
  },
  {
    id: 2,
    author: 'N. K. Jemisin',
    title: 'The Fifth Season',
    description: 'The world ends, again.',
    image: 'covers/The-Fifth-Season.webp',
    published: 2015,
  },
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

describe('App', () => {
  it('loads and renders all books', async () => {
    mockFetchOk()
    render(<App />)

    expect(screen.getByText('Loading books...')).toBeInTheDocument()

    await waitFor(() => expect(screen.getByText('All books')).toBeInTheDocument())
    expect(screen.getByText('Just Mercy')).toBeInTheDocument()
    expect(screen.getByText('The Fifth Season')).toBeInTheDocument()
  })

  it('shows an error state when the catalog fails to load', async () => {
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue({ ok: false, status: 500 }))
    render(<App />)

    await waitFor(() => expect(screen.getByText('Books unavailable')).toBeInTheDocument())
  })

  it('filters books via search and opens the detail panel', async () => {
    mockFetchOk()
    const user = userEvent.setup()
    render(<App />)

    await waitFor(() => expect(screen.getByText('All books')).toBeInTheDocument())

    await user.click(screen.getByRole('button', { name: 'Open search' }))
    await user.type(screen.getByLabelText('Search books by title or author'), 'mercy')

    await waitFor(() => expect(screen.getByText('Search results')).toBeInTheDocument())
    expect(screen.getByText('Just Mercy')).toBeInTheDocument()
    expect(screen.queryByText('The Fifth Season')).not.toBeInTheDocument()

    await user.click(screen.getByText('Just Mercy'))
    expect(screen.getByText('A story about justice.')).toBeInTheDocument()

    await user.click(screen.getByLabelText('Close details'))
    expect(screen.queryByText('A story about justice.')).not.toBeInTheDocument()
  })
})
