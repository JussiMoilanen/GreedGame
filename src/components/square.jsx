import React from "react";

import "../App.css";

export default class Square extends React.Component {
  render() {
    const { onMouseDown, row, column, startSquare } = this.props;
    const number = Math.floor(Math.random() * 6) + 1;
    const start_square_style = startSquare ? "square-start" : "square";

    return (
      <div
        className={`square ${start_square_style}`}
        onMouseDown={() => onMouseDown(row, column)}
      >
        {number}
      </div>
    );
  }
}
