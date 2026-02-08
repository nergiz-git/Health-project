
export default function Home({ setIsAuth }) {
  const handleLogout = () => {
    localStorage.removeItem("user"); 
    setIsAuth(false);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50">
      <h1 className="text-3xl font-bold mb-6">Salam! Xoş gəldiniz Home səhifəsinə</h1>

      <button
        onClick={handleLogout}
        className="px-6 py-3 !bg-black text-white rounded-xl 1hover:bg-black transition"
      >
        Logout
      </button>
    </div>
  );
}
