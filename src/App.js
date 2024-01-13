import { Route, Routes } from "react-router-dom";
import BoardList from "./routes/BoardList";
import Home from "./routes/Home";
import Login from "./routes/Login";
import React from "react";
import Register from "./routes/Register";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/board" element={<BoardList />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
    </Routes>
    // <div>
    //   <Login />
    // </div>
  );
}

export default App;