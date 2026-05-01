const API = "http://localhost:5000/projects";

async function addProject() {
  const title = document.getElementById("title").value;
  const description = document.getElementById("description").value;
  const githubLink = document.getElementById("githubLink").value;
  const techStack = document.getElementById("techStack").value;

  await fetch(API, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ title, description, githubLink, techStack })
  });

  loadProjects();
}

async function loadProjects() {
  const res = await fetch(API);
  const data = await res.json();

  const container = document.getElementById("projects");
  container.innerHTML = "<h2>Projects</h2>";

  data.forEach(p => {
    container.innerHTML += `
      <div>
        <h3>${p.title}</h3>
        <p>${p.description}</p>
        <p>${p.techStack}</p>
        <a href="${p.githubLink}" target="_blank">GitHub</a>
        <button onclick="deleteProject('${p._id}')">Delete</button>
      </div>
    `;
  });
}

async function deleteProject(id) {
  await fetch(API + "/" + id, { method: "DELETE" });
  loadProjects();
}

window.onload = loadProjects;