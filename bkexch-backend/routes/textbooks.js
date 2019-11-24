const router = require('express').Router()
let Textbook = require('../mongodb/models/textbook')

router.route('/').get((req, res) => {
    Textbook.find()
        .then(textbook => res.json(textbook))
        .catch(err => res.status(400).json('Error: ' + err))
})

router.route('/add').post((req, res) => {
    console.log("adding textbook!")

    const title = req.body.title;
    const author = req.body.author;
    const seller = req.body.seller;
    const description = req.body.description;
    const imgUrl = req.body.imgUrl;
    const price = Number(req.body.price);

    const newTextbook = new Textbook({
        title,
        author,
        seller,
        description,
        imgUrl,
        price
    });

    newTextbook.save()
        .then(() => res.json('textbook added!'))
        .catch(err => res.status(400).json('Error: ' + err))
})

router.route('/:id').get((req, res) => {
    Textbook.findById(req.params.id)
        .then(textbook => res.json(textbook))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').delete((req, res) => {
    Textbook.findByIdAndDelete(req.params.id)
        .then(() => res.json('textbook deleted.'))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/update/:id').post((req, res) => {
    Textbook.findById(req.params.id)
        .then(textbook => {
            textbook.title = req.body.title;
            textbook.author = req.body.author;
            textbook.seller = req.body.seller;
            textbook.description = req.body.description;
            textbook.imgUrl = req.body.imgUrl;
            textbook.price = Number(req.body.price);
            textbook.save()
                .then(() => res.json('textbook updated!'))
                .catch(err => res.status(400).json('Error: ' + err));
        })
        .catch(err => res.status(400).json('Error: ' + err))
})
module.exports = router;