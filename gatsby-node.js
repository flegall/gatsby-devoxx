/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */
const path = require('path')
const _ = require('lodash')

exports.modifyBabelrc = ({ babelrc }) => {
  return {
    ...babelrc,
    presets: [...babelrc.presets, 'flow'],
    plugins: ['transform-decorators-legacy', ...babelrc.plugins],
  }
}

exports.createPages = ({ boundActionCreators, graphql }) => {
  const { createPage } = boundActionCreators

  const blogPostTemplate = path.resolve(`src/templates/recipeTemplate.js`)
  const tagTemplate = path.resolve(`src/templates/tagTemplate.js`)

  return graphql(`
    {
      allMarkdownRemark(
        sort: { order: DESC, fields: [frontmatter___date] }
        limit: 1000
      ) {
        edges {
          node {
            frontmatter {
              path
              tags
            }
          }
        }
      }
    }
  `).then(result => {
    if (result.errors) {
      return Promise.reject(result.errors)
    }

    result.data.allMarkdownRemark.edges.forEach(({ node }) => {
      createPage({
        path: node.frontmatter.path,
        component: blogPostTemplate,
        context: {}, // additional data can be passed via context
      })
    })

    let tags = []
    // Iterate through each post, putting all found tags into `tags`
    result.data.allMarkdownRemark.edges.forEach(({ node }) => {
      tags = tags.concat(node.frontmatter.tags)
    })

    tags = _.uniq(tags)

    // Make tag pages
    tags.forEach(tag => {
      createPage({
        path: `/tags/${_.kebabCase(tag)}/`,
        component: tagTemplate,
        context: {
          tag,
        },
      })
    })
  })
}
