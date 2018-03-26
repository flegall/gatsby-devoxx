// @flow
import React from 'react'
import Link from 'gatsby-link'
import { action, observable } from 'mobx'
import { observer } from 'mobx-react'

var appState = observable({
  timer: 0,
})

setInterval(
  action(function tick() {
    appState.timer += 1
  }),
  1000
)

type Props = {
  data: {
    recipes: {
      edges: {
        node: {
          id: string,
          frontmatter: {
            date: string,
            title: string,
            path: string,
          },
        },
      }[],
    },
    tags: { group: { fieldValue: string, totalCount: number }[] },
  },
}
const IndexPage = observer((props: Props) => {
  const {
    data: { recipes: { edges: recipesEdges }, tags: { group: tagGroups } },
  } = props

  const recipes = recipesEdges
    .filter(edge => !!edge.node.frontmatter.date) // You can filter your recipes based on some criteria
    .map(edge => <PostLink key={edge.node.id} post={edge.node} />)

  const tags = tagGroups.map(({ fieldValue, totalCount }) => (
    <div key={fieldValue}>
      {fieldValue}/{totalCount}
    </div>
  ))

  return (
    <div>
      <h2>Choose your recipe</h2>
      {recipes}
      <p />
      <h2>Choose your tag</h2>
      {tags}
      {appState.timer}
    </div>
  )
})

export default IndexPage

// $FlowIgnore
export const pageQuery = graphql`
  query IndexQuery {
    recipes: allMarkdownRemark(
      sort: { order: DESC, fields: [frontmatter___date] }
    ) {
      edges {
        node {
          id
          excerpt(pruneLength: 250)
          frontmatter {
            date(formatString: "MMMM DD, YYYY")
            path
            title
          }
        }
      }
    }

    tags: allMarkdownRemark {
      group(field: frontmatter___tags) {
        fieldValue
        totalCount
      }
    }
  }
`

const PostLink = ({ post }) => (
  <div>
    <Link to={post.frontmatter.path}>
      {post.frontmatter.title} ({post.frontmatter.date})
    </Link>
  </div>
)
