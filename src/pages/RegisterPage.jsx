import { useState } from 'react';
import { User, Mail, Lock, Eye, EyeOff, ArrowRight, Heart, Calendar, Ruler, Weight, X, AlertCircle } from 'lucide-react';
import medicalBg from "../assets/images/medicalBg.png"; 
import { Input } from '../ui/Input';
import { Button } from '../ui/Button';

 function RegisterPage({ onRegister, onSwitchToLogin }) {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [dateOfBirth, setDateOfBirth] = useState('');
  const [gender, setGender] = useState('male');
  const [height, setHeight] = useState(0);
  const [weight, setWeight] = useState(0);
  const [conditionCategory, setConditionCategory] = useState('');
  const [condition, setCondition] = useState('');
  const [severity, setSeverity] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [acceptTerms, setAcceptTerms] = useState(false);
  const [showValidationError, setShowValidationError] = useState(false);
  const [attemptedSubmit, setAttemptedSubmit] = useState(false);

  const healthConditionCategories = [
    'Ürək–damar sistemi','Tənəffüs sistemi','Endokrin və maddələr mübadiləsi',
    'Sinir sistemi','Əzələ–skelet sistemi','Həzm sistemi (mədə–bağırsaq)',
    'İmmun və autoimmun xəstəliklər','Psixi pozuntular',
    'Qan və qan yaradan orqanlar','Böyrək və qaraciyər xəstəlikləri'
  ];

  const conditionsByCategory = {
    'Ürək–damar sistemi': ['Arterial hipertenziya','İskemik ürək xəstəliyi','Ürək çatışmazlığı','Aritmiya','Ateroskleroz'],
    'Tənəffüs sistemi': ['Bronxial astma','Xroniki bronxit','XOAX','Allergik rinit'],
    'Endokrin və maddələr mübadiləsi': ['Şəkərli diabet','Hipotireoz','Hipertireoz','Piylənmə','Metabolik sindrom'],
    'Sinir sistemi': ['Epilepsiya','Miqren','Parkinson','Dağınıq skleroz'],
    'Əzələ–skelet sistemi': ['Osteoxondroz','Artroz','Artrit','Revmatoid artrit','Osteoporoz'],
    'Həzm sistemi (mədə–bağırsaq)': ['Xroniki qastrit','Xora','Pankreatit','Qıcıqlanmış bağırsaq'],
    'İmmun və autoimmun xəstəliklər': ['Psoriaz','Qurdeşənəyi','Kron','Çölyak'],
    'Psixi pozuntular': ['Depressiya','Anksiyete','Bipolyar'],
    'Qan və qan yaradan orqanlar': ['Anemiya','Talassemiya'],
    'Böyrək və qaraciyər xəstəlikləri': ['Böyrək çatışmazlığı','Hepatit','Sirroz']
  };

  const getAvailableConditions = () => conditionCategory ? conditionsByCategory[conditionCategory] || [] : [];

  const handleSubmit = (e) => {
    e.preventDefault();
    setAttemptedSubmit(true);

    const isValid =
      fullName && email && dateOfBirth && height > 0 && weight > 0 &&
      conditionCategory && condition && severity &&
      password && confirmPassword && acceptTerms;

    if (!isValid || password !== confirmPassword) {
      setShowValidationError(true);
      return;
    }

    setShowValidationError(false);

    onRegister({
      fullName, email, password, dateOfBirth, gender,
      height, weight, conditionCategory, condition, severity
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-green-50/30 to-blue-50/30">
      <div className="max-w-[900px] mx-auto py-12 px-6">
        <div className="bg-white rounded-3xl shadow-xl p-10">

          <h2 className="text-3xl font-bold mb-6">Hesab Yaradın</h2>

          <form onSubmit={handleSubmit} className="space-y-5">
            <Input placeholder="Ad Soyad" value={fullName} onChange={e=>setFullName(e.target.value)} />
            <Input type="email" placeholder="Email" value={email} onChange={e=>setEmail(e.target.value)} />
            <Input type="date" value={dateOfBirth} onChange={e=>setDateOfBirth(e.target.value)} />

            <select value={gender} onChange={e=>setGender(e.target.value)} className="border p-3 rounded-xl w-full">
              <option value="male">Kişi</option>
              <option value="female">Qadın</option>
            </select>

            <Input type="number" placeholder="Boy" value={height||''} onChange={e=>setHeight(Number(e.target.value))}/>
            <Input type="number" placeholder="Çəki" value={weight||''} onChange={e=>setWeight(Number(e.target.value))}/>

            <select value={conditionCategory} onChange={e=>setConditionCategory(e.target.value)} className="border p-3 rounded-xl w-full">
              <option value="">Kateqoriya seç</option>
              {healthConditionCategories.map(c => <option key={c}>{c}</option>)}
            </select>

            <select value={condition} onChange={e=>setCondition(e.target.value)} className="border p-3 rounded-xl w-full">
              <option value="">Xəstəlik seç</option>
              {getAvailableConditions().map(c => <option key={c}>{c}</option>)}
            </select>

            <select value={severity} onChange={e=>setSeverity(e.target.value)} className="border p-3 rounded-xl w-full">
              <option value="">Ağırlıq</option>
              <option value="mild">Yüngül</option>
              <option value="moderate">Orta</option>
              <option value="severe">Ağır</option>
            </select>

            <Input type="password" placeholder="Şifrə" value={password} onChange={e=>setPassword(e.target.value)} />
            <Input type="password" placeholder="Şifrə təkrar" value={confirmPassword} onChange={e=>setConfirmPassword(e.target.value)} />

            <Button type="submit" className="w-full">Hesab Yarat</Button>
          </form>

          <p className="text-center mt-6">
            Hesabın var? 
            <button onClick={onSwitchToLogin} className="text-green-600 ml-2">Daxil ol</button>
          </p>

        </div>
      </div>
    </div>
  );
}

export default RegisterPage;