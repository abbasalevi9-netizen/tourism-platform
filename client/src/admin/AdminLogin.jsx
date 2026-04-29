import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import API_URL from "../config/api";
import { useLanguage } from "../context/LanguageContext";

const authText = {
  ar: {
    titleLogin: "تسجيل الدخول",
    titleRegister: "إنشاء حساب جديد",
    subtitleLogin:
      "ادخل بحسابك. إذا كان الحساب أدمن سيتم تحويلك تلقائيًا إلى لوحة التحكم.",
    subtitleRegister: "أنشئ حسابك لمتابعة حجوزاتك وتجربة الموقع بشكل أفضل.",
    name: "الاسم الكامل",
    email: "البريد الإلكتروني",
    password: "كلمة المرور",
    login: "دخول",
    register: "إنشاء الحساب",
    loadingLogin: "جاري الدخول...",
    loadingRegister: "جاري إنشاء الحساب...",
    needAccount: "ليس لديك حساب؟",
    haveAccount: "لديك حساب بالفعل؟",
    createAccount: "إنشاء حساب",
    backToLogin: "تسجيل الدخول",
    requiredLogin: "يرجى إدخال البريد وكلمة المرور",
    requiredRegister: "يرجى إدخال الاسم والبريد وكلمة المرور",
    home: "العودة للرئيسية",
  },
  en: {
    titleLogin: "Login",
    titleRegister: "Create account",
    subtitleLogin:
      "Sign in to your account. Admin accounts are redirected to the dashboard automatically.",
    subtitleRegister: "Create your account to manage your booking experience.",
    name: "Full name",
    email: "Email address",
    password: "Password",
    login: "Login",
    register: "Create account",
    loadingLogin: "Signing in...",
    loadingRegister: "Creating account...",
    needAccount: "Don’t have an account?",
    haveAccount: "Already have an account?",
    createAccount: "Create account",
    backToLogin: "Login",
    requiredLogin: "Please enter email and password",
    requiredRegister: "Please enter name, email and password",
    home: "Back home",
  },
  tr: {
    titleLogin: "Giriş",
    titleRegister: "Yeni hesap oluştur",
    subtitleLogin:
      "Hesabınıza giriş yapın. Admin hesabı otomatik olarak panele yönlendirilir.",
    subtitleRegister: "Rezervasyon deneyiminizi yönetmek için hesap oluşturun.",
    name: "Ad Soyad",
    email: "E-posta",
    password: "Şifre",
    login: "Giriş",
    register: "Hesap oluştur",
    loadingLogin: "Giriş yapılıyor...",
    loadingRegister: "Hesap oluşturuluyor...",
    needAccount: "Hesabınız yok mu?",
    haveAccount: "Zaten hesabınız var mı?",
    createAccount: "Hesap oluştur",
    backToLogin: "Giriş",
    requiredLogin: "Lütfen e-posta ve şifre girin",
    requiredRegister: "Lütfen ad, e-posta ve şifre girin",
    home: "Ana sayfaya dön",
  },
  fr: {
    titleLogin: "Connexion",
    titleRegister: "Créer un compte",
    subtitleLogin:
      "Connectez-vous. Les comptes admin sont redirigés automatiquement vers le tableau de bord.",
    subtitleRegister: "Créez votre compte pour une meilleure expérience.",
    name: "Nom complet",
    email: "Adresse e-mail",
    password: "Mot de passe",
    login: "Connexion",
    register: "Créer le compte",
    loadingLogin: "Connexion...",
    loadingRegister: "Création...",
    needAccount: "Vous n’avez pas de compte ?",
    haveAccount: "Vous avez déjà un compte ?",
    createAccount: "Créer un compte",
    backToLogin: "Connexion",
    requiredLogin: "Veuillez entrer l’e-mail et le mot de passe",
    requiredRegister: "Veuillez entrer le nom, l’e-mail et le mot de passe",
    home: "Retour à l’accueil",
  },
};

function saveAuthData(data) {
  localStorage.setItem("authToken", data.token);
  localStorage.setItem("authName", data.name);
  localStorage.setItem("authEmail", data.email);
  localStorage.setItem("authRole", data.role);

  if (data.role === "admin") {
    localStorage.setItem("adminToken", data.token);
    localStorage.setItem("adminName", data.name);
  } else {
    localStorage.removeItem("adminToken");
    localStorage.removeItem("adminName");
  }

  window.dispatchEvent(new Event("authChanged"));
}

function AdminLogin() {
  const navigate = useNavigate();
  const { language } = useLanguage();

  const text = authText[language] || authText.en;

  const [mode, setMode] = useState("login");

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const isLogin = mode === "login";

  function handleChange(event) {
    const { name, value } = event.target;

    setFormData({
      ...formData,
      [name]: value,
    });

    setMessage("");
  }

  async function handleSubmit(event) {
    event.preventDefault();

    if (isLogin && (!formData.email || !formData.password)) {
      setMessage(text.requiredLogin);
      return;
    }

    if (!isLogin && (!formData.name || !formData.email || !formData.password)) {
      setMessage(text.requiredRegister);
      return;
    }

    try {
      setIsLoading(true);
      setMessage("");

      const endpoint = isLogin
        ? `${API_URL}/api/auth/login`
        : `${API_URL}/api/auth/register`;

      const payload = isLogin
        ? {
            email: formData.email,
            password: formData.password,
          }
        : {
            name: formData.name,
            email: formData.email,
            password: formData.password,
          };

      const response = await fetch(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (!response.ok) {
        setMessage(data.message || "حدث خطأ");
        return;
      }

      saveAuthData(data);

      if (data.role === "admin") {
        navigate("/admin/dashboard");
      } else {
        navigate("/");
      }
    } catch (error) {
      setMessage("تعذر الاتصال بالسيرفر");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <main className="admin-login-page auth-page">
      <form className="admin-login-card auth-card" onSubmit={handleSubmit}>
        <div className="auth-tabs">
          <button
            type="button"
            className={isLogin ? "active-auth-tab" : ""}
            onClick={() => {
              setMode("login");
              setMessage("");
            }}
          >
            {text.login}
          </button>

          <button
            type="button"
            className={!isLogin ? "active-auth-tab" : ""}
            onClick={() => {
              setMode("register");
              setMessage("");
            }}
          >
            {text.register}
          </button>
        </div>

        <h1>{isLogin ? text.titleLogin : text.titleRegister}</h1>

        <p>{isLogin ? text.subtitleLogin : text.subtitleRegister}</p>

        {!isLogin && (
          <input
            type="text"
            name="name"
            placeholder={text.name}
            value={formData.name}
            onChange={handleChange}
          />
        )}

        <input
          type="email"
          name="email"
          placeholder={text.email}
          value={formData.email}
          onChange={handleChange}
        />

        <input
          type="password"
          name="password"
          placeholder={text.password}
          value={formData.password}
          onChange={handleChange}
        />

        <button type="submit" disabled={isLoading}>
          {isLoading
            ? isLogin
              ? text.loadingLogin
              : text.loadingRegister
            : isLogin
              ? text.login
              : text.register}
        </button>

        {message && <div className="admin-message">{message}</div>}

        <div className="auth-switch-line">
          <span>{isLogin ? text.needAccount : text.haveAccount}</span>

          <button
            type="button"
            onClick={() => {
              setMode(isLogin ? "register" : "login");
              setMessage("");
            }}
          >
            {isLogin ? text.createAccount : text.backToLogin}
          </button>
        </div>

        <Link to="/" className="auth-home-link">
          {text.home}
        </Link>
      </form>
    </main>
  );
}

export default AdminLogin;
