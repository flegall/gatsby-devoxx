// @flow

import * as React from 'react'
import PropTypes from 'prop-types'
import Helmet from 'react-helmet'
import styled from 'styled-components'

import Header from '../components/Header'
import './index.css'

const Container = styled.div`
  margin: 0px auto;
  max-width: 960px;
  padding: 0px 1.0875rem 1.45rem;
  padding-top: 0px;
`

type Props = {
  children: () => React.Node[],
}
const TemplateWrapper = ({ children }: Props) => (
  <div>
    <Helmet
      title="Devoxx recipes"
      meta={[
        { name: 'description', content: 'Sample Gatsby app for devoxx !!' },
        { name: 'keywords', content: 'recipes, gatsbyjs' },
      ]}
    />
    <Header />
    <Container>{children()}</Container>
  </div>
)

TemplateWrapper.propTypes = {
  children: PropTypes.func,
}

export default TemplateWrapper
