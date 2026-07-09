import { Component } from 'react'
import { Book as BookModel } from '../../models/Book'
import { Panel, P, Em, CloseWrapper, BG } from './styles'
import { Close } from '../../styles'
import Book from '../Book'

export interface DetailPanelProps {
  book: BookModel
  closePanel: () => void
}

/** Slide-in panel showing full details for the currently selected book. */
export class DetailPanel extends Component<DetailPanelProps> {
  render() {
    const { book, closePanel } = this.props
    return (
      <>
        <BG onClick={closePanel} />
        <Panel>
          <CloseWrapper onClick={closePanel}>
            <Close aria-label="Close details" />
          </CloseWrapper>
          <Book book={book} isLarge />
          <P>{book.description}</P>
          <P>
            <Em>Published in {book.published}</Em>
          </P>
        </Panel>
      </>
    )
  }
}

export default DetailPanel
