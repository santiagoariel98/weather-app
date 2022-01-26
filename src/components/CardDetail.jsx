import React from "react";
import { Card, Col, CloseButton, Container } from "react-bootstrap";
import moment from "moment";

function CardDetail({ data, handleClose }) {
  return (
    <Col>
      <Card>
        <Card.Header as="h5">
          <CloseButton onClick={() => handleClose(data.id)} />
        </Card.Header>
        <Card.Body className="d-flex flex-column justify-content-center align-items-center">
          <Card.Title>{data.name}</Card.Title>
          <Container className="d-flex align-items-center justify-content-center">
            <Card.Img
              variant="top"
              src={`http://openweathermap.org/img/wn/${data.img}@2x.png`}
              style={{ width: "75px" }}
            />
            <Card.Subtitle className="d-flex" style={{ fontSize: "2em" }}>
              {Math.round(data.temp)}
              <Card.Subtitle> °C</Card.Subtitle>
            </Card.Subtitle>
          </Container>
          <Container className="d-flex align-items-center justify-content-between">
            <Card.Subtitle>Max: {Math.round(data.temp_max)}°C</Card.Subtitle>
            <Card.Subtitle>Min: {Math.round(data.temp_min)}°C</Card.Subtitle>
          </Container>
        </Card.Body>
        <Card.Footer>
          <small className="text-muted">
            Added {moment(data.time).fromNow()}
          </small>
        </Card.Footer>
      </Card>
    </Col>
  );
}

export default CardDetail;
