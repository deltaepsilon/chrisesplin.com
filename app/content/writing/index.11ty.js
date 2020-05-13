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
    const links = await getLinks();

    return String.raw`
      <style>
        .writing ul {
          list-style: none;
          padding: 0;
        }

        .medium-link {
          display: flex;
          justify-content: space-between;
          max-width: 800px;
          margin-bottom: 1em;
        }
      </style>
      
      <div class="writing">
        <h3>Medium Articles</h3>

        <ul>
          ${links.map((link) => String.raw`<li>${link}</li>`).join('')}
        </ul>
      </div>
    `;
  }
};

async function getLinks() {
  const files = fs.readdirSync(path.join(__dirname, './medium'));
  const mdFiles = files.map((filename) => {
    const isMd = filename.slice(-3) === '.md';

    return isMd ? filename : `${filename}/index.md`;
  });
  const mdData = await Promise.all(
    mdFiles.map(async (filepath) => {
      const fileContents = await promisify(fs.readFile)(
        path.join(__dirname, 'medium', filepath),
        'utf8'
      );

      return fm(fileContents);
    })
  );
  const links = mdData
    .sort((a, b) => (a.attributes.date < b.attributes.date ? 1 : -1))
    .map(({ attributes }) => {
      const dateString = formatDate(attributes.date);

      return String.raw`
        <a class="medium-link" href="/writing/medium/${attributes.slug}"> 
          <span>${attributes.title}</span>
          <span>${dateString}</span>
        </a>
      `;
    });

  return links;
}
