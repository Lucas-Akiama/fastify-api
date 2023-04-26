const fastify = require('fastify')();
const { connect } = require('./database');
const User = require('./user');

fastify.get('/users', async (request, reply) => {
  const users = await User.findAll();
  reply.send(users);
});

connect().then(() => {
  fastify.listen(3000, () => {
    console.log(`Servidor rodando em http://localhost:3000`);
  });
});
