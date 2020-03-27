import React from "react";
import LinearProgress from "@material-ui/core/LinearProgress";
import Container from "@material-ui/core/Container";
import "../App.css";

export default class Score extends React.Component {
  render() {
    const { visitedSquares } = this.props;
    let boardsize = 15 * 15;
    let completedArea = 1;
    if (visitedSquares) {
      completedArea = 100 * (visitedSquares.length / boardsize);
    }

    let roundedPercentage = Math.round(completedArea * 100) / 100;
    return (
      <React.Fragment>
        <div className={"scoreArea"}>
          {roundedPercentage}%
          <LinearProgress
            width="25%"
            variant="determinate"
            value={completedArea}
          />
        </div>
      </React.Fragment>
    );
  }
}
