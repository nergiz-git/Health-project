import { useState, useEffect } from "react"; // ✅ useEffect əlavə edin
import { useNavigate, useLocation } from "react-router-dom";
import { Lock, Eye, EyeOff, CheckCircle, AlertCircle } from "lucide-react";
import { Button } from "../ui/Button";
import { Input } from "../ui/Input";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export default function ResetPasswordPage() {
    const navigate = useNavigate();
    const location = useLocation();
    const query = new URLSearchParams(location.search);
    const token = query.get("token");

    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState("");

    // ✅ Success olduqda avtomatik yönləndirmə
    useEffect(() => {
        if (success) {
            const timer = setTimeout(() => {
                navigate("/login");
            }, 2000);

            // Cleanup function
            return () => clearTimeout(timer);
        }
    }, [success, navigate]);

    const handleResetPassword = async (e) => {
        e.preventDefault();
        setError("");

        // Validation
        if (!newPassword) {
            setError("Yeni şifrə daxil edin");
            return;
        }

        if (newPassword.length < 6) {
            setError("Şifrə ən azı 6 simvol olmalıdır");
            return;
        }

        if (newPassword !== confirmPassword) {
            setError("Şifrələr uyğun gəlmir");
            return;
        }

        if (!token) {
            setError("Token tapılmadı. Link düzgün deyil.");
            return;
        }

        setLoading(true);

        try {
            const res = await fetch(`${API_BASE_URL}/auth/reset-password`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    token: token,
                    newPassword: newPassword
                })
            });

            const data = await res.json();
            console.log("RESET PASSWORD RESPONSE:", data);

            if (res.ok) {
                setSuccess(true);
                // ❌ setTimeout-u burdan silin
                // setTimeout burda yox, useEffect-də olmalıdır
            } else {
                setError(data.message || "Şifrə yenilənmədi");
            }
        } catch (err) {
            console.error("RESET PASSWORD ERROR:", err);
            setError("Server ilə əlaqə qurulmadı");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-black via-blue-50/30 to-green-50/30">
            <div className="bg-white p-10 rounded-2xl shadow-2xl w-full max-w-xl shadow-2xl w-full max-w-xl shadow-2xl shadow-slate-300/50">
                <h2 className="text-2xl font-bold mb-2 text-slate-900">Yeni Şifrə Təyin Et</h2>
                <p className="text-slate-600 mb-6">Yeni şifrənizi daxil edin</p>

                <form onSubmit={handleResetPassword} className="space-y-5">
                    {/* Yeni Şifrə */}
                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-2">
                            Yeni Şifrə
                        </label>
                        <div className="relative">
                            <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                            <Input
                                type={showPassword ? "text" : "password"}
                                placeholder="Yeni şifrə (ən azı 6 simvol)"
                                value={newPassword}
                                onChange={(e) => setNewPassword(e.target.value)}
                                className="pl-12 pr-12 py-3 border border-slate-300 rounded-xl w-full focus:ring-2 focus:ring-blue-500"
                                required
                                disabled={success} // ✅ Uğurlu olduqda input-ları disable et
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 !bg-transparent"
                                disabled={success}
                            >
                                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                            </button>
                        </div>
                    </div>

                    {/* Şifrə Təsdiqi */}
                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-2">
                            Şifrəni Təsdiqləyin
                        </label>
                        <div className="relative">
                            <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                            <Input
                                type={showConfirmPassword ? "text" : "password"}
                                placeholder="Şifrəni təkrar daxil edin"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                className="pl-12 pr-12 py-3 border border-slate-300 rounded-xl w-full focus:ring-2 focus:ring-blue-500"
                                required
                                disabled={success} // ✅ Uğurlu olduqda input-ları disable et
                            />
                            <button
                                type="button"
                                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 !bg-transparent"
                                disabled={success}
                            >
                                {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                            </button>
                        </div>
                    </div>

                    {/* Xəta Mesajı */}
                    {error && (
                        <div className="flex items-center gap-2 p-3 bg-red-50 border border-red-200 rounded-lg">
                            <AlertCircle className="w-5 h-5 text-red-600" />
                            <span className="text-red-600 text-sm">{error}</span>
                        </div>
                    )}

                    {/* Uğur Mesajı */}
                    {success && (
                        <div className="flex flex-col items-center gap-3 p-4 bg-green-50 border border-green-200 rounded-lg">
                            <CheckCircle className="w-8 h-8 text-green-600 animate-pulse" />
                            <span className="text-green-600 text-sm text-center font-semibold">
                                Şifrə uğurla yeniləndi! 2 saniyə sonra login səhifəsinə yönləndiriləcəksiniz...
                            </span>
                        </div>
                    )}

                    {/* Submit Düyməsi */}
                    <Button
                        type="submit"
                        className="w-full py-3 bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-700 hover:to-green-700 text-white font-semibold rounded-xl shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                        disabled={loading || success}
                    >
                        {loading ? (
                            <span className="flex items-center justify-center gap-2">
                                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                Yüklənir...
                            </span>
                        ) : success ? (
                            "Uğurla tamamlandı ✓"
                        ) : (
                            "Şifrəni Yenilə"
                        )}
                    </Button>
                </form>

                {/* Login-ə qayıt */}
                {/* {!success && ( // ✅ Success zamanı gizlət
                    <div className="mt-6 text-center">
                        <button
                            onClick={() => navigate("/login")}
                            className="text-blue-600 hover:text-blue-700 font-semibold text-sm !bg-transparent"
                        >
                            ← Login səhifəsinə qayıt
                        </button>
                    </div>
                )} */}
            </div>
        </div>
    );
}