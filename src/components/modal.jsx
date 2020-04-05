import React from "react";
import { Modal } from "react-bootstrap";
import { Button } from "react-bootstrap";
import "../App.css";

export default class GameOverModal extends React.Component {
  render() {
    const { gameOver, onClose } = this.props;
    if (!this.props.show) {
      return null;
    }
    return (
      <Modal.Dialog>
        <Modal.Header closeButton>
          <Modal.Title>Modal title</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <p>Modal body text goes here.</p>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={onClose}>
            Close
          </Button>
          <Button variant="primary">Save changes</Button>
        </Modal.Footer>
      </Modal.Dialog>
    );
  }
}
