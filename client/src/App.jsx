import Home from "./pages/Home";
import { Routes, Route, BrowserRouter } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      //nav
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
      //footer
    </BrowserRouter>
  );
}

export default App;
