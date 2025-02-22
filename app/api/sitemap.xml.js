export default function handler(req, res) {
    res.setHeader('Content-Type', 'text/xml');
    res.write(`<?xml version="1.0" encoding="UTF-8"?>
      <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
        <url>
          <loc>https://www.taskbank.online/</loc>
          <lastmod>${new Date().toISOString()}</lastmod>
          <changefreq>daily</changefreq>
          <priority>1.0</priority>
        </url>
        <url>
          <loc>https://www.taskbank.online/referral</loc>
          <lastmod>${new Date().toISOString()}</lastmod>
          <changefreq>weekly</changefreq>
          <priority>0.8</priority>
        </url>
        <url>
          <loc>https://www.taskbank.online/dashboard</loc>
          <lastmod>${new Date().toISOString()}</lastmod>
          <changefreq>daily</changefreq>
          <priority>0.9</priority>
        </url>
        <url>
          <loc>https://www.taskbank.online/withdrawals</loc>
          <lastmod>${new Date().toISOString()}</lastmod>
          <changefreq>weekly</changefreq>
          <priority>0.7</priority>
        </url>
        <url>
          <loc>https://www.taskbank.online/faq</loc>
          <lastmod>${new Date().toISOString()}</lastmod>
          <changefreq>monthly</changefreq>
          <priority>0.5</priority>
        </url>
        <url>
          <loc>https://www.taskbank.online/privacy-policy</loc>
          <lastmod>${new Date().toISOString()}</lastmod>
          <changefreq>yearly</changefreq>
          <priority>0.3</priority>
        </url>
        <url>
          <loc>https://www.taskbank.online/terms-of-service</loc>
          <lastmod>${new Date().toISOString()}</lastmod>
          <changefreq>yearly</changefreq>
          <priority>0.3</priority>
        </url>
      </urlset>`);
    res.end();
  }
  