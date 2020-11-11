const express = require('express');
const router = express.Router();
const Contact = require('../models/contact.model');

router.get('/contacts', async (req, res) => {
    try {
        const foundContacts = await Contact.find();
        res.send(foundContacts);
    } catch (err) {
        console.log(err);
    }
});

router.patch('/contacts/responded/:id', async (req, res) => {
    try {
        const foundContact = await Contact.findOneAndUpdate({
            _id: req.params.id
        }, { $set: { responded: true }}
        );
        res.send('Contact marked responded');
    } catch (err) {
        console.log(err);
    }
})

router.delete('/contacts/delete/:id', async (req, res) => {
    try {
        const foundlog = await Contact.findOneAndDelete({
            _id: req.params.id
        });
        res.send('Contact Deleted')
    } catch (err) {
        console.log(err);
    }
});

module.exports = router;