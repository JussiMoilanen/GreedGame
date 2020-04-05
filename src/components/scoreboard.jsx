import React from "react";
import { Table } from "react-bootstrap";
import "../App.css";

export default class ScoreBoard extends React.Component {
  render() {
    const { data } = this.props;
    let sorted = data.score.sort((a, b) => b.score - a.score);

    return (
      <div className="table-container">
        <Table striped bordered hover variant="dark">
          <thead>
            <tr>
              <th></th>
              <th>Username</th>
              <th>Score</th>
            </tr>
          </thead>
          <tbody>
            {sorted.slice(0, 5).map((score, i) => (
              <tr key={i}>
                <td>{i + 1}</td>
                <td>{score.username}</td>
                <td>{score.score}%</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    );
  }
}
