import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Main from "./components/Main";
import Footer from "./components/Footer";
import About from "./components/About";
import Navigation from "./components/Navigation";
import Login from "./components/Login";
import Register from "./components/Register";
import { useEffect, useState } from "react";
import { FlashMessage } from "./components/FlashMessage";
import NotFound from "./components/NotFound";

function App() {
  const [flashmessage, setFlashMessage] = useState({
    show: false,
    message: "",
    color: "green",
  });
  const [user, setUser] = useState({});
  const [plans, setPlans] = useState("");

  useEffect(() => {
    const getPlans = async () => {
      if (user) {
        const plans = await fetchPlans(user.token);
        setPlans(plans);
      }
    };
    getPlans();
  }, [user]);

  async function fetchPlans(token) {
    try {
      const response = await fetch("http://localhost:3000/workouts/plan", {
        method: "GET",
        mode: "cors",
        headers: {
          authorization: "bearer " + token,
          // 'Content-Type': 'application/x-www-form-urlencoded',
        },
      });
      const plans = await response.json();
      console.log(plans);
      return plans;
    } catch (err) {
      return null;
    }
  }

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
      setUser(res);
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
    setUser("");
    setFlashMessage({
      show: true,
      message: "Logged out",
      color: "green",
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
      <nav>
        <Navigation
          loggedin={user.token ? true : false}
          onLogout={handleLogout}
        />
      </nav>
      <Routes>
        <Route
          path="/"
          element={<Main plans={plans} loggedIn={user ? true : false} />}
        ></Route>
        <Route path="/about" element={<About />}></Route>
        <Route path="/login" element={<Login handleLogin={handleLogin} />} />
        <Route
          path="/register"
          element={<Register handleRegister={handleRegister} />}
        />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
