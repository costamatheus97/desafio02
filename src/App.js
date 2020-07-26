import React, { useState, useEffect } from "react";
import api from './services/api'

import "./styles.css";

function App() {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    api.get('repositories').then(response => {
      console.log(response)
      setProjects(response.data)
    })
  }, [])

  async function handleAddRepository() {
    const response = await api.post('repositories', {
      id: "123",
      url: "https://github.com/josepholiveira",
      title: "Desafio ReactJS",
      techs: ["React", "Node.js"],
    })

    const project = response.data
    setProjects([...projects, project])
  }

  async function handleRemoveRepository(id) {
    const response = await api.delete(`repositories/${id}`)

    const allProjects = projects.filter(project => project.id !== id)
    setProjects(allProjects)
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {projects.map(project => {
          return <li key={project.id}>
            {project.title}
            <button onClick={() => handleRemoveRepository(project.id)}>
              Remover
            </button>
          </li>
        })}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
