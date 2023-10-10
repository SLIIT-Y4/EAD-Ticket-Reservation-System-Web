import { Button, IconButton, Tooltip } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { makeStyles } from "@mui/styles";
import { useState } from "react";


const useStyles = makeStyles((theme) => ({
  icon: {
    "& .css-tzssek-MuiSvgIcon-root": {
      fill: "black",
    },
  },
}));

function AuthOptions() {
  const styles = useStyles();
  const { userData, setUserData } = useState(null)
  const navigate = useNavigate();

  const register = () => navigate("/register");

  const login = () => navigate("/login");

  const logout = () => {
    setUserData({
      token: undefined,
      user: undefined,
    });
    localStorage.setItem("auth-token", "");
    navigate("/");
  };
  return (
    <nav className="auth-options">
      {userData && userData.user ? (
        <Button
          style={{
            padding: "15px",
            borderRadius: "8px",
            width: "100px",
            fontSize: "16px",
          }}
          onClick={logout}
        >
          Logout
        </Button>
      ) : (
        <>
          <Tooltip title="Login">
            <IconButton
              aria-label="Login"
              onClick={login}
              className={styles.icon}
            >
              <AccountCircleIcon fontSize="large" />
            </IconButton>
          </Tooltip>
        </>
      )}
    </nav>
  );
}
export default AuthOptions;
