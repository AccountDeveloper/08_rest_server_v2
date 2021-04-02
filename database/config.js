const mongoose = require('mongoose');

const dbConnection = async() => {
    try {
        const cnn_string = process.env.MONGODB_CNN;
        await mongoose.connect(cnn_string, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true,
            useFindAndModify: false
        });
        console.log('bd arriba config.js');
    } catch (error) {
        console.log(error);
        throw new Error('error en bd');
    }
};

module.exports = {
    dbConnection
};