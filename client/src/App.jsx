
import { BrowserRouter , Routes , Route } from "react-router-dom";


import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import ResumeUpload from "./pages/ResumeUpload";
import Analysis from "./pages/Analysis";
import Roadmap from "./pages/Roadmap";
import Features from "./components/Features";
import { AnimatePresence } from "framer-motion";

function App() {
  return(
    <BrowserRouter>
    <AnimatePresence mode="wait">
    <Routes location={location} key={location.pathname}>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/upload" element={<ResumeUpload />} />
      <Route path="/analysis" element={<Analysis />} />
      <Route path="/roadmap" element={<Roadmap />} />
      <Route path="/about" element={<Features />} />
    </Routes>
    </AnimatePresence>
    </BrowserRouter>
  );
}

export default App;