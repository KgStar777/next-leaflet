const path = require('path');
// const dotenv = require('dotenv');
const CopyPlugin = require('copy-webpack-plugin');

/** @type {import('next').NextConfig} */

// dotenv.config();

const nextConfig = {
  reactStrictMode: true,
  webpack: (config) => {
    config.plugins.push(
      new CopyPlugin({
        patterns: [
          {
            from: 'node_modules/leaflet/dist/images',
            to: path.resolve(__dirname, 'public', 'leaflet', 'images')
          },
        ],
      }),
    )
    return config
  }
}

module.exports = nextConfig;