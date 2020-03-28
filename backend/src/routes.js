const express = require('express')

const routes = express.Router();

routes.post('/', (request, response)=>{

    const body = request.body;

    console.log(body)
    
    return response.json({

        evento: "Hello World!!!",
        aluno: "Andrey Nithack"
        
    });
});
module.exports(routes)