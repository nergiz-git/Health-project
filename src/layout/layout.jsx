import React, { useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import Sidebar from '../layout/Sidebar';
import { Header } from '../layout/Header';
import backgroundImage from '../assets/images/DashboardPage.png';
import ProfileModal from "../pages/ProfileModal";

// function Layout({ user, onLogout, onUpdateUser }) {
//   const [isSidebarOpen, setIsSidebarOpen] = useState(true);
//  const navigate = useNavigate();
//  const [isProfileOpen, setIsProfileOpen] = useState(false);

//   const [user, setUser] = useState(null);
//   const handleToggleSidebar = () => {
//     setIsSidebarOpen(!isSidebarOpen);
//   };

//   return (
//     <div
//       className="flex h-screen w-screen"
//       style={{
//         backgroundImage: `url(${backgroundImage})`,
//         backgroundSize: 'cover',
//         backgroundPosition: 'center',
//         backgroundRepeat: 'no-repeat',
//       }}
//     >

//       <Sidebar
//         isOpen={isSidebarOpen}
//         onToggle={handleToggleSidebar}
//         user={user}
//         onOpenProfile={() => setIsProfileOpen(true)}
//         onLogout={onLogout}
//         onUpdateUser ={onUpdateUser}
//         currentPage=""
//         onNavigate={() => { }}
//       />

//       <div className="flex-1 flex flex-col overflow-hidden bg-transparent">

//         <Header user={user} onLogout={onLogout} />


//         <main className="flex-1 overflow-auto p-4">
//           <Outlet />
//         </main>
//         {/* <ProfileModal
//   isOpen={isProfileOpen}
//   onClose={() => setIsProfileOpen(false)}
//   user={user}
//    onUpdateUser={(updatedUser) }
// /> */}
// <ProfileModal
//           isOpen={isProfileOpen}
//           onClose={() => setIsProfileOpen(false)}
//           user={user}
//           onUpdateUser={onUpdateUser} // prop vasitəsilə dəyişiklikləri parent-ə göndər
//         />

//       </div>
//     </div>
//   );
// }
function Layout({ user, onLogout, onUpdateUser }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const navigate = useNavigate();

  const handleToggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div
      className="flex h-screen w-full overflow-x-hidden"
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
        onOpenProfile={() => setIsProfileOpen(true)}
        onLogout={onLogout}
        onUpdateUser={onUpdateUser}
        currentPage=""
        onNavigate={() => { }}
      />

      <div  className={`
    flex-1 flex flex-col overflow-hidden bg-transparent
    transition-all duration-300
    ${isSidebarOpen ? "pl-[260px]" : "pl-[88px]"}
  `}>
        <Header user={user} onLogout={onLogout} />

        {/* <main className="flex-1 overflow-auto p-4">
          <Outlet/>
        </main> */}
{/* <main className="flex-1 overflow-y-auto px-6 py-6">
  <div className=" w-full p-4 ">
    <Outlet />
  </div>
</main> */}
<main className="flex-1  px-6 py-6">
  <div className="max-w-[1480px]  w-full">
    <Outlet context={{ user }} />
  </div>
</main>
        <ProfileModal
          isOpen={isProfileOpen}
          onClose={() => setIsProfileOpen(false)}
          user={user}
          onUpdateUser={onUpdateUser} // prop vasitəsilə dəyişiklikləri parent-ə göndər
        />
      </div>
    </div>
  );
}

export default Layout;


