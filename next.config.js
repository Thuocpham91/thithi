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
    pass:'Pthp123@'
  },
  publicRuntimeConfig: {
    apiUrl: process.env.NODE_ENV === 'development'
    ? 'http://202.92.6.221:3000/api' // development api
    : 'http://202.92.6.221:3000/api' // production api
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

  env: {
    'MYSQL_HOST': '202.92.6.221',
    'MYSQL_PORT': '3306',
    'MYSQL_DATABASE': "dev",
    'MYSQL_USER': "pvthuoc",
    'MYSQL_PASSWORD': "mKfsadsds&2akj@ads13",
  },
  sassOptions: {
    includePaths: [path.join(__dirname, 'styles')],
  },
}

module.exports = nextConfig


