const supertest = require('supertest');

const server = require('./server');

const {games} = require('./data');


describe('server', () => {

    describe('GET', () => {
        it('returns the number of games', () => {
            resetGames();
            addGame();
            return supertest(server).get('/games')
                .set('Accept', 'applicaiton/json') //responds with json
                .expect(200)
                .then(res => expect(res.body.data.length).toBe(1))
        })

        it('returns an empty array when there are no games', () => {
            resetGames();
            return supertest(server).get('/games')
                .expect(200)
                .then(res => expect(Array.isArray(res.body.data)).toBeTruthy()
                    && expect(res.body.data.length).toBe(0))
        })
    })

    describe('GET by id', () => {
        
        beforeEach( () => {
            resetGames();
        })

        it('returns a game requested by its id', () => {
            addGame();
            return supertest(server).get('/games/0')
                .expect(200)
        })


        it('returns 404 when id of game does not exist', () => {
            addGame();
            return supertest(server).get('/games/1')
                .expect(404)
        })
    })

    

    describe('POST', () => {

        it('checks HTTP status when title and genre are provided in the req', () => {
            resetGames();
            return supertest(server).post('/games')
                .send({
                    title: 'Pacman', // required
                    genre: 'Arcade', // required
                    releaseYear: 1980 // not required
                  })
                .expect(201)
        })

        it('checks HTTP status when title is not provided in the req', () => {
            resetGames();
            return supertest(server).post('/games')
                .send({
                    genre: 'Arcade', // required
                    releaseYear: 1980 // not required
                  })
                .expect(422)
        })

        it('checks HTTP status when arcade is not provided in the req', () => {
            resetGames();
            return supertest(server).post('/games')
                .send({
                    title: 'Pacman', // required
                    releaseYear: 1980 // not required
                  })
                .expect(422)
        })

        it('checks HTTP status when both arcade and title are not provided in the req', () => {
            resetGames();
            return supertest(server).post('/games')
                .send({
                    title: 'Pacman', // required
                    releaseYear: 1980 // not required
                  })
                .expect(422)
        })

        it('checks that the game title to create does not already exist', () => {
            resetGames();
            addGame();
            return supertest(server).post('/games')
                .send({
                    title: 'Pacman', //duplicate title
                    genre: 'Arcade',
                    releaseYear: 1980 
                })
                .expect(405);
        })

    })
})




/****************************************************************/
/*                      Test Helper Functions                   */
/****************************************************************/

function resetGames() {

    games.length = 0;
    nextIndex = 0;
}

function addGame() {
    games.push({
        id: 0,
        title: 'Pacman', // required
        genre: 'Arcade', // required
        releaseYear: 1980 // not required
      })
}


//422: incomplete information
//405: not allowed
//404: game not found