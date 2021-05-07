const User = require('../models/Users_model');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');


const getAllUsersController = (req, res, next) => {
    User.find()
        .then(user => {
            res.json(user)
        })
        .catch(err => {
            console.log(err);
            res.json({
                Message: "Error Ocurred!",
                Error: err
            })
        })
}

const registerController = (req, res, next) => {
    bcrypt.hash(req.body.password, 10, (err, hash) => {
        if(err) {
            res.json({
                Error: err
            })
        }

        let user = new User({
            email: req.body.email,
            password: hash
        })

        user.save()
            .then(user => {
                res.status(201).json({
                    Message: 'User Created Successful!',
                    User: user
                })
            })
            .catch(err => {
                console.log(err);
                res.json({
                    Message: "Error Ocurred",
                    Error: err
                })
                
            })
    });
}

const loginController = (req, res, next) => {
    let email = req.body.email;
    let password = req.body.password;

    User.findOne({email: email})
        .then(user => {
            

            if(user) {
                bcrypt.compare(password, user.password, (err, result) => {
                    if(err) {
                        res.json({
                            Message: "Error Ocurred!"
                        })
                    } 

                    if(result) {
                        let token = jwt.sign({email: user.email, id: user._id}, 'Adhara', {expiresIn: '6h'});
                        res.json({
                            Message: "Login Successful!",
                            token
                        })
                    } else {
                        res.json({
                            Message: "Login Failed!, Password Doesn\'t Match!"
                        })
                    }
                })
            } else {
                res.json({
                    Message: "User Not Found!"
                })
            }
        })
}


module.exports = {
    getAllUsersController,
    registerController,
    loginController,
};