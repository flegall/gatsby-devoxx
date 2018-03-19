module.exports = {
  siteMetadata: {
    title: 'Devoxx recipes',
  },
  plugins: [
    'gatsby-plugin-react-helmet',
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/src/pages/recipes/`,
        name: 'recipes',
      },
    },
    'gatsby-transformer-remark',
    'gatsby-plugin-styled-components',
  ],
}
