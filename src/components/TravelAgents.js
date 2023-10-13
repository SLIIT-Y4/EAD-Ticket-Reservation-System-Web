import React from 'react';
import { Table } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import { FaPencilAlt, FaTrash } from 'react-icons/fa';
import { useState, useEffect } from 'react';
import ModleStudentDelete from './AdminModalDelStudents';
import ModalnewStudent from './AdminModalUpdStudent';
import axios from 'axios';
import BackOfficeSideNavBar from './BackOfficeSideNavBar';

const TravelAgents = () => {
  const [modalStuUpdate, setmodalStuUpdate] = React.useState(false);
  const [updateAdminStudentView, setupdateAdminStudentView] = useState(false);
  const [modaldeleteStudent, setModaldeleteStudent] = useState(false);
  const [deleteAdminStudentView, setdeleteAdminStudentView] = useState(false);

  const [travelAgents, setTravelAgents] = useState([]);

  useEffect(() => {
    const getTravelAgents = () => {
      axios
        .get(`${process.env.REACT_APP_BASE_URL}Users`)
        .then((res) => {
          setTravelAgents(res.data);
        })
        .catch((err) => {
          alert(err.msg);
        });
    };
    getTravelAgents();
  }, []);

  return (
    <div
      style={{
        //backgroundImage: `url("https://img.wallpapersafari.com/desktop/1024/576/90/30/9oCdMj.jpg")`,
        height: '100vh',
        backgroundSize: 'cover',
      }}
    >
      <BackOfficeSideNavBar />
      <div className="stable">
        <br></br>
        <center>
          <h1 style={{ color: 'Black' }}>Travel Agents</h1>
        </center>
        <hr></hr>

        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>NIC</th>
              {/* <th>Status</th> */}
              <th>Edit</th>
              <th>Delete</th>
            </tr>
          </thead>
          {travelAgents
            .filter((user) => user.userRole === 'TravelAgent')
            .map((agent) => (
              <tbody key={agent._id}>
                <tr>
                  <td>{agent.name}</td>
                  <td>{agent.email}</td>
                  <td>{agent.nic}</td>
                  {/* <td>{traveler.accountStatus}</td> */}

                  <td>
                    <div>
                      &nbsp;&nbsp;&nbsp;
                      <span>
                        <FaPencilAlt
                          onClick={() => {
                            setmodalStuUpdate(true);
                            setupdateAdminStudentView(agent);
                          }}
                          style={{ cursor: 'pointer', color: 'blue' }}
                          title="Update travel agent's details"
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
                            setdeleteAdminStudentView(agent);
                          }}
                          style={{ cursor: 'pointer', color: 'red' }}
                          title="Delete the travel agent"
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

export default TravelAgents;
