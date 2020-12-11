const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const jwt = require('jsonwebtoken');

const UserSchema = new Schema({
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
});

UserSchema.methods.generateJWT = function(){
    let expiry = new Date();
    expiry.setDate(expiry.getDate()+1);
    console.log(this._id)

    return jwt.sign({
        _id: this._id,
        username: this.username,
        exp: parseInt(expiry.getTime()/1000),
        }, process.env.JWT_SECRET);
};

mongoose.model('User', UserSchema);