import React from 'react';
import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <div className="App">
      <Game />
    </div>
  );
}

function Square(props) {
  return (
    <button className="square" onClick={props.onClick}>
      {props.value}
    </button>
    );
}

class Board extends React.Component {
  renderSquare(i) {
    return (
      <Square
        value={this.props.caselle[i]}
        onClick={() => this.props.onClick(i)}
      />
    );
  }

  render() {
    return (
      <div>
        <div className="riga1">
          {this.renderSquare(0)}
          {this.renderSquare(1)}
          {this.renderSquare(2)}
        </div>
        <div className="riga1">
          {this.renderSquare(3)}
          {this.renderSquare(4)}
          {this.renderSquare(5)}
        </div>
        <div className="riga1">
          {this.renderSquare(6)}
          {this.renderSquare(7)}
          {this.renderSquare(8)}
        </div>
      </div>
    );
  }
}

class Game extends React.Component {
  constructor(props) {
    super(props);
    var xNext=null;
    const r=Math.random();
    //alert(r);
    if(r<0.5)
      xNext=true;
    else
      xNext=false;
    this.state = {
      history: [{
        caselle: Array(9).fill(null),     //è un array di stati
      }],
      xProssimo: xNext,
      stepN: 0
    }
  }
  render() {
    const history = this.state.history;
    const current = history[history.length-1];
    const winner = this.calcolaVincitore(current.caselle);

    const moves = history.map((step, move) => {
      const desc = move ?
        'Vai a mossa n°'+ move :
        'Vai a Inizio Gioco';
      return (
          <li key={move}>
            <button onClick={() => this.jumpTo(move)}>
              {desc}
            </button>
          </li>
      );
    });

    let status;
    if (winner)
      status= "Vincitore: "+ winner;
    else
      status="Prossimo giocatore"+(this.state.xProssimo ? 'X' : 'O');

    return (
      <div className="game">
        <div className="game-board">
          <Board
            caselle={current.caselle}
            onClick={(i) => this.handleClick(i)}
          />
        </div>
        <div className="game-info">
          <div>{status}</div>
          <ol>{/* // TODO: */}</ol>
        </div>
      </div>
    );
  }

  calcolaVincitore(squares){
    const lines =[
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    for(let i=0; i<lines.length; i++){
      const [a,b,c] = lines[i];
      if(squares[a] && squares[a]==squares[b] && squares[a]==squares[c])
        return squares[a];
    }
    return null;
  }

  handleClick(i){
    const history = this.state.history;
    const current = history[history.length-1];
    const squares = current.caselle.slice();
    if(this.calcolaVincitore(squares) || squares[i]){
      return;
    }
    squares[i] = this.state.xProssimo ? 'X' : 'O';
    this.setState({
      history: history.concat([{
        caselle: squares,
      }]),
      xProssimo: !this.state.xProssimo,
    });
  }

  jumpTo(step){
    this.setState({
      stepN: step,
      
    })
  }
}


export default App;
