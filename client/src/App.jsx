import styles from "./pages/styles/app.module.scss";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import NavBar from "./components/NavBar";
import Devs from "./pages/Devs";
import Footer from "./components/Footer";
import About from "./pages/About";

function App() {
  return (
    <BrowserRouter>
      <NavBar />
      <div className={styles.container}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/devs" element={<Devs />} />
          <Route path="/profile/:id" element={<Profile />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </div>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
