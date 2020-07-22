import React, { Component } from 'react';
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

export default class Flight extends Component {
  render() {
    return (
      <Container className="my-5" fluid>
        <Row className="my-5">
          <div></div>
        </Row>
        <Row>
          <Col>
            <h5>Сортировать</h5>
            <div>
              <input type="radio" id="priceUp" className="mr-2" />
              <label for="priceUp"> - по возрастанию цены</label>
            </div>
            <div>
              <input type="radio" id="priceDown" className="mr-2" />
              <label for="priceDown"> - по убыванию цены</label>
            </div>
            <div>
              <input type="radio" id="tripDuration" className="mr-2" />
              <label for="tripDuration"> - по времени в пути</label>
            </div>
          </Col>
        </Row>
        <Row className="my-3">
          <Col>
            <h5>Фильтровать</h5>

            <div>
              <input type="checkbox" id="oneStop" className="mr-2" />
              <label for="oneStop"> - 1 пересадка</label>
            </div>

            <div>
              <input type="checkbox" id="zeroStop" className="mr-2" />
              <label for="zeroStop"> - без пересадок</label>
            </div>
          </Col>
        </Row>
        <Row className="my-3">
          <Col>
            <h5>Цена</h5>

            <div>
              <label for="priceFrom"> От</label>
              <input type="number" id="priceFronm" className="ml-2" />
            </div>

            <div>
              <label for="priceTo"> До</label>
              <input type="number" id="priceTo" className="ml-2" />
            </div>
          </Col>
        </Row>
        <Row className="my-3">
          <Col md={6} lg={8}>
            <h5>Авикомпании</h5>

            <div>
              <input type="checkbox" id="1" className="mr-2" />
              <label for="1" className="mb-0"> LOT Polish Airlines</label>
            </div>
           
          </Col>
          <Col md={6} lg={4} className="d-flex justify-content-center align-items-end px-0">
            <div>от 21049 р.</div>
          </Col>
        </Row>
      </Container>
    )
  }
}