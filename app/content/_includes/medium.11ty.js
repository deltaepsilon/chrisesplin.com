const formatDate = require('../../utilities/format-date');

module.exports = class Medium {
  data() {
    return {
      name: 'Medium',
      layout: 'writing',
    };
  }

  render(params) {
    return String.raw`
      <style>
        .medium .title {
          display: flex;
          justify-content: space-between;
          margin-bottom: 1em;
          font-size: 1.5em;
        }
        
        .medium .subtitle {
          margin-bottom: 2em;
        }

        .medium .date {
          /* font-size: 0.5em; */
        }

        .medium hr {
          margin-top: 1em;
        }

        .medium em {
          display: block;
          font-size: 0.75em;
          text-align: center;
          width: 100%;
        }
      </style>
      <div class="medium">
        <hr/>
        
        <div class="title">
          <span class="text-headline">${params.title}</span>
        </div>
        <div class="subtitle text-bold">${params.subtitle}</div>

        <span class="date">${formatDate(params.date)}</span>
        
        <hr/>

        <div className="medium-content">
          ${params.content}  
        </div>
      </div>
    `;
  }
};
