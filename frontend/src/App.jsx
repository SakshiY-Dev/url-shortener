import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import HomePage from "./pages/HomePage";
import AdminPage from "./pages/AdminPage";

export default function App() {
  return (
    <Router>
      <nav className="bg-gray-800 p-4 shadow-lg">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-white font-bold text-xl">URL Shortener</h1>
          <div className="flex space-x-6">
            <Link to="/" className="text-gray-300 hover:text-white transition">
              Home
            </Link>
            <Link
              to="/admin"
              className="text-gray-300 hover:text-white transition"
            >
              Admin
            </Link>
          </div>
        </div>
      </nav>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/admin" element={<AdminPage />} />
      </Routes>
    </Router>
  );
}
