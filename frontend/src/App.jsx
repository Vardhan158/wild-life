import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import "./App.css";
import Login from "./pages/Login";
import ResetPassword from "./pages/ResetPassword";
import Signup from "./pages/Signup";
import Content from "./components/Content";
import Home from "./pages/Home";
import About from "./pages/About";
import Safari from "./pages/Safari";
import SafariDetail from "./pages/SafariDetail";
import Resorts from "./pages/Resorts";
import ResortDetail from "./pages/ResortDetail";
import Bookings from "./pages/Bookings";
import Admin from "./pages/Admin";
import ProtectedRoute from "./components/ProtectedRoute";
import ProtectedAdminRoute from "./components/ProtectedAdminRoute";
import { AuthProvider } from "./context/AuthContext";

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Login />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/reset-password/:token" element={<ResetPassword />} />

          {/* Protected Routes */}
          <Route path="/home" element={<ProtectedRoute element={<Home />} />} />
          <Route path="/about" element={<ProtectedRoute element={<About />} />} />
          <Route path="/safari" element={<ProtectedRoute element={<Safari />} />} />
          <Route path="/safari/:id" element={<ProtectedRoute element={<SafariDetail />} />} />
          <Route path="/resorts" element={<ProtectedRoute element={<Resorts />} />} />
          <Route path="/resorts/:id" element={<ProtectedRoute element={<ResortDetail />} />} />
          <Route path="/bookings" element={<ProtectedRoute element={<Bookings />} />} />
          <Route path="/content" element={<ProtectedRoute element={<Content />} />} />

          {/* Admin Routes */}
          <Route path="/admin" element={<ProtectedAdminRoute element={<Admin />} />} />

          {/* Catch all */}
          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
