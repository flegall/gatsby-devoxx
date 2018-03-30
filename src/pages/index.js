// @flow
import React from 'react'
import Link from 'gatsby-link'

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
  },
}
const IndexPage = (props: Props) => {
  const { data: { recipes: { edges: recipesEdges } } } = props

  const recipes = recipesEdges
    .filter(edge => !!edge.node.frontmatter.date) // You can filter your recipes based on some criteria
    .map(edge => <PostLink key={edge.node.id} post={edge.node} />)
  return (
    <div>
      <h1>Your recipes</h1>
      {recipes}
      <p />
      <Link to="/tags">All tags</Link>
    </div>
  )
}

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
  }
`

const PostLink = ({ post }) => (
  <div>
    <Link to={post.frontmatter.path}>
      {post.frontmatter.title} ({post.frontmatter.date})
    </Link>
  </div>
)
