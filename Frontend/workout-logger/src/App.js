import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Main from "./components/Main";
import Footer from "./components/Footer";
import About from "./components/About";
import Navigation from "./components/Navigation";
import Login from "./components/Login";
import Register from "./components/Register";
import { useState } from "react";
import { FlashMessage } from "./components/FlashMessage";

function App() {
  const [flashmessage, setFlashMessage] = useState({
    show: false,
    message: "",
    color: "green",
  });
  const [token, setToken] = useState("");

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
      setFlashMessage({
        show: true,
        message: "registered " + response.username,
        color: "green",
      });
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

  async function handleLogin(data) {
    try {
      const response = await fetch("http://localhost:3000/user/login", {
        method: "POST",
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: data.username,
          password: data.password,
        }),
      });
      const token = await response.json();
      setToken(token);
      setFlashMessage({
        show: true,
        message: "Logged in",
        color: "green",
      });
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <BrowserRouter>
      {flashmessage.show && (
        <FlashMessage
          message={flashmessage.message}
          color={flashmessage.color}
        />
      )}
      <nav>
        <Navigation />
      </nav>
      <Routes>
        <Route path="/" element={<Main />}></Route>
        <Route path="/about" element={<About />}></Route>
        <Route
          path="/login"
          element={<Login handleLogin={handleLogin} />}
        ></Route>
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
