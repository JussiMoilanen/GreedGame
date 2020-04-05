import React from "react";
import "../App.css";
import { ProgressBar } from "react-bootstrap";

export default class Score extends React.Component {
  render() {
    const { visitedSquares, gameOver } = this.props;
    let boardsize = 15 * 15;
    let completedArea = 1;
    if (visitedSquares) {
      completedArea = 100 * (visitedSquares.length / boardsize);
    }
    let gameOverMsg = "";
    if (gameOver) {
      gameOverMsg = "Gameover!";
    }
    let roundedPercentage = Math.round(completedArea * 100) / 100;
    return (
      <React.Fragment>
        <div className={"scoreArea"}>
          {roundedPercentage}%
          <ProgressBar animated now={completedArea} />
        </div>
        <div className={"gameOver"}> {gameOverMsg}</div>
      </React.Fragment>
    );
  }
}
