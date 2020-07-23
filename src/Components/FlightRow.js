import React, { Component } from 'react';
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import { get } from 'lodash'

const localizedMonthsMap = {
  "0": 'янв.',
  "1": 'фев.',
  2: 'мар.',
  3: 'апр.',
  4: 'мая',
  5: 'июн.',
  6: 'июл.',
  7: 'авг.',
  8: 'сен.',
  9: 'окт.',
  10: 'нояб.',
  11: 'дек.'
}

const daysOfWeek = {
  0: 'вс',
  1: 'пн',
  2: 'вт',
  3: 'ср',
  4: 'чт',
  5: 'пт',
  6: 'сб'
}

export default class Flight extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    
    let flight = this.props.data;
    let index = this.props.legIndex;
    let departureDate = new Date(get(flight, ['legs', index, 'segments', 0, 'departureDate']));
    let segmentsNum = get(flight, ['legs',index, 'segments', 'length'], 0);
    
    let arrivalSegmentIndex = segmentsNum > 1 ? segmentsNum - 1 : 0;
    let arrivalDate = new Date(get(flight, ['legs', index, 'segments', arrivalSegmentIndex, 'arrivalDate']));
    let arrivalCity = get(flight, ['legs', index, 'segments', arrivalSegmentIndex, 'arrivalCity', 'caption'], 'Данные отсутствуют');
    let arrivalAirport = get(flight, ['legs', index, 'segments', arrivalSegmentIndex, 'arrivalAirport', 'caption'], '-');
    let arrivalAirportUid = get(flight, ['legs', index, 'segments', arrivalSegmentIndex, 'arrivalAirport', 'uid'], '-');
    let arrivalWeekday = arrivalDate.getDay();
    let arrivalNumMonth = arrivalDate.getMonth();
    let dateEnd = arrivalDate.getDate() + ' ' + localizedMonthsMap[arrivalNumMonth];
    let arrivalDayOfWeek = daysOfWeek[arrivalWeekday];
    let arrivalTime = arrivalDate.getHours() + ':' + arrivalDate.getMinutes();

    let departureCity = get(flight, ['legs', index, 'segments', 0, 'departureCity', 'caption'], '-');
    let departureAirport = get(flight, ['legs', index, 'segments', 0,'departureAirport','caption'], '-');
    let departureAirportUid = get(flight, ['legs', index, 'segments', 0, 'departureAirport', 'uid'], '-');
    let departureTime = departureDate.getHours() + ':' + departureDate.getMinutes();
    let departNumMonth = departureDate.getMonth()
    let dateStart = departureDate.getDate() + ' ' + localizedMonthsMap[departNumMonth];
    let departureWeekday = departureDate.getDay();
    let departureDayOfWeek = daysOfWeek[departureWeekday];

    let flightDuration = get(flight, ['legs', index, 'duration'], 'время неизвестно')
    let duration = Math.floor(flightDuration / 60) + ' ч. ' + flightDuration % 60 + ' мин.';
    let stops = (segmentsNum > 1) ? ((segmentsNum - 1) + ' пересадка') : <hr />;
    let aviaCompany = get(flight, ['legs', index, 'segments', 0, 'airline', 'caption'], '-');
    
    return (
      <Container className="px-0 mx-0" fluid>
            <Row className="px-3">
              <Col xs={12} md={12} className="f-23">
                {departureCity}, {departureAirport} 
                <span className="f-lightblue ml-1">
                  ({departureAirportUid}) 
                  <span aria-label="rightAr"> &#8594; </span> 
                </span> 
                {arrivalCity}, {arrivalAirport} 
                <span className="f-lightblue"> ({arrivalAirportUid})</span>
              </Col>
            </Row>
            <hr className="mx-3" />
            <Row className="justify-content-center f-21 px-3">
              <Col xs={4} md={4} className="d-flex align-items-center">
                <div className="pr-2 f-23">{departureTime} </div>
                <div className="f-lightblue">{dateStart} {departureDayOfWeek}</div>
              </Col>
              <Col xs={4} md={4} className="d-flex justify-content-center align-items-center">
                <div> <span role="img" aria-label="clocks"> &#128339; </span> {duration}</div>
              </Col>
              <Col xs={4} md={4} className="d-flex justify-content-end align-items-center">
                <div className="pr-2 f-lightblue">{dateEnd} {arrivalDayOfWeek}</div>
                <div className="f-23">{arrivalTime}</div>
              </Col>
            </Row>
            <Row className="px-3">
              <Col className="px-0 pl-5"><hr /></Col>
            <Col className="text-center f-orange px-0">{stops}</Col>
              <Col className="px-0 pr-5"><hr /></Col>
            </Row>
            <Row className="px-3">
              <Col>
                <div className="f-21">Рейс выполняет: {aviaCompany}</div>
              </Col>
            </Row>
          </Container>
    )
  }
}