const HOST = 'http://localhost:3000';

export const getProjects = async () => {
  const data = await fetch(`${HOST}/projects`);
  return await data.json();
};

export const createProject = async (body) => {
  const data = await fetch(`${HOST}/projects`, {
    method: 'POST',
    body,
  });
  return await data.json();
};

export const doneProject = async (id) => {
  const data = await fetch(`${HOST}/projects/done/${id}`, {
    method: 'PATCH',
  });
  return await data.json();
};

export const deleteProject = async (id) => {
  const data = await fetch(`${HOST}/projects/${id}`, {
    method: 'DELETE',
  });
  return await data.json();
};

export const editProject = async (id, body) => {
  const data = await fetch(`${HOST}/projects/${id}`, {
    method: 'PATCH',
    body,
  });
  return await data.json();
};
