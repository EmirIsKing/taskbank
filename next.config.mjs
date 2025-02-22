/** @type {import('next').NextConfig} */
const nextConfig = {
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          {
            key: "Content-Security-Policy",
            value: "script-src 'self' 'unsafe-inline' 'unsafe-eval'; object-src 'none';", // Temporarily disable CSP
          },
          {
            key: "X-Robots-Tag",
            value: "index, follow", // Allow search engines to index and follow links
          },
        ],
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

};

export default nextConfig;
