module.exports = {
  siteMetadata: {
    title: "Jayaram Uday - Software Engineer",
    description:
      "Portfolio of Jayaram Uday - Software Engineer specializing in Full-Stack Development, Cloud Architecture, and System Design",
    author: "@jayaramuday",
    siteUrl: "https://jayaramuday.com",
  },
  plugins: [
    `gatsby-plugin-styled-components`,
    `gatsby-plugin-image`,
    `gatsby-plugin-sharp`,
    `gatsby-transformer-sharp`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `Jayaram Uday Portfolio`,
        short_name: `JU Portfolio`,
        start_url: `/`,
        background_color: `#121212`,
        theme_color: `#bb86fc`,
        display: `minimal-ui`,
        icon: `src/images/uday.jpeg`,
      },
    },
  ],
  trailingSlash: `never`,
};
