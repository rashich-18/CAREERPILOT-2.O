import {
  BrowserRouter,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";

import { AnimatePresence } from "framer-motion";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Onboarding from "./pages/Onboarding";
import Dashboard from "./pages/Dashboard";
import ResumeUpload from "./pages/ResumeUpload";
import Analysis from "./pages/Analysis";
import Roadmap from "./pages/Roadmap";
import RoadmapHistory from "./pages/RoadmapHistory";
import Features from "./components/Features";
import Profile from "./pages/Profile";
import CareerMatch from "./pages/CareerMatch";
import CareerMatchResult from "./pages/CareerMatchResult";

function AnimatedRoutes() {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes
        location={location}
        key={location.pathname}
      >
        <Route path="/" element={<Home />} />

        <Route path="/login" element={<Login />} />

        <Route path="/signup" element={<Signup />} />

        <Route path="/dashboard" element={<Dashboard />} />

        <Route path="/upload" element={<ResumeUpload />} />

        <Route path="/analysis" element={<Analysis />} />

        <Route path="/about" element={<Features />} />

        <Route path="/profile" element={<Profile />} />

        <Route path="/onboarding" element={<Onboarding />} />

        <Route path="/career-match" element={<CareerMatch />} />

        <Route
          path="/career-match/:id"
          element={<CareerMatchResult />}
        />

        {/* ROADMAP HISTORY */}
        <Route
          path="/roadmaps"
          element={<RoadmapHistory />}
        />

        {/* SINGLE ROADMAP */}
        <Route
          path="/roadmap/:id"
          element={<Roadmap />}
        />
      </Routes>
    </AnimatePresence>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AnimatedRoutes />
    </BrowserRouter>
  );
}

export default App;