module.exports = (app) => {
    const cards = require('../controllers/card.controller.js');

    // Create a new Card
    app.post('/:gameId/cards', cards.create);

    // Retrieve all Cards
    app.get('/:gameId/cards', cards.findAll);

    // Retrieve a single Card with cardId
    app.get('/:gameId/cards/:cardId', cards.findOne);

    // Update a Card with cardId
    app.put('/:gameId/cards/:cardId', cards.update);

    // Delete a Card with cardId
    app.delete('/:gameId/cards/:cardId', cards.delete);
}