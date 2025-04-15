import React from "react";
import SignUp from "./Pages/SignUp";
import { BrowserRouter, Routes, Route } from "react-router";
import SignIn from "./Pages/SignIn/SignIn";
import Home from "./Pages/Home/Index";
import RootLayout from "./Components/RootLayout/RootLayout";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<RootLayout />}>
          <Route index element={<Home />} />
          <Route path="/message" element={"This is message"} />
          <Route path="/notification" element={"This is notification"} />
          <Route path="/setting" element={"This is setting"} />
        </Route>
        <Route path="/signup" element={<SignUp />} />
        <Route path="/signin" element={<SignIn />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
