const {ApolloServer}= require('apollo-server');
const typeDefs= require('./db/shema')
const resolvers= require('./db/resolvers')
const jwt = require('jsonwebtoken');
//
var fs = require('fs');
const path = require('path');
const fastcsv = require('fast-csv');

//servidor
const server =new ApolloServer({
    typeDefs,
    resolvers,
    context: ({req}) => {
        // console.log(req.headers['authorization'])

        //console.log(req.headers);

        const token = req.headers['authorization'] || '';
        if(token) {
            try {
                const usuario = jwt.verify(token.replace('Bearer ', ''), process.env.SECRETA );
            //  console.log(usuario);
                return {
                    usuario
                }
            } catch (error) {
                console.log('Hubo un error');
                console.log(error);
            }
        }
    }
});

//Arrancar el servidor
server.listen().then (({url})=> {
console.log(`Servidor Listo en la URL ${url}`)


})
