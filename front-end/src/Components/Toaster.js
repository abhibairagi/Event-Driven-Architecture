import { Alert, IconButton, Snackbar } from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';
import React from "react";

export default function Toaster({ message , color }) {
  const [open, setOpen] = React.useState(true);
  function handleClose(event, reason) {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  }

  return (
    <div>
      <Snackbar
        anchorOrigin={{
          vertical: "top",
          horizontal: "right"
        }}
        open={open}
        autoHideDuration={3000}
        onClose={handleClose}
        variant={color}
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
      <Alert onClose={handleClose} severity="error" sx={{ width: '30vw' }}>
      {message}
      </Alert>

      </Snackbar>
    </div>
  );
}
