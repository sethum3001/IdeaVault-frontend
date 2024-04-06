import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/login.js";
import SignUp from "./pages/SignUp.js";
import PrivateRoute from "./components/PrivateRoute.js";
import DashboardPage from "./pages/Dashboard.js";

function App() {
  return (
    <div className="min-h-screen bg-gray-100 max-w-screen-lg mx-auto">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route element={<PrivateRoute />}>
            <Route path="/dashboard" element={<DashboardPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
