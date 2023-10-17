import React from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { useState } from 'react';
import axios from 'axios';
import swal from 'sweetalert';
import moment from 'moment';

const ReservationForm = ({ data, id }) => {
  const [validated, setValidated] = useState(false);
  const [bookingId, setBookingId] = useState(data ? data.bookingId : null);
  const [referenceId, setReferenceId] = useState(data ? data.referenceId : null);
  const [reservationDate, setReservationDate] = useState(data ? data.reservationDate : null);
  const [createDate, setCreateDate] = useState(data ? data.createDate : null);
  const [trainId, setTrainId] = useState(data ? data.trainId : null);
  const [scheduleId, setScheduleId] = useState(data ? data.scheduleId : id);
  const [seatCount, setSeatCount] = useState(data ? data.seatCount : 0);
  const [reservationType, setReservationType] = useState(data ? data.reservationType : null);
  const [reservationStatus, setReservationStatus] = useState(data ? data.reservationStatus : true);
  const [userNIC, setUserNIC] = useState(data ? data.userNIC : null);

  console.log('date', reservationDate);

  const handleSubmit = async (event) => {
    const formattedReservationDate = new Date(reservationDate);
    const formattedCreateDate = new Date();
    const reservation = {
      bookingId: bookingId,
      referenceId: referenceId,
      reservationDate: formattedReservationDate.toISOString(),
      createDate: formattedCreateDate.toISOString(),
      trainId: trainId,
      scheduleId: scheduleId,
      seatCount: seatCount,
      reservationType: reservationType,
      reservationStatus: reservationStatus,
      userNIC: userNIC,
    };
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    } else {
      if (!data) {
        await axios
          .post(`${process.env.REACT_APP_BASE_URL}Reservations`, reservation)
          .then((data) => console.log(data), swal('Saved!', 'Successfully Saved', 'success'))
          .catch((err) => alert(err));
      } else {
        await axios
          .put(`${process.env.REACT_APP_BASE_URL}Reservations/${bookingId}`, reservation)
          .then((data) => console.log(data), swal('Updated!', 'Successfully Saved', 'success'))
          .catch((err) => alert(err));
      }
    }
    setValidated(true);
  };

  return (
    <div className="editform">
      <Form onSubmit={handleSubmit}>
        {/* <Form.Group className="inputreg" controlId="iD">
          <Form.Label>Booking ID</Form.Label>
          <Form.Control
            placeholder="Enter Booking ID"
            value={bookingId}
            onChange={(e) => setBookingId(e.target.value)}
            required
          />
        </Form.Group> */}

        <Form.Group className="inputreg" controlId="fname">
          <Form.Label>Reference ID</Form.Label>
          <Form.Control
            value={referenceId}
            onChange={(e) => setReferenceId(e.target.value)}
            required
            placeholder="Enter Reference ID"
          />
        </Form.Group>
        {data ? (
          <Form.Group className="inputreg" controlId="lname">
            <Form.Label>Reservation Date</Form.Label>
            <Form.Control
              value={moment(reservationDate).format('YYYY-MM-DD')}
              onChange={(e) => setReservationDate(e.target.value)}
              required
              type="text"
              disabled
            />
          </Form.Group>
        ) : (
          <Form.Group className="inputreg" controlId="lname">
            <Form.Label>Reservation Date</Form.Label>
            <Form.Control
              value={reservationDate}
              onChange={(e) => setReservationDate(e.target.value)}
              required
              type="date"
            />
          </Form.Group>
        )}
        {/* <Form.Group className="inputreg" controlId="lname">
          <Form.Label>Create Date</Form.Label>
          <Form.Control value={createDate} onChange={(e) => setCreateDate(e.target.value)} required type="date" />
        </Form.Group> */}

        <Form.Group className="inputreg" controlId="lname">
          <Form.Label>Train ID</Form.Label>
          <Form.Control value={trainId} onChange={(e) => setTrainId(e.target.value)} required />
        </Form.Group>

        <Form.Group className="inputreg" controlId="lname">
          <Form.Label>Schedule ID</Form.Label>
          <Form.Control value={scheduleId} onChange={(e) => setScheduleId(e.target.value)} required disabled />
        </Form.Group>

        <Form.Group className="inputreg" controlId="lname">
          <Form.Label>Seat Count</Form.Label>
          <Form.Control value={seatCount} onChange={(e) => setSeatCount(e.target.value)} required />
        </Form.Group>

        <Form.Group className="inputreg" controlId="lname">
          <Form.Label>Reservation Type</Form.Label>
          <Form.Select value={reservationType} onChange={(e) => setReservationType(e.target.value)} required>
            <option selected disabled hidden>
              Reservation Type
            </option>
            <option>1st Class</option>
            <option>2nd Class</option>
            <option>3rd Class</option>
          </Form.Select>
        </Form.Group>

        <Form.Group className="inputreg" controlId="lname">
          <Form.Label>Traveler NIC</Form.Label>
          <Form.Control value={userNIC} onChange={(e) => setUserNIC(e.target.value)} required />
        </Form.Group>

        <Button variant="primary" type="submit">
          {data ? 'Save Changes' : 'Save'}
        </Button>
      </Form>
    </div>
  );
};

export default ReservationForm;
