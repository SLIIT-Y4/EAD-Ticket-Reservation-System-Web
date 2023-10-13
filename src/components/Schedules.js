import React from 'react';
import { Table } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import { FaPencilAlt, FaTrash } from 'react-icons/fa';
import { useState, useEffect } from 'react';
import ModleStudentDelete from './AdminModalDelStudents';
import ModalnewStudent from './AdminModalUpdStudent';
import axios from 'axios';
import BackOfficeSideNavBar from './BackOfficeSideNavBar';
import moment from 'moment/moment';

const Schedules = () => {
  const [modalStuUpdate, setmodalStuUpdate] = React.useState(false);
  const [updateAdminStudentView, setupdateAdminStudentView] = useState(false);
  const [modaldeleteStudent, setModaldeleteStudent] = useState(false);
  const [deleteAdminStudentView, setdeleteAdminStudentView] = useState(false);

  const [schedules, setSchedules] = useState([]);

  useEffect(() => {
    const getSchedules = () => {
      axios
        .get(`${process.env.REACT_APP_BASE_URL}Schedules`)
        .then((res) => {
          setSchedules(res.data);
        })
        .catch((err) => {
          alert(err.msg);
        });
    };
    getSchedules();
  }, []);

  return (
    <div
      style={{
        height: '100vh',
        backgroundSize: 'cover',
      }}
    >
      <BackOfficeSideNavBar />

      <div className="stable">
        <br></br>
        <center>
          <h1 style={{ color: 'Black' }}>Schedules</h1>
        </center>
        <hr></hr>

        <Table striped bordered hover>
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
              <th>Edit</th>
              <th>Delete</th>
            </tr>
          </thead>
          {schedules.map((schedule) => (
            <tbody key={schedule.scheduleId}>
              <tr>
                <td>{schedule.trainId}</td>
                <td>{moment(schedule.day).format('MMM Do YYYY')}</td>
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
                          setmodalStuUpdate(true);
                          setupdateAdminStudentView(schedule);
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
                          setdeleteAdminStudentView(schedule);
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

export default Schedules;
