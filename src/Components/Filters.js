import React, { Component } from 'react';
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

export default class Flight extends Component {
  constructor(props) {
    super(props)

    this.state = {
      sortType: '',
      airlinesChecks: {
        'Air France': true,
        'KLM': true,
        'Аэрофлот - российские авиалинии': true,
        'TURK HAVA YOLLARI A.O.': true,
        'Finnair Oyj': true,
        'Air Baltic Corporation A/S': true,
        'Alitalia Societa Aerea Italiana': true,
        'Pegasus Hava Tasimaciligi A.S.': true,
        'Brussels Airlines': true,
        'LOT Polish Airlines': true
      },
      priceRange: {
        'from': 0,
        'to': 150000
      },
      stops: {
        'one': false,
        'zero': false
      },
      chosenFiltersMap: {}
    }

    this.handleSortTypeChange = this.handleSortTypeChange.bind(this)
    this.handleFilterAirlines = this.handleFilterAirlines.bind(this)
    this.handleFilterPrices = this.handleFilterPrices.bind(this)
  }

  airlinesEntries() {
    let minPrices = {}

    this.props.dataForAirlinesCaptions.forEach(({ flight }) => {
      let name = flight.carrier.caption
      let currentPrice = Number(flight.price.total.amount)

      if (!minPrices[name] || currentPrice < minPrices[name]) {
        minPrices[name] = currentPrice
      }
    })

    return Object.entries(minPrices)
  }

  renderAirlines() {
    return this.airlinesEntries().map(([caption, price], index) =>
      <Row className="my-3 px-0" key={index}>
        <Col md={6} lg={8} className="px-0">
          <div>
            <input
              type="checkbox"
              id={'airline' + index}
              className="mr-2"
              value={caption}
              onChange={() => this.handleFilterAirlines(caption)}
              checked={this.state.airlinesChecks[caption]}
            />
            <label htmlFor={'airline' + index} className="mb-0">{caption}</label>
          </div>
        </Col>
        <Col md={6} lg={4} className="d-flex justify-content-center align-items-end px-0">
          <div>от {price} р.</div>
        </Col>
      </Row>
    )
  }

  handleSortTypeChange(event) {
    let sortData = {
      'decreasingPrice': {
        dataType: 'price',
        callback: (a, b) => b - a
      },
      'increasingPrice': {
        dataType: 'price',
        callback: (a, b) => a - b
      },
      'travelTime': {
        dataType: 'duration',
        callback: (a, b) => a - b
      }
    }

    this.setState({ sortType: event.target.value })
    let currentSort = sortData[event.target.value]

    if (currentSort)
      this.props.onChangeSort(currentSort.dataType, currentSort.callback)
  }

  handleFilterAirlines(value) {
    let filterAirlines = {
      value: this.state.airlinesChecks,
      callback: (({ flight }) => {
        let toCaption = flight.legs[0].segments[0].airline.caption
        let backCaption = flight.legs[1].segments[0].airline.caption

        if (this.state.airlinesChecks[toCaption] || this.state.airlinesChecks[backCaption]) {
          return true
        }
      })
    }

    let airlinesChecks = this.state.airlinesChecks
    airlinesChecks[value] = !airlinesChecks[value]

    let chosenFiltersMap = {
      ...this.state.chosenFiltersMap,
      airlines: filterAirlines
    }

    this.setState({
      airlinesChecks,
      chosenFiltersMap
    })

    this.props.onChangeFilter(chosenFiltersMap)
  }

  handleFilterPrices(type, event) {
    let filterPrices = {
      value: this.state.priceRange,
      callback: (({ flight }, priceRange) => {
        if (Number(flight.price.total.amount) >= Number(this.state.priceRange.from)
          && Number(flight.price.total.amount) <= Number(this.state.priceRange.to)) {
          return true
        }
      })
    }

    let priceRange = this.state.priceRange
    priceRange[type] = event.target.value

    let chosenFiltersMap = {
      ...this.state.chosenFiltersMap,
      prices: filterPrices
    }

    this.setState({
      priceRange,
      chosenFiltersMap
    })

    this.props.onChangeFilter(chosenFiltersMap)
  }

  handleFilterStops(value) {
    let stopsEmpty = false

    if (Object.values(this.state.stops).includes(true)) {
      stopsEmpty = true
    }

    let filterStops = {
      value: this.state.stops,
      callback: (({ flight }, stopsNum) => {
        if (stopsEmpty) return true

        let toStops = flight.legs[0].segments.length - 1
        let backStops = flight.legs[1].segments.length - 1
        let localizedStops = {
          '1': 'one',
          '0': 'zero'
        }

        if (this.state.stops[localizedStops[toStops]] 
          && this.state.stops[localizedStops[backStops]]) {
          return true
        }
      })
    }

    let stopsChecks = this.state.stops
    stopsChecks[value] = !stopsChecks[value]

    let chosenFiltersMap = {
      ...this.state.chosenFiltersMap,
      stops: filterStops
    }

    this.setState({ 
      stopsChecks,
      chosenFiltersMap
    })

    this.props.onChangeFilter(chosenFiltersMap)
  }

  render() {
    return (
      <Container className="my-5 px-0" fluid>
        <Row className="my-5">
          <div></div>
        </Row>
        <Row>
          <Col>
            <h5>Сортировать</h5>
            <div>
              <input
                type="radio"
                id="priceUp"
                className="mr-2"
                name="sorting"
                value="increasingPrice"
                checked={this.state.sortType === 'increasingPrice'}
                onChange={this.handleSortTypeChange}
              />
              <label htmlFor="priceUp"> - по возрастанию цены</label>
            </div>
            <div>
              <input
                type="radio"
                id="priceDown"
                className="mr-2"
                name="sorting"
                value="decreasingPrice"
                checked={this.state.sortType === 'decreasingPrice'}
                onChange={this.handleSortTypeChange}
              />
              <label htmlFor="priceDown"> - по убыванию цены</label>
            </div>
            <div>
              <input
                type="radio"
                id="tripDuration"
                className="mr-2"
                name="sorting"
                value="travelTime"
                checked={this.state.sortType === 'travelTime'}
                onChange={this.handleSortTypeChange}
              />
              <label htmlFor="tripDuration"> - по времени в пути</label>
            </div>
          </Col>
        </Row>
        <Row className="my-3">
          <Col>
            <h5>Фильтровать</h5>
            <div>
              <input
                type="checkbox"
                id="oneStop"
                className="mr-2"
                value="oneStop"
                onChange={() => this.handleFilterStops('one')}
                checked={this.state.stops.one}
              />
              <label htmlFor="oneStop"> - 1 пересадка</label>
            </div>
            <div>
              <input
                type="checkbox"
                id="zeroStop"
                className="mr-2"
                value="zeroStop"
                onChange={() => this.handleFilterStops('zero')}
                checked={this.state.stops.zero}
              />
              <label htmlFor="zeroStop"> - без пересадок</label>
            </div>
          </Col>
        </Row>
        <Row className="my-3">
          <Col>
            <h5>Цена</h5>
            <div>
              <label htmlFor="priceFrom"> От</label>
              <input
                type="number"
                id="priceFrom"
                className="ml-2"
                value={this.state.priceRange.from}
                onChange={(event) => this.handleFilterPrices('from', event)}
              />
            </div>
            <div>
              <label htmlFor="priceTo"> До</label>
              <input
                type="number"
                id="priceTo"
                className="ml-2"
                value={this.state.priceRange.to}
                onChange={(event) => this.handleFilterPrices('to', event)}
              />
            </div>
          </Col>
        </Row>
        <h5>Авикомпании</h5>
        {this.renderAirlines()}

      </Container>
    )
  }
}