import React from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { useState } from 'react';
import axios from 'axios';
import swal from 'sweetalert';

const TrainForm = ({ data }) => {
  const [validated, setValidated] = useState(false);
  const [trainId, setTrainId] = useState(data ? data.trainId : null);
  const [name, setName] = useState(data ? data.name : null);
  const [startPoint, setStartPoint] = useState(data ? data.startPoint : null);
  const [destination, setDestination] = useState(data ? data.destination : null);
  const [type, setType] = useState(data ? data.type : null);
  const [routeCategory, setRouteCategory] = useState(data ? data.routeCategory : null);
  const [activeStatus, setActiveStatus] = useState(data ? data.activeStatus : true);

  const handleSubmit = async (event) => {
    const train = {
      trainId: trainId,
      name: name,
      startPoint: startPoint,
      destination: destination,
      type: type,
      routeCategory: routeCategory,
      activeStatus: activeStatus,
    };
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    } else {
      if (!data) {
        await axios
          .post(`${process.env.REACT_APP_BASE_URL}Trains`, train)
          .then((data) => console.log(data), swal('Saved!', 'Successfully Saved', 'success'))
          .catch((err) => alert(err));
      } else {
        await axios
          .put(`${process.env.REACT_APP_BASE_URL}Trains/${trainId}`, train)
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
          <Form.Label>Name</Form.Label>
          <Form.Control
            placeholder="Enter Train Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </Form.Group>

        <Form.Group className="inputreg" controlId="fname">
          <Form.Label>Start Station</Form.Label>
          <Form.Control
            value={startPoint}
            onChange={(e) => setStartPoint(e.target.value)}
            required
            placeholder="Enter Start Point"
          />
        </Form.Group>

        <Form.Group className="inputreg" controlId="lname">
          <Form.Label>Last Station</Form.Label>
          <Form.Control
            value={destination}
            onChange={(e) => setDestination(e.target.value)}
            required
            placeholder="Enter Last Station"
          />
        </Form.Group>

        <Form.Group className="inputreg">
          <Form.Label>Train Type</Form.Label>
          <Form.Select aria-label="Feedback Type" value={type} onChange={(e) => setType(e.target.value)}>
            <option selected disabled hidden>
              Train Type
            </option>
            <option>Express</option>
            <option>Intercity</option>
            <option>Semi Express</option>
            <option>Slow</option>
          </Form.Select>
        </Form.Group>

        <Form.Group className="inputreg">
          <Form.Label>Route</Form.Label>
          <Form.Select
            aria-label="Feedback Type"
            value={routeCategory}
            onChange={(e) => setRouteCategory(e.target.value)}
          >
            <option selected disabled hidden>
              Select Route
            </option>
            <option>Main Line</option>
            <option>Coastal line</option>
            <option>Puttalam line</option>
            <option>Kelani Valley line</option>
            <option>Northern line</option>
            <option>Mannar line</option>
            <option>Batticaloa line</option>
            <option>Trincomalee line</option>
            <option>Mihintale line</option>
          </Form.Select>
        </Form.Group>

        <Button variant="primary" type="submit">
          {data ? 'Save Changes' : 'Save'}
        </Button>
      </Form>
    </div>
  );
};

export default TrainForm;
