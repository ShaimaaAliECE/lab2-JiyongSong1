import './App.css';
import React from 'react';

export default class App extends React.Component{
  state = {
    rows: 6,
    columns: 7,
    moves: [],
    currentPlayer: 'red',
  };

  //reset function
  reset = () => {
    this.setState({moves: [], winner: null });
  }

  //check for win
  checkWin = (x, y, player) => {
    let xScore = 1;
    let yScore = 1;

    //right horizontal win
    for (let column = x + 1; column < x + 4; column++){
      const check = this.getPiece (column, y);
      if (check && check.player === player){
        xScore++;
      }
      else {
        break;
      }
    }
    //left horizontal win
    for (let column = x - 1; column > x - 4; column--){
      const check = this.getPiece (column, y);
      if (check && check.player === player){
        xScore++;
      }
      else {
        break;
      }
    }
    //win if there are 4 pieces in a row
    if (xScore >= 4){
      this.setState ({winner: player});
      return true;
    }

    //upside vertical win
    for (let row = y + 1; row < y + 4; row++){
      const check = this.getPiece (x, row);
      if (check && check.player === player){
        yScore++;
      }
      else {
        break;
      }
    }
    //downward vertical win
    for (let row = y - 1; row > y - 4; row--){
      const check = this.getPiece (x, row);
      if (check && check.player === player){
        yScore++;
      }
      else {
        break;
      }
    }
    //win if there are 4 pieces in a row
    if (yScore >= 4){
      this.setState ({winner: player});
      return true;
    }
  }

  //function to get the piece
  getPiece = (x, y) => {
    const list = this.state.moves.filter ((item) => {
      return (item.x === x && item.y === y);
    });
    return list[0];
  }

  //function to place the piece
  makeMove = (x, y) => {
    const { currentPlayer } = this.state;
    //next player is yellow if current player is red, otherwise next player is red by default
    const nextPlayer = currentPlayer === 'red' ? 'yellow' : 'red';
    //must check for a win at each move
    this.setState({moves: this.state.moves.concat({x, y, player: currentPlayer }), currentPlayer: nextPlayer}, () => this.checkWin(x, y, currentPlayer));
  }

  //the board
  renderBoard(){
    const { rows, columns, winner } = this.state;
    const rowView = [];

    //create the columns and rows
    for (let row = 0; row < this.state.rows; row++){
      const columnView = [];

      for (let column = 0; column < this.state.columns; column++){
        const piece = this.getPiece(column, row);

        //displays the pieces when user clicks on them
        columnView.push(
          <div onClick={() => {this.makeMove(column,row)}} style={{width: '6vw', height: '6vw', backgroundColor: '#87ceeb', display: 'flex', padding: 3}}>
            <div style={{borderRadius: '50%', backgroundColor: 'white', flex: 1, display: 'flex'}}>
              {piece ? <div style = {{backgroundColor: piece.player, flex: 1, borderRadius: '50%'}}/> : undefined}
            </div>
          </div>
        );
      }
      rowView.push(
        <div style = {{display: 'flex', flexDirection: 'row' }}>{columnView}</div>
      );
    }

    return(
      //displays the winner
      <div style={{backgroundColor: 'red', display: 'flex', flexDirection: 'column' }}>        
        {winner && <div onClick = {this.reset} style={{position: 'absolute', left: 0, right: 0, bottom: 0, top: 0, zIndex: 3, backgroundColor: 'rgba(0, 150, 0, .3)', display: 'flex', justifyContent: 'center', alignItems: 'center', color: 'black', fontSize: '5vw'}}>{winner} WINS</div>}
        {rowView}
      </div>
    );
  }

  props: { style: any; };
  render() {
    const { style } = this.props;

    return (
      <div style={style ? Object.assign({}, styles.container, style) : styles.container}>
        <div>
          {this.renderBoard()}
        </div>        
      </div>
    );
  }
}

const styles = {
  container: {
    height: '100%',
    padding: 5,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  }
};