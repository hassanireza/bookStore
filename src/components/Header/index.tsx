import { Component, ReactNode } from 'react'
import { Logo, HeaderContainer } from './styles'

export interface HeaderProps {
  children?: ReactNode
}

/** Fixed top bar with the store logo/home link and any children (search). */
export class Header extends Component<HeaderProps> {
  render() {
    return (
      <HeaderContainer>
        <a href="/" aria-label="Book Store home">
          <Logo aria-hidden="true" />
        </a>
        {this.props.children}
      </HeaderContainer>
    )
  }
}

export default Header
