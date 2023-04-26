const fastify = require('fastify')();
const { connect } = require('../database');
const usuario = require('../user');

    const schema = {
        response: {
            200: {
                type: 'object',
                properties: {
                    message: {
                        type: 'string'
                    },
                    today: {
                        type: 'string'
                    },
                    // username:{
                    //     type: 'string'
                    // }
                }
            }
        }
    }

    fastify.get('/users', async (request, reply) => {
        const users = await usuario.findAll();
        reply.send(users);
    });

    function getValueFromDataBase() {
        return {
            message: 'teste',
        }
    }

    fastify.get('/:id', async (req, reply) => {
        const client = await fastify.pg.connect();
        const sumResult = await client.query('SELECT * FROM usuario WHERE idusuario=$1', [req.params.id]);
        client.release();
        const dadoFormatado = sumResult.rows;
        return { dadoFormatado }

    })

    fastify.get('/', { schema }, async (req, reply) => {
        const responseFromBD = getValueFromDataBase();
        const today = fastify.date.getDate(new Date().toLocaleDateString())
        return reply.send({
            responseFromBD,
            today,
            // username
        })
    });
