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
import NotFound from "./components/NotFound";
import UserInfo from "./components/UserInfo";
import Header from "./components/Header";
import { Logout } from "./components/Logout";
import WorkoutDetail from "./components/WorkoutDetail";
import Workouts from "./components/Workouts";
import SavedPlans from "./components/SavedPlans";
import Plans from "./components/Plans";
import NewWorkout from "./components/NewWorkout";

function App() {
  const [flashmessage, setFlashMessage] = useState({
    show: false,
    message: "",
    color: "green",
  });

  const [token, setToken] = useState(localStorage.getItem("token"));
  const [username, setUsername] = useState(localStorage.getItem("username"));

  async function handleRegister(data) {
    try {
      const result = await fetch("http://localhost:3000/user/register", {
        method: "POST",
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          firstName: data.firstName,
          lastName: data.lastName,
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
      setFlashMessage({
        show: true,
        message: "Error in registeration ",
        color: "red",
      });
    }
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
      const res = await response.json();
      setToken(res.token);
      setUsername(res.username);
      localStorage.setItem("token", res.token);
      localStorage.setItem("username", res.username);
      setFlashMessage({
        show: true,
        message: "Logged in",
        color: "green",
      });
    } catch (error) {
      console.log(error);
      setFlashMessage({
        show: true,
        message: "Error in registeration ",
        color: "red",
      });
    }
  }

  function handleLogout() {
    setToken("");
    setUsername("");
    localStorage.setItem("token", "");
    localStorage.setItem("username", "");
    setFlashMessage({
      show: true,
      message: "Logged out",
      color: "#089e79",
    });
  }

  return (
    <BrowserRouter>
      {flashmessage.show && (
        <FlashMessage
          message={flashmessage.message}
          color={flashmessage.color}
        />
      )}
      <Header
        loggedin={token ? true : false}
        onLogout={handleLogout}
        username={username}
      />
      <Routes>
        <Route
          path="/"
          element={<Main token={token} username={username} />}
        ></Route>
        <Route path="/about" element={<About />}></Route>
        <Route path="/login" element={<Login handleLogin={handleLogin} />} />
        <Route path="/logout" element={<Logout onLogout={handleLogout} />} />
        <Route
          path="/register"
          element={<Register handleRegister={handleRegister} />}
        />
        <Route
          path={`/user/${username}`}
          element={
            <UserInfo
              token={token}
              username={username}
              setFlashMessage={setFlashMessage}
            />
          }
        />
        <Route path="myplans" element={<SavedPlans token={token} />} />
        <Route path="plans" element={<Plans token={token} />} />
        <Route path="workouts" element={<Workouts token={token} />} />
        <Route path="newWorkout" element={<NewWorkout token={token} />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
