import React from "react";
import LinearProgress from "@material-ui/core/LinearProgress";

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
        <div>{roundedPercentage}%</div>
        <LinearProgress variant="determinate" value={completedArea} />
      </React.Fragment>
    );
  }
}
