import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API_URL from "../config/api";

function AdminLogin() {
  const navigate = useNavigate();

  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });

  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  function handleChange(event) {
    const { name, value } = event.target;

    setLoginData({
      ...loginData,
      [name]: value,
    });

    setMessage("");
  }

  async function handleSubmit(event) {
    event.preventDefault();

    if (loginData.email === "" || loginData.password === "") {
      setMessage("يرجى إدخال البريد وكلمة المرور");
      return;
    }

    try {
      setIsLoading(true);

      const response = await fetch(`${API_URL}/api/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(loginData),
      });

      const data = await response.json();

      if (!response.ok) {
        setMessage(data.message || "فشل تسجيل الدخول");
        return;
      }

      if (data.role !== "admin") {
        setMessage("هذا الحساب ليس حساب مدير");
        return;
      }

      localStorage.setItem("adminToken", data.token);
      localStorage.setItem("adminName", data.name);

      navigate("/admin/dashboard");
    } catch (error) {
      setMessage("تعذر الاتصال بالسيرفر");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <main className="admin-login-page">
      <form className="admin-login-card" onSubmit={handleSubmit}>
        <h1>تسجيل دخول الأدمن</h1>
        <p>ادخل بيانات المدير للوصول إلى لوحة التحكم</p>

        <input
          type="email"
          name="email"
          placeholder="البريد الإلكتروني"
          value={loginData.email}
          onChange={handleChange}
        />

        <input
          type="password"
          name="password"
          placeholder="كلمة المرور"
          value={loginData.password}
          onChange={handleChange}
        />

        <button type="submit" disabled={isLoading}>
          {isLoading ? "جاري الدخول..." : "دخول"}
        </button>

        {message && <div className="admin-message">{message}</div>}
      </form>
    </main>
  );
}

export default AdminLogin;