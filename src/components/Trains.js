import React from 'react';
import { Table } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import { FaPencilAlt, FaTrash } from 'react-icons/fa';
import { useState, useEffect } from 'react';
import ModleStudentDelete from './AdminModalDelStudents';
import ModalnewStudent from './AdminModalUpdStudent';
import axios from 'axios';
import BackOfficeSideNavBar from './BackOfficeSideNavBar';

const Trains = () => {
  const [modalStuUpdate, setmodalStuUpdate] = React.useState(false);
  const [updateAdminStudentView, setupdateAdminStudentView] = useState(false);
  const [modaldeleteStudent, setModaldeleteStudent] = useState(false);
  const [deleteAdminStudentView, setdeleteAdminStudentView] = useState(false);

  const [trains, setTrains] = useState([]);

  useEffect(() => {
    const getTrains = () => {
      axios
        .get(`${process.env.REACT_APP_BASE_URL}Trains`)
        .then((res) => {
          setTrains(res.data);
        })
        .catch((err) => {
          alert(err.msg);
        });
    };
    getTrains();
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
          <h1 style={{ color: 'Black' }}>Trains</h1>
        </center>
        <hr></hr>

        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Train ID</th>
              <th>Name</th>
              <th>Start Point</th>
              <th>Destination</th>
              <th>Type</th>
              <th>Route</th>
              <th>Status</th>
              <th>Edit</th>
              <th>Delete</th>
            </tr>
          </thead>
          {trains.map((train) => (
            <tbody key={train.trainId}>
              <tr>
                <td>{train.trainId}</td>
                <td>{train.name}</td>
                <td>{train.startPoint}</td>
                <td>{train.destination}</td>
                <td>{train.type}</td>
                <td>{train.routeCategory}</td>
                <td>{train.activeStatus ? 'Active' : 'Inactive'}</td>

                <td>
                  <div>
                    &nbsp;&nbsp;&nbsp;
                    <span>
                      <FaPencilAlt
                        onClick={() => {
                          setmodalStuUpdate(true);
                          setupdateAdminStudentView(train);
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
                          setdeleteAdminStudentView(train);
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

export default Trains;
