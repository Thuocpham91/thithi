/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  serverRuntimeConfig: {
    secret: 'THIS IS USED TO SIGN AND VERIFY JWT TOKENS, REPLACE IT WITH YOUR OWN SECRET, IT CAN BE ANY STRING'
  },
  secretPass: {
    secret: 'kslajdlajscasaajskwaewas'
  },
  accountViettel: {
    account: '0982288550',
    pass: 'Pthp123@'
  },
  publicRuntimeConfig: {
    apiUrl: process.env.NODE_ENV_API
  },
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.resolve.fallback.fs = false;
    }
    return config;
  },
}
const path = require('path')

module.exports = {
  reactStrictMode: true,

  images: {
    domains: ['cdn.viettelsale.com','202.92.6.221:7005'],
  },
  serverRuntimeConfig: {
    PROJECT_ROOT: __dirname
  },
  sassOptions: {
    includePaths: [path.join(__dirname, 'styles')],
    experimental: { granularChunks: true },

  },



}

module.exports = nextConfig


