var mongoose = require('mongoose');
const UserList = mongoose.model('User');
const bcrypt = require('bcrypt');


//Add a user
module.exports.adduser = async function(req, res){
    const uname = req.body.username;
    const user = await UserList.findOne({username: uname}).catch(reason => res.json({'Error':'Error: ' + reason}));
    if(user){
        res.status(403).json({'message': 'User with username: ' + uname + ' already exist'});
    } else if(!user){
        var saltrounds = 10;
        bcrypt.hash(req.body.password, saltrounds).then(async function(hash){
            var user = await UserList.create({username: uname, password: hash}).catch(reason => res.json({'Error': 'Error: ' + reason}));
            if(user){
                token = user.generateJWT();
                res.json(token);
            }
        });
    }
};

//Get all users
module.exports.GetAllUsers = async function(req, res){
    const users = await UserList.find({}).catch(reason => res.json({'Error': 'Error: ' + reason}));
    if(users){
        res.json({users});
    } else {
        res.json({'message': 'Could not find any users'});
    }
};

//Login
module.exports.Login = async function(req, res){
    const user = await UserList.findOne({'username': req.body.username}).catch(reason => res.json({'Error': 'Error: ' + reason}));
    if(user){
        bcrypt.compare(req.body.password, user.password).then(function(res2) {
            if(res2){
                token = user.generateJWT();
                res.json(token);
            } else {
                res.status(403).json({'message': 'Wrong password'});
            }
        })
    } else {
        res.status(403).json({'message': 'User does not exist'});
    }
};