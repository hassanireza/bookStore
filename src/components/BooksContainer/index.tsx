import { Component } from 'react'
import { Book as BookModel } from '../../models/Book'
import { Container, H2, BookList } from './styles'
import Book from '../Book'

export interface BooksContainerProps {
  books: BookModel[]
  pickBook: (book: BookModel) => void
  isPanelOpen: boolean
  title: string
}

/** Renders the page heading and the responsive grid of book covers. */
export class BooksContainer extends Component<BooksContainerProps> {
  render() {
    const { books, pickBook, isPanelOpen, title } = this.props
    return (
      <Container $isPanelOpen={isPanelOpen}>
        <H2>{title}</H2>
        <BookList>
          {books.map((book) => (
            <Book key={book.id} book={book} pickBook={pickBook} />
          ))}
        </BookList>
      </Container>
    )
  }
}

export default BooksContainer
