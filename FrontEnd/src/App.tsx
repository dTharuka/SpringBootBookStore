import React from "react";

import "./App.css";

import Aos from "aos";
import "aos/dist/aos.css";
import DriverForm from "./pages/driver/driverForm";

//importing pages

function App() {
  Aos.init({
    duration: 1800,
    offset: 0,
  });

  return (
    <div className="App">
      <DriverForm />
    </div>
  );
}

export default App;
