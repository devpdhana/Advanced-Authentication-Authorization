import { Box, Button, TextField, Typography } from '@mui/material'
import React, { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const Login = ({ isLoggedin, setIsLoggedin }) => {
  const URL = "http://localhost:5000/api/login";
  const history = useNavigate();
  const [inputs, setInputs] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setInputs((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const sendRequest = async () => {
    const res = await axios.post(URL, inputs).catch((e) => console.log(e));
    const data = await res.data;
    return data;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    sendRequest()
      .then((data) => setIsLoggedin(!isLoggedin))
      .then(() => history("/user"));
    // history('/user')
  };
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <Box
          marginLeft={"auto"}
          marginRight={"auto"}
          width={400}
          display={"flex"}
          flexDirection={"column"}
          justifyContent={"center"}
          alignItems={"center"}
        >
          <Typography variant="h2">Signup</Typography>
          <TextField
            name="email"
            value={inputs.email}
            onChange={handleChange}
            type="email"
            variant="outlined"
            placeholder="Email"
            margin="normal"
          />
          <TextField
            name="password"
            value={inputs.password}
            onChange={handleChange}
            type="password"
            variant="outlined"
            placeholder="Password"
            margin="normal"
          />
          <Button variant="contained" type="submit">
            Signup
          </Button>
        </Box>
      </form>
    </div>
  );
};

export default Login