const projects = require('../_data/projects');

module.exports = class Projects {
  data() {
    return {
      name: 'Projects',
      layout: 'page',
    };
  }

  render() {
    return String.raw`
      <h3>Projects</h3>

      <p>
        I work as a software engineer and fractional startup CTO. I've developed a bit of a specialty around rescuing React projects that are in trouble.
      </p>
      
      <p>
        I pride myself in my ability to ship my projects. I work can work very slowly without losing steam. See my <a href="/projects">projects list</a> for the details.
      </p>

      <div class="project-shortcodes-wrapper">
        ${Object.values(projects)
          .map((project) => this.Project(project))
          .join('')}
      </div>
    `;
  }
};
