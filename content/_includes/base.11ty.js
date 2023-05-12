module.exports = function Base(params) {
  const title = params.title || params.name || 'Chris Esplin';

  return String.raw`
    <!DOCTYPE html>
    <html lang="en">
    <head profile="http://www.w3.org/2005/10/profile">
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>${title}</title>
      <link rel="icon" type="image/png" href="/static/images/logos/chrisesplin-logo.png">
      <link rel="stylesheet" href="https://use.typekit.net/ytf5tsl.css">
      <link rel="stylesheet" href="/static/css/base.css"/>
      <link rel="stylesheet" href="/static/css/project.shortcode.css"/>

      <script async src="https://www.googletagmanager.com/gtag/js?id=UA-6859198-21"></script>
      <script>
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());

        gtag('config', 'UA-6859198-21');
      </script>
    </head>
    <body>
      <header>
        <a href="/">
          <h1>chris esplin</h1>
        </a>
      </header>

      <div id="content">${params.content}</div>

      <footer>
        <ul>
          <li>
            <a href="/resume">Resume</a>
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
