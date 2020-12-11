import * as React from 'react';
import { Button } from 'reactstrap';
import Board from './Board';
import Flash from './Flash';
import Grid from './Grid';

export default class Game extends React.Component {


    //gets state and return state
    /*static getDerivedStateFromProps(nextProps, prevState) {
        const nextState = {board: prevState.board};
       

        if (prevState.rows !== nextProps.rows || prevState.columns !== nextProps.columns) {
            prevState.board.stop();
            nextState.board = new Board(nextProps.rows, nextProps.columns)
            nextState.running = false;
        }

        if (nextProps.onScoreChange) {
            nextState.board.onScoreChange = nextProps.onScoreChange;
        }

        if (nextProps.running) {
            nextState.running = true;
        }
        prevState.rows = nextProps.rows;
        prevState.columns = nextProps.columns;
        return nextState;
    }*/

    constructor(props){
        super(props);

        this.state = {
            rows: this.props.rows,
            columns: this.props.columns,
            board: new Board(this.props.rows, this.props.columns),
            onScoreChange: (this.props.prevScore, this.props.nextScore),
            currentFlash: Flash,
            running: this.props.running,
        }

        this.tryPosition = this.tryPosition.bind(this);
        this.trySound = this.trySound.bind(this);
        this.onFlash = this.onFlash.bind(this);
        this.speak = this.speak.bind(this);
    }

   
    componentWillUnmount() {
        this.state.board.stop();
    }

    componentDidUpdate(prevProps, prevState, snapshot){
        if(!prevProps.running && this.props.running){
            this.state.board.setrowcol(this.props.rows, this.props.columns);
            this.state.board.start(this.onFlash);
            this.state.board.onScoreChange = this.props.onScoreChange;
        }

        if(prevProps.running && !this.props.running){
            this.state.board.stop();
        }
    }

    render() {
        //const props = {};
        let highlight = []
        const rows = this.props.rows;
        const columns = this.props.columns;
        if(this.state.currentFlash){
            highlight = this.state.currentFlash.position;            
        }
        return (
            <div>
                <Grid rows={rows} columns={columns} highlight = {highlight} />
                <Button color="secondary" disabled={!this.props.running} onClick={this.tryPosition}>Position Match</Button>
                <Button color="secondary" disabled={!this.props.running} onClick={this.trySound}>Sound Match</Button>
            </div>
        )
    }


    tryPosition() {
        //this.props.onScoreChange(this.prevScore, 100);
        this.state.board.samePosition();
    }

    trySound() {
        this.state.board.sameSound();
    }

    onFlash(newFlash) {
        this.setState(this.state.currentFlash = newFlash); 
        //this.state.currentFlash = newFlash;
        this.speak(newFlash.sound.toString());
    }

    speak(text) {
        if('speechSynthesis' in window) {
            const utterance = new SpeechSynthesisUtterance();
            utterance.text = text;
            utterance.voice = speechSynthesis.getVoices().filter((voice) => {return voice.name === "Allison"})[0];
            window.speechSynthesis.speak(utterance);
        }
    }

}