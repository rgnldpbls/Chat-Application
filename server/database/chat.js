const knex = require('./knex');

function insertMessage(message){
    return knex('chat').insert(message);
}

function getAllMessages(){
    return knex('chat').select('*');
}

function deleteAllMessages(){
    return knex('chat').del();
}

module.exports = {
    insertMessage,
    getAllMessages,
    deleteAllMessages
}