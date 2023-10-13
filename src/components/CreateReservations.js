import React, { useState } from 'react';
import BackOfficeSideNavBar from './BackOfficeSideNavBar';
import TravelAgentSideNavBar from './TravelAgentSideNavBar';
import { Button, Col, Form, Row } from 'react-bootstrap';
import axios from 'axios';

const CreateReservations = () => {
  const token = JSON.parse(sessionStorage.getItem('token'));
  const [start, setStart] = useState(null);
  const [end, setEnd] = useState(null);
  const [date, setDate] = useState(null);
  const [response, setResponse] = useState(null);

  const handleSubmit = async (event) => {
    event.stopPropagation();
    // const form = event.currentTarget;
    // if (form.checkValidity() === false) {
    //   event.preventDefault();
    //   event.stopPropagation();
    // }
    // console.log('event', event);

    // setValidated(true);
    const params = {
      startPoint: start,
      stopStation: end,
      day: date,
    };
    await axios
      .get(`${process.env.REACT_APP_BASE_URL}Schedules/ScheduledTrains`, params)
      .then((res) => {
        setResponse(res.data);
      })
      .catch((err) => {
        alert(err.msg);
      });
  };

  console.log('response', response);

  return (
    <div
      style={{
        //backgroundImage: `url("https://img.wallpapersafari.com/desktop/1024/576/90/30/9oCdMj.jpg")`,
        height: '100vh',
        backgroundSize: 'cover',
      }}
    >
      {token.userRole === 'Admin' ? <BackOfficeSideNavBar /> : <TravelAgentSideNavBar />}
      <div className="stable">
        <br></br>
        <center>
          <h1 style={{ color: 'Black' }}>Create Reservation</h1>
        </center>
        <hr></hr>
        <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
          <Form onSubmit={handleSubmit} style={{ width: '90%' }}>
            <Row className="mb-3">
              <Form.Group as={Col} md="4" controlId="validationCustom01">
                <Form.Label>Start</Form.Label>
                <Form.Control
                  required
                  type="text"
                  placeholder="Start"
                  onChange={(e) => setStart(e.currentTarget.value)}
                />
              </Form.Group>
              <Form.Group as={Col} md="4" controlId="validationCustom02">
                <Form.Label>Destination</Form.Label>
                <Form.Control
                  required
                  type="text"
                  placeholder="Destination"
                  onChange={(e) => setEnd(e.currentTarget.value)}
                />
              </Form.Group>
              <Form.Group as={Col} md="4" controlId="validationCustomUsername">
                <Form.Label>Date</Form.Label>
                <Form.Control type="date" placeholder="Date" onChange={(e) => setDate(e.currentTarget.value)} />
              </Form.Group>
            </Row>
            <Button type="submit">Search</Button>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default CreateReservations;
