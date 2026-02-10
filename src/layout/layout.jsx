// import { Sidebar } from 'lucide-react'
// import React from 'react'
// import { Outlet } from 'react-router-dom'

// function layout() {
//   return (
//     <>
//     <Sidebar/>
//     <Outlet/>
//     </>
//   )
// }

// export default layout



// import React, { useState } from 'react';
// import { Outlet } from 'react-router-dom';
// import  Sidebar  from '../layout/Sidebar'; // sənin Sidebar komponenti
// import { Header } from '../layout/Header';   // sənin Header komponenti

// function Layout({ user, onLogout }) {
//   const [isSidebarOpen, setIsSidebarOpen] = useState(true);

//   const handleToggleSidebar = () => {
//     setIsSidebarOpen(!isSidebarOpen);
//   };

//   return (
//     <div className="flex h-screen bg-gray-50">
//       {/* Sidebar */}
//       <Sidebar
//         isOpen={isSidebarOpen}
//         onToggle={handleToggleSidebar}
//         user={user}
//         onLogout={onLogout}
//         currentPage="" // istəsən burda current page də göndərə bilərsən
//         onNavigate={() => {}} // navigation funksiyası
//       />

//       {/* Main content */}
//       <div className="flex-1 flex flex-col overflow-hidden">
//         {/* Header */}
//         <Header user={user} onLogout={onLogout} />

//         {/* Page content */}
//         <main className="flex-1 overflow-auto p-4">
//           <Outlet />
//         </main>
//       </div>
//     </div>
//   );
// }

// export default Layout



import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from '../layout/Sidebar';
import { Header } from '../layout/Header';
import backgroundImage from '../assets/images/DashboardPage.png'; // fon şəkli

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
      {/* Sidebar */}
      <Sidebar
        isOpen={isSidebarOpen}
        onToggle={handleToggleSidebar}
          user={user}   
       
        onLogout={onLogout}
        currentPage=""
        onNavigate={() => {}}
      />

      {/* Main content */}
      <div className="flex-1 flex flex-col overflow-hidden bg-transparent">
        {/* Header */}
        <Header user={user} onLogout={onLogout} />

        {/* Page content */}
        <main className="flex-1 overflow-auto p-4">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default Layout;
