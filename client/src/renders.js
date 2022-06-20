export const renderList = (projects) => {
  const list = document.querySelector('.list');
  list.innerHTML = '';

  Object.values(projects).forEach(({ id, title, description, isDone }) => {
    const item = document.createElement('li');
    item.setAttribute('data-id', id);
    item.setAttribute('data-title', title);
    item.setAttribute('data-description', description);
    item.classList.add('list__item');
    if (isDone) {
      item.classList.add('crossed');
    }
    item.innerHTML = `
        <h2>${title}</h2>
        <p class="list__txt">${description}</p>
        <button data-type="edit">✎</button>
        <button data-type="delete">╳</button>
        <button data-type="done">✓</button>
    `;

    list.append(item);
  });
};

export const confirmationModalRender = (title, callback) => {
  const modal = document.createElement('div');
  modal.classList.add('modal');
  const content = document.createElement('div');
  content.classList.add('modal__content');

  content.innerHTML = `<h2>Are you sure delete ${title}?</h2>`;
  const confirmButton = document.createElement('button');
  confirmButton.innerText = 'OK';
  const cancelButton = document.createElement('button');
  cancelButton.innerText = 'Cancel';
  cancelButton.addEventListener('click', () => {
    modal.remove();
  });

  confirmButton.addEventListener('click', async () => {
    await callback();
    modal.remove();
  });

  content.append(confirmButton, cancelButton);
  modal.append(content);

  document.body.append(modal);
};

export const editModalRender = ({ id, title, description }, callback) => {
  const modal = document.createElement('div');
  modal.classList.add('modal');
  const content = document.createElement('div');
  content.classList.add('modal__content');
  const form = document.createElement('form');
  form.addEventListener('submit', async (event) => {
    event.preventDefault();
    const body = new FormData(event.target);
    await callback(body);
    modal.remove();
  });

  form.innerHTML = `
    <input type="text" name="title" placeholder="Enter title" value="${title}">
    <textarea name="description" placeholder="Enter description">${description}</textarea>
    <button>
      Edit
    </button>
  `;
  const cancelButton = document.createElement('button');
  cancelButton.innerText = 'Cancel';
  cancelButton.addEventListener('click', () => {
    modal.remove();
  });
  content.append(form, cancelButton);
  modal.append(content);

  document.body.append(modal);
};
