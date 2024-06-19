import React, { useState , useEffect , useMemo } from 'react'
import "./TextToAudio.css"
import { io } from "socket.io-client"
import Grid from '@mui/material/Grid';
import Input from '@mui/joy/Input';
import { Button, FormLabel, TextField , Snackbar , Alert } from '@mui/material'
import AudioFileIcon from '@mui/icons-material/AudioFile';
import axios from 'axios';
import IconButton from '@mui/joy/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import AssignmentIcon from '@mui/icons-material/Assignment';

const AudioToText = () => {


  const socket = useMemo(() => io("http://localhost:8080"), [])
  const token = localStorage.getItem("token")
  const [selectedFile, setSelectedFile] = useState(null);
  const [loading, setLoading] = useState(false)
  const [opensnack , setopensnack] = useState(false)
  const [message , setMessage] = useState("")

  const [name, setname] = useState("")


  useEffect(() => {

    socket.on("connect", () => {
      console.log("User Connected")
    })


   socket.on("text-response",  (data) => {
      handleDownload(data)
    })
   
  }, [])

  const handleDownload =  (data) => {
    setopensnack(false)

    setTimeout(async () => {
            const textFile = await import("../Text/" + data.name + ".txt")
            const TextFile = textFile.default
            const link = document.createElement('a');
            link.href = TextFile; // Path to the audio file in the public directory
            link.download = data.name; // The name of the downloaded file
            console.log("Download Successfully")
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            // setLoading(false)
            setSelectedFile(null)
            setname("")
            setLoading(false)
            setMessage("Successfully Download Text File")
            setopensnack(true)
      }, 3000);
  };



  const handleChange = (event) => {
    setname(event.target.value)
  }


  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

 



  const handleSubmit = async (event) => {


    event.preventDefault();
    setLoading(true)



    const formData = new FormData();
    formData.append('file', selectedFile)
    formData.append('name', name)


    await axios.post(`http://localhost:8080/text/convert`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        setMessage("Speech To Text Conversion is Going On! It will Download Shortly")
        setopensnack(true)
      })
      .catch((err) => {

      })




  }

  const handleClose = () => {
    setopensnack(false)
  }

  return (
    <>
  <Snackbar
        anchorOrigin={{
          vertical: "top",
          horizontal: "right"
        }}
        open={opensnack}
        autoHideDuration={3000}
        onClose={handleClose}
        variant="success"
        ContentProps={{
          "aria-describedby": "message-id"
        }}
        message={message}
        action={[
          <IconButton key="close" onClick={handleClose}>
            <CloseIcon />
          </IconButton>
        ]}
      >
      <Alert onClose={handleClose} severity="success" sx={{ width: '30vw' }}>
        {message}
      </Alert>

      </Snackbar>
      <div className="container">
        <h2 color="primary">Speech To Text Converter</h2>
        <p>Turning speech into text, effortlessly!</p>
        <Grid container spacing={2}>
          <Grid item xs={12} style={{display : 'flex', flexDirection : 'column', justifyContent: 'center' , alignItems : 'center'}} >

            <div>
              <TextField onChange={handleFileChange} type="file" />
            </div>

            <div>
              <Input className='mt-3' size="lg" style={{ marginTop: "10px" }}
                placeholder="type..." value={name}
                onChange={handleChange}
              />
            </div>
            <Button variant="contained" onClick={handleSubmit} style={{ marginTop: '10px' }} startIcon={<AssignmentIcon />}>
              {loading ? "Loading..." : 'Convert to Text'}
            </Button>
          </Grid>
        </Grid>





      </div>



    </>
  )
}

export default AudioToText