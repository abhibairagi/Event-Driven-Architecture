import React, { useEffect, useState } from 'react'
import { Container, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, IconButton, Paper } from '@mui/material';
import DownloadIcon from '@mui/icons-material/Download';
import "./TextToAudio.css"
import moment from 'moment';
import axios from 'axios';

const HistoryList = () => {

  const token = localStorage.getItem("token")



  const [allaudio, setallaudio] = useState([])




  const formatDate = (date) => {
    return moment(date).format('MMMM Do YYYY, h:mm:ss a');
  }

  useEffect(() => {
    AllAudio()
  }, [])


  const AllAudio = async () => {
    await axios.get(`http://localhost:8080/user/audioList`, {
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        if (res && res.data) {
          setallaudio(res.data.data)
        }
      })
      .catch((err) => {
        console.log(err)
      })
  }

  const handleDownload = async  (audio) => {
    let filePath ;
    if(audio.type == 'Text') {
      filePath = await   import("../Text/" + audio.name + ".txt")
    } else {
      filePath = await import("../Audio/" + audio.url)
    }


    const Audio = filePath.default
    const link = document.createElement('a');
    link.href = Audio; // Path to the audio file in the public directory
    link.download = audio.name; // The name of the downloaded file
    console.log("Download Successfully")
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    // setLoading(false)

  }; 

  return (
    <div className='container'>
      <Container>
        <Typography variant="h4" color="primary" style={{ textAlign: 'center', marginBottom: '40px' }}>
          View History
        </Typography>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 250 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell aligin="left">Name</TableCell>
                <TableCell aligin="left">Type</TableCell>
                <TableCell aligin="left">Status</TableCell>
                <TableCell aligin="left">Created Time</TableCell>
                <TableCell aligin="left">Download</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {allaudio.map((audio) => (
                <TableRow
                  key={audio.name}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell aligin="left">
                    {audio.name}
                  </TableCell>
                  <TableCell aligin="left">
                    {audio.type}
                  </TableCell>
                  <TableCell aligin="left">{audio.status}</TableCell>
                  <TableCell aligin="left">{formatDate(audio.createdAt)}</TableCell>
                  <TableCell aligin="left"> <IconButton onClick={() => handleDownload(audio)}>
                    <DownloadIcon />
                  </IconButton></TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Container>

    </div>
  )
}

export default HistoryList