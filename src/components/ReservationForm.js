import React from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { useState } from 'react';
import axios from 'axios';
import swal from 'sweetalert';

const ReservationForm = ({ data }) => {
  const [validated, setValidated] = useState(false);
  const [bookingId, setBookingId] = useState(data ? data.bookingId : null);
  const [referenceId, setReferenceId] = useState(data ? data.referenceId : null);
  const [reservationDate, setReservationDate] = useState(data ? data.reservationDate : null);
  const [createDate, setCreateDate] = useState(data ? data.createDate : null);
  const [trainId, setTrainId] = useState(data ? data.trainId : null);
  const [scheduleId, setScheduleId] = useState(data ? data.scheduleId : null);
  const [seatCount, setSeatCount] = useState(data ? data.seatCount : 0);
  const [reservationType, setReservationType] = useState(data ? data.reservationType : null);
  const [reservationStatus, setReservationStatus] = useState(data ? data.reservationStatus : true);
  const [userNIC, setUserNIC] = useState(data ? data.userNIC : null);

  const handleSubmit = (event) => {
    // const updateStudent = {
    //   name: name,
    //   nic: nic,
    //   email: email,
    //   userRole: userRole,
    //   password: password,
    //   confirmPassword: confirmPassword,
    //   accountStatus: accountStatus,
    // };
    // const form = event.currentTarget;
    // if (form.checkValidity() === false) {
    //   event.preventDefault();
    //   event.stopPropagation();
    // } else {
    //   axios
    //     .put(`http://localhost:5000/student/update/${data._id}`, updateStudent)
    //     .then((data) => console.log(data), swal('Updated!', 'Successfully Updated', 'success'))
    //     .catch((err) => alert(err));
    // }
    setValidated(true);
  };

  return (
    <div className="editform">
      <Form onSubmit={handleSubmit}>
        <Form.Group className="inputreg" controlId="iD">
          <Form.Label>Booking ID</Form.Label>
          <Form.Control
            placeholder="Enter Booking ID"
            value={bookingId}
            onChange={(e) => setBookingId(e.target.value)}
            required
          />
        </Form.Group>

        <Form.Group className="inputreg" controlId="fname">
          <Form.Label>Reference ID</Form.Label>
          <Form.Control
            value={referenceId}
            onChange={(e) => setReferenceId(e.target.value)}
            required
            placeholder="Enter Reference ID"
          />
        </Form.Group>

        <Form.Group className="inputreg" controlId="lname">
          <Form.Label>Reservation Date</Form.Label>
          <Form.Control
            value={reservationDate}
            onChange={(e) => setReservationDate(e.target.value)}
            required
            type="date"
          />
        </Form.Group>

        <Form.Group className="inputreg" controlId="lname">
          <Form.Label>Create Date</Form.Label>
          <Form.Control value={createDate} onChange={(e) => setCreateDate(e.target.value)} required type="date" />
        </Form.Group>

        <Form.Group className="inputreg" controlId="lname">
          <Form.Label>Train ID</Form.Label>
          <Form.Control value={trainId} onChange={(e) => setTrainId(e.target.value)} required />
        </Form.Group>

        <Form.Group className="inputreg" controlId="lname">
          <Form.Label>Schedule ID</Form.Label>
          <Form.Control value={scheduleId} onChange={(e) => setScheduleId(e.target.value)} required />
        </Form.Group>

        <Form.Group className="inputreg" controlId="lname">
          <Form.Label>Seat Count</Form.Label>
          <Form.Control value={seatCount} onChange={(e) => setSeatCount(e.target.value)} required />
        </Form.Group>

        <Form.Group className="inputreg" controlId="lname">
          <Form.Label>Reservation Type</Form.Label>
          <Form.Control value={reservationType} onChange={(e) => setReservationType(e.target.value)} required />
        </Form.Group>

        <Form.Group className="inputreg" controlId="lname">
          <Form.Label>Reservation Status</Form.Label>
          <Form.Control value={reservationStatus} onChange={(e) => setReservationStatus(e.target.value)} required />
        </Form.Group>

        <Form.Group className="inputreg" controlId="lname">
          <Form.Label>Traveler NIC</Form.Label>
          <Form.Control value={userNIC} onChange={(e) => setUserNIC(e.target.value)} required />
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

export default ReservationForm;
