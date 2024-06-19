import React, { useMemo, useEffect, useState } from 'react'
import { io } from "socket.io-client"
import axios from 'axios'
import Textarea from '@mui/joy/Textarea';
import { Box, Button, TextField, Backdrop, Typography , Alert, Snackbar , FormLabel } from '@mui/material'
import "./TextToAudio.css"
import Input from '@mui/joy/Input';
import CircularProgress from '@mui/joy/CircularProgress';
import IconButton from '@mui/joy/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Grid from '@mui/material/Grid';
import AudioFileIcon from '@mui/icons-material/AudioFile';


const TextToAudio = () => {

  const UserData = JSON.parse(localStorage.getItem("userData"))
  const token = localStorage.getItem("token")
  const [loading, setLoading] = useState(false);
  const [opensnack , setopensnack] = useState(false)
  const [buttonflag , setbuttonflag] = useState(false)


  const socket = useMemo(() => io("http://localhost:8080"), [])

  const [values, setValues] = useState({
    name: '',
    text: '',
  })

  const { name, text } = values


  useEffect(() => {

    socket.on("connect", () => {
      console.log("User Connected")
    })

    socket.on("audio-response",  (data) => {
          handleDownload(data.url)
    })

 
  }, [])



  const handleDownload =  (audioname) => {

    setTimeout(async () => {
            const audioFile = await import("../Audio/" + audioname)
            const Audio = audioFile.default
            const link = document.createElement('a');
            link.href = Audio; // Path to the audio file in the public directory
            link.download = audioname; // The name of the downloaded file
            console.log("Download Successfully")
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            // setLoading(false)
            setbuttonflag(false)
            setValues({ ...values, name: "", text: "" })
      }, 3000);

    


  };

  const handleChange = (event) => {
    setValues({ ...values, [event.target.name]: event.target.value })
  }

  const handleClose = () => {
    setopensnack(false)
  }



  const handleSubmit = async (e) => {
    e.preventDefault()
    // setLoading(true)
    setbuttonflag(true)
    await axios.post(`http://localhost:8080/audio/convert`, values, {
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        setopensnack(true)
        // setopenuserlist(res.data.data[0])
        // openlistflag(true)
      })
      .catch((err) => {

      })
  }


  return (
    // <div>
    //   <Box
    //     sx={{
    //       display: 'flex',
    //       gap: 'var(--Textarea-paddingBlock)',
    //       pt: 'var(--Textarea-paddingBlock)',
    //       borderTop: '1px solid',
    //       borderColor: 'divider',
    //       flex: 'auto',
    //     }}
    //   ><Textarea
    //       style={{ border: '1px solid black' }}
    //       color="primary"
    //       disabled={false}
    //       minRows={4}
    //       placeholder=""
    //       size="lg"
    //       variant="soft"
    //     /></Box>
    // </div> 
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
        message="Audio Converions is going On"
        action={[
          <IconButton key="close" onClick={handleClose}>
            <CloseIcon />
          </IconButton>
        ]}
      >
      <Alert onClose={handleClose} severity="success" sx={{ width: '30vw' }}>
        Audio Converions is Processing! . It will download Shortly
      </Alert>

      </Snackbar>
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={loading}
      >
        <Button startDecorator={<CircularProgress variant="solid" />}>Loading…</Button>
        <IconButton>
          <CircularProgress />
        </IconButton>
      </Backdrop>
      <div className="container">    
        <h2 color="primary">Text to Speech Converter</h2>
        <p>Transforming Words into Sound: Your Personal Text-to-Speech Maestro!</p>
        <Grid container spacing={2}>
          <Grid item xs={8}>
            <Textarea
              onChange={handleChange}
              className=""
              style={{ border: '1px solid black' }}
              color="primary"
              disabled={false}
              value={text}
              minRows={8}
              placeholder="Please Write Your text here..."
              size="lg"
              name="text"
              endDecorator={
                <Box
                  sx={{
                    display: 'flex',
                    gap: 'var(--Textarea-paddingBlock)',
                    pt: 'var(--Textarea-paddingBlock)',
                    borderTop: '1px solid',
                    borderColor: 'divider',
                    flex: 'auto',
                  }}
                >
                  <span>{text.length + " " + "chars used"} </span>
                  <Button sx={{ ml: 'auto' }} onClick={() => setValues({...values , text : ""})}>Clear</Button>
                </Box>
              }
            // variant="soft"
            />
          </Grid>
          <Grid item xs={4} >
          <FormLabel style={{fontSize : '17px'}}  htmlFor="my-input">Type Name:</FormLabel>
            <Input className='mt-3' size="lg" style={{ marginTop: "10px" , marginBottom : '10px' }}
              placeholder="Type...." value={name} name="name"
              onChange={handleChange}
            />
            <FormLabel  style={{fontSize : '17px' , marginTop : '50px'}}  htmlFor="my-input">Audio Settings:</FormLabel>
            <Input className='mt-3' size="lg" style={{ marginTop: "10px" }}
             disabled placeholder="MP3 - 48000Hz" name="name"
              
            />
            <Button  variant="contained" onClick={handleSubmit} style={{ marginTop: '10px' }} startIcon={<AudioFileIcon />}>
            {buttonflag ? "Loading..." : 'Convert to Audio'}
            </Button>
          </Grid>
        </Grid>

   
       


      </div> 



    </>
  )
}

export default TextToAudio