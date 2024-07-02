const knex = require('knex');

const connectedKnex = knex({
    client: 'sqlite3',
    connection: {
        filename: "chat.sqlite3"
    }
});

module.exports = connectedKnex;