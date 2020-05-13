module.exports = class Writing {
  data() {
    return {
      name: 'Writing',
      layout: 'page',
    };
  }

  render(params) {
    return String.raw`
      <style>
        .writing {
          width: 800px;
          max-width: calc(100vw - 2em);
        }

        .writing p {
          margin-bottom: 2em;
        }
      </style>
      <div class="writing">${params.content}</div>
    `;
  }
};
