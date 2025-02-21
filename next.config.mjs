/** @type {import('next').NextConfig} */
const nextConfig = {
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          {
            key: "Content-Security-Policy",
            value: "", // Temporarily disable CSP
          },
          {
            key: "X-Robots-Tag",
            value: "index, follow", // Allow search engines to index and follow links
          },
        ],
      },
    ];
  },

  async rewrites() {
    return [
      {
        source: '/sitemap.xml',
        destination: '/api/sitemap.xml', // Dynamic sitemap route
      },
    ];
  },

  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      use: ["@svgr/webpack"],
    });
    return config;
  },

  // Sitemap generation settings (optional if using next-sitemap package)
  sitemap: {
    siteUrl: "https://www.taskbank.online",
    generateRobotsTxt: true, // Generates robots.txt file automatically
    changefreq: "daily",
    priority: 0.7,
  },
};

export default nextConfig;
