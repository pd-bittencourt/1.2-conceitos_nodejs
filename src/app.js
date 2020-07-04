const express = require("express");
const cors = require("cors");
const { uuid } = require("uuidv4");

const app = express();

app.use(express.json());
app.use(cors());

const repositories = [];

// LIST REPOSITORIES
app.get("/repositories", (request, response) => {
  return response.json(repositories);
});

// CREATE NEW REPOSITORY
app.post("/repositories", (request, response) => {
  const { title, url, techs } = request.body;
  const repository = { id: uuid(), title, url, techs, likes: 0 };
  repositories.push(repository);
  return response.json(repository);
});

// UPDATE REPOSITORY
app.put("/repositories/:id", (request, response) => {
  const { id } = request.params;
  const { title, url, techs } = request.body;

  // find repository by id
  const repository = repositories.find((repository) => repository.id === id);

  // if repository false, return error
  if (!repository) {
    return response.status(400).json({ error: "Repository not found." });
  }

  // find index of repository
  const repositoryIndex = repositories.indexOf(repository);

  repositories[repositoryIndex] = {
    ...repository,
    title,
    url,
    techs,
  };

  return response.json(repositories[repositoryIndex]);
});

// DELETE REPOSITORY
app.delete("/repositories/:id", (request, response) => {
  const { id } = request.params;

  const repositoryIndex = repositories.findIndex(
    (repository) => repository.id === id
  );

  if (repositoryIndex < 0) {
    return response.status(400).json({ error: "Repository not found." });
  }

  // Remove repository from array
  repositories.splice(repositoryIndex, 1);

  return response.status(204).send();
});

// ADD LIKE TO REPOSITORY
app.post("/repositories/:id/like", (request, response) => {
  const { id } = request.params;

  // find repository by id
  const repository = repositories.find((repository) => repository.id === id);

  // if repository false, return error
  if (!repository) {
    return response.status(400).json({ error: "Repository not found." });
  }

  // find index of repository
  const repositoryIndex = repositories.indexOf(repository);

  repositories[repositoryIndex].likes += 1;

  return response.json(repositories[repositoryIndex]);
});

module.exports = app;
