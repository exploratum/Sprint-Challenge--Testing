
const {games} = require('./data');
let nextIndex = require('./data');

function find() {
    return games;
}

function findById(id) {
    gameFound = games.find(game => game.id === parseInt(id, 10));
    return gameFound;
}

function add(newGame) {

    let total = games.length;

    if(games.find(game => game.title === newGame.title)) {
        return 0;
    }
    else {
        newGame.id = nextIndex;
        nextIndex++;
        games.push(newGame);
    
        if(games.length === total+1)
            return total+1;
        else 
            return null;
    }
}

module.exports = {
    find,
    findById,
    add
}