import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { useState } from 'react';
import axios from 'axios';
import swal from 'sweetalert';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [password, setPassword] = useState('');
  const [nic, setNIC] = useState('');

  const navigate1 = useNavigate();
  const navigate = (type) => {
    console.log('type', type);
    if (type == 'Traveler') {
      swal('Error !', 'Access Denied', 'error');
    } else if (type == 'Admin' || type == 'TravelAgent') {
      navigate1('/travelers');
      swal('Success!', 'Login Successful', 'success');
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const user = {
      nic: nic,
      password: password,
    };
    axios.post(`${process.env.REACT_APP_BASE_URL}Logins/login`, user).then((res) => {
      if (res && res.status === 200) {
        const token = res.data;
        sessionStorage.setItem('token', JSON.stringify(token));
        navigate(token.userRole);
      } else {
        swal('Error !', 'Invalid Credentials', 'error');
      }
    });
  };

  return (
    <>
      <div>
        <div className="ContainerL">
          <div className="wrapperl">
            <div className="loginform">
              <h1> SIGN IN</h1>
              <hr />
              <Form onSubmit={handleSubmit}>
                <Form.Group className="input" controlId="email">
                  <Form.Label>Username</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter your NIC"
                    value={nic}
                    onChange={(e) => setNIC(e.target.value)}
                    required
                  />
                </Form.Group>

                <Form.Group className="input" controlId="password">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Enter a Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                  <Form.Control.Feedback type="invalid">Please enter a valid password.</Form.Control.Feedback>
                </Form.Group>

                <br />
                <Button variant="success" type="submit">
                  Login
                </Button>

                <br />
                <br />
              </Form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
