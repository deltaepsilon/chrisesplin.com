const projects = require('../_data/projects');

module.exports = class Project {
  data() {
    return {
      name: 'Project',
      layout: 'base',
    };
  }

  render(params) {
    const project = projects[params.projectKey];

    return String.raw`
      <div class="project">
        <style>
          .project {
            max-width: calc(100vw - 1em);
            margin: auto;
          }

          .project-content {
            max-width: calc(100vw - 2em);
            width: 800px;
            margin-left: 0.5em;
          }

          .project .project-shortcode {
            max-width: 400px;
            margin: 4em 1em;
          }

          .project-content img {
            width: 300px;
          }
        </style>

        ${this.Project(project)}
        
        <div class="project-content">${params.content}</div>

      </div>
    `;
  }
};
