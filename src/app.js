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
  // TODO
});

// DELETE REPOSITORY
app.delete("/repositories/:id", (request, response) => {
  // TODO
});

// ADD LIKE TO REPOSITORY
app.post("/repositories/:id/like", (request, response) => {
  // TODO
});

module.exports = app;
