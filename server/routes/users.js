const express = require('express');
const router = express.Router();
const User = require('../model/user');
const jwt = require('jsonwebtoken');
const config = require('../config/index');


router.post('/login', function(req, res) {
    const { email, password } = req.body;

    if (!email) {
        // Invalid Error
        return res.status(422).send({errors: [{title: 'User error', detail: 'Please fill email'}]});
    };

    if (!password) {
        // Invalid Error
        return res.status(422).send({errors: [{title: 'User error', detail: 'Please fill password'}]});
    };

    User.findOne({email}, function(err, foundUser){
        if (err) {
            // error message
            return res.status(422).send({errors: [{title: 'User error', detail: 'Something went wrong'}]});
        }

        if (!foundUser) {
            // Invalid error
            return res.status(422).send({errors: [{title: 'User error', detail: 'User does not exist'}]});
        }

        if (!foundUser.hasSamePassword(password)) {
             // Invalid error
             return res.status(422).send({errors: [{title: 'User error', detail: 'Incorrect password'}]});
        }

        // token発行
        const token = jwt.sign({
            userId: foundUser.id,
            userName: foundUser.userName
          }, config.SECRET, { expiresIn: '1h' });

        return res.json(token);
    })

});

router.post('/register', function(req, res) {
    const { userName, email, password, confirmPassword } = req.body;
    
/* 上と下は同じ意味
    const userName = req.body.userName;
    const email = req.body.email;
    const password = req.body.password;
    const confirmPassword = req.body.comfirmPassword;
     */
    if (!userName) {
        // Invalid Error
        return res.status(422).send({errors: [{title: 'User error', detail: 'Please fill username'}]});
    };

    if (!email) {
        // Invalid Error
        return res.status(422).send({errors: [{title: 'User error', detail: 'Please fill email'}]});
    };

    if (!password) {
        // Invalid Error
        return res.status(422).send({errors: [{title: 'User error', detail: 'Please fill password'}]});
    };

    if (password !== confirmPassword) {
        // Invalid Error
        return res.status(422).send({errors: [{title: 'User error', detail: 'Please check passwords'}]});
    };
    
    User.findOne({email}, function(err, foundUser) {
        if (err) {
            // error message
            return res.status(422).send({errors: [{title: 'User error', detail: 'Something went wrong'}]});
        }

        if (foundUser) {
            // Invalid error
            return res.status(422).send({errors: [{title: 'User error', detail: 'User already exists'}]});
        }

        const user = new User({userName, email, password});
        user.save(function(err) {
            if (err) {
                // error message
                return res.status(422).send({errors: [{title: 'User error', detail: 'Something went wrong'}]});
            }
        });

        return res.json({"registered": true});
    });
});

module.exports = router;