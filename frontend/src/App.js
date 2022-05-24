
import React from "react";

import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from "./Components/Header/Navbar";

import { Procedures } from "./Pages/Procedures";
import { About } from "./Pages/About";

import Footer from "./Components/Footer/Footer";
<<<<<<< Updated upstream

=======
//import LogRocket from "logrocket";

/* LogRocket.init("mfxcuw/biospa-new");
LogRocket.identify("mfxcuw/biospa-new", {
  name: "Julia Taro",
  email: "julia.taro@gmail.com",
}); */
>>>>>>> Stashed changes

// Global Colors

function App() {
  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Procedures />} />
          <Route path="about" element={<About />}></Route>
        </Routes>
        <Footer />
      </BrowserRouter>
    </>
  );
}

export default App;
