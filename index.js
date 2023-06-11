const express = require('express');
const db = require('./models/index');

const app = express();
const port = 3000;

/**
 * This method will cretae connection with database
 */
async function syncDatabase() {
    db.sequelize.sync()
        .then(() => {
            console.log('Connection has been established successfully.');
        })
        .catch(err => {
            console.log(`Unable to connect to the database: ${JSON.stringify(err)}`);
        });
}

/**
 * This method will check for db connection and will start the server
 */
async function startServer() {
    await syncDatabase();

    app.listen(port, () => {
        console.log(`Server started on port ${port}`);
    });
}

//require routes 
const todoRoute = require('./routes/todo.routes');
app.use('/', todoRoute);

startServer();