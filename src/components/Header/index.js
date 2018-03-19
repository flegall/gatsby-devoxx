import React from 'react'
import Link from 'gatsby-link'
import styled from 'styled-components'

const Background = styled.div`
  background: rebeccapurple;
  margin-bottom: 1.45rem;
`

const Container = styled.div`
  margin: 0 auto;
  max-width: 960px;
  padding: 1.45rem 1.0875rem;
`

const Title = styled.h1`
  margin: 0;
`

const WhiteLink = styled(Link)`
  color: white;
  text-decoration: none;
`

const Header = () => (
  <Background>
    <Container>
      <Title>
        <WhiteLink to="/">Devoxx recipes !</WhiteLink>
      </Title>
    </Container>
  </Background>
)

export default Header
