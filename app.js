const express=require('express');
const bodyParser=require('body-parser');
const mongoose=require('mongoose');

const orderRoutes = require('./routes/order-routes');
const itemRoutes = require('./routes/item-routes');

const app = express();

app.use(bodyParser.json());

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader(
        'Access-Control-Allow-Headers',
        'Origin, X-Requested-With, Content-Type, Accept, Authorization'
    );
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    next();
});

app.use('/api/orders', orderRoutes);
app.use('/api/items', itemRoutes);

mongoose.connect(`mongodb://localhost/foodsapiens`)
    .then(() => {
        console.log('Connected to MongoDB...');
        app.listen(5000);
    })
    .catch(err => console.error('Could not connect to MongoDb ...', err));