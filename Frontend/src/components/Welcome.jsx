import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {Typography} from '@mui/material'

axios.defaults.withCredentials = true
let firstRender = true
const Welcome = () => {
    const URL = 'http://localhost:5000/api/user'
    const [user,setUser] = useState()

    const refreshToken = async()=>{
        const res = await axios.get('http://localhost:5000/api/refresh',{
            withCredentials:true
        }).catch(e=>console.log(e))
        const data = await res.data
        return data
    }
    const sendRequest = async()=>{
        console.log("sendRequest","called in welcome")
        const res = await axios.get(URL,{
            withCredentials:true
        }).catch(e=>console.log(e))

        const data = await res.data
        return data
    }

    useEffect(()=>{
        if(firstRender){
            firstRender = false
          sendRequest().then((data) => setUser(data.user));
        }
        // if (!firstRender){
        const interval = setInterval(()=>{
            refreshToken().then(data=>setUser(data.user))
        },1000*28)
        return () => clearInterval(interval);
    // }
    },[firstRender])
  return (
    <div>
      <Typography variant="h3"> Welcome {user && user.name} </Typography>
    </div>
  );
}

export default Welcome