import { Component } from 'react'
import BooksContainer from './components/BooksContainer'
import Header from './components/Header'
import Search from './components/Search'
import DetailPanel from './components/DetailPanel'
import { GlobalStyle } from './styles'
import { Book } from './models/Book'
import { BookCatalog } from './services/BookCatalog'

export interface AppState {
  filteredBooks: Book[]
  selectedBook: Book | null
  isLoading: boolean
  hasError: boolean
}

/**
 * Root application component. Owns the BookCatalog instance and all
 * top-level UI state: the current search filter and the book selected
 * for the detail panel.
 */
export class App extends Component<Record<string, never>, AppState> {
  private readonly catalog = new BookCatalog('bookshop.json')

  state: AppState = {
    filteredBooks: [],
    selectedBook: null,
    isLoading: true,
    hasError: false,
  }

  componentDidMount(): void {
    void this.loadBooks()
  }

  private loadBooks = async (): Promise<void> => {
    try {
      const books = await this.catalog.load()
      this.setState({ filteredBooks: books, isLoading: false })
    } catch {
      this.setState({ hasError: true, isLoading: false })
    }
  }

  private pickBook = (book: Book): void => {
    this.setState({ selectedBook: book })
  }

  private closePanel = (): void => {
    this.setState({ selectedBook: null })
  }

  private filterBooks = (searchTerm: string): void => {
    this.setState({ filteredBooks: this.catalog.search(searchTerm) })
  }

  private resolveTitle(): string {
    const { hasError, isLoading, filteredBooks } = this.state
    const hasFiltered = filteredBooks.length !== this.catalog.size

    if (hasError) return 'Books unavailable'
    if (hasFiltered) return 'Search results'
    if (isLoading) return 'Loading books...'
    return 'All books'
  }

  render() {
    const { filteredBooks, selectedBook } = this.state

    return (
      <>
        <GlobalStyle />
        <Header>
          <Search filterBooks={this.filterBooks} />
        </Header>
        <BooksContainer
          books={filteredBooks}
          pickBook={this.pickBook}
          isPanelOpen={selectedBook !== null}
          title={this.resolveTitle()}
        />
        {selectedBook && <DetailPanel book={selectedBook} closePanel={this.closePanel} />}
      </>
    )
  }
}

export default App
