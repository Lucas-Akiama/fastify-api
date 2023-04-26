module.exports = async(fastify, opts) => {
    
    const schema = {
        response:{
            200:{
                type: 'object',
                properties:{
                    message: {
                        type: 'string'
                    },
                    today:{
                        type: 'string'
                    },
                    // username:{
                    //     type: 'string'
                    // }
                }
            }
        }
    }

    function getValueFromDataBase(){
        return{
            message: 'teste',
        }
    }

    fastify.get('/:id', async (req, reply) => {
        const client = await fastify.pg.connect();
        const sumResult = await client.query('SELECT * FROM usuario WHERE idusuario=$1', [req.params.id]);
        client.release();
        const dadoFormatado = sumResult.rows;
        return{dadoFormatado}
        // fastify.pg.connect(onConnect)
        // function onConnect (err, client, release) {
        //   if (err) return reply.send(err)
      
        //   client.query(
        //     'SELECT * FROM usuario WHERE id=$1', [req.params.id],
        //     function onResult (err, result) {
        //       release()
        //       return reply.send(err || result)
        //     }
        //   )
        // }
        
      })

      
    fastify.get('/', {schema}, async (req, reply) =>{
        const responseFromBD = getValueFromDataBase();
        const today = fastify.date.getDate(new Date().toLocaleDateString())
        return reply.send({
            responseFromBD,
            today,
            // username
        })
    });
}