import React from 'react'
import Link from 'gatsby-link'

const IndexPage = ({
  data: { recipes: { edges: recipesEdges }, tags: { group: tagGroups } },
}) => {
  const recipes = recipesEdges
    .filter(edge => !!edge.node.frontmatter.date) // You can filter your recipes based on some criteria
    .map(edge => <PostLink key={edge.node.id} post={edge.node} />)

  const tags = tagGroups.map(({ fieldValue, totalCount }) => (
    <div>
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
    </div>
  )
}

export default IndexPage

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
