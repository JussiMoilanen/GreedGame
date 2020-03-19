import React from "react";
import Square from "./square.jsx";

import "../App.css";

const START_ROW = 3;
const START_COLUMN = 3;

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
      message: ""
    };
  }

  componentDidMount() {
    const grid = initGrid();
    this.setState({ grid });
    document.addEventListener("keydown", this.handlekeypress);
  }

  handleMouseDown(row, col) {
    console.log("r:", row, "c:", col);
    this.setState({ isMousePressed: true });
  }

  handlekeypress = event => {
    if (event.keyCode === 37) {
      console.log("left");
      this.setState({
        activeSquare: {
          row: this.state.activeSquare.row,
          col: this.returnMinusOne(this.state.activeSquare.col)
        }
      });
    }
    if (event.keyCode === 38) {
      console.log("up");
      this.setState({
        activeSquare: {
          row: this.returnMinusOne(this.state.activeSquare.row),
          col: this.state.activeSquare.col
        }
      });
    }
    if (event.keyCode === 39) {
      console.log("right");
      this.setState({
        activeSquare: {
          row: this.state.activeSquare.row,
          col: this.returnAddOne(this.state.activeSquare.col)
        }
      });
    }
    if (event.keyCode === 40) {
      console.log("down");
      this.setState({
        activeSquare: {
          row: this.state.activeSquare.row,
          col: this.returnAddOne(this.state.activeSquare.col)
        }
      });
    }
  };

  returnMinusOne(value) {
    if (value === 0) {
      return value;
    } else {
      return value - 1;
    }
  }
  returnAddOne(value) {
    if (value === 0) {
      return value;
    } else {
      return value + 1;
    }
  }

  render() {
    const { grid, isMousePressed, activeSquare } = this.state;

    return (
      <div className="grid-base">
        {grid.map((row, column) => {
          return (
            <div key={column} className="grid-row">
              {row.map((square, index) => {
                const { row, column } = square;
                return (
                  <Square
                    key={index}
                    isMousePressed={isMousePressed}
                    row={row}
                    column={column}
                    startSquare={(activeSquare.row, activeSquare.col)}
                    onMouseDown={(row, column) =>
                      this.handleMouseDown(row, column)
                    }
                  ></Square>
                );
              })}
            </div>
          );
        })}
      </div>
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
  return {
    row,
    column,
    startSquare: row === START_ROW && column === START_COLUMN
  };
};
