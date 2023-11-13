import React, { useState } from 'react'
import {AppBar, Box, Button, Tab, Tabs, Toolbar, Typography} from '@mui/material'
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const Header = ({ isLoggedin, setIsLoggedin }) => {
  const [value, setValue] = useState();
  const history = useNavigate();

  const sendLogoutReq = async () => {
    const res = await axios
      .post("http://localhost:5000/api/logout", null, {
        withCredentials: true,
      })
      .catch((e) => console.log(e));

      if(res.status == 200){
        return res
      }
      return new Error("Unable to logout,Please try again")
  };

  const handleLogout = () => {
    sendLogoutReq()
      .then(() => setIsLoggedin(!isLoggedin))
      .then(() => history("/login"));
  };
  return (
    <AppBar position="sticky">
      <Toolbar>
        <Typography variant="h3">Authentication</Typography>
        <Box sx={{ marginLeft: "auto" }}>
          <Tabs
            onChange={(e, val) => setValue(val)}
            value={value}
            indicatorColor="secondary"
            textColor="inherit"
          >
            {!isLoggedin &&
              <>
                <Tab to="/login" LinkComponent={Link} label="Login" />
                <Tab to="/signup" LinkComponent={Link} label="Singup" />
              </>
            }
            {isLoggedin && (
              <Button sx={{color:'inherit'}} onClick={handleLogout}>Logout</Button>
            )}
          </Tabs>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header