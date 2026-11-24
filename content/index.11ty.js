const projects = require('./_data/projects');

module.exports = class Index {
  data() {
    return {
      name: 'Index',
      layout: 'page',
      title: 'Chris Esplin',
      description:
        'Chris Esplin is a Utah-based Fractional CTO, principal full-stack engineer (TypeScript, React, Next.js, Go, Firebase, Stripe Connect), and founder of Utah Dev Co.',
    };
  }

  render() {
    return String.raw`
      <h2>Fractional CTO &amp; Founder of <a href="https://utahdevco.com">Utah Dev Co</a></h2>

      <p>
        I&apos;m a principal full-stack software architect based in Draper / Salt Lake City, Utah with 15+ years of production experience across TypeScript, React, Next.js, Go, Firebase, Postgres, and Stripe Connect.
      </p>

      <ul>
        <li>
          <strong>Startups (Seed / Series A):</strong> See my <a href="/fractional-cto">Fractional CTO &amp; Architecture Advisory</a> page for MVP stabilization, technical due diligence, and scaling AI-built codebases.
        </li>
        <li>
          <strong>Utah Non-Tech Businesses ($2M+):</strong> Through <a href="https://utahdevco.com">Utah Dev Co</a>, we automate back-office workflows for home services and wholesale/distribution companies with a <a href="https://utahdevco.com/how-it-works">$0-down audit and 50% Year-1 savings pricing</a>.
        </li>
      </ul>

      <h3>Video</h3>

      <p>
          My Firebase, TypeScript, and engineering videos are on <a href="https://www.youtube.com/ChrisEsplin" target="_blank" rel="noopener">YouTube</a>.
      </p>

      <h3>Writing</h3>

      <p>
          I&apos;m <a href="/writing">compiling my writing</a>.
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
          <a href="/fractional-cto">Fractional CTO</a>
        </li>
        <li>
          <a href="https://utahdevco.com">Utah Dev Co</a>
        </li>
        <li>
          <a href="https://www.linkedin.com/in/epsilon/">LinkedIn</a>
        </li>
      </ul>

      <h3>Projects</h3>

      <p>
        I work as a software engineer and fractional startup CTO. I&apos;ve developed a specialty around rescuing troubled React and TypeScript projects, shipping multi-party Stripe Connect marketplaces, and turning prototypes into audit-grade production platforms.
      </p>

      <p>
        See my <a href="/projects">projects list</a> for the details.
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
