/** @type {import('next').NextConfig} */
const nextConfig = {
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          {
            key: "Content-Security-Policy",
            value: `
              default-src 'self';
              script-src 'self' 'unsafe-inline' 'unsafe-eval' https://*.clerk.dev https://accounts.google.com;
              connect-src 'self' https://*.clerk.dev https://accounts.google.com;
              img-src 'self' data: https://*.clerk.dev https://lh3.googleusercontent.com;
              frame-src 'self' https://*.clerk.dev https://accounts.google.com;
              style-src 'self' 'unsafe-inline' https://fonts.googleapis.com;
              font-src 'self' https://fonts.gstatic.com;
            `.replace(/\s{2,}/g, " "), // Minimize spaces for CSP
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
