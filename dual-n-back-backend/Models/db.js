const mongoose = require('mongoose');
var dbURI = "mongodb+srv://admin:Opstart1234@assignment3.ybd2m.mongodb.net/ITTWEBASSIGNMENT3?retryWrites=true&w=majority";

mongoose.connect(dbURI, {useNewUrlParser: true, useUnifiedTopology: true});

mongoose.connection.on('connect', () => {
    console.log('Mongoose connected to '+dbURI);
});

mongoose.connection.on('error', err => {
    console.log('Mongoose connection error '+err);
});

mongoose.connection.on('Disconnected', () => {
    console.log('Disconected');
});

const gracefulShutdown = (msg, callback) =>{
    mongoose.connection.close(() => {
        console.log("Mongoose disconnected through" + msg);
        callback();
    });
};
//nodemon restarts
process.once("SIGUSR2", () =>{
    gracefulShutdown("Nodemon restart", () =>{
        process.kill(process.pid, "SIGUSR2");
    });
});

process.on('SIGTERM', () => {
    gracefulShutdown('Heroku app shutdown', () => {
        process.exit(0);
    });
});

require('./User.js');
require('./HighScore.js');