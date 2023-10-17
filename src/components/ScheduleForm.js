import React from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { useState } from 'react';
import axios from 'axios';
import swal from 'sweetalert';

const ScheduleForm = ({ data }) => {
  const [validated, setValidated] = useState(false);
  const [scheduleId, setScheduleId] = useState(data ? data.scheduleId : null);
  const [trainId, setTrainId] = useState(data ? data.trainId : null);
  const [day, setDay] = useState(data ? data.day : null);
  const [startPoint, setStartPoint] = useState(data ? data.startPoint : null);
  const [destination, setDestination] = useState(data ? data.destination : null);
  const [depTime, setDepTime] = useState(data ? data.depTime : null);
  const [arrivalTime, setArrivalTime] = useState(data ? data.arrivalTime : null);
  const [stopStations, setStopStations] = useState(data ? data.stopStations : null);
  const [activeStatus, setActiveStatus] = useState(data ? data.activeStatus : true);
  const [trainName, setTrainName] = useState(data ? data.trainName : null);

  const handleSubmit = async (event) => {
    const stopStationsArray = !data && stopStations.split(',');
    const schedule = {
      scheduleId: scheduleId,
      trainId: trainId,
      day: day,
      startPoint: startPoint,
      destination: destination,
      depTime: depTime,
      arrivalTime: arrivalTime,
      stopStations: data ? stopStations : stopStationsArray,
      activeStatus: activeStatus,
      trainName: trainName,
    };
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    } else {
      if (!data) {
        await axios
          .post(`${process.env.REACT_APP_BASE_URL}Schedules`, schedule)
          .then((data) => console.log(data), swal('Saved!', 'Successfully Saved', 'success'))
          .catch((err) => alert(err));
      } else {
        await axios
          .put(`${process.env.REACT_APP_BASE_URL}Schedules/${scheduleId}`, schedule)
          .then((data) => console.log(data), swal('Updated!', 'Successfully Saved', 'success'))
          .catch((err) => alert(err));
      }
    }
    setValidated(true);
  };

  return (
    <div className="editform">
      <Form onSubmit={handleSubmit}>
        <Form.Group className="inputreg" controlId="iD">
          <Form.Label>Train ID</Form.Label>
          <Form.Control
            placeholder="Enter Train ID"
            value={trainId}
            onChange={(e) => setTrainId(e.target.value)}
            required
          />
        </Form.Group>

        <Form.Group className="inputreg">
          <Form.Label>Day</Form.Label>
          <Form.Select aria-label="Feedback Type" value={day} onChange={(e) => setDay(e.target.value)}>
            <option selected disabled hidden>
              Select Day
            </option>

            <option>Weekday</option>
            <option>Weekend</option>
          </Form.Select>
        </Form.Group>

        <Form.Group className="inputreg" controlId="lname">
          <Form.Label>Start Station</Form.Label>
          <Form.Control value={startPoint} onChange={(e) => setStartPoint(e.target.value)} required />
        </Form.Group>

        <Form.Group className="inputreg" controlId="lname">
          <Form.Label>End Station</Form.Label>
          <Form.Control value={destination} onChange={(e) => setDestination(e.target.value)} required />
        </Form.Group>

        <Form.Group className="inputreg" controlId="lname">
          <Form.Label>Departure Time</Form.Label>
          <Form.Control value={depTime} onChange={(e) => setDepTime(e.target.value)} required />
        </Form.Group>

        <Form.Group className="inputreg" controlId="lname">
          <Form.Label>Arrival Time</Form.Label>
          <Form.Control value={arrivalTime} onChange={(e) => setArrivalTime(e.target.value)} required />
        </Form.Group>

        <Form.Group className="inputreg" controlId="lname">
          <Form.Label>Stop Stations</Form.Label>
          <Form.Control value={stopStations} onChange={(e) => setStopStations(e.target.value)} required />
        </Form.Group>

        <Form.Group className="inputreg" controlId="lname">
          <Form.Label>Train</Form.Label>
          <Form.Control value={trainName} onChange={(e) => setTrainName(e.target.value)} required />
        </Form.Group>

        {/* <Form.Group className="inputreg">
          <Form.Label>Faculty</Form.Label>
          <Form.Select aria-label="Feedback Type" value={fclty} onChange={(e) => setFaculty(e.target.value)}>
            <option selected disabled hidden>
              Faculty Type
            </option>
            <option>Select your faculty</option>
            <option>Computing</option>
            <option>Bussiness</option>
            <option>Engineering</option>
            <option>Humanaties and sciences</option>
            <option>School of Architecture</option>
            <option>Graduate studies and reseach</option>
            <option>School of Law</option>
          </Form.Select>
        </Form.Group> */}

        <Button variant="primary" type="submit">
          {data ? 'Save Changes' : 'Save'}
        </Button>
      </Form>
    </div>
  );
};

export default ScheduleForm;
