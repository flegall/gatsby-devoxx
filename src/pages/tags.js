// @flow
import kebabCase from 'lodash/kebabCase'
import React from 'react'
import Link from 'gatsby-link'

type Props = {
  data: {
    allMarkdownRemark: {
      group: Array<{ fieldValue: string, totalCount: string }>,
    },
  },
}
const TagsPage = ({ data: { allMarkdownRemark: { group } } }: Props) => (
  <div>
    <div>
      <h1>Tags</h1>
      <ul>
        {group.map(tag => (
          <li key={tag.fieldValue}>
            <Link to={`/tags/${kebabCase(tag.fieldValue)}/`}>
              {tag.fieldValue} ({tag.totalCount})
            </Link>
          </li>
        ))}
      </ul>
    </div>
  </div>
)

export default TagsPage

// $FlowIgnore
export const pageQuery = graphql`
  query TagsQuery {
    allMarkdownRemark(limit: 2000) {
      group(field: frontmatter___tags) {
        fieldValue
        totalCount
      }
    }
  }
`
