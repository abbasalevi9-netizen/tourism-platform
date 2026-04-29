import { useEffect, useState } from "react";
import API_URL from "../config/api";
import { useSiteSettings } from "../context/SiteSettingsContext";

const emptySettingsForm = {
  logoUrl: "",

  siteNameAr: "",
  siteNameEn: "",
  siteNameTr: "",

  footerDescriptionAr: "",
  footerDescriptionEn: "",
  footerDescriptionTr: "",

  phone: "",
  whatsapp: "",
  email: "",

  addressAr: "",
  addressEn: "",
  addressTr: "",

  workingHoursAr: "",
  workingHoursEn: "",
  workingHoursTr: "",

  instagram: "",
  facebook: "",
  tiktok: "",

  heroImagesText: "",
};

function AdminSettings() {
  const adminToken = localStorage.getItem("adminToken");
  const { settings, setSettings, fetchSettings } = useSiteSettings();

  const [form, setForm] = useState(emptySettingsForm);
  const [message, setMessage] = useState("");
  const [selectedImage, setSelectedImage] = useState(null);
  const [isSaving, setIsSaving] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [selectedLogo, setSelectedLogo] = useState(null);
  const [isUploadingLogo, setIsUploadingLogo] = useState(false);

  const heroImagesPreview = form.heroImagesText
    .split("\n")
    .map((item) => item.trim())
    .filter((item) => item !== "");

  useEffect(() => {
    setForm({
      logoUrl: settings.logoUrl || "",

      siteNameAr: settings.siteNameAr || "",
      siteNameEn: settings.siteNameEn || "",
      siteNameTr: settings.siteNameTr || "",

      footerDescriptionAr: settings.footerDescriptionAr || "",
      footerDescriptionEn: settings.footerDescriptionEn || "",
      footerDescriptionTr: settings.footerDescriptionTr || "",

      phone: settings.phone || "",
      whatsapp: settings.whatsapp || "",
      email: settings.email || "",

      addressAr: settings.addressAr || "",
      addressEn: settings.addressEn || "",
      addressTr: settings.addressTr || "",

      workingHoursAr: settings.workingHoursAr || "",
      workingHoursEn: settings.workingHoursEn || "",
      workingHoursTr: settings.workingHoursTr || "",

      instagram: settings.instagram || "",
      facebook: settings.facebook || "",
      tiktok: settings.tiktok || "",

      heroImagesText: Array.isArray(settings.heroImages)
        ? settings.heroImages.join("\n")
        : "",
    });
  }, [settings]);

  function handleChange(event) {
    const { name, value } = event.target;

    setForm({
      ...form,
      [name]: value,
    });

    setMessage("");
  }

  function handleImageChange(event) {
    const file = event.target.files[0];

    if (!file) return;

    setSelectedImage(file);
    setMessage("");
  }

  function removeHeroImage(indexToRemove) {
    const nextImages = heroImagesPreview.filter(
      (_, index) => index !== indexToRemove,
    );

    setForm({
      ...form,
      heroImagesText: nextImages.join("\n"),
    });

    setMessage("تم حذف الصورة من القائمة. اضغط حفظ لتطبيق التغيير.");
  }

  async function uploadHeroImage() {
    if (!selectedImage) {
      setMessage("اختر صورة أولًا");
      return;
    }

    try {
      setIsUploading(true);
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

      setForm({
        ...form,
        heroImagesText: form.heroImagesText
          ? `${form.heroImagesText}\n${data.imageUrl}`
          : data.imageUrl,
      });

      setSelectedImage(null);
      setMessage("تم رفع الصورة وإضافتها إلى صور الواجهة");
    } catch (error) {
      setMessage("تعذر رفع الصورة");
    } finally {
      setIsUploading(false);
    }
  }

  function handleLogoChange(event) {
    const file = event.target.files[0];

    if (!file) return;

    setSelectedLogo(file);
    setMessage("");
  }

  async function uploadLogoImage() {
    if (!selectedLogo) {
      setMessage("اختر صورة اللوجو أولًا");
      return;
    }

    try {
      setIsUploadingLogo(true);
      setMessage("");

      const formData = new FormData();
      formData.append("image", selectedLogo);

      const response = await fetch(`${API_URL}/api/upload`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${adminToken}`,
        },
        body: formData,
      });

      const data = await response.json();

      if (!response.ok) {
        setMessage(data.message || "فشل رفع اللوجو");
        return;
      }

      setForm({
        ...form,
        logoUrl: data.imageUrl,
      });

      setSelectedLogo(null);
      setMessage("تم رفع اللوجو بنجاح");
    } catch (error) {
      setMessage("تعذر رفع اللوجو");
    } finally {
      setIsUploadingLogo(false);
    }
  }

  function removeLogo() {
    setForm({
      ...form,
      logoUrl: "",
    });

    setSelectedLogo(null);
    setMessage("تم حذف اللوجو من الإعدادات، اضغط حفظ لتأكيد التغيير");
  }
  async function handleSubmit(event) {
    event.preventDefault();

    try {
      setIsSaving(true);
      setMessage("");

      const heroImages = form.heroImagesText
        .split("\n")
        .map((item) => item.trim())
        .filter((item) => item !== "");

      const payload = {
        logoUrl: form.logoUrl,

        siteNameAr: form.siteNameAr,
        siteNameEn: form.siteNameEn,
        siteNameTr: form.siteNameTr,

        footerDescriptionAr: form.footerDescriptionAr,
        footerDescriptionEn: form.footerDescriptionEn,
        footerDescriptionTr: form.footerDescriptionTr,

        phone: form.phone,
        whatsapp: form.whatsapp,
        email: form.email,

        addressAr: form.addressAr,
        addressEn: form.addressEn,
        addressTr: form.addressTr,

        workingHoursAr: form.workingHoursAr,
        workingHoursEn: form.workingHoursEn,
        workingHoursTr: form.workingHoursTr,

        instagram: form.instagram,
        facebook: form.facebook,
        tiktok: form.tiktok,

        heroImages,
      };

      const response = await fetch(`${API_URL}/api/settings`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${adminToken}`,
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (!response.ok) {
        setMessage(data.message || "فشل حفظ الإعدادات");
        return;
      }

      setSettings(data);
      await fetchSettings();

      setMessage("تم حفظ إعدادات الموقع بنجاح");
    } catch (error) {
      setMessage("تعذر الاتصال بالسيرفر");
    } finally {
      setIsSaving(false);
    }
  }

  return (
    <section className="admin-section">
      <div className="admin-section-title admin-settings-title">
        <div>
          <h2>إعدادات الموقع</h2>
          <p>
            تحكم باسم الشركة، معلومات التواصل، الفوتر، وصور الواجهة الرئيسية.
          </p>
        </div>

        <button
          type="button"
          className="admin-secondary-action"
          onClick={fetchSettings}
        >
          تحديث الإعدادات
        </button>
      </div>

      {message && <p className="admin-info-message">{message}</p>}

      <form className="admin-destination-form" onSubmit={handleSubmit}>
        <h3 className="admin-form-heading">اسم الشركة</h3>

        <input
          type="text"
          name="siteNameAr"
          placeholder="اسم الشركة بالعربية"
          value={form.siteNameAr}
          onChange={handleChange}
        />

        <input
          type="text"
          name="siteNameEn"
          placeholder="Company name in English"
          value={form.siteNameEn}
          onChange={handleChange}
        />

        <input
          type="text"
          name="siteNameTr"
          placeholder="Türkçe şirket adı"
          value={form.siteNameTr}
          onChange={handleChange}
        />
        <h3 className="admin-form-heading">لوجو الموقع</h3>

        <div className="image-upload-box logo-upload-box">
          <label>رفع لوجو يظهر بجانب اسم الموقع في الهيدر</label>

          <input type="file" accept="image/*" onChange={handleLogoChange} />

          <button
            type="button"
            className="upload-btn"
            onClick={uploadLogoImage}
            disabled={isUploadingLogo}
          >
            {isUploadingLogo ? "جاري رفع اللوجو..." : "رفع اللوجو"}
          </button>

          {form.logoUrl && (
            <div className="logo-preview-box">
              <p>اللوجو الحالي:</p>

              <img
                src={form.logoUrl}
                alt="Site logo"
                className="admin-logo-preview"
              />

              <button type="button" className="delete-btn" onClick={removeLogo}>
                حذف اللوجو
              </button>
            </div>
          )}
        </div>

        <h3 className="admin-form-heading">وصف الفوتر</h3>

        <textarea
          name="footerDescriptionAr"
          placeholder="وصف الفوتر بالعربية"
          value={form.footerDescriptionAr}
          onChange={handleChange}
        ></textarea>

        <textarea
          name="footerDescriptionEn"
          placeholder="Footer description in English"
          value={form.footerDescriptionEn}
          onChange={handleChange}
        ></textarea>

        <textarea
          name="footerDescriptionTr"
          placeholder="Türkçe footer açıklaması"
          value={form.footerDescriptionTr}
          onChange={handleChange}
        ></textarea>

        <h3 className="admin-form-heading">معلومات التواصل</h3>

        <input
          type="text"
          name="phone"
          placeholder="رقم الهاتف"
          value={form.phone}
          onChange={handleChange}
        />

        <input
          type="text"
          name="whatsapp"
          placeholder="رقم الواتساب"
          value={form.whatsapp}
          onChange={handleChange}
        />

        <input
          type="email"
          name="email"
          placeholder="الإيميل"
          value={form.email}
          onChange={handleChange}
        />

        <h3 className="admin-form-heading">العنوان</h3>

        <input
          type="text"
          name="addressAr"
          placeholder="العنوان بالعربية"
          value={form.addressAr}
          onChange={handleChange}
        />

        <input
          type="text"
          name="addressEn"
          placeholder="Address in English"
          value={form.addressEn}
          onChange={handleChange}
        />

        <input
          type="text"
          name="addressTr"
          placeholder="Türkçe adres"
          value={form.addressTr}
          onChange={handleChange}
        />

        <h3 className="admin-form-heading">ساعات العمل</h3>

        <input
          type="text"
          name="workingHoursAr"
          placeholder="ساعات العمل بالعربية"
          value={form.workingHoursAr}
          onChange={handleChange}
        />

        <input
          type="text"
          name="workingHoursEn"
          placeholder="Working hours in English"
          value={form.workingHoursEn}
          onChange={handleChange}
        />

        <input
          type="text"
          name="workingHoursTr"
          placeholder="Türkçe çalışma saatleri"
          value={form.workingHoursTr}
          onChange={handleChange}
        />

        <h3 className="admin-form-heading">روابط السوشيال</h3>

        <input
          type="text"
          name="instagram"
          placeholder="Instagram link"
          value={form.instagram}
          onChange={handleChange}
        />

        <input
          type="text"
          name="facebook"
          placeholder="Facebook link"
          value={form.facebook}
          onChange={handleChange}
        />

        <input
          type="text"
          name="tiktok"
          placeholder="TikTok link"
          value={form.tiktok}
          onChange={handleChange}
        />

        <h3 className="admin-form-heading">صور الواجهة الرئيسية</h3>

        <div className="image-upload-box">
          <label>رفع صورة جديدة للواجهة</label>

          <input type="file" accept="image/*" onChange={handleImageChange} />

          <button
            type="button"
            className="upload-btn"
            onClick={uploadHeroImage}
            disabled={isUploading}
          >
            {isUploading ? "جاري الرفع..." : "رفع وإضافة الصورة"}
          </button>

          <p className="settings-help">
            كل رابط في سطر مستقل. الصور الموجودة هنا تظهر كسلايدر في الصفحة
            الرئيسية.
          </p>
        </div>

        <textarea
          name="heroImagesText"
          placeholder="روابط صور الواجهة، كل رابط في سطر"
          value={form.heroImagesText}
          onChange={handleChange}
          className="hero-images-textarea"
        ></textarea>

        {heroImagesPreview.length > 0 && (
          <div className="settings-hero-preview-grid">
            {heroImagesPreview.map((imageUrl, index) => (
              <div
                className="settings-hero-preview-card"
                key={`${imageUrl}-${index}`}
              >
                <img src={imageUrl} alt={`Hero ${index + 1}`} />
                <button type="button" onClick={() => removeHeroImage(index)}>
                  حذف
                </button>
              </div>
            ))}
          </div>
        )}

        <div className="admin-form-actions">
          <button type="submit" disabled={isSaving}>
            {isSaving ? "جاري الحفظ..." : "حفظ إعدادات الموقع"}
          </button>
        </div>
      </form>
    </section>
  );
}

export default AdminSettings;
