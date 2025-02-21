const { withSitemap } = require('next-sitemap');

/** @type {import('next').NextConfig} */
const nextConfig = withSitemap({
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'Content-Security-Policy',
            value: '', // Temporarily disable CSP
          },
        ],
      },
    ];
  },
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      use: ['@svgr/webpack'],
    });
    return config;
  },
});

module.exports = nextConfig;
