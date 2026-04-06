module.exports = {
  siteMetadata: {
    title: "Jayaram Uday — Software Engineer",
    description:
      "Jayaram Uday — Software engineer building APIs, microservices, and cloud-native infrastructure",
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
        name: `Jayaram Uday — Software Engineer`,
        short_name: `JU`,
        start_url: `/`,
        background_color: `#121212`,
        theme_color: `#c8a96e`,
        display: `minimal-ui`,
        icon: `src/images/uday.jpeg`,
      },
    },
  ],
  trailingSlash: `never`,
};
