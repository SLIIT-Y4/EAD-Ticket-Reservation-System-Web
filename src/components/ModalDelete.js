import Modal from 'react-bootstrap/Modal';
import { ModalBody, ModalFooter } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import swal from 'sweetalert';
import axios from 'axios';

const ModalDelete = (props) => {
  const deleteUser = () => {
    axios
      .delete(`${process.env.REACT_APP_BASE_URL}Users/${props.data.nic}`)
      .then(() => {
        props.setModalDelete(!props.modalDelete);
      })
      .catch((err) => {
        alert(err);
      });
  };
  const deleteTrain = () => {
    axios
      .delete(`http://localhost:5000/student/delete/${props.data._id}`)
      .then(() => {
        swal('Deleted!', 'Successfully Deleted', 'success');
      })
      .catch((err) => {
        alert(err);
      });
  };

  const deleteSchedule = () => {
    axios
      .delete(`${process.env.REACT_APP_BASE_URL}Schedules/${props.data.scheduleId}`)
      .then(() => {
        props.setModalDelete(!props.modalDelete);
      })
      .catch((err) => {
        alert(err);
      });
  };
  return (
    <Modal {...props} size="" aria-labelledby="contained-modal-title-vcenter" centered>
      <Modal.Header closeButton>
        <Modal.Title>
          Delete{' '}
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
        Are you sure,do you want to delete this record.
        <br />
      </ModalBody>
      <ModalFooter>
        <Button
          onClick={props.type === 'User' ? deleteUser : props.type === 'Schedule' ? deleteSchedule : deleteTrain}
          variant="danger"
        >
          Delete
        </Button>
      </ModalFooter>
    </Modal>
  );
};

export default ModalDelete;
