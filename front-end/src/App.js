import React from "react";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import TextToAudio from "./pages/TextToAudio";
import Layout from "./layouts/index";
import Login from "./pages/Login";
import PrivateRoute from "./CustomRoutes/PrivateRoute";
import HistoryList from "./pages/HistoryList";
import Test from "./pages/Test";
import AudioToText from "./pages/AudioToText";

function App() {
  const dispatch = useDispatch();
  const lightTheme = useSelector((state) => state.themeKey);
  return (
    <div className="App" >
      <Routes>
        <Route path="/" element={<Login />} />

        <Route element={<Layout />}>
            <Route path="/text-speech" element={<TextToAudio />} />
            <Route path="/speech-text" element={<AudioToText />} />
            <Route path="/history" element={<HistoryList/>} />
        </Route>



      </Routes>
    </div>
  );
}

export default App;
