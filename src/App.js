import React from 'react';
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Flights from './Components/Flights'
import Filters from './Components/Filters'

import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css'

function App() {
  return (
    <Container fluid>
      <Row>
        <Col md={1} lg={1}></Col>
        <Col md={3} lg={3} className="p-2">
        <Filters />
        </Col>
        <Col md={7} lg={7} className="p-2">
        <Flights />
        </Col>
        <Col md={1} lg={1}></Col>
      </Row>
    </Container>
  );
}

export default App;
