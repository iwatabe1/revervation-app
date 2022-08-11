const jwt = require('jsonwebtoken');
const config = require('../config/index');
const User = require('../model/user');

function notAuthorized() {
    return res.status(401).send({errors: [{title: 'Not Authorized', detail: 'You need to login'}]});
}

exports.authMiddleware = function(req, res, next) {
    const token = req.headers.authorization;
    
    if (!token) {
        return notAuthorized(res);
    }

    jwt.verify(token.split(' ')[1], config.SECRET, function(err, decodedToken) {
        // err
        if (err) {
            return res.status(401).send({errors: [{title: 'Not Authorized', detail: 'Invalid Token'}]});
        }
        // find user
        User.findById(decodedToken.userId, function(err, foundUser){
            if (err) {
                return res.status(401).send({errors: [{title: 'Not Authorized', detail: 'Invalid Token'}]});
            }

            if (!foundUser) {
                return res.status(401).send({errors: [{title: 'Not Authorized', detail: 'User not found'}]});
            }

            next();
        });
        // decoded undefined
    });
}