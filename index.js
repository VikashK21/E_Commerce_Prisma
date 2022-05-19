const express = require('express');
const main = express();

const port = process.env.PORT || 8000;

main.use(express.json())
main.use('/api/user', require('./routes/users.routes'));
main.use('/api/product', require('./routes/products.routes'));

main.get('/', (req, res) => {
    res.send('You are standing at home page.')
})


main.listen(port, () => {
    console.log(`Listening to the port num ${port}\n`, {
        users: `http://localhost:${port}/api/user/`,
        products: `http://localhost:${port}/api/product/`
    });
})