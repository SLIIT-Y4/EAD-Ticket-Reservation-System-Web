import React from 'react';
import Modal from 'react-bootstrap/Modal';
import UserForm from './UserForm';
import { ModalBody } from 'react-bootstrap';
import { Button } from 'react-bootstrap';
import ReservationForm from './ReservationForm';
import ScheduleForm from './ScheduleForm';
import TrainForm from './TrainForm';

const ModalForm = (props) => {
  return (
    <Modal {...props} size="" aria-labelledby="contained-modal-title-vcenter" centered>
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          {props.mode === 'Create' ? 'Add' : 'Edit'}{' '}
          {props.type === 'User'
            ? 'Profile'
            : props.type === 'Train'
            ? 'Train'
            : props.type === 'Schedule'
            ? 'Schedule'
            : 'Reservation'}
        </Modal.Title>
      </Modal.Header>
      <ModalBody>
        {props.type === 'User' ? (
          <UserForm data={props.data} role={props.userRole} />
        ) : props.type === 'Train' ? (
          <TrainForm data={props.data} />
        ) : props.type === 'Schedule' ? (
          <ScheduleForm data={props.data} />
        ) : (
          <ReservationForm data={props.data} />
        )}
      </ModalBody>
      <Modal.Footer>
        <Button onClick={props.onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ModalForm;
