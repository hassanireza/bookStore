import { Component } from 'react'
import { Book as BookModel } from '../../models/Book'
import { Container, Cover, Title, Author } from './styles'

export interface BookProps {
  book: BookModel
  pickBook?: (book: BookModel) => void
  isLarge?: boolean
}

/**
 * Renders a single book cover, title and author. When not in "large"
 * (detail panel) mode, clicking the cover selects the book.
 */
export class Book extends Component<BookProps> {
  private handleClick = (): void => {
    const { book, pickBook } = this.props
    pickBook?.(book)
  }

  render() {
    const { book, isLarge } = this.props
    return (
      <Container $isLarge={isLarge} onClick={this.handleClick}>
        <Cover alt={book.coverAlt} src={book.image} />
        <figcaption>
          <Title $isLarge={isLarge}>{book.title}</Title>
          <Author>{book.byline}</Author>
        </figcaption>
      </Container>
    )
  }
}

export default Book
