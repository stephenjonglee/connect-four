import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

function Square(props) {
  const className = 'square' + (props.highlight ? ' highlight' : '');
  return (
    <button
      className={className}
      data-pro={props.value}
      onClick={props.onClick}>
    </button>
  );
}

class Board extends React.Component {
  renderSquare(i) {
    const winLine = this.props.winLine;
    return (
      <Square
        key={i}
        value={this.props.squares[i]}
        onClick={() => {this.props.onClick(i)}}
        highlight={winLine && winLine.includes(i)}
      />
    );
  }

  render() {
    // Use two loops to make the squares
    const num_col = 7;
    const num_row = 6;
    let squares = [];
    for (let i = 0; i < num_row; i++) {
      let row = [];
      for (let j = 0; j < num_col; j++) {
        row.push(this.renderSquare(i * num_col + j));
      }
      squares.push(<div key={i} className="board-row">{row}</div>);
    }

    return (
      <div>{squares}</div>
    );
  }
}

class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      history: [
        {
          squares: Array(42).fill(null)
        }
      ],
      stepNumber: 0,
      xIsNext: true,
      isAscending: true
    };
  }

  handleClick(i) {
    const history = this.state.history.slice(0, this.state.stepNumber + 1);
    const current = history[history.length - 1];
    const squares = current.squares.slice();

    // column index
    const col = i % 7;
    // bottom square of the column
    var bottom = 0;

    // do nothing if winner is found
    if (calculateWinner(squares).winner || squares[i]) {
      return;
    }

    // first column
    if (col == 0) {
      bottom = 35;
      for (var index = bottom; index >= 0; index = index - 7) {
        if (squares[index] !== "Red" && squares[index] !== "Blue") {
          bottom = index;
          squares[bottom] = this.state.xIsNext ? "Red" : "Blue";
          index = -1;
        }
      }
    }
    // second column
    else if (col == 1) {
      bottom = 36;
      for (var index = bottom; index >= 0; index = index - 7) {
        if (squares[index] !== "Red" && squares[index] !== "Blue") {
          bottom = index;
          squares[bottom] = this.state.xIsNext ? "Red" : "Blue";
          bottom = index;
          index = -1;
        }
      }
    }
    // third column
    else if (col == 2) {
      bottom = 37;
      for (var index = bottom; index >= 0; index = index - 7) {
        if (squares[index] !== "Red" && squares[index] !== "Blue") {
          bottom = index;
          squares[bottom] = this.state.xIsNext ? "Red" : "Blue";
          bottom = index;
          index = -1;
        }
      }
    }
    // fourth column
    else if (col == 3) {
      bottom = 38;
      for (var index = bottom; index >= 0; index = index - 7) {
        if (squares[index] !== "Red" && squares[index] !== "Blue") {
          bottom = index;
          squares[bottom] = this.state.xIsNext ? "Red" : "Blue";
          bottom = index;
          index = -1;
        }
      }
    }
    // fifth column
    else if (col == 4) {
      bottom = 39;
      for (var index = bottom; index >= 0; index = index - 7) {
        if (squares[index] !== "Red" && squares[index] !== "Blue") {
          bottom = index;
          squares[bottom] = this.state.xIsNext ? "Red" : "Blue";
          bottom = index;
          index = -1;
        }
      }
    }
    // sixth column
    else if (col == 5) {
      bottom = 40;
      for (index = bottom; index >= 0; index = index - 7) {
        if (squares[index] !== "Red" && squares[index] !== "Blue") {
          bottom = index;
          squares[index] = this.state.xIsNext ? "Red" : "Blue";
          index = -1;
        }
      }
    }
    // seventh column
    else {
      bottom = 41;
      for (index = bottom; index >= 0; index = index - 7) {
        if (squares[index] !== "Red" && squares[index] !== "Blue") {
          squares[index] = this.state.xIsNext ? "Red" : "Blue";
          index = -1;
        }
      }
    }
    this.setState({
      history: history.concat([
        {
          squares: squares,
          // Store the index of the latest moved square
          latestMoveSquare: bottom
        }
      ]),
      stepNumber: history.length,
      xIsNext: !this.state.xIsNext
    });
  }

  jumpTo(step) {
    this.setState({
      stepNumber: step,
      xIsNext: (step % 2) === 0
    });
  }

  handleSortToggle() {
    this.setState({
      isAscending: !this.state.isAscending
    });
  }

  render() {
    const history = this.state.history;
    const stepNumber = this.state.stepNumber;
    const current = history[stepNumber];
    const winInfo = calculateWinner(current.squares);
    const winner = winInfo.winner;

    let moves = history.map((step, move) => {
      const latestMoveSquare = step.latestMoveSquare;
      const col = 1 + latestMoveSquare % 7;
      const row = 1 + Math.floor(latestMoveSquare / 6);
      const desc = move ?
        `Go to move #${move} (${col}, ${row})` :
        'Go to game start';
      return (
        <li key={move}>
          { /* Bold the currently selected item */ }
          <button
            className={move === stepNumber ? 'move-list-item-selected' : ''}
            onClick={() => this.jumpTo(move)}>{desc}
          </button>
        </li>
      );
    });

    let status;
    if (winner) {
      status = "Winner: " + winner;
    } else {
      if (winInfo.isDraw) {
        status = "Draw";
      } else {
        status = "Next player: " + (this.state.xIsNext ? "Red" : "Blue");
      }
    }

    const isAscending = this.state.isAscending;
    if (!isAscending) {
      moves.reverse();
    }

    return (
      <div className="game">
        <div className="game-board">
          <Board
            squares={current.squares}
            onClick={i => this.handleClick(i)}
            winLine={winInfo.line}
          />
        </div>
        <div className="game-info">
          <div>{status}</div>
          <button onClick={() => this.handleSortToggle()}>
            {isAscending ? 'descending' : 'ascending'}
          </button>
          <ol>{moves}</ol>
        </div>
      </div>
    );
  }
}

// ========================================

ReactDOM.render(<Game />, document.getElementById("root"));

function calculateWinner(squares) {
  const lines = [
    // 4 in a row horizontally
    [0, 1, 2, 3], [1, 2, 3, 4], [2, 3, 4, 5], [3, 4, 5, 6],
    [7, 8, 9, 10], [8, 9, 10, 11], [9, 10, 11, 12], [10, 11, 12, 13],
    [14, 15, 16, 17], [15, 16, 17, 18], [16, 17, 18, 19], [17, 18, 19, 20],
    [21, 22, 23, 24], [22, 23, 24, 25], [23, 24, 25, 26], [24, 25, 26, 27],
    [28, 29, 30, 31], [29, 30, 31, 32], [30, 31, 32, 33], [31, 32, 33, 34],
    [35, 36, 37, 38], [36, 37, 38, 39], [37, 38, 39, 40], [38, 39, 40, 41],

    // 4 in a row vertically
    [0, 7, 14, 21], [7, 14, 21, 28], [14, 21, 28, 35], 
    [1, 8, 15, 22], [8, 15, 22, 29], [15, 22, 29, 36], 
    [2, 9, 16, 23], [9, 16, 23, 30], [16, 23, 30, 37], 
    [3, 10, 17, 24], [10, 17, 24, 31], [17, 24, 31, 38], 
    [4, 11, 18, 25], [11, 18, 25, 32], [18, 25, 32, 39], 
    [5, 12, 19, 26], [12, 19, 26, 33], [19, 26, 33, 40],
    [6, 13, 20, 27], [13, 20, 27, 34], [20, 27, 34, 41],

    // 4 in a row diagonally top left to bottom right
    [0, 8, 16, 24], [1, 9, 17, 25], [2, 10, 18, 26], [3, 11, 19, 27], 
    [7, 15, 23, 31], [8, 16, 24, 32], [9, 17, 25, 33], [10, 18, 26, 34], 
    [14, 22, 30, 38], [15, 23, 31, 39], [16, 24, 32, 40], [17, 25, 33, 41],

    // 4 in a row diagonally bottom left to top right
    [3, 9, 15, 21], [4, 10, 16, 22], [5, 11, 17, 23], [6, 12, 18, 24],
    [10, 16, 22, 28], [11, 17, 23, 29], [12, 18, 24, 30], [13, 19, 25, 31],
    [17, 23, 29, 35], [18, 24, 30, 36], [19, 25, 31, 37], [20, 26, 32, 38]
  ]

  for (let i = 0; i < lines.length; i++) {
    const [a, b, c, d] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c] && squares[a] === squares[d]) {
      return {
        winner: squares[a],
        line: lines[i],
        isDraw: false,
      };
    }
  }

  let isDraw = true;
  for (let i = 0; i < squares.length; i++) {
    if (squares[i] === null) {
      isDraw = false;
      break;
    }
  }
  return {
    winner: null,
    line: null,
    isDraw: isDraw,
  };
}