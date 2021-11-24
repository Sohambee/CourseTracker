const router = require('express').Router();
let User = require('../models/user.model');
const requireLogin = require('../middleware/requireLogin');
const jwt = require('jsonwebtoken');
const JWT_SECRET = 'as09d0a030-sczkc,kk,220120-';

router.route('/').get((req, res) => {
    //Fetch all users from database
    User.find()
        .then(users => res.json(users))
        .catch(err => res.status(400).json('Error: ' + err))
});

router.route('/register').post((req, res) => {
    const firstName = req.body.firstName;
    const lastName = req.body.lastName;
    const email = req.body.email;
    const password = req.body.password;

    const newUser = new User({
        firstName,
        lastName,
        email,
        password
    });

    //Add user to database
    newUser.save()
        .then(() => res.json('User added!'))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/login').post((req, res) => {
    const email = req.body.email;
    const password = req.body.password;

    //Add user to database
    User.findOne({ email: email }).then(savedUser => {
        if (!savedUser) {
            return res.status(422).json({ error: "Invalid login" })
        } else if (savedUser.password == password) {
            const token = jwt.sign({ _id: savedUser._id }, JWT_SECRET);
            res.json({ token, });
        }
    }).catch(err => {
        console.log(err);
    })
});

router.route('/:id').get(requireLogin, (req, res) => {
    User.findById(req.params.id)
        .then(user => res.json(user))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').delete(requireLogin, (req, res) => {
    User.findByIdAndDelete(req.params.id)
        .then(() => res.json('User deleted'))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/update/:id').post(requireLogin, (req, res) => {
    User.findById(req.params.id)
        .then(user => {
            user.firstName = req.body.firstName;
            user.lastName = req.body.lastName;
            user.email = req.body.email;
            user.password = req.body.password;

            user.save()
                .then(() => res.json('User updated'))
                .catch(err => res.status(400).json('Error: ' + err));
        })
        .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;