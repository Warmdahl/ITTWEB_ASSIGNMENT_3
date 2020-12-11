
import 'bootstrap/dist/css/bootstrap.min.css';
import {Button, Col, Container, Row} from 'reactstrap';
import * as React from 'react';
import logo from './logo.svg';
import './CSS/App.css';
import Game from './Components/Game';
import GetId from './Login/GetId';

export default class App extends React.Component {
  
  constructor(props) {
    super(props);

    this.state = {
      gameRunning: false,
      gridSize: 3,
      score: 0,
      dataFromServer: [],
    };
    

    this.setGridSize = this.setGridSize.bind(this);
    this.onPlay = this.onPlay.bind(this);
    this.onPause = this.onPause.bind(this);
    this.onScoreChange = this.onScoreChange.bind(this);
  }

  
  ws = new WebSocket('ws://localhost:8080');

  componentDidMount() {
    this.ws.onopen = () => {
    // on connecting, do nothing but log it to the console
    console.log('connected')
    }

    this.ws.onmessage = evt => {
    // listen to data sent from the websocket server
    const message = JSON.parse(evt.data)  //message is undefined (uncaught syntaxError: Unexpected token : in JSON at position 2)
    this.setState(this.state.dataFromServer = message)
    console.log(message)
    }

    this.ws.onclose = () => {
    console.log('disconnected')
    // automatically try to reconnect on connection loss

    }
  } 

  render() {
    const rows = this.state.gridSize;
    const columns = this.state.gridSize;
    const gameRunning = this.state.gameRunning;
    const dataFromServer = this.state.dataFromServer;
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to Dual N Back</h1>
        </header>
        <Container>
          <Row>
            <Col xs="3">
              <input type="range" min="3" max="5" className="slider" value={this.state.gridSize} onInput={this.setGridSize} onChange={this.setGridSize} />
                <p>Highscore</p>
                {dataFromServer.map(dataFromServer =>
                <ol> 
                  <p>{dataFromServer.score}</p>
                </ol>  )}
              
            </Col>
            <Col xs="6">
              <Game rows={rows} columns={columns} running={gameRunning} onScoreChange={this.onScoreChange}/>
            </Col>
            <Col xs="3">
              <Row>
                <Col xs="12">
                  <Button color="primary" className={this.state.gameRunning ? 'hidden' : ''} onClick={this.onPlay}>Play</Button>
                  <Button color="primary" className={!this.state.gameRunning ? 'hidden' : ''} onClick={this.onPause}>Stop</Button>
                </Col>
              </Row>
              <Row>
                <p>{this.state.score}</p>
              </Row>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }

  setGridSize(input) {
    this.setState({gridSize: input.target.value});
  }

  onPlay(input) {
    this.setState({gameRunning: true});
  }

  onPause(input) {
    this.setState({gameRunning: false});
    var highscore = {
      score: this.state.score,
      date: new Date(),
      userid: GetId()
    }
    //console.log(temp);
    this.ws.send(JSON.stringify(highscore));
  }

  onScoreChange(prevScore, nextScore) {
    this.setState({score: nextScore});
  }

}
