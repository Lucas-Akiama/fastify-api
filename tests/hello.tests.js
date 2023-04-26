const t = require('tap');
const app = require('../src/app');

const {test} = t;

test('should return Hello world', async t => {
    const fastify = app();
    t.teardown(async () => {
        await fastify.close();
    });

    const response = await fastify.inject({
        method: 'GET',
        path: '/hello'
    });


    t.same(response.statusCode, 200);
    t.same(response.json(), {
        message: 'Hello world',
        today: new Date().toLocaleDateString()
    });
});