import React from "react";
import Square from "./square.jsx";
import Score from "./gamescore.jsx";
import Button from "@material-ui/core/Button";
import "../App.css";
import { lighten, makeStyles, withStyles } from "@material-ui/core/styles";
import LinearProgress from "@material-ui/core/LinearProgress";

const START_ROW = 3;
const START_COLUMN = 3;
const ROWS = 15;
const COLUMNS = 15;

const eventCodes = {
  LEFT: 37,
  UP: 38,
  RIGHT: 39,
  DOWN: 40
};

const DIRECTION = {
  LEFT: 1,
  UP: 2,
  RIGHT: 3,
  DOWN: 4
};

// Handle Direction in better way
// Each square should have id.

export default class Grid extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      grid: [],
      isMousePressed: false,
      activeSquare: {
        row: START_ROW,
        col: START_COLUMN
      },
      visitedSquares: [],
      previousDirection: null
    };
  }

  componentDidMount() {
    const grid = initGrid();
    this.setState({ grid });
    document.addEventListener("keydown", this.handlekeypress);
    let row = START_ROW;
    let col = START_COLUMN;
    this.setState(prevState => ({
      visitedSquares: [...prevState.visitedSquares, { row, col }]
    }));
  }

  handleMouseDown(row, col, grid) {
    console.log("r:", row, "c:", col);
    this.setState({ isMousePressed: true });
    this.setState({
      activeSquare: {
        row: row,
        col: col
      }
    });
  }
  updateActiveSquareState = (row, col) => {
    this.setState({
      activeSquare: {
        row: row,
        col: col
      }
    });
  };

  handlekeypress = event => {
    let grid = this.state.grid;
    let row = this.state.activeSquare.row;
    let col = this.state.activeSquare.col;
    let squareNum = grid[row][col].num;

    let startSquare = {
      row: row,
      col: col
    };

    let gameOver = this.gameOver(squareNum, this.state.previousDirection);

    // TAKE KEY INPUT pass it as parameter.
    if (!gameOver) {
      if (event.keyCode === eventCodes.LEFT) {
        // KEYINPUT LEFT
        if (this.preventOppositeDirection(DIRECTION.LEFT)) {
          let wallAhead = this.checkIncomingWall(DIRECTION.LEFT, squareNum);

          // handle border and walls
          if (col >= squareNum && !wallAhead) {
            this.setState({
              previousDirection: DIRECTION.LEFT
            });
            this.setState({
              activeSquare: {
                row: row,
                col: col - squareNum
              }
            });
            this.setEmptySquares(grid, startSquare, squareNum, 1);
          }
        }
      }
      // KEYINPUT UP
      if (event.keyCode === eventCodes.UP) {
        if (this.preventOppositeDirection(DIRECTION.UP)) {
          let wallAhead = this.checkIncomingWall(DIRECTION.UP, squareNum);

          // handle border and walls
          if (row >= squareNum && !wallAhead) {
            this.setState({
              previousDirection: DIRECTION.UP
            });
            this.setState({
              activeSquare: {
                row: this.state.activeSquare.row - squareNum,
                col: this.state.activeSquare.col
              }
            });
            this.setEmptySquares(grid, startSquare, squareNum, 2);
          }
        }
      }
      // KEYINPUT RIGHT
      if (event.keyCode === eventCodes.RIGHT) {
        if (this.preventOppositeDirection(DIRECTION.RIGHT)) {
          let wallAhead = this.checkIncomingWall(DIRECTION.RIGHT, squareNum);

          // handle border and walls
          if (COLUMNS - col > squareNum && !wallAhead) {
            this.setState({
              previousDirection: DIRECTION.RIGHT
            });
            this.setState({
              activeSquare: {
                row: this.state.activeSquare.row,
                col: this.state.activeSquare.col + squareNum
              }
            });
            this.setEmptySquares(grid, startSquare, squareNum, 3);
          }
        }
      }
      // KEYINPUT DOWN
      if (event.keyCode === eventCodes.DOWN) {
        if (this.preventOppositeDirection(DIRECTION.DOWN)) {
          let wallAhead = this.checkIncomingWall(DIRECTION.DOWN, squareNum);

          // handle border and walls
          if (ROWS - row > squareNum && !wallAhead) {
            this.setState({
              previousDirection: DIRECTION.DOWN
            });
            this.setState({
              activeSquare: {
                row: this.state.activeSquare.row + squareNum,
                col: this.state.activeSquare.col
              }
            });
            this.setEmptySquares(grid, startSquare, squareNum, 4);
          }
        }
      }
    }
  };

  setEmptySquares = (grid, startSquare, squareNum, direction) => {
    let oldrow = startSquare.row;
    let oldcol = startSquare.col;

    // 1 = left, 2 = up, 3 = right, 4 = down
    for (let i = 1; i <= squareNum; i++) {
      if (direction === 1) {
        let col = oldcol - i;
        let row = oldrow;
        this.setState(prevState => ({
          visitedSquares: [...prevState.visitedSquares, { row, col }]
        }));
      }
      if (direction === 2) {
        let col = oldcol;
        let row = oldrow - i;
        this.setState(prevState => ({
          visitedSquares: [...prevState.visitedSquares, { row, col }]
        }));
      }
      if (direction === 3) {
        let col = oldcol + i;
        let row = oldrow;
        this.setState(prevState => ({
          visitedSquares: [...prevState.visitedSquares, { row, col }]
        }));
      }
      if (direction === 4) {
        let col = oldcol;
        let row = oldrow + i;
        this.setState(prevState => ({
          visitedSquares: [...prevState.visitedSquares, { row, col }]
        }));
      }
    }
  };

  preventOppositeDirection = direction => {
    // 1 = left, 2 = up, 3 = right, 4 = down
    const previousDirection = this.state.previousDirection;
    let allow =
      direction + 2 === previousDirection || direction - 2 === previousDirection
        ? false
        : true;
    return allow;
  };

  // TODO TempCol can now go to negative
  checkIncomingWall = (direction, squareNum) => {
    let visitedSquares = this.state.visitedSquares;
    let isThereWall = false;
    let tempRow = this.state.activeSquare.row;
    let tempCol = this.state.activeSquare.col;

    // check that tempValue is not border
    for (let i = 0; i < squareNum; ++i) {
      if (direction === DIRECTION.LEFT) {
        tempCol = tempCol - 1;
      }
      if (direction === DIRECTION.UP) {
        tempRow = tempRow - 1;
      }
      if (direction === DIRECTION.RIGHT) {
        tempCol = tempCol + 1;
      }
      if (direction === DIRECTION.DOWN) {
        tempRow = tempRow + 1;
      }
      // eslint-disable-next-line no-loop-func
      visitedSquares.forEach(element => {
        if (tempRow === element.row && tempCol === element.col) {
          isThereWall = true;
          return;
        }
      });
    }

    return isThereWall;
  };

  checkBorder = (direction, squareNum) => {
    let row = this.state.activeSquare.row;
    let col = this.state.activeSquare.col;

    if (direction === DIRECTION.LEFT) {
      if (col < squareNum) {
        return true;
      }
    }
    if (direction === DIRECTION.UP) {
      if (row < squareNum) {
        return true;
      }
    }
    if (direction === DIRECTION.RIGHT) {
      if (COLUMNS - col <= squareNum) {
        return true;
      }
    }
    if (direction === DIRECTION.DOWN) {
      if (ROWS - row <= squareNum) {
        return true;
      }
    }

    return false;
  };

  // TODO: checkBorders in func
  gameOver = (squareNum, previousDirection) => {
    let goLeft =
      this.checkIncomingWall(1, squareNum) || this.checkBorder(1, squareNum)
        ? true
        : false;
    let goUp =
      this.checkIncomingWall(2, squareNum) || this.checkBorder(2, squareNum)
        ? true
        : false;
    let goRight =
      this.checkIncomingWall(3, squareNum) || this.checkBorder(3, squareNum)
        ? true
        : false;
    let goDown =
      this.checkIncomingWall(4, squareNum) || this.checkBorder(4, squareNum)
        ? true
        : false;
    if (goLeft && goUp && goRight && goDown) {
      alert("gameover");
      return true;
    }

    return false;
  };

  render() {
    const { grid, isMousePressed, activeSquare, visitedSquares } = this.state;
    return (
      <React.Fragment>
        <Button
          onClick={() => window.location.reload()}
          variant="contained"
          color="primary"
        >
          Refresh the grid!
        </Button>
        <Score visitedSquares={visitedSquares}></Score>
        <div className="grid-base">
          {grid.map((row, column) => {
            return (
              <div key={column} className="grid-row">
                {row.map((square, index) => {
                  const { row, column, startSquare, num } = square;
                  return (
                    <Square
                      key={index}
                      isMousePressed={isMousePressed}
                      row={row}
                      column={column}
                      num={num}
                      activeSquare={activeSquare}
                      visitedSquares={visitedSquares}
                      startSquare={startSquare}
                      onMouseDown={(row, column) =>
                        this.handleMouseDown(row, column, grid)
                      }
                    ></Square>
                  );
                })}
              </div>
            );
          })}
        </div>
      </React.Fragment>
    );
  }
}

const initGrid = () => {
  const grid = [];
  for (let row = 0; row < 15; row++) {
    const currentRow = [];
    for (let column = 0; column < 15; column++) {
      currentRow.push(createSquare(row, column));
    }
    grid.push(currentRow);
  }
  return grid;
};

const createSquare = (row, column) => {
  let num = Math.floor(Math.random() * 4) + 1;
  return {
    row,
    column,
    num,
    startSquare: row === START_ROW && column === START_COLUMN,
    visitedSquare: false,
    activeSquare: row === START_ROW && column === START_COLUMN
  };
};
