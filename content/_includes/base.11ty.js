module.exports = function Base(params) {
  const title = params.title || params.name || 'Chris Esplin';
  const fullTitle = title === 'Chris Esplin' ? 'Chris Esplin — Fractional CTO & Founder of Utah Dev Co' : `${title} | Chris Esplin`;
  const description =
    params.description ||
    'Chris Esplin is a Draper / Salt Lake City, Utah Fractional CTO, principal full-stack software architect (TypeScript, React, Next.js, Go, Firebase), and founder of Utah Dev Co.';
  const pageUrl = params.page && params.page.url ? params.page.url : '/';
  const canonicalUrl = `https://www.chrisesplin.com${pageUrl}`;

  const personSchema = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    '@id': 'https://www.chrisesplin.com/#person',
    name: 'Chris Esplin',
    url: 'https://www.chrisesplin.com',
    jobTitle: 'Fractional CTO & Principal Software Architect',
    description,
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Draper',
      addressRegion: 'UT',
      addressCountry: 'US',
    },
    knowsAbout: [
      'Fractional CTO',
      'TypeScript',
      'React',
      'Next.js',
      'Go',
      'Firebase',
      'PostgreSQL',
      'Stripe Connect',
      'AI Workflow Automation',
    ],
    worksFor: {
      '@type': 'Organization',
      '@id': 'https://utahdevco.com/#organization',
      name: 'Utah Dev Co',
      url: 'https://utahdevco.com',
    },
    sameAs: [
      'https://utahdevco.com',
      'https://github.com/deltaepsilon',
      'https://www.linkedin.com/in/epsilon/',
      'https://www.youtube.com/ChrisEsplin',
      'https://twitter.com/chrisesplin',
    ],
  };

  return String.raw`
    <!DOCTYPE html>
    <html lang="en">
    <head profile="http://www.w3.org/2005/10/profile">
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>${fullTitle}</title>
      <meta name="description" content="${description.replace(/"/g, '&quot;')}">
      <link rel="canonical" href="${canonicalUrl}">
      <meta property="og:title" content="${fullTitle.replace(/"/g, '&quot;')}">
      <meta property="og:description" content="${description.replace(/"/g, '&quot;')}">
      <meta property="og:url" content="${canonicalUrl}">
      <meta property="og:type" content="website">
      <link rel="icon" type="image/png" href="/static/images/logos/chrisesplin-logo.png">
      <link rel="stylesheet" href="https://use.typekit.net/ytf5tsl.css">
      <link rel="stylesheet" href="/static/css/base.css"/>
      <link rel="stylesheet" href="/static/css/project.shortcode.css"/>
      <script type="application/ld+json">${JSON.stringify(personSchema)}</script>
    </head>
    <body>
      <header>
        <a href="/">
          <h1>chris esplin</h1>
        </a>
      </header>

      <main id="content">${params.content}</main>

      <footer>
        <ul>
          <li>
            <a href="/fractional-cto">Fractional CTO</a>
          </li>
          <li>
            <a href="https://utahdevco.com">Utah Dev Co</a>
          </li>
          <li>
            <a href="/pages/resume">Resume</a>
          </li>
          <li>
            <a href="/projects">Projects</a>
          </li>
          <li>
            <a href="/writing">Writing</a>
          </li>
          <li>
            <a href="mailto:chris@christopheresplin.com?subject=ChrisEsplin.com%20inquiry&body=Hey%20Chris!%0A%0AI%20found%20you%20on%20ChrisEsplin.com%20and%20thought%20we%20might%20be%20able%20to%20work%20together.%0A%0A...">Email</a>
          </li>
          <li>
            <a href="https://twitter.com/chrisesplin">Twitter</a>
          </li>
          <li>
            <a href="https://www.youtube.com/c/ChrisEsplin">YouTube</a>
          </li>
          <li>
            <a href="https://github.com/deltaepsilon">GitHub</a>
          </li>
          <li>
            <a href="https://www.linkedin.com/in/epsilon/">LinkedIn</a>
          </li>
        </ul>
      </footer>
    </body>
    </html>
  `;
};
