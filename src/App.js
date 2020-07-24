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
      flights: [],
      filteredFlights: []
    }

    this.applySorts = this.applySorts.bind(this)
    this.applyFilter = this.applyFilter.bind(this)
  }

  componentDidMount() {
    let flightsData = this.getFakeData().result
    let { flights } = flightsData

    this.setState({ flights, filteredFlights: [ ...flights ] })
  }

  applySorts(dataType, callback) {
    let sortedFlights = this.state.filteredFlights.sort((a, b) => {
      let currentDataA
      let currentDataB

      if (dataType === 'price') {
        currentDataA = Number(a.flight.price.total.amount)
        currentDataB = Number(b.flight.price.total.amount)
      }
      else if (dataType === 'duration') {
        currentDataA = Number(a.flight.legs[1]
          ? a.flight.legs[0].duration + a.flight.legs[1].duration
          : a.flight.legs[0].duration)
        currentDataB = Number(b.flight.legs[1]
          ? b.flight.legs[0].duration + b.flight.legs[1].duration
          : b.flight.legs[0].duration)
      }

      let aData = Number(currentDataA)
      let bData = Number(currentDataB)

      return callback(aData, bData)
    })

    this.setState({
      filteredFlights: sortedFlights
    })
  }

  applyFilter(filtersObj) {
    let filteredFlights = this.state.flights

    for (let filterName in filtersObj) {
      let filter = filtersObj[filterName]

      filteredFlights = filteredFlights.filter(flight => filter.callback(flight))
    }

    this.setState({
      filteredFlights
    })
  }

  getFakeData() {
    return flightsData
  }

  render() {
    return (
      <Container fluid>
        <Row>
          <Col md={1} lg={1}></Col>
          <Col md={4} lg={4} className="px-4">
            <Filters
              onChangeSort={this.applySorts}
              onChangeFilter={this.applyFilter}
              data={this.state.filteredFlights}
              dataForAirlinesCaptions={this.state.flights}
            />
          </Col>
          <Col md={6} lg={6} className="px-2">
            <Flights data={this.state.filteredFlights} />
          </Col>
          <Col md={1} lg={1}></Col>
        </Row>
      </Container>
    );
  }
}


export default App;
