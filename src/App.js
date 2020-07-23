import React, { Component } from 'react';
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Flights from './Components/Flights'
import Filters from './Components/Filters'
import flightsData from './FakeData/flightsData.json'

import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css'

class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      flights: []
    }
  }

  componentDidMount() {
    let flightsData = this.getFakeData().result
    let { flights } = flightsData
   


    this.setState({ flights })
    
  }

  // applyFilters(type, callback) {
  //   this.setState({
  //     flights: sortedFlights
  //   })
  // }

  getFakeData () {
    return flightsData
  }

  render() {
    return (
      <Container fluid>
        <Row>
          <Col md={1} lg={1}></Col>
          <Col md={3} lg={3} className="p-2">
            <Filters onChange={this.applyFilters} data={this.state.flights}/>
          </Col>
          <Col md={7} lg={7} className="p-2">
          <Flights data={this.state.flights} />
          </Col>
          <Col md={1} lg={1}></Col>
        </Row>
      </Container>
    );
  }
}


export default App;
