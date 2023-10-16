import React, { useState } from 'react';
import BackOfficeSideNavBar from './BackOfficeSideNavBar';
import TravelAgentSideNavBar from './TravelAgentSideNavBar';
import { Button, Col, Form, Row, Table } from 'react-bootstrap';
import axios from 'axios';
import { FaPencilAlt, FaTrash } from 'react-icons/fa';

const CreateReservations = () => {
  const token = JSON.parse(sessionStorage.getItem('token'));
  const [start, setStart] = useState(null);
  const [end, setEnd] = useState(null);
  const [response, setResponse] = useState(null);

  const handleSubmit = async (event) => {
    event.stopPropagation();
    if (start !== null && end !== null) {
      await axios
        .get(`${process.env.REACT_APP_BASE_URL}Schedules/ScheduledTrains?startPoint=${start}&stopStation=${end}`)
        .then((res) => {
          setResponse(res.data);
          console.log('response', response);
        })
        .catch((err) => {
          alert(err.msg);
        });
    } else {
      alert('Start and End is required');
    }
  };

  return (
    <div
      style={{
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
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <div
            style={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              width: '70%',
              border: '1px solid black',
              borderRadius: '5px',
              padding: '20px',
            }}
          >
            <div>
              <h6 style={{ textAlign: 'left' }}>Start</h6>
              <input required type="text" placeholder="Start" onChange={(e) => setStart(e.currentTarget.value)} />
            </div>
            <div>
              <h6 style={{ textAlign: 'left' }}>Destination</h6>
              <input required type="text" placeholder="Destination" onChange={(e) => setEnd(e.currentTarget.value)} />
            </div>
            <div>
              <Button type="submit" onClick={handleSubmit}>
                Search
              </Button>
            </div>
          </div>
        </div>
        {response && (
          <Table striped bordered hover style={{ marginTop: '20px' }}>
            <thead>
              <tr>
                <th>Train ID</th>
                <th>Day</th>
                <th>Start Station</th>
                <th>Destination</th>
                <th>Departure Time </th>
                <th>Arrival Time</th>
                <th>Stop Stations</th>
                <th>Status</th>
                <th>Train</th>
                <th>Reserve</th>
              </tr>
            </thead>
            {response.map((schedule) => (
              <tbody key={schedule.scheduleId}>
                <tr>
                  <td>{schedule.trainId}</td>
                  <td>{schedule.day}</td>
                  <td>{schedule.startPoint}</td>
                  <td>{schedule.destination}</td>
                  <td>{schedule.depTime}</td>
                  <td>{schedule.arrivalTime}</td>
                  <td>{schedule.stopStations}</td>
                  <td>{schedule.activeStatus ? 'Active' : 'Inactive'}</td>
                  <td>{schedule.trainName}</td>

                  <td>
                    <div>
                      &nbsp;&nbsp;&nbsp;
                      <span>
                        <FaPencilAlt
                          onClick={() => {
                            // setModalUpdate(true);
                            // setUpdateView(schedule);
                          }}
                          style={{ cursor: 'pointer', color: 'blue' }}
                          title="Update the student details"
                        />
                      </span>
                    </div>
                  </td>
                </tr>
              </tbody>
            ))}
          </Table>
        )}
      </div>
    </div>
  );
};

export default CreateReservations;
