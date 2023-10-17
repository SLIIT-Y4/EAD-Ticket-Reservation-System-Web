import React from 'react';
import { Table } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import { FaPencilAlt, FaTrash } from 'react-icons/fa';
import { useState, useEffect } from 'react';
import ModalDelete from './ModalDelete';
import ModalForm from './ModalForm';
import axios from 'axios';
import BackOfficeSideNavBar from './BackOfficeSideNavBar';

const TravelAgents = () => {
  const [modalUpdate, setModalUpdate] = React.useState(false);
  const [updateView, setUpdateView] = useState(false);
  const [modalDelete, setModalDelete] = useState(false);
  const [deleteView, setDeleteView] = useState(false);
  const [modalAdd, setModalAdd] = useState(false);
  const [isRefresh, setIsRefresh] = useState(false);

  const [travelAgents, setTravelAgents] = useState([]);
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

  useEffect(() => {
    setModalDelete(false);
    getTravelAgents();
  }, [isRefresh]);

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
          <h1 style={{ color: 'Black' }}>Travel Agents</h1>
        </center>
        <hr></hr>
        <div style={{ display: 'flex', float: 'right', paddingRight: '20px' }}>
          <Button onClick={() => setModalAdd(true)}>Add Travel Agent</Button>
        </div>
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
                            setModalUpdate(true);
                            setUpdateView(agent);
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
                            setModalDelete(true);
                            setDeleteView(agent);
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

        <ModalForm
          show={modalUpdate}
          onHide={() => setModalUpdate(false)}
          data={updateView}
          mode={'Update'}
          type={'User'}
        />

        <ModalForm
          show={modalAdd}
          onHide={() => setModalAdd(false)}
          data={undefined}
          mode={'Create'}
          type={'User'}
          userRole="TravelAgent"
        />

        <ModalDelete
          show={modalDelete}
          onHide={() => {
            setModalDelete(false);
            setIsRefresh(!isRefresh);
          }}
          data={deleteView}
          type={'User'}
          modalDelete={isRefresh}
          setModalDelete={setIsRefresh}
        />
      </div>
    </div>
  );
};

export default TravelAgents;
