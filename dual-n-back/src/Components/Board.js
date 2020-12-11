import * as _ from "lodash";
import Flash from "./Flash";
import React from 'react';

export default class Board extends React.Component{

   

    constructor(rows, columns, props) {
        super(props);
        this.state = { 
            history: [],
            score: 0, 
            timerToken: 0, 
            rows: rows,
            columns: columns,
            onFlash: Flash

        }
        this.onScoreChange = this.onScoreChange.bind.this;   
    }


    onScoreChange (prevScore, nextScore) {}

    //start the game
    start(onFlash) {
        //this.onFlash = onFlash;
        this.state.onFlash =  onFlash
        

        this.state.timerToken = setInterval(() =>{
            onFlash(this.next())}, 2500)
    }

    //stops the game
    stop() {
        clearInterval(this.state.timerToken);
        delete this.state.onFlash;
    }

    //see if one choose correct
    samePosition() {
        if (this.state.history.length > 1 && _.isEqual(this.state.history[this.state.history.length - 1].position,
             this.state.history[this.state.history.length - 2].position)) {
            this.updateScore(100);
        } else {
            this.updateScore(-50);
        }
    }

    //see if one choose correct
    sameSound() {
        if (this.state.history.length > 1 && _.isEqual(this.state.history[this.state.history.length - 1].sound,
             this.state.history[this.state.history.length - 2].sound)) {
            this.updateScore(100);
        } else {
            this.updateScore(-50);
        }
    }

    //choose the next position on the grid
    next() {
        const p = 15;
        const nextFlash = {};

        if (this.state.history.length > 0 && this.randomInRagne(1, 100) <= p) {
            nextFlash.position = this.state.history[this.state.history.length - 1].position;    
        } else {
            const randomRow = this.randomInRagne(0, this.state.rows - 1);
            const randomColumn = this.randomInRagne(0, this.state.columns - 1);
            nextFlash.position = [randomRow, randomColumn];
        }

        if (this.state.history.length > 0 && this.randomInRagne(1, 100) <= p) {
            nextFlash.sound = this.state.history[this.state.history.length - 1].sound;
        } else {
            const randomSound = this.randomInRagne(1, 9);
            nextFlash.sound = randomSound;
        }

        this.state.history.push(nextFlash);
        return nextFlash;
    }

    //updates the score
    updateScore(points) {
        const newScore = this.state.score + points;
        if (this.onScoreChange) {
            this.onScoreChange(this.state.score, newScore);
        }
        this.state.score = newScore;
    }

    //chooses a random number between min and max
    randomInRagne(min, max) {
        return Math.floor(Math.random() * (max - min + 1) + min);
    }

    //Update rows and collumns
    setrowcol(rs, cs){
        this.state.rows = rs;
        //this.setState({rows: rs, columns: cs});
        this.state.columns = cs;
    }
}
