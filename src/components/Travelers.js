import React from 'react';
import { Table } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import { FaPencilAlt, FaTrash } from 'react-icons/fa';
import { useState, useEffect } from 'react';
import ModleStudentDelete from './AdminModalDelStudents';
import ModalnewStudent from './AdminModalUpdStudent';
import axios from 'axios';
import TravelAgentSideNavBar from './TravelAgentSideNavBar';
import BackOfficeSideNavBar from './BackOfficeSideNavBar';

const Travelers = () => {
  const [modalStuUpdate, setmodalStuUpdate] = React.useState(false);
  const [updateAdminStudentView, setupdateAdminStudentView] = useState(false);
  const [modaldeleteStudent, setModaldeleteStudent] = useState(false);
  const [deleteAdminStudentView, setdeleteAdminStudentView] = useState(false);

  const [travelers, setTravelers] = useState([]);

  const token = JSON.parse(sessionStorage.getItem('token'));

  useEffect(() => {
    const getTravelers = () => {
      axios
        .get(`${process.env.REACT_APP_BASE_URL}Users`)
        .then((res) => {
          setTravelers(res.data);
        })
        .catch((err) => {
          alert(err.msg);
        });
    };
    getTravelers();
  }, []);

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
          <h1 style={{ color: 'Black' }}>Travelers</h1>
        </center>
        <hr></hr>

        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>NIC</th>
              <th>Status</th>
              <th>Edit</th>
              <th>Delete</th>
            </tr>
          </thead>
          {travelers
            .filter((user) => user.userRole === 'Traveler')
            .map((traveler) => (
              <tbody key={traveler._id}>
                <tr>
                  <td>{traveler.name}</td>
                  <td>{traveler.email}</td>
                  <td>{traveler.nic}</td>
                  <td>{traveler.accountStatus}</td>

                  <td>
                    <div>
                      &nbsp;&nbsp;&nbsp;
                      <span>
                        <FaPencilAlt
                          onClick={() => {
                            setmodalStuUpdate(true);
                            setupdateAdminStudentView(traveler);
                          }}
                          style={{ cursor: 'pointer', color: 'blue' }}
                          title="Update the travelers details"
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
                            setdeleteAdminStudentView(traveler);
                          }}
                          style={{ cursor: 'pointer', color: 'red' }}
                          title="Delete the traveler"
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

export default Travelers;
