

import express from 'express';
const app = express();

import * as usersController from './controllers/usersController.js';

import swaggerJSDoc from 'swagger-jsdoc';
import  swaggerUi from 'swagger-ui-express';


app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
    next();
})

app.use(express.json());

const options = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "Node JS API",
            version: "1.0.0"
        },
        servers: [
            {
                url: 'http://localhost:3001/'
            }
        ]
    },
    apis: ['./app.js']
}

const swaggerSpec = swaggerJSDoc(options);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.post('/users', usersController.addUser);

app.get('/users', usersController.getAllUser);

app.get('/users/:id', usersController.getUser);

app.put('/users/:id', usersController.editUser);

app.delete('/users/:id', usersController.deleteUser);


app.listen(3001, () => {
    console.log("Listening on  http://localhost:3001");
})