import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Main from "./components/Main";
import Footer from "./components/Footer";
import About from "./components/About";
import Navigation from "./components/Navigation";
import Login from "./components/Login";
import Register from "./components/Register";
const axios = require("axios");

function App() {
  async function handleRegister(data) {
    try {
      const result = await fetch("http://localhost:3000/user/register", {
        method: "POST",
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: data.username,
          password: data.password,
          height: data.height,
          weight: data.weight,
        }),
      });
      const response = await result.json();
      console.log(response);
    } catch (error) {
      console.log(error);
    }

    // try {
    //   // const response = await axios.post("http://localhost:3000/user/register");
    //   const response = await axios.post(
    //     "http://localhost:3000/user/register",
    //     {
    //       username: data.username,
    //       password: data.password,
    //       height: data.height,
    //       weight: data.weight,
    //     },
    //     {
    //       headers: {
    //         "Content-type": "application/json; charset=UTF-8",
    //       },
    //     }
    //   );
    //   console.log(response);
    // } catch (err) {
    //   console.log(err);
    // }
  }
  return (
    <BrowserRouter>
      <nav>
        <Navigation />
      </nav>
      <Routes>
        <Route path="/" element={<Main />}></Route>
        <Route path="/about" element={<About />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route
          path="/register"
          element={<Register handleRegister={handleRegister} />}
        ></Route>
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
