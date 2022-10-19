const { application } = require('express');
const {MongoClient}  = require('mongodb');
const stringConexao = 'mongodb+srv://josi43:cris2288@teste.r1dwzec.mongodb.net/test';
const databaseName = 'adust';

let db;
function conectaDB(funcao){
    MongoClient.connect(stringConexao)
    .then(client => {
        console.log("solicitaçao concluida, meu garoto de programa!");
        db = client.db(databaseName)
        funcao();
    })
    .catch(error => console.log('ramelou na quebrada, Marreco!'));
};


function getDb() {
    return db
}
module.exports = {getDb ,conectaDB} 