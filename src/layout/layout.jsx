import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from '../layout/Sidebar';
import { Header } from '../layout/Header';
import backgroundImage from '../assets/images/DashboardPage.png';

function Layout({ user, onLogout }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const handleToggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div
      className="flex h-screen w-screen"
      style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }}
    >

      <Sidebar
        isOpen={isSidebarOpen}
        onToggle={handleToggleSidebar}
        user={user}

        onLogout={onLogout}
        currentPage=""
        onNavigate={() => { }}
      />

      <div className="flex-1 flex flex-col overflow-hidden bg-transparent">

        <Header user={user} onLogout={onLogout} />


        <main className="flex-1 overflow-auto p-4">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default Layout;


