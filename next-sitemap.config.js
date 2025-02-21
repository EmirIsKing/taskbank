/** @type {import('next-sitemap').IConfig} */
const config = {
    siteUrl: 'https://www.taskbank.online',
    generateRobotsTxt: true,
    sitemapSize: 7000,
    exclude: ['/api/*'],
    robotsTxtOptions: {
      policies: [{ userAgent: '*', allow: '/' }],
    },

    additionalPaths: async (config) => [
        { loc: '/', changefreq: 'daily', priority: 1.0 },
        { loc: '/privacy-policy', changefreq: 'monthly', priority: 0.5 },
        { loc: '/terms-of-service', changefreq: 'monthly', priority: 0.5 },
        { loc: '/faq', changefreq: 'monthly', priority: 0.5 },
        { loc: '/earn', changefreq: 'monthly', priority: 0.5 },
        { loc: '/cashout', changefreq: 'monthly', priority: 0.5 },
      ],
      
  };
  
  module.exports = config;
  