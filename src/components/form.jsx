import React from "react";
import { Form } from "react-bootstrap";
import { Row, Col } from "react-bootstrap";
import "../App.css";

export default class GiveName extends React.Component {
  render() {
    const { handleSubmit } = this.props;
    let username = "anonymous";
    return (
      <Form onSubmit={handleSubmit}>
        <Row>
          <Col md="6">
            <Form.Control
              required
              type="text"
              defaultValue=""
              placeholder="First name"
            />
          </Col>
          {username}
        </Row>
      </Form>
    );
  }
}
