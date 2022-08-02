const express = require('express');
const mongoose = require('mongoose');
const config = require('./config/dev');
const app = express();
const PORT = process.env.PORT || 3001;
const FakeDb = require('./fake-db');
const productRoutes = require('./routes/products');

mongoose.connect(config.DB_URI).then(
    () => {
        const fakeDb = new FakeDb();
        fakeDb.initDb();
    }
);

app.use('/api/v1/products', productRoutes);

app.listen(PORT, function() {
    console.log('I am runnning');
});
