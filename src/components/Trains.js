import React from 'react';
import { Table } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import { FaPencilAlt, FaTrash } from 'react-icons/fa';
import { useState, useEffect } from 'react';
import ModalDelete from './ModalDelete';
import ModalForm from './ModalForm';
import axios from 'axios';
import BackOfficeSideNavBar from './BackOfficeSideNavBar';

const Trains = () => {
  const [modalUpdate, setModalUpdate] = React.useState(false);
  const [updateView, setUpdateView] = useState(false);
  const [modalDelete, setModalDelete] = useState(false);
  const [deleteView, setDeleteView] = useState(false);
  const [modalAdd, setModalAdd] = useState(false);
  const [isRefresh, setIsRefresh] = useState(false);

  const [trains, setTrains] = useState([]);

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

  useEffect(() => {
    setModalDelete(false);
    getTrains();
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
          <h1 style={{ color: 'Black' }}>Trains</h1>
        </center>
        <hr></hr>
        <div style={{ display: 'flex', float: 'right', paddingRight: '20px' }}>
          <Button onClick={() => setModalAdd(true)}>Add Train</Button>
        </div>
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
                          setModalUpdate(true);
                          setUpdateView(train);
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
                          setModalDelete(true);
                          setDeleteView(train);
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

        <ModalForm
          show={modalUpdate}
          onHide={() => setModalUpdate(false)}
          data={updateView}
          mode={'Update'}
          type={'Train'}
        />

        <ModalForm
          show={modalAdd}
          onHide={() => setModalUpdate(false)}
          data={updateView}
          mode={'Create'}
          type={'Train'}
        />

        <ModalDelete
          show={modalDelete}
          onHide={() => {
            setModalDelete(false);
            setIsRefresh(!isRefresh);
          }}
          data={deleteView}
          type={'Train'}
          modalDelete={isRefresh}
          setModalDelete={setIsRefresh}
        />
      </div>
    </div>
  );
};

export default Trains;
