const fp = require('fastify-plugin');


function getDate(date){
    
    return date
}
async function dateDecorator(fastify, opts){
    fastify.decorate('date',{
        getDate
    })

}

module.exports = fp(dateDecorator)