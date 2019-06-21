const express = require('express');
const server = express();

server.use(express.json());

const model = require('./model')

server.get('/games', async (req, res) => {
    
    const games = await model.find();
    if(games) {
        res.status(200).json({data: games});
    }
    else {
        res.sendStatus(500)
    }
})

server.get('/games/:id', async (req, res) => {
    const game = await model.findById(req.params.id);

    if (game) {
        res.status(200).json(game);
    }
    
    else
        res.sendStatus(404);
})

server.post('/games', async (req, res) => {
    if(req.body.title && req.body.genre) {
        
        const nbrGames = await model.add(req.body)
        
        if(nbrGames !== null) {
            if(nbrGames === 0)
                res.sendStatus(405);    //duplicate title
            else
                res.status(201).json({games: `${nbrGames}`});   //send number of games stored
        } 
        else {
            res.sendStatus(500); //something went wrong processing the array
        }
    }

    else {
        res.sendStatus(422) //Did not provide title or/and genre
    }
    
})

module.exports = server;