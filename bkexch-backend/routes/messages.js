const router = require('express').Router()
let Message = require('../mongodb/models/message')

router.route('/').get((req, res) => {
    Message.find()
        .then(messages => res.json(messages))
        .catch(err => res.status(400).json('Error: ' + err))
})

router.route('/add').post((req, res) => {
    console.log("adding message!")

    const from = req.body.from;
    const to = req.body.to;
    const text = req.body.text;
    const newMessage = new Message({
        from,
        to,
        text,
    });

    newMessage.save()
        .then(() => res.json('Message added!'))
        .catch(err => res.status(400).json('Error: ' + err))
})

router.route('/:id').get((req, res) => {
    Message.findById(req.params.id)
        .then(message => res.json(message))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').delete((req, res) => {
    Message.findByIdAndDelete(req.params.id)
        .then(() => res.json('Message deleted.'))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/update/:id').post((req, res) => {
    Message.findById(req.params.id)
        .then(message => {
            message.from = req.body.from;
            message.to = req.body.to;
            message.text = req.body.text;
            message.save()
                .then(() => res.json('Message updated!'))
                .catch(err => res.status(400).json('Error: ' + err));
        })
        .catch(err => res.status(400).json('Error: ' + err))
})
module.exports = router;