import { AppBar } from '@mui/material';
import React from 'react';
import { Link } from 'react-router-dom';
import { makeStyles } from '@mui/styles';
import AuthOptions from '../Auth/AuthOptions';

const useStyles = makeStyles((theme) => ({
  AppBar: {
    '& .MuiAppBar-colorPrimary': {
      backgroundColor: '#4287f5',
    },
  },
  icon: {
    '& .css-tzssek-MuiSvgIcon-root': {
      fill: 'black',
    },
  },
}));

const Header = () => {
  const styles = useStyles();
  return (
    <div className={styles.AppBar}>
      <AppBar position="sticky" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            padding: '10px 15px 10px 15px',
          }}
        >
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              width: '400px',
            }}
          >
            <Link to="/" style={{ textDecoration: 'none', color: 'black' }}>
              <h1 style={{ letterSpacing: '0.1em' }}>Easy Going</h1>
            </Link>
            <Link to="/manager" style={{ textDecoration: 'none', color: 'black' }}>
              <h5 style={{ paddingTop: '15px' }}>Dashboard</h5>
            </Link>
          </div>
          <AuthOptions />
        </div>
      </AppBar>
    </div>
  );
};

export default Header;
