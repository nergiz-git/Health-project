import { Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import { useState } from 'react';

import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import Home from './pages/Home';
import Layout from './layout/layout';

export default function App() {
  const navigate = useNavigate();
  const [isAuth, setIsAuth] = useState(!!localStorage.getItem('user'));
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')) || null);

  const handleLogout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    setIsAuth(false);
    setUser(null);
    navigate('/login');
  };

  return (
    <Routes>
      <Route 
        path="/" 
        element={<Navigate to={isAuth ? "/home" : "/login"} replace />} 
      />
     
      <Route
        path="/login"
        element={
          isAuth ? (
            <Navigate to="/home" replace />
          ) : (
            <LoginPage
              onLogin={(userData) => {
                localStorage.setItem('user', JSON.stringify(userData));
                setIsAuth(true);
                setUser(userData);
                navigate('/home');
              }}
              onSwitchToRegister={() => navigate('/register')}
            />
          )
        }
      />

      <Route
        path="/register"
        element={
          isAuth ? (
            <Navigate to="/home" replace />
          ) : (
            <RegisterPage
              onRegister={(userData) => {
                localStorage.setItem('user', JSON.stringify(userData));
                setIsAuth(true);
                setUser(userData);
                navigate('/home');
              }}
              onSwitchToLogin={() => navigate('/login')}
            />
          )
        }
      />

      <Route
        element={isAuth ? <Layout user={user} onLogout={handleLogout} /> : <Navigate to="/login" replace />}
      >
        <Route path="/home" element={<Home setIsAuth={setIsAuth} />} />
      </Route>
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}