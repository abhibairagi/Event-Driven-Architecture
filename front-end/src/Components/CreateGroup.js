import { TextField, Button, Autocomplete, DialogTitle, DialogContent, DialogContentText, DialogActions } from '@mui/material'
import axios from 'axios'
import React, { useState, useEffect } from 'react'
// import {  } from "@mui/material"


const CreateGroup = ({handleClose}) => {


    const token = localStorage.getItem("token")

    const [allusers, setallusers] = useState([])


    const [values, setValues] = useState({
        group_name: "",
        inviteUser: []
    })

    const { group_name, inviteUser } = values


    const handleChange = (name) => (event) => {
        setValues({ ...values, [name]: event.target.value })
    }

    

    useEffect(() => {
        getAllUsers()
    }, [])
    





    const handlecreateGroup = async () => {
        await axios.post(`http://localhost:8080/group/create`, values, {
            headers: {
                "Content-type": "application/json",
                Authorization: `Bearer ${token}`,
            },
        })
            .then((res) => {
                handleClose()
            })
            .catch((err) => {

            })
    }

    const getAllUsers = async () => {
        await axios.get(`http://localhost:8080/user/all`, {
            headers: {
                "Content-type": "application/json",
                Authorization: `Bearer ${token}`,
            },
        })
            .then((res) => {
                setallusers(res.data.data)
            })
            .catch((err) => {

            })
    }



    return (
        <div>
            <DialogTitle id="alert-dialog-title">
                Create Group
            </DialogTitle>
            <DialogContent>
                <DialogContentText id="">
                    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                        <TextField id="standard-basic"
                            style={{ margin: '20px' }}
                            value={group_name}
                            onChange={handleChange("group_name")}
                            label="Name"
                            variant="standard"
                        />
                        <Autocomplete
                            variant="standard"
                            multiple
                            style={{ margin: '20px' }}
                            id="combo-box-demo"
                            value={inviteUser}
                            options={allusers}
                            getOptionLabel={(option) => option.full_name}
                            sx={{ width: 300 }}
                            // onChange={handleChange("inviteUser")}
                            renderInput={(params) => <TextField {...params} label="Select User" />}
                        />
                    </div>
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose}>Cancel</Button>
                <Button onClick={handlecreateGroup} autoFocus>
                    Submit
                </Button>
            </DialogActions>
        </div>
    )
}

export default CreateGroup