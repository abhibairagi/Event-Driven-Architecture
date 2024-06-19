import React, { useState } from "react";
import logo from "../Images/mainImage.jpg";
import { Backdrop, Button, CircularProgress, TextField } from "@mui/material";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Toaster from "../Components/Toaster";
import "../Components/myStyles.css"

function Login() {
  const [showlogin, setShowLogin] = useState(false);
  const [data, setData] = useState({  email: "", password: "" });
  const [step2, setstep2] = useState(false)
  const [loading, setLoading] = useState(false);

  const [logInStatus, setLogInStatus] = React.useState("");
  const [signInStatus, setSignInStatus] = React.useState("");

  const { email, password } = data

  const navigate = useNavigate();

  const changeHandler = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const loginHandler = async (e) => {
    setLoading(true);
    console.log(data);
    try {
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };

      const response = await axios.post(
        "http://localhost:8080/user/login/",
        data,
        config
      );
      setLogInStatus({ msg: "Success", key: Math.random(), color : "success" });
      setLoading(false);

      localStorage.setItem("userData", JSON.stringify(response.data.data));
      localStorage.setItem("token", response.data.data.token);

      navigate("/text-speech");
    } catch (error) {
      setLogInStatus({
        msg: "Invalid User name or Password",
        key: Math.random(),
        color : "error"
      });
    }
    setLoading(false);
  };

  const signUpHandler = async () => {
    setLoading(true);
    try {
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };

      const response = await axios.post(
        "http://localhost:8080/user/register/",
        data,
        config
      );
      console.log(response);
      setSignInStatus({ msg: "Success", key: Math.random() , color : "success" });
      navigate("/");
      localStorage.setItem("userData", JSON.stringify(response));
      setLoading(false);
    } catch (error) {
      console.log(error);
      if (error.response.status === 405) {
        setLogInStatus({
          msg: "User with this email ID already Exists",
          key: Math.random(),
        });
      }
      if (error.response.status === 406) {
        setLogInStatus({
          msg: "User Name already Taken, Please take another one",
          key: Math.random(),
        });
      }
      setLoading(false);
    }
  };

  const handleEmailChecker = async () => {
    await axios.post(`http://localhost:8080/user/email-checker/${email}`, {}, {
      headers: {
        "Content-type": "application/json",
      },
    })
      .then((res) => {
        setstep2(true)
      })
      .catch((err) => {
        if (err.response.status === 405) {
          setSignInStatus({ msg: "User Email Already Exists", key: Math.random() , color : "error" });
        }
      })
  }

  return (
    <>
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={loading}
      >
        <CircularProgress color="secondary" />
      </Backdrop>
      <div className="main-container" style={{ display: 'flex' }}>
        <div className="image-container">
          <img src={logo} alt="Logo" className="welcome-logo" />
        </div>
        {showlogin && (
          <div className="login-box">
            <p className="login-text">Login to your Account</p>
            <TextField
              onChange={changeHandler}
              id="standard-basic"
              label="Enter User Name"
              variant="outlined"
              color="secondary"
              name="email"
              value={email}
              // onKeyDown={(event) => {
              //   if (event.code == "Enter") {
              //     // console.log(event);
              //     loginHandler();
              //   }
              // }}
            />
            <TextField
              onChange={changeHandler}
              id="outlined-password-input"
              label="Password"
              type="password"
              autoComplete="current-password"
              color="secondary"
              name="password"
              value={password}
              onKeyDown={(event) => {
                if (event.code == "Enter") {
                  // console.log(event);
                  loginHandler();
                }
              }}
            />
            <Button
              variant="outlined"
              color="secondary"
              onClick={loginHandler}
              isLoading
            >
              Login
            </Button>
            <p>
              Don't have an Account ?{" "}
              <span
                className="hyper"
                onClick={() => {
                  setShowLogin(false);
                }}
              >
                Sign Up
              </span>
            </p>
            {logInStatus ? (
              <Toaster key={logInStatus.key} message={logInStatus.msg} />
            ) : null}
          </div>
        )}
        {!showlogin && (
          <div className="login-box">
            <p className="login-text">Create your Account</p>
            <TextField
              onChange={changeHandler}
              disabled={step2}
              id="standard-basic"
              label="Enter Email Address"
              variant="outlined"
              color="secondary"
              name="email"
              value={email}
            />

            {step2
              ?
              <>
                <TextField
                  onChange={changeHandler}
                  id="outlined-password-input"
                  label="Password"
                  type="password"
                  autoComplete="current-password"
                  color="secondary"
                  name="password"
                />
                <Button
                  variant="outlined"
                  color="secondary"
                  onClick={signUpHandler}
                >
                  Sign Up
                </Button>
              </>

              : <Button
                variant="outlined"
                color="secondary"
                onClick={handleEmailChecker}
              >
                Next
              </Button>
            }


            {/* <Button
              variant="outlined"
              color="secondary"
              onClick={handleEmailChecker}
            >
              Next
            </Button> */}



            <p>
              Already have an Account ?
              <span
                className="hyper"
                onClick={() => {
                  setShowLogin(true);
                }}
              >
                Log in
              </span>
            </p>
            {signInStatus ? (
              <Toaster key={signInStatus.key} message={signInStatus.msg} />
            ) : null}
          </div>
        )}
      </div>
    </>
  );
}

export default Login;
