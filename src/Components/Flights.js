import React, { Component } from 'react';
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'
import FlightRow from './FlightRow'

export default class Flight extends Component {
  render() {
    return (
      <div className="p-0 m-0">
        <Card.Header className="bg-blue">
          <Row>
            <Col>
              Logo
          </Col>
            <Col className="px-3">
              <div className="text-right f-price">21049 P</div>
            </Col>
          </Row>
          <Row className="justify-content-end">
            <div className="px-3">Стоимость для одного взрослого пассажира</div>
          </Row>
        </Card.Header>
        <Card.Body className="px-0 mx-0">
          <FlightRow />
          <hr className="hr-blue px-0 mx-0 w-100" />
          <FlightRow />
          <Button className="button-orange my-3" block>ВЫБРАТЬ</Button>
        </Card.Body>
      </div>
    )
  }
}
