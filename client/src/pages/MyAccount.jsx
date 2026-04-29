import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import API_URL from "../config/api";
import { useLanguage } from "../context/LanguageContext";
import { useSiteSettings } from "../context/SiteSettingsContext";

const accountText = {
  ar: {
    title: "حسابي",
    subtitle: "تابع بيانات حسابك وحجوزاتك من مكان واحد",
    name: "الاسم",
    email: "البريد الإلكتروني",
    role: "نوع الحساب",
    admin: "أدمن",
    user: "مستخدم",
    bookingsTitle: "حجوزاتي",
    noBookings: "لا توجد حجوزات حتى الآن",
    bookNow: "احجز رحلة الآن",
    destination: "الوجهة",
    date: "التاريخ",
    people: "الأشخاص",
    status: "حالة الحجز",
    payment: "حالة الدفع",
    price: "السعر",
    loading: "جاري تحميل الحجوزات...",
    loginRequired: "يجب تسجيل الدخول أولًا",
    login: "تسجيل الدخول",
    new: "جديد",
    confirmed: "مؤكد",
    cancelled: "ملغي",
    unpaid: "غير مدفوع",
    pending: "بانتظار الدفع",
    paid: "مدفوع",
  },
  en: {
    title: "My Account",
    subtitle: "Manage your profile and bookings in one place",
    name: "Name",
    email: "Email",
    role: "Account type",
    admin: "Admin",
    user: "User",
    bookingsTitle: "My Bookings",
    noBookings: "No bookings yet",
    bookNow: "Book a trip now",
    destination: "Destination",
    date: "Date",
    people: "People",
    status: "Booking status",
    payment: "Payment status",
    price: "Price",
    loading: "Loading bookings...",
    loginRequired: "Please login first",
    login: "Login",
    new: "New",
    confirmed: "Confirmed",
    cancelled: "Cancelled",
    unpaid: "Unpaid",
    pending: "Pending",
    paid: "Paid",
  },
  tr: {
    title: "Hesabım",
    subtitle: "Profilinizi ve rezervasyonlarınızı tek yerden yönetin",
    name: "Ad",
    email: "E-posta",
    role: "Hesap türü",
    admin: "Admin",
    user: "Kullanıcı",
    bookingsTitle: "Rezervasyonlarım",
    noBookings: "Henüz rezervasyon yok",
    bookNow: "Şimdi rezervasyon yap",
    destination: "Rota",
    date: "Tarih",
    people: "Kişi",
    status: "Rezervasyon durumu",
    payment: "Ödeme durumu",
    price: "Fiyat",
    loading: "Rezervasyonlar yükleniyor...",
    loginRequired: "Lütfen önce giriş yapın",
    login: "Giriş",
    new: "Yeni",
    confirmed: "Onaylandı",
    cancelled: "İptal",
    unpaid: "Ödenmedi",
    pending: "Beklemede",
    paid: "Ödendi",
  },
  fr: {
    title: "Mon compte",
    subtitle: "Gérez votre profil et vos réservations",
    name: "Nom",
    email: "E-mail",
    role: "Type de compte",
    admin: "Admin",
    user: "Utilisateur",
    bookingsTitle: "Mes réservations",
    noBookings: "Aucune réservation pour le moment",
    bookNow: "Réserver maintenant",
    destination: "Destination",
    date: "Date",
    people: "Personnes",
    status: "Statut",
    payment: "Paiement",
    price: "Prix",
    loading: "Chargement des réservations...",
    loginRequired: "Veuillez vous connecter d’abord",
    login: "Connexion",
    new: "Nouveau",
    confirmed: "Confirmé",
    cancelled: "Annulé",
    unpaid: "Non payé",
    pending: "En attente",
    paid: "Payé",
  },
  de: {
    title: "Mein Konto",
    subtitle: "Verwalten Sie Ihr Profil und Ihre Buchungen",
    name: "Name",
    email: "E-Mail",
    role: "Kontotyp",
    admin: "Admin",
    user: "Benutzer",
    bookingsTitle: "Meine Buchungen",
    noBookings: "Noch keine Buchungen",
    bookNow: "Jetzt buchen",
    destination: "Reiseziel",
    date: "Datum",
    people: "Personen",
    status: "Status",
    payment: "Zahlung",
    price: "Preis",
    loading: "Buchungen werden geladen...",
    loginRequired: "Bitte zuerst anmelden",
    login: "Anmelden",
    new: "Neu",
    confirmed: "Bestätigt",
    cancelled: "Storniert",
    unpaid: "Nicht bezahlt",
    pending: "Ausstehend",
    paid: "Bezahlt",
  },
  es: {
    title: "Mi cuenta",
    subtitle: "Gestiona tu perfil y reservas",
    name: "Nombre",
    email: "Correo",
    role: "Tipo de cuenta",
    admin: "Admin",
    user: "Usuario",
    bookingsTitle: "Mis reservas",
    noBookings: "Aún no hay reservas",
    bookNow: "Reservar ahora",
    destination: "Destino",
    date: "Fecha",
    people: "Personas",
    status: "Estado",
    payment: "Pago",
    price: "Precio",
    loading: "Cargando reservas...",
    loginRequired: "Inicia sesión primero",
    login: "Iniciar sesión",
    new: "Nuevo",
    confirmed: "Confirmado",
    cancelled: "Cancelado",
    unpaid: "No pagado",
    pending: "Pendiente",
    paid: "Pagado",
  },
  it: {
    title: "Il mio account",
    subtitle: "Gestisci profilo e prenotazioni",
    name: "Nome",
    email: "Email",
    role: "Tipo account",
    admin: "Admin",
    user: "Utente",
    bookingsTitle: "Le mie prenotazioni",
    noBookings: "Nessuna prenotazione",
    bookNow: "Prenota ora",
    destination: "Destinazione",
    date: "Data",
    people: "Persone",
    status: "Stato",
    payment: "Pagamento",
    price: "Prezzo",
    loading: "Caricamento prenotazioni...",
    loginRequired: "Accedi prima",
    login: "Accedi",
    new: "Nuovo",
    confirmed: "Confermato",
    cancelled: "Annullato",
    unpaid: "Non pagato",
    pending: "In attesa",
    paid: "Pagato",
  },
  ru: {
    title: "Мой аккаунт",
    subtitle: "Управляйте профилем и бронированиями",
    name: "Имя",
    email: "Email",
    role: "Тип аккаунта",
    admin: "Админ",
    user: "Пользователь",
    bookingsTitle: "Мои бронирования",
    noBookings: "Бронирований пока нет",
    bookNow: "Забронировать",
    destination: "Направление",
    date: "Дата",
    people: "Люди",
    status: "Статус",
    payment: "Оплата",
    price: "Цена",
    loading: "Загрузка бронирований...",
    loginRequired: "Сначала войдите",
    login: "Войти",
    new: "Новое",
    confirmed: "Подтверждено",
    cancelled: "Отменено",
    unpaid: "Не оплачено",
    pending: "Ожидает",
    paid: "Оплачено",
  },
};

function MyAccount() {
  const navigate = useNavigate();
  const { language } = useLanguage();
  const { settings } = useSiteSettings();
  const text = accountText[language] || accountText.en;

  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");

  const token = localStorage.getItem("authToken");
  const name = localStorage.getItem("authName");
  const email = localStorage.getItem("authEmail");
  const role = localStorage.getItem("authRole");

  useEffect(() => {
    async function fetchMyBookings() {
      if (!token) {
        setMessage(text.loginRequired);
        setLoading(false);
        return;
      }

      try {
        setLoading(true);

        const response = await fetch(`${API_URL}/api/bookings/my-bookings`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await response.json();

        if (!response.ok) {
          setMessage(data.message || text.loginRequired);
          return;
        }

        setBookings(data);
      } catch (error) {
        setMessage("Server connection error");
      } finally {
        setLoading(false);
      }
    }

    fetchMyBookings();
  }, [token, text.loginRequired]);

  if (!token) {
    return (
      <main className="my-account-page">
        <section className="my-account-empty">
          <h1>{text.loginRequired}</h1>
          <Link to="/admin/login">{text.login}</Link>
        </section>
      </main>
    );
  }
  function getWhatsAppLink(booking) {
    const phone = (settings.whatsapp || settings.phone || "").replace(
      /\D/g,
      "",
    );

    const message = `
مرحبًا، أريد الاستفسار عن حجزي:
الوجهة: ${booking.destination}
التاريخ: ${booking.date}
عدد الأشخاص: ${booking.people}
حالة الحجز: ${booking.status}
حالة الدفع: ${booking.paymentStatus || "unpaid"}
`.trim();

    return `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
  }

  return (
    <main className="my-account-page">
      <section className="my-account-hero">
        <div>
          <span>{text.title}</span>
          <h1>{name || text.user}</h1>
          <p>{text.subtitle}</p>
        </div>
      </section>

      <section className="my-account-layout">
        <aside className="my-profile-card">
          <div className="profile-avatar">
            {(name || "U").charAt(0).toUpperCase()}
          </div>

          <div className="profile-row">
            <span>{text.name}</span>
            <strong>{name || "-"}</strong>
          </div>

          <div className="profile-row">
            <span>{text.email}</span>
            <strong>{email || "-"}</strong>
          </div>

          <div className="profile-row">
            <span>{text.role}</span>
            <strong>{role === "admin" ? text.admin : text.user}</strong>
          </div>

          {role === "admin" && (
            <Link to="/admin/dashboard" className="profile-admin-link">
              Admin Dashboard
            </Link>
          )}
        </aside>

        <section className="my-bookings-card">
          <div className="my-bookings-header">
            <div>
              <h2>{text.bookingsTitle}</h2>
              <p>{bookings.length} booking(s)</p>
            </div>

            <Link to="/" className="my-book-btn">
              {text.bookNow}
            </Link>
          </div>

          {loading && <p className="account-message">{text.loading}</p>}

          {!loading && message && <p className="account-message">{message}</p>}

          {!loading && !message && bookings.length === 0 && (
            <div className="account-empty-bookings">
              <h3>{text.noBookings}</h3>
              <Link to="/">{text.bookNow}</Link>
            </div>
          )}

          {!loading && !message && bookings.length > 0 && (
            <div className="my-bookings-list">
              {bookings.map((booking) => (
                <article className="my-booking-item" key={booking._id}>
                  <div className="booking-main-info">
                    <h3>{booking.destination}</h3>

                    <p>
                      {text.date}: <b>{booking.date}</b>
                    </p>

                    <p>
                      {text.people}: <b>{booking.people}</b>
                    </p>
                  </div>

                  <div className="booking-status-info">
                    <span className={`account-status status-${booking.status}`}>
                      {text[booking.status] || booking.status}
                    </span>

                    <span
                      className={`account-status payment-${
                        booking.paymentStatus || "unpaid"
                      }`}
                    >
                      {text[booking.paymentStatus || "unpaid"] ||
                        booking.paymentStatus}
                    </span>
                  </div>

                  <div className="booking-price-info">
                    <span>{text.price}</span>
                    <strong>
                      {booking.priceAtBooking
                        ? `${booking.priceAtBooking} ${booking.currency || "$"}`
                        : "-"}
                    </strong>
                  </div>

                  <div className="booking-user-actions">
                    {booking.experienceId?._id && (
                      <Link to={`/experiences/${booking.experienceId._id}`}>
                        تفاصيل الرحلة
                      </Link>
                    )}

                    <a
                      href={getWhatsAppLink(booking)}
                      target="_blank"
                      rel="noreferrer"
                    >
                      واتساب
                    </a>
                  </div>
                </article>
              ))}
            </div>
          )}
        </section>
      </section>
    </main>
  );
}

export default MyAccount;
