
export default function Home({ setIsAuth }) {
  const handleLogout = () => {
    localStorage.removeItem("user"); 
    setIsAuth(false);
  };

  return (
    <div className="flex flex-col items-center justify-center bg-slate-50">
   
    </div>
  );
}
