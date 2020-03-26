import React from "react";

import "../App.css";

export default class Square extends React.Component {
  render() {
    const {
      onMouseDown,
      row,
      column,
      startSquare,
      num,
      visitedSquares
    } = this.props;

    let start_square_style = startSquare ? "square-start" : "square";
    // if ((activeSquare.row === row) & (activeSquare.col === column)) {
    //   start_square_style = "square-empty";
    // }

    for (let i = 0; i < visitedSquares.length; ++i) {
      if (
        (visitedSquares[i].row === row) &
        (visitedSquares[i].col === column)
      ) {
        start_square_style = "square-empty";
      }
    }

    // const square_empty = (grid[row][col].num = 0 ? "square-empty" : "square");

    return (
      <div
        className={`square ${start_square_style}`}
        onMouseDown={() => onMouseDown(row, column)}
      >
        {num}
      </div>
    );
  }
}
