module.exports = function Project(project) {
  return String.raw`
    <div class="project-shortcode">
      <div class="row">
        <a class="logo" href="${project.url}">
          <img src="${project.logo}" alt="${project.name}"/>
        </a>
      </div>

      <div class="row">
        <a class="logotype" href="${project.url}">
          <img src="${project.logotype}" alt="${project.name}"/>
        </a>
      </div>
      
      <div class="row">
        <ul>
          <li>
            ${project.hours} hours
          </li>
          <li>
            ${project.time}
          </li>
          <li>
            <a href="${project.projectUrl}" target="_blank" rel="noopener">${project.projectUrl}</a>
          </li>
          <li>
            <h4>Contributors</h4>
            
            <ul>
              ${project.contributors
                .map(
                  (value) =>
                    String.raw`<li> <a href="https://twitter.com/${value}" target="_blank" rel="noopener">${value}</a></li>`
                )
                .join('')}
            </ul>
          </li>
          <li>
            <h4>Technologies</h4>
            
            <ul>
              ${project.technologies.map((value) => String.raw`<li>${value}</li>`).join('')}
            </ul>
          </li>

        </ul>
        
        
      </div>

      <a href="${project.url}"></a>
    </div>
  `;
};
