import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
import { useState } from "react";

import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import Home from "./pages/Home";

export default function App() {
  const navigate = useNavigate();

  const [isAuth, setIsAuth] = useState(!!localStorage.getItem("user"));

  return (
    <Routes>
      <Route
        path="/"
        element={
          isAuth ? (
            <Navigate to="/home" />
          ) : (
            <LoginPage
              onLogin={(user) => {
                localStorage.setItem("user", JSON.stringify(user));
                setIsAuth(true);
                navigate("/home");
              }}
              onSwitchToRegister={() => navigate("/register")}
            />
          )
        }
      />

      <Route
        path="/register"
        element={
          isAuth ? (
            <Navigate to="/home" />
          ) : (
            <RegisterPage
              onRegister={(user) => {
                localStorage.setItem("user", JSON.stringify(user));
                setIsAuth(true);
                navigate("/home");
              }}
              onSwitchToLogin={() => navigate("/")}
            />
          )
        }
      />

      <Route
        path="/home"
        element={isAuth ? <Home setIsAuth={setIsAuth} /> : <Navigate to="/" />}
      />
    </Routes>
  );
}
