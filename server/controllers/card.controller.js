const ModelCard = require('../models/model.card.js');
const ModelBlank = require('../models/model.blank.js');
const Model15x4 = require('../models/model.15x4.js');
const ModelBlackDeck = require('../models/model.blackdeck.js');

const selectModel = (gameId) => {
    return {
        'blank': ModelBlank,
        '15x4': Model15x4,
        'blackdeck': ModelBlackDeck
    }[gameId];
};

// Create and Save a new Card
exports.create = (req, res) => {
    console.log(req.body);
    // Validate request
    if(!req.body) {
        return res.status(400).send({
            message: "Card content can not be empty"
        });
    }

    // Create a Card
    const model = selectModel(req.params.gameId);
    const card = new model(req.body);

    // Save Card in the database
    card.save()
    .then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while creating the Card."
        });
    });
};

// Retrieve and return all cards from the database.
exports.findAll = (req, res) => {
    selectModel(req.params.gameId).find()
    .then(cards => {
        res.send(cards);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving cards."
        });
    });
};

// Find a single card with a cardId
exports.findOne = (req, res) => {
    selectModel(req.params.gameId).findById(req.params.cardId)
    .then(card => {
        if(!card) {
            return res.status(404).send({
                message: "Card not found with id " + req.params.cardId
            });
        }
        res.send(card);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Card not found with id " + req.params.cardId
            });
        }
        return res.status(500).send({
            message: "Error retrieving card with id " + req.params.cardId
        });
    });
};

// Update a card identified by the cardId in the request
exports.update = (req, res) => {
    // Validate Request
    if(!req.body) {
        return res.status(400).send({
            message: "Card content can not be empty"
        });
    }

    // Find card and update it with the request body
    selectModel(req.params.gameId).findByIdAndUpdate(req.params.cardId, req.body, {new: false})
    .then(card => {
        if(!card) {
            return res.status(404).send({
                message: "Card not found with id " + req.params.cardId
            });
        }
        res.send(card);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Card not found with id " + req.params.cardId
            });
        }
        return res.status(500).send({
            message: "Error updating card with id " + req.params.cardId
        });
    });
};

// Delete a card with the specified cardId in the request
exports.delete = (req, res) => {
    selectModel(req.params.gameId).findByIdAndRemove(req.params.cardId)
    .then(card => {
        if(!card) {
            return res.status(404).send({
                message: "Card not found with id " + req.params.cardId
            });
        }
        res.send({message: "Card deleted successfully!"});
    }).catch(err => {
        if(err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                message: "Card not found with id " + req.params.cardId
            });
        }
        return res.status(500).send({
            message: "Could not delete card with id " + req.params.cardId
        });
    });
};
