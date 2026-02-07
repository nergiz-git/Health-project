import { useState } from "react";
import { Mail, Lock, Eye, EyeOff, ArrowRight, X, CheckCircle, AlertCircle } from "lucide-react";
import { Button } from "../ui/Button";
import medicalBg from "../assets/images/medicalBg.png"; // uzantını yaz

import { Label } from "../ui/Label";
import { Input } from "../ui/Input";

 function LoginPage({ onLogin, onSwitchToRegister }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [showForgotPasswordModal, setShowForgotPasswordModal] = useState(false);
  const [resetEmail, setResetEmail] = useState("");
  const [resetSent, setResetSent] = useState(false);
  const [showValidationError, setShowValidationError] = useState(false);
  const [attemptedSubmit, setAttemptedSubmit] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setAttemptedSubmit(true);

    if (!email || !password) {
      setShowValidationError(true);
      return;
    }

    setShowValidationError(false);
    onLogin(email, password);
  };

  const getInputClassName = (value) => {
    if (!attemptedSubmit)
      return "pl-12 pr-4 py-6 text-[15px] border-slate-300 focus:border-blue-500 focus:ring-blue-500/30 rounded-xl";

    return !value
      ? "pl-12 pr-4 py-6 text-[15px] border border-red-500 focus:border-red-500 focus:ring-red-500/30 rounded-xl"
      : "pl-12 pr-4 py-6 text-[15px] border border-slate-300 focus:border-blue-500 focus:ring-blue-500/30 rounded-xl";
  };

  const getPasswordInputClassName = (value) => {
    if (!attemptedSubmit)
      return "pl-12 pr-12 py-6 text-[15px] border-slate-300 focus:border-blue-500 focus:ring-blue-500/30 rounded-xl";

    return !value
      ? "pl-12 pr-12 py-6 text-[15px] border border-red-500 focus:border-red-500 focus:ring-red-500/30 rounded-xl"
      : "pl-12 pr-12 py-6 text-[15px] border border-slate-300 focus:border-blue-500 focus:ring-blue-500/30 rounded-xl";
  };

  const handleForgotPassword = (e) => {
    e.preventDefault();
    console.log("Password reset requested for:", resetEmail);
    setResetSent(true);

    setTimeout(() => {
      setShowForgotPasswordModal(false);
      setResetSent(false);
      setResetEmail("");
    }, 3000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-green-50/30 relative overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center opacity-15"
        style={{ backgroundImage: `url(${medicalBg})` }}
      />

      <div className="relative z-10 grid lg:grid-cols-2 gap-8 lg:gap-16 items-center max-w-[1400px] mx-auto px-6 lg:px-12 py-12 min-h-screen">
        <div className="hidden lg:block">
          <div className="space-y-10">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-green-500 rounded-2xl flex items-center justify-center shadow-lg shadow-blue-500/30">
                <span className="text-white font-bold text-[20px]">H</span>
              </div>
              <span className="font-bold text-slate-800 text-[28px] tracking-tight">
                Health Assistant
              </span>
            </div>
          </div>
        </div>

        <div className="w-full">
          <div className="bg-white rounded-3xl shadow-2xl p-10 border border-slate-200/80">
            <div className="mb-8">
              <h2 className="text-slate-900 text-[28px] font-bold">Xoş Gəlmisiniz</h2>
              <p className="text-slate-600 text-[15px]">Sağlamlıq panelinizə daxil olun</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label>Email Ünvanı</Label>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                  <Input
                    type="email"
                    placeholder="sizin.email@gmail.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className={getInputClassName(email)}
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label>Şifrə</Label>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                  <Input
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className={getPasswordInputClassName(password)}
                    required
                  />

                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400"
                  >
                    {showPassword ? <EyeOff /> : <Eye />}
                  </button>
                </div>
              </div>

              {showValidationError && (
                <div className="bg-red-50 border border-red-200 rounded-lg p-3 flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 text-red-600" />
                  <p className="text-red-600 text-[13px]">
                    Zəhmət olmasa bütün xanaları doldurun
                  </p>
                </div>
              )}

              <Button type="submit" className="w-full py-6 bg-gradient-to-r from-blue-600 to-green-600 text-white rounded-xl">
                Daxil ol
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </form>

            <div className="text-center mt-6">
              <p>
                Hesabınız yoxdur?{" "}
                <button onClick={onSwitchToRegister} className="text-blue-600 font-semibold">
                  Qeydiyyatdan keçin
                </button>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;