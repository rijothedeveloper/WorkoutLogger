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
import NewPlan from "./components/NewPlan";
import UserContext from "./UserContext";
import PlanDetails from "./components/PlanDetails";

function App() {
  const [flashmessage, setFlashMessage] = useState({
    show: false,
    message: "",
    color: "green",
  });

  // const [token, setToken] = useState(localStorage.getItem("token"));
  // const [username, setUsername] = useState(localStorage.getItem("username"));

  const [user, setUser] = useState({
    username: "",
    token: "",
    loggedIn: false,
  });

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
      if (!response.error) {
        setFlashMessage({
          show: true,
          message: "registered " + response.username,
          color: "green",
        });
      } else {
        setFlashMessage({
          show: true,
          message: response.error.errorMessage,
          color: "red",
        });
      }
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
      if (!res.error) {
        setUser({
          username: res.username,
          token: res.token,
          loggedin: true,
        });
        setFlashMessage({
          show: true,
          message: "Logged in",
          color: "green",
        });
      } else {
        setFlashMessage({
          show: true,
          message: res.error.errorMessage,
          color: "red",
        });
      }
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
    setUser({
      username: "",
      tokken: "",
      loggedIn: false,
    });
    setFlashMessage({
      show: true,
      message: "Logged out",
      color: "#089e79",
    });
  }

  return (
    <UserContext.Provider value={[user, setUser]}>
      <BrowserRouter>
        {flashmessage.show && (
          <FlashMessage
            message={flashmessage.message}
            color={flashmessage.color}
          />
        )}
        <Header onLogout={handleLogout} />
        <Routes>
          <Route path="/" element={<Main />}></Route>
          <Route path="/about" element={<About />}></Route>
          <Route path="/login" element={<Login handleLogin={handleLogin} />} />
          <Route path="/logout" element={<Logout onLogout={handleLogout} />} />
          <Route
            path="/register"
            element={<Register handleRegister={handleRegister} />}
          />
          <Route
            path={`/user/${user.username}`}
            element={<UserInfo setFlashMessage={setFlashMessage} />}
          />
          <Route path="myplans" element={<SavedPlans />} />
          <Route path="plans" element={<Plans />} />
          <Route path="plans/:planId" element={<PlanDetails />} />
          <Route path="workouts" element={<Workouts />} />
          <Route path="workouts/:workoutId" element={<WorkoutDetail />} />
          <Route
            path="newWorkout"
            element={<NewWorkout setFlashMessage={setFlashMessage} />}
          />
          <Route
            path="newPlan"
            element={<NewPlan setFlashMessage={setFlashMessage} />}
          />
          <Route path="*" element={<NotFound />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </UserContext.Provider>
  );
}

export default App;
