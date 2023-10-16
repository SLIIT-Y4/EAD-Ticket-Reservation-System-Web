import React from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { useState } from 'react';
import axios from 'axios';
import swal from 'sweetalert';

const UserForm = ({ data, role }) => {
  const [validated, setValidated] = useState(false);
  const [id, setId] = useState(data ? data.ID : null);
  const [name, setName] = useState(data ? data.name : null);
  const [nic, setNIC] = useState(data ? data.nic : null);
  const [email, setEmail] = useState(data ? data.email : null);
  const [password, setPassword] = useState(data ? data.password : null);
  const [confirmPassword, setConfirmPassword] = useState(data ? data.confirmPassword : null);

  const userRole = data ? data.userRole : role;
  const accountStatus = data ? data.accountStatus : 'Active';

  const handleSubmit = async (event) => {
    const user = {
      name: name,
      nic: nic,
      email: email,
      userRole: userRole,
      password: password,
      confirmPassword: confirmPassword,
      accountStatus: accountStatus,
    };

    const loginUser = {
      nic: nic,
      password: password,
    };
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    } else {
      if (!data) {
        await axios
          .post(`${process.env.REACT_APP_BASE_URL}Users`, user)
          .then((data) => console.log('Users', data), swal('Saved!', 'Successfully Added', 'success'))
          .catch((err) => alert(err));

        await axios
          .post(`${process.env.REACT_APP_BASE_URL}Logins/signup`, loginUser)
          .then((data) => console.log('Signup', data))
          .catch((err) => alert(err));
      } else {
        await axios
          .put(`${process.env.REACT_APP_BASE_URL}Users/${nic}`, user)
          .then((data) => console.log('Users', data), swal('Updated!', 'Successfully Saved', 'success'))
          .catch((err) => alert(err));
      }
    }
    setValidated(true);
  };

  return (
    <div className="editform">
      <Form onSubmit={handleSubmit}>
        <Form.Group className="inputreg" controlId="name">
          <Form.Label>Name</Form.Label>
          <Form.Control placeholder="Enter Name" value={name} onChange={(e) => setName(e.target.value)} required />
        </Form.Group>

        <Form.Group className="inputreg" controlId="nic">
          <Form.Label>NIC</Form.Label>
          <Form.Control
            pattern="^([0-9]{9}[x|X|v|V]|[0-9]{12})$"
            value={nic}
            onChange={(e) => setNIC(e.target.value)}
            required
            placeholder="Enter National Identity Card Number"
            disabled={data ? true : false}
          />
        </Form.Group>

        <Form.Group className="inputreg" controlId="email">
          <Form.Label>Email</Form.Label>
          <Form.Control value={email} onChange={(e) => setEmail(e.target.value)} required placeholder="Enter Email" />
        </Form.Group>
        {!data && (
          <>
            <Form.Group className="inputreg" controlId="password">
              <Form.Label>Password</Form.Label>
              <Form.Control
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                type="password"
                placeholder="Enter New Password"
              />
            </Form.Group>

            <Form.Group className="inputreg" controlId="cPassword">
              <Form.Label>Confirm Password</Form.Label>
              <Form.Control
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                placeholder="Retype New Password"
                type="password"
              />
            </Form.Group>
          </>
        )}

        {/* <Form.Group className="inputreg">
          <Form.Label>Faculty</Form.Label>
          <Form.Select aria-label="Feedback Type" value={fclty} onChange={(e) => setFaculty(e.target.value)}>
            <option selected disabled hidden>
              Faculty Type
            </option>
            <option>Select your faculty</option>
            <option>Computing</option>
            <option>Bussiness</option>
            <option>Engineering</option>
            <option>Humanaties and sciences</option>
            <option>School of Architecture</option>
            <option>Graduate studies and reseach</option>
            <option>School of Law</option>
          </Form.Select>
        </Form.Group> */}

        <Button variant="primary" type="submit">
          {data ? 'Save Changes' : 'Save'}
        </Button>
      </Form>
    </div>
  );
};

export default UserForm;
