var mongoose = require('mongoose')
const HighScoreList = mongoose.model('HighScore')
const UserList = mongoose.model('User')
const bcrypt = require('bcrypt');

//Add a highscore
module.exports.AddHighScore = async function(HighScore){
    const highscores = await HighScoreList.find({score: HighScore.score}).catch(reason => console.log({'Error': 'Error: ' + reason}));
    if(highscores){
        highscores.forEach(highscore => {
            if(highscore.userid==HighScore.userid){
                console.log({'message': 'highscore already added'})
            }
        });        
    }

    const highscore = await HighScoreList.create({score: HighScore.score, date: HighScore.date, userid: HighScore.userid}).catch(reason => console.log({'Error': 'Error: ' + reason}));
    if(highscore){
        return highscore;
        
    }
}

//get the n highest highscores
module.exports.GetNHighest = async function(){
    const highscores = await HighScoreList.find({}).limit(10).sort({ score : -1}).catch(reason => console.log({'Error': 'Error: ' + reason}));
    console.log(highscores)
    if(highscores){
        return highscores;
        //res.json(highscores);
    } else {
        res.json({'message':'No highscores found'});
    }
}

//Get all your highscores
module.exports.GetYourHighscores = async function (id){
    console.log(req.payload._id)
    const highscores = await HighScoreList.find({userid: req.payload._id}).catch(reason => console.log({'Error': 'Error: ' + reason}));
    if(highscores){
        return highscores;
        //res.json(highscores);
    } else {
        res.json({'message':'No highscores found'});
    }
}