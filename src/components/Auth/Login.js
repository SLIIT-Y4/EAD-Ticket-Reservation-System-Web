import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { makeStyles } from '@mui/styles';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import axios from 'axios';
import Header from '../Layout/Header';

const useStyles = makeStyles((theme) => ({
  root: {
    '& .css-1jrn2fe-MuiGrid-root': {
      height: '60%',
      width: '90%',
      padding: '23px 0px 23px 130px',
      borderRadius: '8px',
      boxShadow: '10px',
    },
  },
}));

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      CDRC
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const theme = createTheme();

export default function Login() {
  const styles = useStyles();
  const [userType, setUserType] = useState(null);
  const [error, setError] = useState(null);
  const [openSuccess, setOpenSuccess] = useState(false);
  const [openError, setOpenError] = useState(false);
  const navigate = useNavigate();

  const handleCloseSuccess = (reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpenSuccess(false);
    if (userType === 'Passenger') {
      navigate('/passenger');
    } else if (userType === 'Manager') {
      navigate('/manager');
    }
  };

  const handleCloseError = (reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpenError(false);
  };

  const handleSubmit = async (event) => {
    // event.preventDefault();
    // const data = new FormData(event.currentTarget);
    // try {
    //   const email = data.get('email');
    //   const password = data.get('password');
    //   const loginUser = { email, password };
    //   const loginResponse = await axios.post('http://localhost:5000/users/login', loginUser);
    //   setOpenSuccess(true);
    //   setUserData({
    //     token: loginResponse.data.token,
    //     user: loginResponse.data.user,
    //   });
    //   localStorage.setItem('auth-token', loginResponse.data.token);
    //   localStorage.setItem('user', loginResponse.data.user);
    //   console.log('usety', loginResponse.data.user.type);
    //   setUserType(loginResponse.data.user.type);
    // } catch (err) {
    //   err.response.data.msg && setError(err.response.data.msg);
    //   setOpenError(true);
    // }
  };

  return (
    <>
      {/* <Header /> */}
      <div style={{ backgroundColor: 'whitesmoke', height: '100vh' }}>
        <div className={styles.root}>
          <ThemeProvider theme={theme}>
            <div style={{ display: 'flex', justifyContent: 'center' }}>
              <Grid container component="main" sx={{ height: '100vh' }}>
                <CssBaseline />
                <Grid
                  item
                  xs={false}
                  sm={4}
                  md={7}
                  sx={{
                    backgroundImage:
                      'url(https://www.myclassboard.com/wp-content/uploads/2021/03/transport-management.png)',
                    backgroundRepeat: 'no-repeat',
                    backgroundColor: (t) => (t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900]),
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                  }}
                />
                <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
                  <Box
                    sx={{
                      my: 8,
                      mx: 4,
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                    }}
                  >
                    <Avatar sx={{ m: 1, bgcolor: '#4287f5' }}>
                      <LockOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                      Sign in
                    </Typography>
                    <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
                      <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="email"
                        label="Email Address"
                        name="email"
                        autoComplete="email"
                        autoFocus
                      />
                      <TextField
                        margin="normal"
                        required
                        fullWidth
                        name="password"
                        label="Password"
                        type="password"
                        id="password"
                        autoComplete="current-password"
                      />
                      <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                        style={{ backgroundColor: '#4287f5', lineHeight: '30px', marginTop: '5px' }}
                      >
                        Sign In
                      </Button>
                      <Grid container>
                        <Grid item xs>
                          <Link href="#" variant="body2">
                            Forgot password?
                          </Link>
                        </Grid>
                        <Grid item>
                          <Link href="/register" variant="body2">
                            {"Don't have an account? Sign Up"}
                          </Link>
                        </Grid>
                      </Grid>
                      <Copyright sx={{ mt: 5 }} />
                    </Box>
                  </Box>
                </Grid>
              </Grid>
            </div>
          </ThemeProvider>
          <Snackbar
            open={openSuccess}
            autoHideDuration={3000}
            onClose={handleCloseSuccess}
            anchorOrigin={{ horizontal: 'center', vertical: 'bottom' }}
          >
            <Alert onClose={handleCloseSuccess} severity="success" sx={{ width: '100%' }}>
              Login successful, redirecting...
            </Alert>
          </Snackbar>
          <Snackbar
            open={openError}
            autoHideDuration={3000}
            onClose={handleCloseError}
            anchorOrigin={{ horizontal: 'center', vertical: 'bottom' }}
          >
            <Alert onClose={handleCloseError} severity="error" sx={{ width: '100%' }}>
              {error}
            </Alert>
          </Snackbar>
        </div>
      </div>
    </>
  );
}
