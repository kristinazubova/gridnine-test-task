import React, { Component } from 'react';
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'
import FlightRow from './FlightRow'

export default class Flight extends Component {
  constructor(props) {
    super(props)

    this.state = {
      visiable: 2
    }

  this.loadMore = this.loadMore.bind(this)
  }

  loadMore () {
    this.setState((current) => {
      return {visiable: current.visiable + 3}
    })
  }

  getFlightsCard() {
    return this.props.data.slice(0, this.state.visiable).map(({ flight }) => {
      let airlanesCode = flight.legs[0].segments[0].airline.airlineCode
      let adressLogo = `http://pics.avs.io/100/50/${airlanesCode}.png`

      return <div><Card.Header className="bg-blue">
        <Row>
          <Col>
            <img src={adressLogo}></img>
          </Col>
          <Col className="px-3">
            <div className="text-right f-price">{flight.price.total.amount} P</div>
            <div className="text-right">Стоимость для одного взрослого пассажира</div>
          </Col>
        </Row>
      </Card.Header>
        <Card.Body className="px-0 mx-0">
          <FlightRow data={ flight } legIndex="0" />
          <hr className="hr-blue px-0 mx-0 w-100" />
          <FlightRow data={ flight } legIndex="1" />
          <Button className="button-orange my-3" block>ВЫБРАТЬ</Button>
        </Card.Body>
      </div>
    })
  }

  render() {
    return (
      <div className="p-0 m-0">
        {this.getFlightsCard()}
        <div className="text-center">
          {this.state.visiable < this.props.data.length &&
          <Button type="button" onClick={this.loadMore} className="my-3">Показать еще</Button>
          }
        </div>
      </div>
    )
  }
}
