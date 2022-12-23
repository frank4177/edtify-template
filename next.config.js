/** @type {import('next').NextConfig} */
/* 
assetPrefix: "http://techslides.com",
const nextConfig = withPlugins([], {}); 
const withVideos = require("next-videos");
const withPlugins = require("next-compose-plugins");
*/
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,

  compiler: {
    // Enables the styled-components SWC transform
    styledComponents: true,
  },
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/i,
      issuer: /\.[jt]sx?$/,
      use: ["@svgr/webpack"],
    });
    // config.infrastructureLogging = { debug: /PackFileCache/ };

    return config;
  },
  images: {
    domains: [
      "contentionary.s3.eu-west-3.amazonaws.com",
      "cttn-filemanager.herokuapp.com",
      "localhost",
      "https://www.sic-info.org",
      "dev-cdn.contentionary.com",
      "prod-cdn.contentionary.com",
      "s3.eu-west-1.wasabisys.com",
      "dev-cdn.b-cdn.net",
      "video.bunnycdn.com"
    ],
  },
};

module.exports = nextConfig;
