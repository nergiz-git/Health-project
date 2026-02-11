import { useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { Lock, Eye, EyeOff, CheckCircle, AlertCircle } from "lucide-react";
import { Button } from "../ui/Button";
import { Input } from "../ui/Input";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export default function ResetPasswordPage() {
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token"); // linkdəki ?token=...
  const navigate = useNavigate();

  const [newPassword, setNewPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const handleResetPassword = async (e) => {
    e.preventDefault();

    if (!newPassword) {
      setError("Yeni şifrə daxil edin");
      return;
    }

    if (!token) {
      setError("Token tapılmadı. Link düzgün deyil.");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const res = await fetch(`${API_BASE_URL}/auth/reset-password`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token, newPassword }),
      });

      const data = await res.json();

      if (res.ok) {
        setSuccess(true);
      } else {
        setError(data.message || "Şifrə yenilənmədi");
      }
    } catch (err) {
      console.error(err);
      setError("Server ilə əlaqə qurulmadı");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[black]  via-blue-50/30 to-green-50/30">
      <div className="bg-white p-10 rounded-2xl shadow-2xl w-full max-w-xl shadow-2xl shadow-slate-300/50">
        <h2 className="text-xl font-bold mb-6 text-left">Yeni Şifrə Təyin Et</h2>

        <form onSubmit={handleResetPassword} className="space-y-6">
          <div className="relative">
            <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
            <Input
              type={showPassword ? "text" : "password"}
              placeholder="Yeni şifrə"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="pl-12 pr-12 py-7 border border-slate-300 rounded-xl w-full"
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400"
            >
              {showPassword ? <EyeOff /> : <Eye />}
            </button>
          </div>

          {error && (
            <div className="flex items-center gap-2 text-red-600 text-sm">
              <AlertCircle />
              <span>{error}</span>
            </div>
          )}

          {success && (
            <div className="flex flex-col items-center gap-2 text-green-600 text-sm">
              <CheckCircle className="w-6 h-6" />
              <span>Şifrə uğurla yeniləndi! 2 saniyə sonra loginə yönləndirilirsiniz</span>
            </div>
          )}

          <Button
            type="submit"
            className="w-full py-3 bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-700 hover:to-green-700 text-white font-semibold text-[16px] rounded-xl shadow-lg shadow-blue-500/30 flex items-center justify-center gap-2"
            disabled={loading} 
          >
            {loading ? "Yüklənir..." : "Şifrəni Yenilə"}
          </Button>
        </form>
      </div>
    </div>
  );
}
