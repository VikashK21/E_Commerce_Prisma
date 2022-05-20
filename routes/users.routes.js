const app = require('express').Router();
const joi = require('joi');
const UsersCtrl = require('../controller/user.controller');
const Users = new UsersCtrl();
const {authenticationToken, authorizationToken, forLogout} = require('../auth/security.auth');

app.get("/", async(req, res) => {
    try {
        const data = await Users.all_users();
        res.json({
            Total_users: data.length,
            Users: data
        })
    } catch (err) {
        res.send(err.message)
        console.log(err.message);
    }
});

app.post('/signup', forLogout, async(req, res) => {
    const schemaValidate = joi.object({
        name: joi.string().max(30).required(),
        email: joi.string().email().max(50).required(),
        password: joi.string().min(8).max(16).required(),
        phone_number: joi.string().min(10).max(20).required(),
        gst_number: joi.string().min(10).max(16).required()
    })
    const schemaValidated = schemaValidate.validate(req.body);
    if (schemaValidated.error) {
        return res.status(415).json(schemaValidated.error.details)
    }
    try {
        const result = await Users.new_user(req.body);
        res.json(result);   
    } catch (err) {
        console.log(err.message);
        res.status(400).send(err.message);
        
    }
});

app.post('/login', forLogout, async(req, res) => {
    const schemaValidate = joi.object({
        email: joi.string().email().max(50),
        phone_number: joi.string().min(10).max(20),
        password: joi.string().max(16).required()
    })
    const schemaValidated = schemaValidate.validate(req.body);
    if (schemaValidated.error) {
        return res.status(415).json(schemaValidated.error.details);
    }
    try {
        const result = await Users.find_user(req.body);
        if (typeof(result)=='object') {
            const token = await authenticationToken(result);
            return res.cookie('token', token).json(result);
        }
        res.send(result)
    } catch (err) {
        res.status(400).send(err.message);
        
    }
});

app.patch('/update_acc', authorizationToken, async(req, res) => {
    const schemaValidate = joi.object({
        name: joi.string().max(30),
        email: joi.string().email().max(50),
        password: joi.string().min(8).max(16),
        phone_number: joi.string().min(10).max(20),
        gst_number: joi.string().min(10).max(16)
    })
    const schemaValidated = schemaValidate.validate(req.body);
    if (schemaValidated.error) {
        return res.status(415).json(schemaValidated.error.details)
    }
    try {
        const result = await Users.update_user({id: req.user_id}, req.body);
        res.json(result);
    } catch (err) {
        res.status(400).send(err.message)
    }
})

app.delete('/delete_acc', authorizationToken, async(req, res) => {
    try {
        const result = await Users.delete_user(req.user_id)
        res.clearCookie('token').json(result);
    } catch (err) {
        res.status(400).send(err.message);
        
    }
})

app.post('/logout', authorizationToken, (req, res) => {
    res.clearCookie('token').send('You are logged out now.')
})

app.patch('/forget_password', async(req, res) => {
    const schemaValidate = joi.object({
        email: joi.string().email().max(50).required(),
        phone_number: joi.string().min(10).max(20).required(),
        password: joi.string().max(16).required()
    })
    const schemaValidated = schemaValidate.validate(req.body);
    if (schemaValidated.error) {
        return res.status(415).json(schemaValidated.error.details);
    }
    try {
        const result = await Users.update_user({phone_number: req.body.phone_number, email: req.body.email}, req.body)
        res.status(202).json(result);
    } catch (err) {
        res.status(400).send(err.message);        
    }
})

module.exports = app;
