import { ChangeEvent, Component, createRef } from 'react'
import { SearchContainer, Input, Icon, Wrapper } from './styles'
import { Close } from '../../styles'

export interface SearchProps {
  filterBooks: (term: string) => void
}

interface SearchState {
  showOnDesktop: boolean
}

/** Expanding search field used to filter the book catalog by title/author. */
export class Search extends Component<SearchProps, SearchState> {
  state: SearchState = { showOnDesktop: false }

  private inputEl = createRef<HTMLInputElement>()

  private handleChange = (event: ChangeEvent<HTMLInputElement>): void => {
    this.props.filterBooks(event.target.value)
  }

  private clearSearch = (): void => {
    this.props.filterBooks('')
    if (this.inputEl.current) {
      this.inputEl.current.value = ''
    }
    this.setState({ showOnDesktop: false })
  }

  private showSearch = (): void => {
    this.setState({ showOnDesktop: true })
  }

  render() {
    const { showOnDesktop } = this.state
    return (
      <Wrapper>
        <SearchContainer $showOnDesktop={showOnDesktop}>
          <Icon onClick={this.showSearch} role="button" aria-label="Open search" />
          <Input
            ref={this.inputEl}
            type="text"
            name="search"
            aria-label="Search books by title or author"
            autoComplete="off"
            onChange={this.handleChange}
          />
          <Close onClick={this.clearSearch} aria-label="Clear search" />
        </SearchContainer>
      </Wrapper>
    )
  }
}

export default Search
