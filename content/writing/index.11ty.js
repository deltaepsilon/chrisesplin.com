const fs = require('fs');
const path = require('path');
const promisify = require('util').promisify;
const fm = require('front-matter');
const formatDate = require('../../utilities/format-date');

module.exports = class Writing {
  data() {
    return {
      name: 'Writing',
      layout: 'page',
    };
  }

  async render() {
    const articleLinks = await getLinks('articles');
    const mediumLinks = await getLinks('medium');

    console.log

    return String.raw`
      <style>
        .writing ul {
          list-style: none;
          padding: 0;
        }

        .article-link {
          display: flex;
          justify-content: space-between;
          max-width: 800px;
          margin-bottom: 1em;
        }
      </style>
      
      <div class="writing">
        <h3>Articles</h3>

        <ul>
          ${articleLinks.map((link) => String.raw`<li>${link}</li>`).join('')}
        </ul>
      
        <h3>Medium</h3>

        <ul>
          ${mediumLinks.map((link) => String.raw`<li>${link}</li>`).join('')}
        </ul>
      </div>
    `;
  }
};

async function getLinks(folder) {
  const files = fs.readdirSync(path.join(__dirname, folder));
  const mdFiles = files.map((filename) => {
    const isMd = filename.slice(-3) === '.md';

    return isMd ? filename : `${filename}/index.md`;
  });
  const mdData = await Promise.all(
    mdFiles.map(async (filepath) => {
      const fileContents = await promisify(fs.readFile)(
        path.join(__dirname, folder, filepath),
        'utf8'
      );

      return fm(fileContents);
    })
  );
  const links = mdData
    .sort((a, b) => (a.attributes.date < b.attributes.date ? 1 : -1))
    .map(({ attributes }) => {
      const dateString = attributes.date ? formatDate(attributes.date) : '';

      return String.raw`
        <a class="article-link" href="/writing/${folder}/${attributes.slug}"> 
          <span>${attributes.title}</span>
          <span>${dateString}</span>
        </a>
      `;
    });

  return links;
}
