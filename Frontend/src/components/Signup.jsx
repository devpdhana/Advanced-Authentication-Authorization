import { Box, Button, TextField, Typography } from '@mui/material'
import React, { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom';

const Signup = () => {
    const URL = "http://localhost:5000/api/signup";
    const history = useNavigate()
    const [inputs,setInputs] = useState({
        name:"",email:"",password:""
    })

    const handleChange = (e)=>{
        setInputs((prevState)=>({
            ...prevState,[e.target.name]:e.target.value
        }))
    }

    const sendRequest = async()=>{
        await axios.post(URL,inputs).then((data)=>console.log(data.data)).catch(e=>console.log(e))
    }

    const handleSubmit = (e)=>{
        e.preventDefault()
        console.log(inputs)
        sendRequest().then(()=>history('/login'))
    }
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
          <TextField name='name' value={inputs.name} onChange={handleChange} variant="outlined" placeholder="Name" margin="normal" />
          <TextField name='email' value={inputs.email} onChange={handleChange} type="email" variant="outlined" placeholder="Email" margin="normal" />
          <TextField name='password' value={inputs.password} onChange={handleChange}type='password' variant="outlined" placeholder="Password" margin="normal" />
          <Button variant='contained' type="submit">Signup</Button>
        </Box>
      </form>
    </div>
  );
}

export default Signup