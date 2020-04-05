import React from "react";

import "../App.css";

export default class Square extends React.Component {
  render() {
    const {
      onMouseDown,
      row,
      column,
      num,
      visitedSquares,
      activeSquare
    } = this.props;

    let square_style = "";

    for (let i = 0; i < visitedSquares.length; ++i) {
      if (
        (visitedSquares[i].row === row) &
        (visitedSquares[i].col === column)
      ) {
        square_style = "square-empty";
      }
    }

    let square_active =
      activeSquare.row === row && activeSquare.col === column
        ? "square-active"
        : "";

    let style = `square ${square_style}`;
    if (square_active === "square-active") {
      style = `square ${square_active}`;
    }

    return (
      <div className={style} onMouseDown={() => onMouseDown(row, column)}>
        {num}
      </div>
    );
  }
}
