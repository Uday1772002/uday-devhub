module.exports = {
  siteMetadata: {
    title: "Jayaram Uday",
    description: "A minimalist portfolio showcasing my work and expertise",
    author: "@jayaramuday",
    siteUrl: "https://yourportfolio.com",
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
        name: `Minimalist Portfolio`,
        short_name: `Portfolio`,
        start_url: `/`,
        background_color: `#0a0a0a`,
        theme_color: `#00d4ff`,
        display: `minimal-ui`,
        icon: `src/images/icon.png`,
      },
    },
  ],
};
