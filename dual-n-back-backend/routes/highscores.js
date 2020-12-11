var express = require('express');
var router = express.Router();
var highscorecontroller = require('../Controllers/highscorecontroller');
var jwt = require('express-jwt');
var auth = jwt({
    secret: process.env.JWT_SECRET,
    userProperty: 'payload',
    algorithms: ['HS256']
});

router.post('/addhighscore', auth, highscorecontroller.AddHighScore);

router.get('/gethighscores', highscorecontroller.GetNHighest);

router.get('/getyourhighscores', auth, highscorecontroller.GetYourHighscores);

module.exports = router;