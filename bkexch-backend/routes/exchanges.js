const router = require('express').Router()
let Exchange = require('../mongodb/models/exchange')

router.route('/').get((req, res) => {
    Exchange.find()
        .then(exchange => res.json(exchange))
        .catch(err => res.status(400).json('Error: ' + err))
})

router.route('/').post((req, res) => {
    console.log("adding exchange!")

    const from = req.body.from;
    const to = req.body.to;
    const textbookID = req.body.textbookID;
    const newExchange = new Exchange({
        from,
        to,
        textbookID,
    });

    newExchange.save()
        .then(() => res.json('Exchange added!'))
        .catch(err => res.status(400).json('Error: ' + err))
})

router.route('/:id').get((req, res) => {
    Exchange.findById(req.params.id)
        .then(exchange => res.json(exchange))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').delete((req, res) => {
    Exchange.findByIdAndDelete(req.params.id)
        .then(() => res.json('Exchange deleted.'))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/update/:id').post((req, res) => {
    Exchange.findById(req.params.id)
        .then(exchange => {
            exchange.from = req.body.from;
            exchange.to = req.body.to;
            exchange.textbookID = req.body.textbookID;
            exchange.save()
                .then(() => res.json('Exchange updated!'))
                .catch(err => res.status(400).json('Error: ' + err));
        })
        .catch(err => res.status(400).json('Error: ' + err))
})
module.exports = router;