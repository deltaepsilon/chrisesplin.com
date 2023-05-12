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
        I don't own pets. I own domains.
      </p>
      
      <p>
        I iterate on the <a href="/projects">projects</a> that I care about.
      </p>

      <p>
        Calligraphy has been rewritten four times since 2011. HIIT Clock is on it's second iteration.
      </p>

      <div class="project-shortcodes-wrapper">
        ${Object.values(projects)
          .map((project) => this.Project(project))
          .join('')}
      </div>
    `;
  }
};
