import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import API_URL from "../config/api";
import AdminSettings from "./AdminSettings";

const emptyExperienceForm = {
  category: "tour",

  titleAr: "",
  titleEn: "",
  titleTr: "",

  countryAr: "",
  countryEn: "",
  countryTr: "",

  cityAr: "",
  cityEn: "",
  cityTr: "",

  descriptionAr: "",
  descriptionEn: "",
  descriptionTr: "",

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

    setExperienceForm({
      category: experience.category || "tour",

      titleAr: experience.titleAr || "",
      titleEn: experience.titleEn || "",
      titleTr: experience.titleTr || "",

      countryAr: experience.countryAr || "",
      countryEn: experience.countryEn || "",
      countryTr: experience.countryTr || "",

      cityAr: experience.cityAr || "",
      cityEn: experience.cityEn || "",
      cityTr: experience.cityTr || "",

      descriptionAr: experience.descriptionAr || "",
      descriptionEn: experience.descriptionEn || "",
      descriptionTr: experience.descriptionTr || "",

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

    const experienceData = {
      category: experienceForm.category,

      titleAr: experienceForm.titleAr.trim(),
      titleEn: experienceForm.titleEn.trim(),
      titleTr: experienceForm.titleTr.trim(),

      countryAr: experienceForm.countryAr.trim() || "غير محدد",
      countryEn: experienceForm.countryEn.trim(),
      countryTr: experienceForm.countryTr.trim(),

      cityAr: experienceForm.cityAr.trim(),
      cityEn: experienceForm.cityEn.trim(),
      cityTr: experienceForm.cityTr.trim(),

      descriptionAr:
        experienceForm.descriptionAr.trim() || "لا يوجد وصف حاليًا",
      descriptionEn: experienceForm.descriptionEn.trim(),
      descriptionTr: experienceForm.descriptionTr.trim(),

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

      const matchesSearch =
        search === "" ||
        experience.titleAr?.toLowerCase().includes(search) ||
        experience.titleEn?.toLowerCase().includes(search) ||
        experience.titleTr?.toLowerCase().includes(search) ||
        experience.countryAr?.toLowerCase().includes(search) ||
        experience.countryEn?.toLowerCase().includes(search) ||
        experience.cityAr?.toLowerCase().includes(search) ||
        experience.cityEn?.toLowerCase().includes(search);

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
      <div className="admin-dashboard-header">
        <div>
          <h1>لوحة تحكم الأدمن</h1>
          <p>مرحبًا {adminName || "Admin"}</p>
        </div>

        <button onClick={handleLogout}>تسجيل الخروج</button>
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

      {message && <p className="admin-info-message">{message}</p>}

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
                        <td>{booking.category}</td>
                        <td>{categoryLabels[booking.category] || "-"}</td>
                        <td>
                          {booking.priceAtBooking
                            ? `${booking.priceAtBooking} ${booking.currency || "$"}`
                            : "-"}
                        </td>
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
                      <b>الإيميل:</b> {booking.email}
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
              <button
                type="button"
                className={activeFormLang === "ar" ? "active-form-tab" : ""}
                onClick={() => setActiveFormLang("ar")}
              >
                العربي
              </button>

              <button
                type="button"
                className={activeFormLang === "en" ? "active-form-tab" : ""}
                onClick={() => setActiveFormLang("en")}
              >
                English
              </button>

              <button
                type="button"
                className={activeFormLang === "tr" ? "active-form-tab" : ""}
                onClick={() => setActiveFormLang("tr")}
              >
                Türkçe
              </button>

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

            {activeFormLang === "ar" && (
              <>
                <h3 className="admin-form-heading">البيانات العربية</h3>

                <input
                  type="text"
                  name="titleAr"
                  placeholder="العنوان بالعربية"
                  value={experienceForm.titleAr}
                  onChange={handleExperienceFormChange}
                />

                <input
                  type="text"
                  name="countryAr"
                  placeholder="الدولة بالعربية"
                  value={experienceForm.countryAr}
                  onChange={handleExperienceFormChange}
                />

                <input
                  type="text"
                  name="cityAr"
                  placeholder="المدينة بالعربية"
                  value={experienceForm.cityAr}
                  onChange={handleExperienceFormChange}
                />

                <textarea
                  name="descriptionAr"
                  placeholder="الوصف بالعربية"
                  value={experienceForm.descriptionAr}
                  onChange={handleExperienceFormChange}
                ></textarea>
              </>
            )}

            {activeFormLang === "en" && (
              <>
                <h3 className="admin-form-heading">English Data</h3>

                <input
                  type="text"
                  name="titleEn"
                  placeholder="Title in English"
                  value={experienceForm.titleEn}
                  onChange={handleExperienceFormChange}
                />

                <input
                  type="text"
                  name="countryEn"
                  placeholder="Country in English"
                  value={experienceForm.countryEn}
                  onChange={handleExperienceFormChange}
                />

                <input
                  type="text"
                  name="cityEn"
                  placeholder="City in English"
                  value={experienceForm.cityEn}
                  onChange={handleExperienceFormChange}
                />

                <textarea
                  name="descriptionEn"
                  placeholder="Description in English"
                  value={experienceForm.descriptionEn}
                  onChange={handleExperienceFormChange}
                ></textarea>
              </>
            )}

            {activeFormLang === "tr" && (
              <>
                <h3 className="admin-form-heading">Türkçe Bilgiler</h3>

                <input
                  type="text"
                  name="titleTr"
                  placeholder="Türkçe başlık"
                  value={experienceForm.titleTr}
                  onChange={handleExperienceFormChange}
                />

                <input
                  type="text"
                  name="countryTr"
                  placeholder="Türkçe ülke"
                  value={experienceForm.countryTr}
                  onChange={handleExperienceFormChange}
                />

                <input
                  type="text"
                  name="cityTr"
                  placeholder="Türkçe şehir"
                  value={experienceForm.cityTr}
                  onChange={handleExperienceFormChange}
                />

                <textarea
                  name="descriptionTr"
                  placeholder="Türkçe açıklama"
                  value={experienceForm.descriptionTr}
                  onChange={handleExperienceFormChange}
                ></textarea>
              </>
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
                            alt={experience.titleAr}
                            className="admin-destination-img"
                          />
                        </td>

                        <td>{categoryLabels[experience.category]}</td>

                        <td>
                          {experience.titleAr}
                          <br />
                          <small>{experience.titleEn || "-"}</small>
                        </td>

                        <td>
                          {experience.cityAr || experience.countryAr}
                          <br />
                          <small>
                            {experience.cityEn || experience.countryEn || "-"}
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
                      alt={experience.titleAr}
                      className="mobile-card-img"
                    />

                    <h3>{experience.titleAr}</h3>

                    <p>
                      <b>التصنيف:</b> {categoryLabels[experience.category]}
                    </p>

                    <p>
                      <b>المكان:</b>{" "}
                      {experience.cityAr || experience.countryAr || "غير محدد"}
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
