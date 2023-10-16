import React from 'react';
import { Table } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import { FaPencilAlt, FaTrash } from 'react-icons/fa';
import { useState, useEffect } from 'react';
import ModalDelete from './ModalDelete';
import ModalForm from './ModalForm';
import axios from 'axios';
import BackOfficeSideNavBar from './BackOfficeSideNavBar';
import moment from 'moment/moment';

const Schedules = () => {
  const [modalUpdate, setModalUpdate] = React.useState(false);
  const [updateView, setUpdateView] = useState(false);
  const [modalDelete, setModalDelete] = useState(false);
  const [deleteView, setDeleteView] = useState(false);
  const [modalAdd, setModalAdd] = useState(false);
  const [isRefresh, setIsRefresh] = useState(false);

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
          <h1 style={{ color: 'Black' }}>Schedules</h1>
        </center>
        <hr></hr>
        <div style={{ display: 'flex', float: 'right', paddingRight: '20px' }}>
          <Button onClick={() => setModalAdd(true)}>Add Schedule</Button>
        </div>
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
                <td>{schedule.day}</td>
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
                          setModalUpdate(true);
                          setUpdateView(schedule);
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
                          setDeleteView(schedule);
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
          type={'Schedule'}
        />

        <ModalForm
          show={modalAdd}
          onHide={() => setModalAdd(false)}
          data={updateView}
          mode={'Create'}
          type={'Schedule'}
        />

        <ModalDelete
          show={modalDelete}
          onHide={() => {
            setModalDelete(false);
            setIsRefresh(!isRefresh);
          }}
          data={deleteView}
          type={'Schedule'}
          modalDelete={modalDelete}
          setModalDelete={setModalDelete}
        />
      </div>
    </div>
  );
};

export default Schedules;
