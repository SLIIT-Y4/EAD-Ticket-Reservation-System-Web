import React from 'react';
import { Table } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import { FaPencilAlt, FaTrash } from 'react-icons/fa';
import { useState, useEffect } from 'react';
import ModleStudentDelete from './AdminModalDelStudents';
import ModalnewStudent from './AdminModalUpdStudent';
import axios from 'axios';
import BackOfficeSideNavBar from './BackOfficeSideNavBar';
import TravelAgentSideNavBar from './TravelAgentSideNavBar';
import moment from 'moment/moment';
import { useNavigate } from 'react-router-dom';

const Reservations = () => {
  const [modalStuUpdate, setmodalStuUpdate] = React.useState(false);
  const [updateAdminStudentView, setupdateAdminStudentView] = useState(false);
  const [modaldeleteStudent, setModaldeleteStudent] = useState(false);
  const [deleteAdminStudentView, setdeleteAdminStudentView] = useState(false);

  const [reservations, setReservations] = useState([]);
  const token = JSON.parse(sessionStorage.getItem('token'));

  const navigate = useNavigate();

  useEffect(() => {
    const getReservations = () => {
      axios
        .get(`${process.env.REACT_APP_BASE_URL}Reservations`)
        .then((res) => {
          setReservations(res.data);
        })
        .catch((err) => {
          alert(err.msg);
        });
    };
    getReservations();
  }, []);

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
          <h1 style={{ color: 'Black' }}>Reservations</h1>
        </center>
        <hr></hr>
        <div style={{ display: 'flex', float: 'right', paddingRight: '20px' }}>
          <Button onClick={() => navigate('/create-reservation')}>Create Reservation</Button>
        </div>
        <Table striped bordered hover style={{ marginTop: '70px' }}>
          <thead>
            <tr>
              <th>Booking ID</th>
              <th>Reference ID</th>
              <th>Reservation Date</th>
              <th>Create Date</th>
              <th>Train ID</th>
              <th>Schedule ID</th>
              <th>Seat Count</th>
              <th>Class</th>
              <th>Status</th>
              <th>User</th>
              <th>Edit</th>
              <th>Delete</th>
            </tr>
          </thead>
          {reservations.map((reservation) => (
            <tbody key={reservation.bookingId}>
              <tr>
                <td>{reservation.trainId}</td>
                <td>{reservation.referenceId}</td>
                <td>{moment(reservation.reservationDate).format('MMM Do YYYY')}</td>
                <td>{moment(reservation.createDate).format('MMM Do YYYY')}</td>
                <td>{reservation.trainId}</td>
                <td>{reservation.scheduleId}</td>
                <td>{reservation.seatCount}</td>
                <td>{reservation.reservationType}</td>
                <td>{reservation.reservationStatus ? 'Active' : 'Inactive'}</td>
                <td>{reservation.userNIC}</td>

                <td>
                  <div>
                    &nbsp;&nbsp;&nbsp;
                    <span>
                      <FaPencilAlt
                        onClick={() => {
                          setmodalStuUpdate(true);
                          setupdateAdminStudentView(reservation);
                        }}
                        style={{ cursor: 'pointer', color: 'blue' }}
                        title="Update the student details"
                      />
                    </span>
                  </div>
                </td>

                <td>
                  <div>
                    &nbsp;&nbsp;&nbsp;
                    <span>
                      <FaTrash
                        onClick={() => {
                          setModaldeleteStudent(true);
                          setdeleteAdminStudentView(reservation);
                        }}
                        style={{ cursor: 'pointer', color: 'red' }}
                        title="Delete the student"
                      />
                    </span>
                  </div>
                </td>
              </tr>
            </tbody>
          ))}
        </Table>

        <ModalnewStudent
          show={modalStuUpdate}
          onHide={() => setmodalStuUpdate(false)}
          profile={updateAdminStudentView}
        />

        <ModleStudentDelete
          show={modaldeleteStudent}
          onHide={() => setModaldeleteStudent(false)}
          deleteAdminStudentView={deleteAdminStudentView}
        />
      </div>
    </div>
  );
};

export default Reservations;
