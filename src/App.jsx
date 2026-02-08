// import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
// import { useState } from "react";

// import LoginPage from "./pages/LoginPage";
// import RegisterPage from "./pages/RegisterPage";
// import Home from "./pages/Home";

// export default function App() {
//   const navigate = useNavigate();

//   const [isAuth, setIsAuth] = useState(!!localStorage.getItem("user"));

//   return (
//     <Routes>
//       <Route
//         path="/"
//         element={
//           isAuth ? (
//             <Navigate to="/home" />
//           ) : (
//             <LoginPage
//               onLogin={(user) => {
//                 localStorage.setItem("user", JSON.stringify(user));
//                 setIsAuth(true);
//                 navigate("/home");
//               }}
//               onSwitchToRegister={() => navigate("/register")}
//             />
//           )
//         }
//       />

//       <Route
//         path="/register"
//         element={
//           isAuth ? (
//             <Navigate to="/home" />
//           ) : (
//             <RegisterPage
//               onRegister={(user) => {
//                 localStorage.setItem("user", JSON.stringify(user));
//                 setIsAuth(true);
//                 navigate("/home");
//               }}
//               onSwitchToLogin={() => navigate("/")}
//             />
//           )
//         }
//       />

//       <Route
//         path="/home"
//         element={isAuth ? <Home setIsAuth={setIsAuth} /> : <Navigate to="/" />}
//       />
//     </Routes>
//   );
// }


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
    setIsAuth(false);
    setUser(null);
    navigate('/');
  };

  return (
    <Routes>
      {/* Login Page */}
      <Route
        path="/"
        element={
          isAuth ? (
            <Navigate to="/home" />
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

      {/* Register Page */}
      <Route
        path="/register"
        element={
          isAuth ? (
            <Navigate to="/home" />
          ) : (
            <RegisterPage
              onRegister={(userData) => {
                localStorage.setItem('user', JSON.stringify(userData));
                setIsAuth(true);
                setUser(userData);
                navigate('/home');
              }}
              onSwitchToLogin={() => navigate('/')}
            />
          )
        }
      />

      {/* Authenticated Pages */}
      <Route
        element={isAuth ? <Layout user={user} onLogout={handleLogout} /> : <Navigate to="/" />}
      >
        <Route path="/home" element={<Home setIsAuth={setIsAuth} />} />
        {/* buraya digər səhifələr əlavə edə bilərsən */}
      </Route>
    </Routes>
  );
}
