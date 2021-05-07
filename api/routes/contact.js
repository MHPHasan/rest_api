const express = require('express');

const router = express.Router();

const controllers = require('../controllers/contact');

// GET
router.get('/', controllers.getAllContactsController);

// POST
router.post('/', controllers.postContactController);

// GET
router.get('/:id', controllers.getSingleContactController);

// PUT
router.put('/:id', controllers.putContactController);

// Nested POST
//router.post('/:id', controllers.nestedPostController);


// DELETE
router.delete('/:id', controllers.deleteContactController);


module.exports = router;