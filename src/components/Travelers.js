import React from 'react';
import { Table } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import { FaPencilAlt, FaTrash } from 'react-icons/fa';
import { useState, useEffect } from 'react';
import axios from 'axios';
import TravelAgentSideNavBar from './TravelAgentSideNavBar';
import BackOfficeSideNavBar from './BackOfficeSideNavBar';
import ModalDelete from './ModalDelete';
import ModalForm from './ModalForm';

const Travelers = () => {
  const [modalUpdate, setModalUpdate] = useState(false);
  const [updateView, setUpdateView] = useState(false);
  const [modalDelete, setModalDelete] = useState(false);
  const [deleteView, setDeleteView] = useState(false);
  const [modalAdd, setModalAdd] = useState(false);
  const [isRefresh, setIsRefresh] = useState(false);

  const [travelers, setTravelers] = useState([]);

  const token = JSON.parse(sessionStorage.getItem('token'));

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

  useEffect(() => {
    setModalDelete(false);
    getTravelers();
  }, [isRefresh]);

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
          <h1 style={{ color: 'Black' }}>Travelers</h1>
        </center>
        <hr></hr>
        <div style={{ display: 'flex', float: 'right', paddingRight: '20px' }}>
          <Button onClick={() => setModalAdd(true)}>Add Traveler</Button>
        </div>
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
                            setModalUpdate(true);
                            setUpdateView(traveler);
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
                            setModalDelete(true);
                            setDeleteView(traveler);
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

        <ModalForm
          show={modalUpdate}
          onHide={() => setModalUpdate(false)}
          data={updateView}
          mode={'Update'}
          type={'User'}
          userRole="Traveler"
        />

        <ModalForm
          show={modalAdd}
          onHide={() => setModalAdd(false)}
          data={undefined}
          mode={'Create'}
          type={'User'}
          userRole="Traveler"
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

export default Travelers;
