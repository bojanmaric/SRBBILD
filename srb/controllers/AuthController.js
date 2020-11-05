const User = require('../models/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const register = (req, res, next) => {
    console.log(req.body);
    bcrypt.hash(req.body.password, 10, function (err, hashedPass) {
        if (err) {
            res.json({
                error: err
            });
        }

        let user = new User({
            name: req.body.name,
            email: req.body.email,
            phone: req.body.email,

            admin: req.body.admin,
            password: hashedPass
        })
        
        user.save()
            .then(user => {
                res.json({
                    massage: 'User added successfuly'
                })
            })
            .catch(error => {
                res.json({
                    massage: 'An error occured!'
                })
            })
    })




}

const login = (req, res, next) => {
    var username = req.body.username
    var password = req.body.password


    User.findOne({ $or: [ { email: username }, { phone: username }] })
        .then(user => {
            if (user) {
                bcrypt.compare(password, user.password, function (err, result) {
                    if (err) {
                        res.json({
                            error: err
                        })
                    }
                    if (result) {
                        let token = jwt.sign({ name: user.name }, 'AzQ,PI)0(', { expiresIn: '5h' })
                        res.json({
                            massage: 'login Successful',
                            token: token,
                            user:user
                        })
                    } else {
                        res.json({
                            massage: 'password does not matched'
                        })
                    }
                })
            } else {
                res.json({
                    massage: 'no user found'
                })
            }
        })
}

module.exports = {
    register, login

}

