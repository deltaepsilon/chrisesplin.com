module.exports = class Sitemap {
  data() {
    return {
      permalink: '/sitemap.xml',
      eleventyExcludeFromCollections: true,
    };
  }

  render(data) {
    const baseUrl = 'https://www.chrisesplin.com';
    const items = (data.collections.all || [])
      .filter((page) => page.url && !page.url.endsWith('.xml') && !page.url.endsWith('.txt'))
      .map((page) => {
        const lastmod = page.date ? new Date(page.date).toISOString().split('T')[0] : '2026-11-24';
        return `  <url>\n    <loc>${baseUrl}${page.url}</loc>\n    <lastmod>${lastmod}</lastmod>\n  </url>`;
      })
      .join('\n');

    return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${items}\n</urlset>\n`;
  }
};
