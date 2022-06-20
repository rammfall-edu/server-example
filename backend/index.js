const fastify = require('fastify');

const instance = fastify();

instance.register(
  require('@fastify/cors')
);

instance.register(require('@fastify/multipart'), {
  addToBody: true
});

const projects = {};
let countId = 1;

instance.get('/projects', (request, reply) => {
  reply.send(projects);
})

instance.post('/projects', (request, reply) => {
  const { body: { title, description } } = request;
  projects[countId] = {
    id: countId,
    title,
    description,
    isDone: false,
  };

  countId++;

  reply.send(projects);
});

instance.patch('/projects/done/:id', (request, reply) => {
  const { id } = request.params;
  projects[id].isDone = !projects[id].isDone;

  reply.send(projects);
});

instance.patch('/projects/:id', (request, reply) => {
  const { id } = request.params;
  const { title, description } = request.body;

  projects[id].title = title;
  projects[id].description = description;

  reply.send(projects);
});

instance.delete('/projects/:id', (request, reply) => {
  const { id } = request.params;
  delete projects[id];

  reply.send(projects);
});

instance.listen(3000)
  .then(() => {
    console.log('Server was started');
  })
  .catch(() => {
    console.log('Server was not started');
  })
