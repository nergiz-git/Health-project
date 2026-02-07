

import { useState } from "react";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";


export default function App() {
  const [currentView, setCurrentView] = useState("login");

  const handleLogin = (email, password) => {
    console.log("Login:", email, password);
    // hələlik backend yoxdur – sadəcə yoxlama üçün
  };

  const handleRegister = (userData) => {
    console.log("Register:", userData);
    // hələlik backend yoxdur
  };

  return (
    <>
      {currentView === "login" && (
        <LoginPage
          onLogin={handleLogin}
          onSwitchToRegister={() => setCurrentView("register")}
        />
      )}

      {currentView === "register" && (
        <RegisterPage
          onRegister={handleRegister}
          onSwitchToLogin={() => setCurrentView("login")}
        />
      )}
    </>
  );
}

