const projects = require('./_data/projects');

module.exports = class Index {
  data() {
    return {
      name: 'Index',
      layout: 'page',
      title: 'Chris Esplin'
    };
  }

  render() {
    return String.raw`
      <h3>Video</h3>

      <p>
          My videos are on <a href="https://www.youtube.com/ChrisEsplin" target="_blank" rel="noopener">YouTube</a>
      </p>

      <h3>Writing</h3>

      <p>
          I'm <a href="/writing">compiling my writing</a>. I startup life has me busy.
      </p>

      <h3>Resume / Consulting</h3>

      <p>
        I respond to everything and I do my best to help.
      </p>

      <ul>
        <li>
          <a href="mailto:chris@christopheresplin.com?subject=Work%20Inquiry&body=Greetings%20Chris!%0D%0A%0D%0AI%20found%20you%20on%20ChrisEsplin.com%20and%20I'd%20like%20to%20talk%20to%20you%20about%20a%20job.">email</a>
        </li>
        <li>
          <a href="/pages/resume">resume</a>
        </li>
        <li>
          <a href="https://www.linkedin.com/in/epsilon/">LinkedIn</a>
        </li>
      </ul>

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

      <img src="https://firebasestorage.googleapis.com/v0/b/chris-esplin.appspot.com/o/assets%2Fesplin-family-2015.jpg?alt=media&token=4edba376-0517-4e98-ad71-eb5cfcc86339" alt="Esplin family circa 2016"/>
    `;
  }
};
