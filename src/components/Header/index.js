/// @flow

import React from 'react'
import Link from 'gatsby-link'
import styled from 'styled-components'

import GitHubMarkSVG from './github-mark.svg'

const Background = styled.div`
  background: rebeccapurple;
  margin-bottom: 1.45rem;
`

const Container = styled.div`
  margin: 0 auto;
  max-width: 960px;
  padding: 1.45rem 1.0875rem;
  display: flex;
  justify-content: space-between;
`

const Title = styled.h1`
  margin: 0;
`

const WhiteLink = styled(Link)`
  color: white;
  text-decoration: none;
`
const WhiteALink = WhiteLink.withComponent('a')

const Header = () => (
  <Background>
    <Container>
      <Title>
        <WhiteLink to="/">Devoxx recipes !</WhiteLink>
      </Title>
      <WhiteALink href="https://github.com/flegall/gatsby-devoxx">
        <img src={GitHubMarkSVG} />
      </WhiteALink>
    </Container>
  </Background>
)

export default Header
