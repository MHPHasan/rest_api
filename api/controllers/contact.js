const Contacts = require('../models/Contact_model');

const getAllContactsController = (req, res, next) => {
    Contacts.find()
        .then(contacts => {
            res.json({
                Message: 'Get All Contacts',
                Contacts: contacts
            })
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                Message: 'Error Occured',
                Error: err
            })
            
        })
}


const postContactController = (req, res, next) => {
    const contacts = new Contacts({
        name: req.body.name,
        number: req.body.number,
        email: req.body.email,
    });

    contacts.save()
        .then(data => {
            res.status(201).json({
                message: 'Hurrey! Data Saved!',
                contacts: data,
            })
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                Message: "Error Occured",
                Error: err
            })
        })
}


const getSingleContactController = (req, res, next) => {
    let id = req.params.id;

    Contacts.findById(id)
        .then(contact => {
            res.status(200).json({
                Message: "We Got Single Data",
                contact
            })
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                Message: 'Error Ocurred',
                Error: err
            })
            
        })
}

const putContactController = (req, res, next) => {
    let id = req.params.id;
    let updateData = {
        name: req.body.name,
        email: req.body.email,
        number: req.body.number
    }

    Contacts.findByIdAndUpdate(id, { $set: updateData })
        .then(contact => {
            Contacts.findById(contact._id)
                .then(newContact => {
                    res.json({
                        Message: 'Data Updated Successful!',
                        newContact
                    })
                })
                .catch(err => {
                    console.log(err);
                    res.status(500).json({
                        Message: 'Error Ocurred',
                        Error: err
                    })
                })
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                Message: 'Error Ocurred',
                Error: err
            })
        })
}

const deleteContactController = (req, res, next) => {
    let id = req.params.id;
    
    Contacts.findByIdAndRemove(id)
        .then(result => {
            res.json({
                Message: 'Data Deleted Successful!',
                result
            })
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                Message: 'Error Ocurred!',
                Error: err
            })
        })
}


module.exports = {
    getAllContactsController,
    postContactController,
    getSingleContactController,
    putContactController,
    deleteContactController,
}