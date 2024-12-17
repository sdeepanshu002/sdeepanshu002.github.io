const express = require('express');
const path = require('path');
const fs = require('fs');
const app = express();
const port = 3000;

// Set up the EJS template engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Serve static files (CSS, JS, Images)
app.use(express.static(path.join(__dirname, 'public')));

// Define dynamic data for your portfolio
const data = {
  name: "Your Name",
  title: "Web Developer",
  description: "Welcome to my dynamic portfolio! I specialize in building web applications.",
  skills: ["JavaScript", "Node.js", "React", "HTML", "CSS"],
  projects: [
    { title: "Project 1", description: "Project 1 Description" },
    { title: "Project 2", description: "Project 2 Description" },
    { title: "Project 3", description: "Project 3 Description" }
  ]
};

// Define a route to render the dynamic portfolio
app.get('/', (req, res) => {
  res.render('index', { data });
});

// Generate the static files for GitHub Pages
app.get('/generate-static', (req, res) => {
  const htmlContent = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${data.title} | Portfolio</title>
  <link rel="stylesheet" href="public/css/styles.css">
</head>
<body>
  <header>
    <h1>${data.name}</h1>
    <h2>${data.title}</h2>
  </header>
  
  <section class="intro">
    <p>${data.description}</p>
  </section>

  <section class="skills">
    <h3>Skills</h3>
    <ul>
      ${data.skills.map(skill => `<li>${skill}</li>`).join('')}
    </ul>
  </section>

  <section class="projects">
    <h3>Projects</h3>
    <div class="projects-list">
      ${data.projects.map(project => `
        <div class="project">
          <h4>${project.title}</h4>
          <p>${project.description}</p>
        </div>
      `).join('')}
    </div>
  </section>

  <footer>
    <p>Created with 💻 by ${data.name}</p>
  </footer>

  <script src="public/js/app.js"></script>
</body>
</html>`;

  // Write to the file system
  fs.writeFileSync(path.join(__dirname, 'public', 'index.html'), htmlContent);

  res.send('Static content generated for GitHub Pages.');
});

// Start the Node.js server (optional)
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
