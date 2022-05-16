import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Main from "./components/Main";
import Footer from "./components/Footer";
import About from "./components/About";

function App() {
  return (
    <BrowserRouter>
      <header>
        <h1>navigation here</h1>
      </header>
      <Routes>
        <Route path="/" element={<Main />}></Route>
        <Route path="/about" element={<About />}></Route>
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
