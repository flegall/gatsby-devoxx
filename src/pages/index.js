import React from 'react'
import Link from 'gatsby-link'

const IndexPage = ({ data: { allMarkdownRemark: { edges } } }) => {
  const posts = edges
    .filter(edge => !!edge.node.frontmatter.date) // You can filter your posts based on some criteria
    .map(edge => <PostLink key={edge.node.id} post={edge.node} />)
  return (
    <div>
      <h1>Choose your recipe</h1>
      {posts}
    </div>
  )
}

export default IndexPage

export const pageQuery = graphql`
  query IndexQuery {
    allMarkdownRemark(sort: { order: DESC, fields: [frontmatter___date] }) {
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
