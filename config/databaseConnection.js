const mongoose = require('mongoose');

const connectDatabase = () => {
    mongoose.connect(
        process.env.MONGO_URI,{ 
            useNewUrlParser: true,
            useUnifiedTopology: true
        }
    ).then(con => {
        console.log(`MongoDB connected to host: ${con.connection.host}`)
    }).catch(err => {
        console.log(err);
    });
}

module.exports = connectDatabase;
