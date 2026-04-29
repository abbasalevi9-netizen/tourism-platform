import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import API_URL from "../config/api";
import AdminSettings from "./AdminSettings";

const contentLanguages = [
  {
    code: "ar",
    suffix: "Ar",
    tabLabel: "العربية",
    heading: "البيانات العربية",
    titlePlaceholder: "العنوان بالعربية",
    countryPlaceholder: "الدولة بالعربية",
    cityPlaceholder: "المدينة بالعربية",
    descriptionPlaceholder: "الوصف بالعربية",
  },
  {
    code: "ar-eg",
    suffix: "ArEg",
    tabLabel: "مصري",
    heading: "البيانات باللهجة المصرية",
    titlePlaceholder: "العنوان بالمصري",
    countryPlaceholder: "الدولة بالمصري",
    cityPlaceholder: "المدينة بالمصري",
    descriptionPlaceholder: "الوصف بالمصري",
  },
  {
    code: "ar-ma",
    suffix: "ArMa",
    tabLabel: "مغربي",
    heading: "البيانات بالدارجة المغربية",
    titlePlaceholder: "العنوان بالمغربي",
    countryPlaceholder: "الدولة بالمغربي",
    cityPlaceholder: "المدينة بالمغربي",
    descriptionPlaceholder: "الوصف بالمغربي",
  },
  {
    code: "ar-dz",
    suffix: "ArDz",
    tabLabel: "جزائري",
    heading: "البيانات باللهجة الجزائرية",
    titlePlaceholder: "العنوان بالجزائري",
    countryPlaceholder: "الدولة بالجزائري",
    cityPlaceholder: "المدينة بالجزائري",
    descriptionPlaceholder: "الوصف بالجزائري",
  },
  {
    code: "en",
    suffix: "En",
    tabLabel: "English",
    heading: "English Data",
    titlePlaceholder: "Title in English",
    countryPlaceholder: "Country in English",
    cityPlaceholder: "City in English",
    descriptionPlaceholder: "Description in English",
  },
  {
    code: "tr",
    suffix: "Tr",
    tabLabel: "Türkçe",
    heading: "Türkçe Bilgiler",
    titlePlaceholder: "Türkçe başlık",
    countryPlaceholder: "Türkçe ülke",
    cityPlaceholder: "Türkçe şehir",
    descriptionPlaceholder: "Türkçe açıklama",
  },
  {
    code: "fr",
    suffix: "Fr",
    tabLabel: "Français",
    heading: "Données en français",
    titlePlaceholder: "Titre en français",
    countryPlaceholder: "Pays en français",
    cityPlaceholder: "Ville en français",
    descriptionPlaceholder: "Description en français",
  },
  {
    code: "de",
    suffix: "De",
    tabLabel: "Deutsch",
    heading: "Deutsche Daten",
    titlePlaceholder: "Titel auf Deutsch",
    countryPlaceholder: "Land auf Deutsch",
    cityPlaceholder: "Stadt auf Deutsch",
    descriptionPlaceholder: "Beschreibung auf Deutsch",
  },
  {
    code: "es",
    suffix: "Es",
    tabLabel: "Español",
    heading: "Datos en español",
    titlePlaceholder: "Título en español",
    countryPlaceholder: "País en español",
    cityPlaceholder: "Ciudad en español",
    descriptionPlaceholder: "Descripción en español",
  },
  {
    code: "it",
    suffix: "It",
    tabLabel: "Italiano",
    heading: "Dati in italiano",
    titlePlaceholder: "Titolo in italiano",
    countryPlaceholder: "Paese in italiano",
    cityPlaceholder: "Città in italiano",
    descriptionPlaceholder: "Descrizione in italiano",
  },
  {
    code: "ru",
    suffix: "Ru",
    tabLabel: "Русский",
    heading: "Данные на русском",
    titlePlaceholder: "Название на русском",
    countryPlaceholder: "Страна на русском",
    cityPlaceholder: "Город на русском",
    descriptionPlaceholder: "Описание на русском",
  },
];

function createEmptyLocalizedFields() {
  return contentLanguages.reduce((fields, language) => {
    fields[`title${language.suffix}`] = "";
    fields[`country${language.suffix}`] = "";
    fields[`city${language.suffix}`] = "";
    fields[`description${language.suffix}`] = "";
    return fields;
  }, {});
}

const emptyExperienceForm = {
  category: "tour",

  ...createEmptyLocalizedFields(),

  price: "",
  currency: "$",
  duration: "",
  image: "",
  rating: "5",
  featured: true,
  isActive: true,
};

const categoryLabels = {
  tour: "رحلات سياحية",
  flight: "رحلات طيران",
  attraction: "معالم سياحية",
  activity: "أنشطة وتجارب",
};

const bookingStatusLabels = {
  new: "جديد",
  confirmed: "مؤكد",
  cancelled: "ملغي",
};

const paymentStatusLabels = {
  unpaid: "غير مدفوع",
  pending: "بانتظار الدفع",
  paid: "مدفوع",
};

const contactMethodLabels = {
  whatsapp: "واتساب",
  call: "اتصال",
  email: "إيميل",
};

function getContentTitle(experience) {
  return (
    experience.titleAr ||
    experience.titleEn ||
    experience.titleTr ||
    experience.titleFr ||
    experience.titleDe ||
    "محتوى بدون عنوان"
  );
}

function getContentLocation(experience) {
  return (
    experience.cityAr ||
    experience.countryAr ||
    experience.cityEn ||
    experience.countryEn ||
    experience.cityFr ||
    experience.countryFr ||
    "غير محدد"
  );
}

function getContentSubtitle(experience) {
  const alternatives = [
    experience.titleEn,
    experience.titleTr,
    experience.titleFr,
    experience.titleDe,
    experience.titleEs,
    experience.titleIt,
    experience.titleRu,
  ].filter(Boolean);

  return alternatives.slice(0, 2).join(" / ") || "لا توجد ترجمة إضافية";
}

function getTranslationsCount(experience) {
  return contentLanguages.filter((language) => {
    const title = experience[`title${language.suffix}`];
    return typeof title === "string" && title.trim() !== "";
  }).length;
}

function getBookingPrice(booking) {
  if (!booking.priceAtBooking) {
    return "-";
  }

  return `${booking.priceAtBooking} ${booking.currency || "$"}`;
}

function AdminDashboard() {
  const navigate = useNavigate();

  const adminName = localStorage.getItem("adminName");
  const adminToken = localStorage.getItem("adminToken");

  const [activeTab, setActiveTab] = useState("overview");
  const [activeFormLang, setActiveFormLang] = useState("ar");

  const [bookings, setBookings] = useState([]);
  const [experiences, setExperiences] = useState([]);

  const [bookingsLoading, setBookingsLoading] = useState(true);
  const [experiencesLoading, setExperiencesLoading] = useState(true);

  const [message, setMessage] = useState("");

  const [bookingSearch, setBookingSearch] = useState("");
  const [bookingStatusFilter, setBookingStatusFilter] = useState("all");
  const [paymentStatusFilter, setPaymentStatusFilter] = useState("all");

  const [contentSearch, setContentSearch] = useState("");
  const [contentCategoryFilter, setContentCategoryFilter] = useState("all");

  const [experienceForm, setExperienceForm] = useState(emptyExperienceForm);
  const [editingExperienceId, setEditingExperienceId] = useState(null);
  const [isSavingExperience, setIsSavingExperience] = useState(false);

  const [selectedImage, setSelectedImage] = useState(null);
  const [isUploadingImage, setIsUploadingImage] = useState(false);

  useEffect(() => {
    if (!adminToken) {
      navigate("/admin/login");
    }
  }, [adminToken, navigate]);

  useEffect(() => {
    fetchBookings();
    fetchExperiences();
  }, []);

  function handleLogout() {
    localStorage.removeItem("adminToken");
    localStorage.removeItem("adminName");
    navigate("/admin/login");
  }

  async function fetchBookings() {
    if (!adminToken) {
      setBookingsLoading(false);
      return;
    }

    try {
      setBookingsLoading(true);

      const response = await fetch(`${API_URL}/api/bookings`, {
        headers: {
          Authorization: `Bearer ${adminToken}`,
        },
      });

      const data = await response.json();

      if (!response.ok) {
        setMessage(data.message || "فشل تحميل الحجوزات");
        return;
      }

      setBookings(data);
    } catch (error) {
      setMessage("تعذر الاتصال بالسيرفر أثناء تحميل الحجوزات");
    } finally {
      setBookingsLoading(false);
    }
  }

  async function fetchExperiences() {
    if (!adminToken) {
      setExperiencesLoading(false);
      return;
    }

    try {
      setExperiencesLoading(true);

      const response = await fetch(`${API_URL}/api/experiences/admin/all`, {
        headers: {
          Authorization: `Bearer ${adminToken}`,
        },
      });

      const data = await response.json();

      if (!response.ok) {
        setMessage(data.message || "فشل تحميل المحتوى السياحي");
        return;
      }

      setExperiences(data);
    } catch (error) {
      setMessage("تعذر الاتصال بالسيرفر أثناء تحميل المحتوى السياحي");
    } finally {
      setExperiencesLoading(false);
    }
  }

  async function updateBookingStatus(bookingId, newStatus) {
    try {
      const response = await fetch(
        `${API_URL}/api/bookings/${bookingId}/status`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${adminToken}`,
          },
          body: JSON.stringify({
            status: newStatus,
          }),
        },
      );

      const data = await response.json();

      if (!response.ok) {
        setMessage(data.message || "فشل تحديث حالة الحجز");
        return;
      }

      setBookings(
        bookings.map((booking) => (booking._id === bookingId ? data : booking)),
      );

      setMessage("تم تحديث حالة الحجز بنجاح");
    } catch (error) {
      setMessage("تعذر الاتصال بالسيرفر");
    }
  }

  async function updatePaymentStatus(bookingId, newPaymentStatus) {
    try {
      const response = await fetch(
        `${API_URL}/api/bookings/${bookingId}/payment`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${adminToken}`,
          },
          body: JSON.stringify({
            paymentStatus: newPaymentStatus,
          }),
        },
      );

      const data = await response.json();

      if (!response.ok) {
        setMessage(data.message || "فشل تحديث حالة الدفع");
        return;
      }

      setBookings(
        bookings.map((booking) => (booking._id === bookingId ? data : booking)),
      );

      setMessage("تم تحديث حالة الدفع بنجاح");
    } catch (error) {
      setMessage("تعذر الاتصال بالسيرفر");
    }
  }

  async function deleteBooking(bookingId) {
    const confirmDelete = window.confirm("هل أنت متأكد من حذف هذا الحجز؟");

    if (!confirmDelete) {
      return;
    }

    try {
      const response = await fetch(`${API_URL}/api/bookings/${bookingId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${adminToken}`,
        },
      });

      const data = await response.json();

      if (!response.ok) {
        setMessage(data.message || "فشل حذف الحجز");
        return;
      }

      setBookings(bookings.filter((booking) => booking._id !== bookingId));
      setMessage("تم حذف الحجز بنجاح");
    } catch (error) {
      setMessage("تعذر الاتصال بالسيرفر");
    }
  }

  function handleExperienceFormChange(event) {
    const { name, value, type, checked } = event.target;

    setExperienceForm({
      ...experienceForm,
      [name]: type === "checkbox" ? checked : value,
    });

    setMessage("");
  }

  function handleImageChange(event) {
    const file = event.target.files[0];

    if (!file) {
      return;
    }

    setSelectedImage(file);
    setMessage("");
  }

  async function uploadImage() {
    if (!selectedImage) {
      setMessage("يرجى اختيار صورة أولًا");
      return;
    }

    try {
      setIsUploadingImage(true);
      setMessage("");

      const formData = new FormData();
      formData.append("image", selectedImage);

      const response = await fetch(`${API_URL}/api/upload`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${adminToken}`,
        },
        body: formData,
      });

      const data = await response.json();

      if (!response.ok) {
        setMessage(data.message || "فشل رفع الصورة");
        return;
      }

      setExperienceForm({
        ...experienceForm,
        image: data.imageUrl,
      });

      setMessage("تم رفع الصورة بنجاح");
    } catch (error) {
      setMessage("تعذر رفع الصورة. تأكد أن السيرفر يعمل.");
    } finally {
      setIsUploadingImage(false);
    }
  }

  function resetExperienceForm() {
    setExperienceForm(emptyExperienceForm);
    setEditingExperienceId(null);
    setSelectedImage(null);
    setActiveFormLang("ar");
  }

  function startEditExperience(experience) {
    setEditingExperienceId(experience._id);

    const localizedFields = contentLanguages.reduce((fields, language) => {
      fields[`title${language.suffix}`] =
        experience[`title${language.suffix}`] || "";
      fields[`country${language.suffix}`] =
        experience[`country${language.suffix}`] || "";
      fields[`city${language.suffix}`] =
        experience[`city${language.suffix}`] || "";
      fields[`description${language.suffix}`] =
        experience[`description${language.suffix}`] || "";

      return fields;
    }, {});

    setExperienceForm({
      category: experience.category || "tour",

      ...localizedFields,

      price: experience.price || "",
      currency: experience.currency || "$",
      duration: experience.duration || "",
      image: experience.image || "",
      rating: experience.rating || "5",
      featured:
        typeof experience.featured === "boolean" ? experience.featured : true,
      isActive:
        typeof experience.isActive === "boolean" ? experience.isActive : true,
    });

    setSelectedImage(null);
    setActiveTab("content");
    setActiveFormLang("ar");

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }

  async function handleExperienceSubmit(event) {
    event.preventDefault();

    if (
      experienceForm.titleAr.trim() === "" ||
      experienceForm.price === "" ||
      experienceForm.image.trim() === ""
    ) {
      setMessage("المطلوب فقط: العنوان العربي، السعر، والصورة");
      return;
    }

    const localizedData = contentLanguages.reduce((data, language) => {
      data[`title${language.suffix}`] =
        experienceForm[`title${language.suffix}`]?.trim() || "";

      data[`country${language.suffix}`] =
        experienceForm[`country${language.suffix}`]?.trim() || "";

      data[`city${language.suffix}`] =
        experienceForm[`city${language.suffix}`]?.trim() || "";

      data[`description${language.suffix}`] =
        experienceForm[`description${language.suffix}`]?.trim() || "";

      return data;
    }, {});

    localizedData.countryAr = localizedData.countryAr || "غير محدد";
    localizedData.descriptionAr =
      localizedData.descriptionAr || "لا يوجد وصف حاليًا";

    const experienceData = {
      category: experienceForm.category,

      ...localizedData,

      price: Number(experienceForm.price),
      currency: experienceForm.currency.trim() || "$",
      duration: experienceForm.duration.trim() || "غير محددة",
      image: experienceForm.image.trim(),
      rating: Number(experienceForm.rating) || 5,
      featured: experienceForm.featured,
      isActive: experienceForm.isActive,
    };

    try {
      setIsSavingExperience(true);
      setMessage("");

      const url = editingExperienceId
        ? `${API_URL}/api/experiences/${editingExperienceId}`
        : `${API_URL}/api/experiences`;

      const method = editingExperienceId ? "PUT" : "POST";

      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${adminToken}`,
        },
        body: JSON.stringify(experienceData),
      });

      const data = await response.json();

      if (!response.ok) {
        setMessage(data.message || "فشل حفظ المحتوى");
        return;
      }

      if (editingExperienceId) {
        setExperiences(
          experiences.map((experience) =>
            experience._id === editingExperienceId ? data : experience,
          ),
        );

        setMessage("تم تعديل المحتوى بنجاح");
      } else {
        setExperiences([data, ...experiences]);
        setMessage("تمت إضافة المحتوى بنجاح");
      }

      resetExperienceForm();
    } catch (error) {
      setMessage("تعذر الاتصال بالسيرفر أثناء حفظ المحتوى");
    } finally {
      setIsSavingExperience(false);
    }
  }

  async function deleteExperience(experienceId) {
    const confirmDelete = window.confirm("هل أنت متأكد من حذف هذا المحتوى؟");

    if (!confirmDelete) {
      return;
    }

    try {
      const response = await fetch(
        `${API_URL}/api/experiences/${experienceId}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${adminToken}`,
          },
        },
      );

      const data = await response.json();

      if (!response.ok) {
        setMessage(data.message || "فشل حذف المحتوى");
        return;
      }

      setExperiences(
        experiences.filter((experience) => experience._id !== experienceId),
      );

      if (editingExperienceId === experienceId) {
        resetExperienceForm();
      }

      setMessage("تم حذف المحتوى بنجاح");
    } catch (error) {
      setMessage("تعذر الاتصال بالسيرفر");
    }
  }

  const stats = useMemo(() => {
    return {
      totalBookings: bookings.length,
      newBookings: bookings.filter((booking) => booking.status === "new")
        .length,
      confirmedBookings: bookings.filter(
        (booking) => booking.status === "confirmed",
      ).length,
      cancelledBookings: bookings.filter(
        (booking) => booking.status === "cancelled",
      ).length,
      unpaidBookings: bookings.filter(
        (booking) => booking.paymentStatus === "unpaid",
      ).length,
      paidBookings: bookings.filter(
        (booking) => booking.paymentStatus === "paid",
      ).length,
      totalContent: experiences.length,
      tours: experiences.filter((item) => item.category === "tour").length,
      flights: experiences.filter((item) => item.category === "flight").length,
      attractions: experiences.filter((item) => item.category === "attraction")
        .length,
      activities: experiences.filter((item) => item.category === "activity")
        .length,
    };
  }, [bookings, experiences]);

  const filteredBookings = useMemo(() => {
    return bookings.filter((booking) => {
      const search = bookingSearch.trim().toLowerCase();

      const matchesSearch =
        search === "" ||
        booking.name?.toLowerCase().includes(search) ||
        booking.phone?.toLowerCase().includes(search) ||
        booking.destination?.toLowerCase().includes(search);

      const matchesStatus =
        bookingStatusFilter === "all" || booking.status === bookingStatusFilter;

      const matchesPayment =
        paymentStatusFilter === "all" ||
        booking.paymentStatus === paymentStatusFilter;

      return matchesSearch && matchesStatus && matchesPayment;
    });
  }, [bookings, bookingSearch, bookingStatusFilter, paymentStatusFilter]);

  const filteredExperiences = useMemo(() => {
    return experiences.filter((experience) => {
      const search = contentSearch.trim().toLowerCase();

      const searchableText = contentLanguages
        .flatMap((language) => [
          experience[`title${language.suffix}`],
          experience[`country${language.suffix}`],
          experience[`city${language.suffix}`],
        ])
        .filter(Boolean)
        .join(" ")
        .toLowerCase();

      const matchesSearch = search === "" || searchableText.includes(search);

      const matchesCategory =
        contentCategoryFilter === "all" ||
        experience.category === contentCategoryFilter;

      return matchesSearch && matchesCategory;
    });
  }, [experiences, contentSearch, contentCategoryFilter]);

  if (!adminToken) {
    return (
      <main className="admin-dashboard-page">
        <div className="admin-dashboard-card">
          <h1>غير مصرح</h1>
          <p>يجب تسجيل الدخول أولًا للوصول إلى لوحة التحكم.</p>
          <button onClick={() => navigate("/admin/login")}>تسجيل الدخول</button>
        </div>
      </main>
    );
  }

  return (
    <main className="admin-dashboard-page">
      <div className="admin-dashboard-header admin-dashboard-header-pro">
        <div>
          <span className="admin-kicker">Tourism Control Panel</span>
          <h1>لوحة تحكم الأدمن</h1>
          <p>
            مرحبًا {adminName || "Admin"}، يمكنك إدارة الحجوزات والمحتوى
            والإعدادات من مكان واحد.
          </p>
        </div>

        <div className="admin-header-actions">
          <button
            type="button"
            className="admin-secondary-action"
            onClick={() => {
              fetchBookings();
              fetchExperiences();
              setMessage("تم تحديث البيانات");
            }}
          >
            تحديث البيانات
          </button>

          <button
            type="button"
            className="admin-secondary-action"
            onClick={() => setActiveTab("content")}
          >
            إضافة محتوى
          </button>

          <button onClick={handleLogout}>تسجيل الخروج</button>
        </div>
      </div>

      <div className="admin-tabs">
        <button
          className={activeTab === "overview" ? "active-tab" : ""}
          onClick={() => setActiveTab("overview")}
        >
          نظرة عامة
        </button>

        <button
          className={activeTab === "bookings" ? "active-tab" : ""}
          onClick={() => setActiveTab("bookings")}
        >
          الحجوزات
        </button>

        <button
          className={activeTab === "content" ? "active-tab" : ""}
          onClick={() => setActiveTab("content")}
        >
          المحتوى السياحي
        </button>

        <button
          className={activeTab === "settings" ? "active-tab" : ""}
          onClick={() => setActiveTab("settings")}
        >
          إعدادات الموقع
        </button>
      </div>

      {message && (
        <p className="admin-info-message admin-floating-message">{message}</p>
      )}

      {activeTab === "overview" && (
        <section className="admin-section">
          <div className="admin-section-title">
            <h2>نظرة عامة</h2>
            <p>ملخص سريع لحالة الموقع والحجوزات والمحتوى السياحي.</p>
          </div>

          <div className="admin-stats-grid">
            <div className="admin-stat-card">
              <span>إجمالي الحجوزات</span>
              <strong>{stats.totalBookings}</strong>
            </div>

            <div className="admin-stat-card">
              <span>حجوزات جديدة</span>
              <strong>{stats.newBookings}</strong>
            </div>

            <div className="admin-stat-card">
              <span>حجوزات مؤكدة</span>
              <strong>{stats.confirmedBookings}</strong>
            </div>

            <div className="admin-stat-card">
              <span>مدفوعة</span>
              <strong>{stats.paidBookings}</strong>
            </div>

            <div className="admin-stat-card">
              <span>إجمالي المحتوى</span>
              <strong>{stats.totalContent}</strong>
            </div>

            <div className="admin-stat-card">
              <span>رحلات</span>
              <strong>{stats.tours}</strong>
            </div>

            <div className="admin-stat-card">
              <span>طيران</span>
              <strong>{stats.flights}</strong>
            </div>

            <div className="admin-stat-card">
              <span>معالم وأنشطة</span>
              <strong>{stats.attractions + stats.activities}</strong>
            </div>
          </div>
        </section>
      )}

      {activeTab === "bookings" && (
        <section className="admin-section">
          <div className="admin-section-title">
            <h2>إدارة الحجوزات</h2>
            <p>عرض، بحث، فلترة، تعديل حالة الحجز والدفع.</p>
          </div>

          <div className="admin-filters">
            <input
              type="text"
              placeholder="بحث بالاسم أو الهاتف أو الوجهة"
              value={bookingSearch}
              onChange={(event) => setBookingSearch(event.target.value)}
            />

            <select
              value={bookingStatusFilter}
              onChange={(event) => setBookingStatusFilter(event.target.value)}
            >
              <option value="all">كل حالات الحجز</option>
              <option value="new">جديد</option>
              <option value="confirmed">مؤكد</option>
              <option value="cancelled">ملغي</option>
            </select>

            <select
              value={paymentStatusFilter}
              onChange={(event) => setPaymentStatusFilter(event.target.value)}
            >
              <option value="all">كل حالات الدفع</option>
              <option value="unpaid">غير مدفوع</option>
              <option value="pending">بانتظار الدفع</option>
              <option value="paid">مدفوع</option>
            </select>
          </div>

          {bookingsLoading && (
            <p className="admin-info-message">جاري تحميل الحجوزات...</p>
          )}

          {!bookingsLoading && filteredBookings.length === 0 && (
            <p className="admin-info-message">لا توجد حجوزات مطابقة.</p>
          )}

          {!bookingsLoading && filteredBookings.length > 0 && (
            <>
              <div className="admin-table-wrapper desktop-admin-table">
                <table className="admin-table">
                  <thead>
                    <tr>
                      <th>الاسم</th>
                      <th>الهاتف</th>
                      <th>الإيميل</th>
                      <th>الوجهة</th>
                      <th>التصنيف</th>
                      <th>السعر وقت الحجز</th>
                      <th>الأشخاص</th>
                      <th>التاريخ</th>
                      <th>التواصل</th>
                      <th>الحجز</th>
                      <th>الدفع</th>
                      <th>ملاحظات</th>
                      <th>إجراءات</th>
                    </tr>
                  </thead>

                  <tbody>
                    {filteredBookings.map((booking) => (
                      <tr key={booking._id}>
                        <td>{booking.name}</td>
                        <td>{booking.phone}</td>
                        <td>{booking.email || "-"}</td>
                        <td>{booking.destination}</td>
                        <td>
                          {categoryLabels[booking.category] ||
                            booking.category ||
                            "-"}
                        </td>
                        <td>{getBookingPrice(booking)}</td>
                        <td>
                          {booking.people}
                          <br />
                          <small>
                            بالغين: {booking.adults || booking.people} / أطفال:{" "}
                            {booking.children || 0}
                          </small>
                        </td>
                        <td>{booking.date}</td>
                        <td>
                          {contactMethodLabels[booking.contactMethod] ||
                            "واتساب"}
                        </td>

                        <td>
                          <select
                            className={`status-select status-${booking.status}`}
                            value={booking.status || "new"}
                            onChange={(event) =>
                              updateBookingStatus(
                                booking._id,
                                event.target.value,
                              )
                            }
                          >
                            <option value="new">جديد</option>
                            <option value="confirmed">مؤكد</option>
                            <option value="cancelled">ملغي</option>
                          </select>
                        </td>

                        <td>
                          <select
                            className={`status-select payment-${
                              booking.paymentStatus || "unpaid"
                            }`}
                            value={booking.paymentStatus || "unpaid"}
                            onChange={(event) =>
                              updatePaymentStatus(
                                booking._id,
                                event.target.value,
                              )
                            }
                          >
                            <option value="unpaid">غير مدفوع</option>
                            <option value="pending">بانتظار الدفع</option>
                            <option value="paid">مدفوع</option>
                          </select>
                        </td>

                        <td>{booking.notes || "لا يوجد"}</td>

                        <td>
                          <button
                            className="delete-btn"
                            onClick={() => deleteBooking(booking._id)}
                          >
                            حذف
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="admin-mobile-cards">
                {filteredBookings.map((booking) => (
                  <div className="admin-mobile-card" key={booking._id}>
                    <h3>{booking.name}</h3>

                    <p>
                      <b>الهاتف:</b> {booking.phone}
                    </p>

                    <p>
                      <b>الإيميل:</b> {booking.email || "-"}
                    </p>

                    <p>
                      <b>الوجهة:</b> {booking.destination}
                    </p>

                    <p>
                      <b>التصنيف:</b> {categoryLabels[booking.category] || "-"}
                    </p>

                    <p>
                      <b>السعر وقت الحجز:</b>{" "}
                      {booking.priceAtBooking
                        ? `${booking.priceAtBooking} ${booking.currency || "$"}`
                        : "-"}
                    </p>

                    <p>
                      <b>الأشخاص:</b> {booking.people}
                    </p>

                    <p>
                      <b>البالغين:</b> {booking.adults || booking.people}
                    </p>

                    <p>
                      <b>الأطفال:</b> {booking.children || 0}
                    </p>

                    <p>
                      <b>التاريخ:</b> {booking.date}
                    </p>

                    <p>
                      <b>التواصل:</b>{" "}
                      {contactMethodLabels[booking.contactMethod] || "واتساب"}
                    </p>

                    <p>
                      <b>ملاحظات:</b> {booking.notes || "لا يوجد"}
                    </p>

                    <label>حالة الحجز</label>
                    <select
                      value={booking.status || "new"}
                      onChange={(event) =>
                        updateBookingStatus(booking._id, event.target.value)
                      }
                    >
                      <option value="new">جديد</option>
                      <option value="confirmed">مؤكد</option>
                      <option value="cancelled">ملغي</option>
                    </select>

                    <label>حالة الدفع</label>
                    <select
                      value={booking.paymentStatus || "unpaid"}
                      onChange={(event) =>
                        updatePaymentStatus(booking._id, event.target.value)
                      }
                    >
                      <option value="unpaid">غير مدفوع</option>
                      <option value="pending">بانتظار الدفع</option>
                      <option value="paid">مدفوع</option>
                    </select>

                    <button
                      className="delete-btn"
                      onClick={() => deleteBooking(booking._id)}
                    >
                      حذف الحجز
                    </button>
                  </div>
                ))}
              </div>
            </>
          )}
        </section>
      )}

      {activeTab === "content" && (
        <section className="admin-section">
          <div className="admin-section-title">
            <h2>إدارة المحتوى السياحي</h2>
            <p>
              أضف رحلات سياحية، طيران، معالم، وأنشطة تظهر في الصفحة الرئيسية.
            </p>
          </div>

          <form
            className="admin-destination-form"
            onSubmit={handleExperienceSubmit}
          >
            <div className="admin-form-tabs">
              {contentLanguages.map((language) => (
                <button
                  key={language.code}
                  type="button"
                  className={
                    activeFormLang === language.code ? "active-form-tab" : ""
                  }
                  onClick={() => setActiveFormLang(language.code)}
                >
                  {language.tabLabel}
                </button>
              ))}

              <button
                type="button"
                className={
                  activeFormLang === "general" ? "active-form-tab" : ""
                }
                onClick={() => setActiveFormLang("general")}
              >
                بيانات عامة
              </button>
            </div>

            {contentLanguages.map(
              (language) =>
                activeFormLang === language.code && (
                  <div className="admin-language-panel" key={language.code}>
                    <h3 className="admin-form-heading">{language.heading}</h3>

                    <input
                      type="text"
                      name={`title${language.suffix}`}
                      placeholder={language.titlePlaceholder}
                      value={experienceForm[`title${language.suffix}`]}
                      onChange={handleExperienceFormChange}
                    />

                    <input
                      type="text"
                      name={`country${language.suffix}`}
                      placeholder={language.countryPlaceholder}
                      value={experienceForm[`country${language.suffix}`]}
                      onChange={handleExperienceFormChange}
                    />

                    <input
                      type="text"
                      name={`city${language.suffix}`}
                      placeholder={language.cityPlaceholder}
                      value={experienceForm[`city${language.suffix}`]}
                      onChange={handleExperienceFormChange}
                    />

                    <textarea
                      name={`description${language.suffix}`}
                      placeholder={language.descriptionPlaceholder}
                      value={experienceForm[`description${language.suffix}`]}
                      onChange={handleExperienceFormChange}
                    ></textarea>
                  </div>
                ),
            )}

            {activeFormLang === "general" && (
              <>
                <h3 className="admin-form-heading">البيانات العامة</h3>

                <select
                  name="category"
                  value={experienceForm.category}
                  onChange={handleExperienceFormChange}
                >
                  <option value="tour">رحلات سياحية</option>
                  <option value="flight">رحلات طيران</option>
                  <option value="attraction">معالم سياحية</option>
                  <option value="activity">أنشطة وتجارب</option>
                </select>

                <input
                  type="number"
                  name="price"
                  placeholder="السعر"
                  value={experienceForm.price}
                  onChange={handleExperienceFormChange}
                />

                <input
                  type="text"
                  name="currency"
                  placeholder="رمز العملة مثال: $ أو €"
                  value={experienceForm.currency}
                  onChange={handleExperienceFormChange}
                />

                <input
                  type="text"
                  name="duration"
                  placeholder="المدة مثال: ساعتان / 5 أيام"
                  value={experienceForm.duration}
                  onChange={handleExperienceFormChange}
                />

                <input
                  type="number"
                  name="rating"
                  placeholder="التقييم من 0 إلى 5"
                  min="0"
                  max="5"
                  step="0.1"
                  value={experienceForm.rating}
                  onChange={handleExperienceFormChange}
                />

                <div className="admin-checks">
                  <label>
                    <input
                      type="checkbox"
                      name="featured"
                      checked={experienceForm.featured}
                      onChange={handleExperienceFormChange}
                    />
                    مميز في الصفحة
                  </label>

                  <label>
                    <input
                      type="checkbox"
                      name="isActive"
                      checked={experienceForm.isActive}
                      onChange={handleExperienceFormChange}
                    />
                    ظاهر في الموقع
                  </label>
                </div>

                <div className="image-upload-box">
                  <label>صورة المحتوى</label>

                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                  />

                  <button
                    type="button"
                    className="upload-btn"
                    onClick={uploadImage}
                    disabled={isUploadingImage}
                  >
                    {isUploadingImage ? "جاري رفع الصورة..." : "رفع الصورة"}
                  </button>

                  {experienceForm.image && (
                    <div className="image-preview-box">
                      <p>تم اختيار/رفع الصورة:</p>
                      <img
                        src={experienceForm.image}
                        alt="معاينة الصورة"
                        className="admin-image-preview"
                      />
                    </div>
                  )}
                </div>
              </>
            )}

            <div className="admin-live-preview-card">
              <div>
                <span>معاينة سريعة</span>
                <h3>{experienceForm.titleAr || "عنوان المحتوى"}</h3>
                <p>
                  {experienceForm.cityAr ||
                    experienceForm.countryAr ||
                    "المكان غير محدد"}
                </p>
                <strong>
                  {experienceForm.price || 0} {experienceForm.currency || "$"}
                </strong>
              </div>

              {experienceForm.image ? (
                <img src={experienceForm.image} alt="معاينة المحتوى" />
              ) : (
                <div className="admin-live-preview-placeholder">صورة</div>
              )}
            </div>

            <div className="admin-form-actions">
              <button type="submit" disabled={isSavingExperience}>
                {isSavingExperience
                  ? "جاري الحفظ..."
                  : editingExperienceId
                    ? "تعديل المحتوى"
                    : "إضافة المحتوى"}
              </button>

              {editingExperienceId && (
                <button
                  type="button"
                  className="cancel-btn"
                  onClick={resetExperienceForm}
                >
                  إلغاء التعديل
                </button>
              )}
            </div>
          </form>

          <div className="admin-section-title destinations-table-title">
            <h2>قائمة المحتوى السياحي</h2>
            <p>إدارة كل الرحلات والطيران والمعالم والأنشطة.</p>
          </div>

          <div className="admin-filters">
            <input
              type="text"
              placeholder="بحث بالعنوان أو الدولة أو المدينة"
              value={contentSearch}
              onChange={(event) => setContentSearch(event.target.value)}
            />

            <select
              value={contentCategoryFilter}
              onChange={(event) => setContentCategoryFilter(event.target.value)}
            >
              <option value="all">كل التصنيفات</option>
              <option value="tour">رحلات سياحية</option>
              <option value="flight">رحلات طيران</option>
              <option value="attraction">معالم سياحية</option>
              <option value="activity">أنشطة وتجارب</option>
            </select>
          </div>

          {experiencesLoading && (
            <p className="admin-info-message">جاري تحميل المحتوى...</p>
          )}

          {!experiencesLoading && filteredExperiences.length === 0 && (
            <p className="admin-info-message">لا يوجد محتوى مطابق.</p>
          )}

          {!experiencesLoading && filteredExperiences.length > 0 && (
            <>
              <div className="admin-table-wrapper desktop-admin-table">
                <table className="admin-table">
                  <thead>
                    <tr>
                      <th>الصورة</th>
                      <th>التصنيف</th>
                      <th>العنوان</th>
                      <th>المكان</th>
                      <th>السعر</th>
                      <th>التقييم</th>
                      <th>الحالة</th>
                      <th>إجراءات</th>
                    </tr>
                  </thead>

                  <tbody>
                    {filteredExperiences.map((experience) => (
                      <tr key={experience._id}>
                        <td>
                          <img
                            src={experience.image}
                            alt={getContentTitle(experience)}
                            className="admin-destination-img"
                          />
                        </td>

                        <td>{categoryLabels[experience.category]}</td>

                        <td>
                          {getContentTitle(experience)}
                          <br />
                          <small>{getContentSubtitle(experience)}</small>
                          <br />
                          <small>
                            ترجمات: {getTranslationsCount(experience)} /{" "}
                            {contentLanguages.length}
                          </small>
                        </td>

                        <td>
                          {getContentLocation(experience)}
                          <br />
                          <small>
                            {experience.cityEn ||
                              experience.countryEn ||
                              experience.cityFr ||
                              experience.countryFr ||
                              "-"}
                          </small>
                        </td>

                        <td>
                          {experience.price} {experience.currency || "$"}
                        </td>

                        <td>⭐ {experience.rating}</td>

                        <td>
                          {experience.isActive ? "ظاهر" : "مخفي"}
                          {experience.featured ? " / مميز" : ""}
                        </td>

                        <td>
                          <div className="table-actions">
                            <button
                              className="edit-btn"
                              onClick={() => startEditExperience(experience)}
                            >
                              تعديل
                            </button>

                            <button
                              className="delete-btn"
                              onClick={() => deleteExperience(experience._id)}
                            >
                              حذف
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="admin-mobile-cards">
                {filteredExperiences.map((experience) => (
                  <div className="admin-mobile-card" key={experience._id}>
                    <img
                      src={experience.image}
                      alt={getContentTitle(experience)}
                      className="mobile-card-img"
                    />

                    <h3>{getContentTitle(experience)}</h3>

                    <p>
                      <b>التصنيف:</b> {categoryLabels[experience.category]}
                    </p>

                    <p>
                      <b>المكان:</b> {getContentLocation(experience)}
                    </p>

                    <p>
                      <b>السعر:</b> {experience.price}{" "}
                      {experience.currency || "$"}
                    </p>

                    <p>
                      <b>التقييم:</b> ⭐ {experience.rating}
                    </p>

                    <p>
                      <b>الحالة:</b> {experience.isActive ? "ظاهر" : "مخفي"}
                    </p>

                    <div className="table-actions">
                      <button
                        className="edit-btn"
                        onClick={() => startEditExperience(experience)}
                      >
                        تعديل
                      </button>

                      <button
                        className="delete-btn"
                        onClick={() => deleteExperience(experience._id)}
                      >
                        حذف
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}
        </section>
      )}

      {activeTab === "settings" && <AdminSettings />}
    </main>
  );
}

export default AdminDashboard;
