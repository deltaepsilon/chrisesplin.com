const mediumexporter = require('mediumexporter');
const urls = require('./medium-urls.json');

(async () => {
  await Promise.all(
    urls.map(async (url) => {
      return mediumexporter.getPost(url, {
        output: 'bin/medium/markdown/',
        frontmatter: true,
      });
    })
  );
})();
