import { confirmationModalRender, editModalRender, renderList } from './renders.js';
import { createProject, deleteProject, doneProject, editProject, getProjects } from './api.js';

document.addEventListener('DOMContentLoaded', async () => {
  const form = document.querySelector('form');
  renderList(await getProjects());

  form.addEventListener('submit', async (event) => {
    event.preventDefault();
    const form = event.target;
    const body = new FormData(form);
    const projects = await createProject(body);
    renderList(projects);
    form.reset();
  });

  document.querySelector('.list').addEventListener('click', async (event) => {
    const elem = event.target;

    if (elem.tagName === 'BUTTON') {
      const type = elem.getAttribute('data-type');
      const item = elem.closest('.list__item');
      const id = item.getAttribute('data-id');
      const title = item.getAttribute('data-title');
      const description = item.getAttribute('data-description');

      if (type === 'done') {
        renderList(await doneProject(id));
      } else if (type === 'delete') {
        const deleteHandler = async () => {
          renderList(await deleteProject(id));
        };

        confirmationModalRender(title, deleteHandler);
      } else if (type === 'edit') {
        const editHandler = async (body) => {
          renderList(await editProject(id, body));
        };

        editModalRender({ id, title, description }, editHandler);
      }
    }
  });
});
