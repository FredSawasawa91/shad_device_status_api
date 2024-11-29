require('dotenv').config();
const user = require('../model/user');
const md5 = require('md5');
const jwt = require('jsonwebtoken');

// Login route
exports.login = (req, res, next) => {
    const phone = req.body.phone;
    const pin = md5(req.body.pin);

    user.findOne({
        where: {
            phone: phone,
            pin: pin
          }
    }).then( user => {
        if (!user) {
            return res.status(401).json({ 
                success: 0, 
                message: 'Invalid phone or pin',
                token: 'null' 
            });
        }
        
        const access_token_secret_key = process.env.ACCESS_TOKEN_SECRET_KEY;

        // Generate a JWT token with id and phone included in the payload
        const token = jwt.sign({
            id: user.user_id, 
            phone: user.phone,
            role: user.role 
        }, access_token_secret_key);

        // User authenticated successfully
        return res.status(200).json({ 
            success: 1, 
            message: 'Login successful', 
            token: token 
        });

    }).catch(err => console.log(err));
}

// Register route
exports.register = (req, res, next) => {
    const name = req.body.name;
    const phone = req.body.phone;
    const pin = md5(req.body.pin);

    user.create({
        name: name,
        phone: phone,
        pin: pin
    })
    .then(user => {
        return res.status(201).json({ 
            success: 1, 
            message: 'User registered successfully',
            user: user 
        });
    })
    .catch(err => console.log(err));
}

// Add user

exports.addUser = (req, res, next) => {
    const name = req.body.name;
    const phone = req.body.phone;
    const pin = md5(req.body.pin);
    const role = req.body.role;

    user.create({
        name: name,
        phone: phone,
        pin: pin,
        role: role
    })
    .then(user => {
        return res.status(201).json({ 
            success: 1, 
            message: 'User added successfully',
            user: user 
        });
    })
    .catch(err => console.log(err));
}