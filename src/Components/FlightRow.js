import React, { Component } from 'react';
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

export default class Flight extends Component {
  render() {
    return (
      <Container className="px-0 mx-0" fluid>
            <Row className="px-3">
              <Col xs={12} md={12} className="f-23">Москва, ШЕРЕМЕТЬЕВО <span className="f-lightblue">(SVO) &#8594; </span> ЛОНДОН, Лондон, Хитроу <span className="f-lightblue">(LHR)</span></Col>
            </Row>
            <hr className="mx-3" />
            <Row className="justify-content-center f-21 px-3">
              <Col xs={4} md={4} className="d-flex align-items-center">
                <div className="pr-2 f-23">20:48 </div>
                <div className="f-lightblue">18 авг, вт</div>
              </Col>
              <Col xs={4} md={4} className="d-flex justify-content-center align-items-center">
                <div> &#128339; 14 ч 45 мин</div>
              </Col>
              <Col xs={4} md={4} className="d-flex justify-content-end align-items-center">
                <div className="pr-2 f-lightblue">19 авг, cp</div>
                <div className="f-23">09:25</div>
              </Col>
            </Row>
            <Row className="px-3">
              <Col className="px-0 pl-5"><hr /></Col>
              <Col className="text-center f-orange px-0">1 пересадка</Col>
              <Col className="px-0 pr-5"><hr /></Col>
            </Row>
            <Row className="px-3">
              <Col>
                <div className="f-21">Рейс выполняет: LOT Polish Airlines</div>
              </Col>
            </Row>
          </Container>
    )
  }
}