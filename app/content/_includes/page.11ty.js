module.exports = class Page {
  data() {
    return {
      name: 'Page',
      layout: 'base',
    };
  }

  render(params) {
    return String.raw`
      <div class="page">${params.content}</div>
    `;
  }
};
