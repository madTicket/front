import React from "react";
import { Route, Routes } from "react-router-dom";

import BoardList from "./routes/BoardList";
import Home from "./routes/Home";
import Login from "./routes/Login";
import Register from "./routes/Register";
import Detail from "./routes/Detail";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/board" element={<BoardList />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/detail/:category" element={<Detail />} />
    </Routes>
    // <div>
    //   <Login />
    // </div>
  );
}

export default App;