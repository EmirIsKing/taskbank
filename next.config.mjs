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
              script-src 'self' 'unsafe-inline' 'unsafe-eval' https://*.clerk.dev https://accounts.google.com https://clerk.taskbank.online https://www.taskbank.online;
              connect-src 'self' https://*.clerk.dev https://accounts.google.com https://clerk.taskbank.online https://www.taskbank.online;
              img-src 'self' data: https://*.clerk.dev https://lh3.googleusercontent.com https://clerk.taskbank.online https://www.taskbank.online;
              frame-src 'self' https://*.clerk.dev https://accounts.google.com https://clerk.taskbank.online https://www.taskbank.online;
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
