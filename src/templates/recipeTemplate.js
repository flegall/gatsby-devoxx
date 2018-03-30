// @flow
import React from 'react'
import Link from 'gatsby-link'
import kebabCase from 'lodash/kebabCase'

type Props = {
  data: {
    markdownRemark: {
      frontmatter: {
        title: string,
        path: string,
        date: string,
        tags: string[],
      },
      html: string,
    },
  },
}
export default function Template({
  data, // this prop will be injected by the GraphQL query below.
}: Props) {
  const { markdownRemark } = data // data.markdownRemark holds our post data
  const { frontmatter, html } = markdownRemark
  return (
    <div className="recipe-container">
      <div className="recipe">
        <h1>{frontmatter.title}</h1>
        {frontmatter.date}
        <p />
        <h2>Tags</h2>
        <ul>
          {frontmatter.tags.map(tag => (
            <li key={tag}>
              <Link to={`/tags/${kebabCase(tag)}/`}>{tag}</Link>
            </li>
          ))}
        </ul>
        <p />
        <div
          className="recipe-content"
          dangerouslySetInnerHTML={{ __html: html }}
        />
      </div>
    </div>
  )
}

// $FlowIgnore
export const pageQuery = graphql`
  query BlogPostByPath($path: String!) {
    markdownRemark(frontmatter: { path: { eq: $path } }) {
      html
      frontmatter {
        date(formatString: "MMMM DD, YYYY")
        path
        title
        tags
      }
    }
  }
`
