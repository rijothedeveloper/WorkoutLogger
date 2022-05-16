import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Main from "./components/Main";
import Footer from "./components/Footer";
import About from "./components/About";
import Navigation from "./components/Navigation";
import Login from "./components/Login";
import Register from "./components/Register";

function App() {
  return (
    <BrowserRouter>
      <nav>
        <Navigation />
      </nav>
      <Routes>
        <Route path="/" element={<Main />}></Route>
        <Route path="/about" element={<About />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/register" element={<Register />}></Route>
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
