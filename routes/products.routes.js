const app = require('express').Router();
const joi = require('joi');
const { authorizationToken } = require('../auth/security.auth');
const ProductCtrl = require('../controller/product.controller');
const Products = new ProductCtrl;


app.get('/', async(req, res) => {
    try {
        const data = await Products.all_products();
        res.json({
            Total_Products: data.length,
            Data: data
        });
    } catch (err) {
        res.status(400).send(err.message);
        
    }
})


app.post('/add_product', authorizationToken, async(req, res) => {
    const schemaValidate = joi.object({
        name: joi.string().max(30).required(),
        price: joi.number().required(),
        description: joi.string().max(225).required(),
        images: joi.array(),
        in_stock: joi.bool(),
        is_discounted: joi.bool(),
        discount_price: joi.number(),
        seller_id: joi.number().required()
    })
    const schemaValidated = schemaValidate.validate(req.body);
    if (schemaValidated.error) {
        return res.status(415).json(schemaValidated.error.details);
    }
    try {
        const data = await Products.add_product(req.body);
        res.json(data)
    } catch (err) {
        res.status(400).send(err.message);
        
    }
})

app.patch('/update_product/:id', authorizationToken, async(req, res) => {
    const schemaValidate = joi.object({
        name: joi.string().max(30),
        price: joi.number(),
        description: joi.string().max(225),
        images: joi.array(),
        in_stock: joi.bool(),
        is_discounted: joi.bool(),
        discount_price: joi.number()
    })
    const schemaValidated = schemaValidate.validate(req.body);
    if (schemaValidated.error) {
        return res.status(415).json(schemaValidated.error.details);
    }
    try {
        const data = await Products.update_product(Number(req.params.id), req.body)
        res.json(data)
    } catch (err) {
        res.status(400).send(err.message);
        
    }
})

app.delete('/delete_product/:id', authorizationToken, async(req, res) => {
    try {
        const data = await Products.delete_product(Number(req.params.id))
        res.json(data)
    } catch (err) {
        res.status(400).send(err.message);
    }
})



module.exports = app;
