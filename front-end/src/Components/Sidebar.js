import React, { useState } from "react";
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import SettingsIcon from '@mui/icons-material/Settings';
import { Avatar, Typography } from '@mui/material';
import ChatIcon from '@mui/icons-material/Chat';
import "./myStyles.css";
import ProfilePic from "../Images/avatar.png"
import { useNavigate } from 'react-router-dom';
import SpatialAudioIcon from '@mui/icons-material/SpatialAudio';
import HistoryIcon from '@mui/icons-material/History';
import TextSnippetIcon from '@mui/icons-material/TextSnippet';
import LogoutIcon from '@mui/icons-material/Logout';
const Sidebar = () => {

  const navigate = useNavigate();

  const navbarDetails = [{ name: 'Text to Speech', url: '/text-speech' },
  { name: 'Speech to Text', url: "/speech-text" },
  { name: 'History', url: "/history" }]

  const [selectedOption, setSelectedOption] = useState('Text to Speech')


  const [open, setOpen] = useState(false);

  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
  };

  const handleLogout = () => {
    localStorage.removeItem("userData");
    localStorage.removeItem("token");
    navigate('/');
  }

  const handleRedirect = (value) => {
    navigate(value.url);
    setSelectedOption(value.name)
  }

  const UserData = JSON.parse(localStorage.getItem("userData"))


  return (
    <div>
      <Button onClick={toggleDrawer(true)}>
        <svg id="Component_259_1" data-name="Component 259 – 1" xmlns="http://www.w3.org/2000/svg" width="30" height="37" viewBox="0 0 30 37">
          <g id="Component_195_1" data-name="Component 195 – 1">
            <path id="Rectangle_523" data-name="Rectangle 523" d="M0,0H11.5A18.5,18.5,0,0,1,30,18.5v0A18.5,18.5,0,0,1,11.5,37H0a0,0,0,0,1,0,0V0A0,0,0,0,1,0,0Z" fill="#425ef1" />
            <g id="Group_8212" data-name="Group 8212" transform="translate(3.77 10)">
              <g id="vuesax_broken_arrow-up" data-name="vuesax/broken/arrow-up" transform="translate(5.717 17.152) rotate(-90)">
                <g id="arrow-up">
                  <path id="Vector" d="M8.526,2.787,6.661,4.66a1.419,1.419,0,0,1-2,0L0,0" transform="translate(2.916 6.397)" fill="none" stroke="#fff" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" />
                  <path id="Vector-2" data-name="Vector" d="M.743,0,0,.743" transform="translate(13.493 6.397)" fill="none" stroke="#fff" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" />
                  <path id="Vector-3" data-name="Vector" d="M0,17.153H17.152V0H0Z" fill="none" opacity="0" />
                </g>
              </g>
              <g id="vuesax_broken_arrow-up-2" data-name="vuesax/broken/arrow-up" transform="translate(0 17.152) rotate(-90)">
                <g id="arrow-up-2" data-name="arrow-up">
                  <path id="Vector-4" data-name="Vector" d="M8.526,2.787,6.661,4.66a1.419,1.419,0,0,1-2,0L0,0" transform="translate(2.916 6.397)" fill="none" stroke="#fff" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" />
                  <path id="Vector-5" data-name="Vector" d="M.743,0,0,.743" transform="translate(13.493 6.397)" fill="none" stroke="#fff" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" />
                  <path id="Vector-6" data-name="Vector" d="M0,17.153H17.152V0H0Z" fill="none" opacity="0" />
                </g>
              </g>
            </g>
          </g>
        </svg>
      </Button>
      <Drawer open={open} onClose={toggleDrawer(false)}>
        <Box sx={{ width: 250 }} role="presentation" onClick={toggleDrawer(false)}>
          <div style={{ margin: '20px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            {/* <Box
              sx={{
                display: 'flex',
                gap: 1,
                p: 1.5,
                pb: 2,
                borderTop: '1px solid',
                // borderColor: 'divider',
              }}
            > */}
            <Avatar sx={{ width: 50, height: 50 }} src={ProfilePic} />
            <div style={{ marginLeft: '10px' }}>
              <Typography level="title-md">{UserData.full_name}</Typography>
            </div>
            {/* </Box> */}
          </div>
          <Divider />
          <List style={{ height: '75vh' }}>
            {navbarDetails.map((value, index) => (
              <ListItem key={value} disablePadding onClick={() => handleRedirect(value)}>
                <ListItemButton selected={selectedOption === value.name}>
                  <ListItemIcon>
                    {value.name == 'History' ? <HistoryIcon /> : value.name == 'Text to Speech' ?
                    <SpatialAudioIcon />
                    : <TextSnippetIcon />}
                  </ListItemIcon>
                  <ListItemText primary={value.name} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>

          <List onClick={handleLogout}>
            {['Log out'].map((text, index) => (
              <ListItem key={text} disablePadding>
                <ListItemButton>
                  <ListItemIcon>
                    {text == 'Settings' ? <LogoutIcon /> : <LogoutIcon />}
                  </ListItemIcon>
                  <ListItemText primary={text} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>


        </Box>

      </Drawer>
    </div>
  )
}

export default Sidebar