function Contact() {
  return (
    <section id="contact" className="contact-section">
      <p className="section-subtitle">تواصل معنا</p>

      <h2>هل تحتاج مساعدة في اختيار رحلتك؟</h2>

      <div className="contact-container">
        <div className="contact-info">
          <h3>نحن هنا لمساعدتك</h3>

          <p>
            تواصل معنا وسنساعدك في اختيار أفضل وجهة، أفضل فندق، وأفضل برنامج
            سياحي يناسب ميزانيتك.
          </p>

          <div className="info-item">📞 الهاتف: 00963 900 000 000</div>
          <div className="info-item">✉️ البريد: info@rahal.com</div>
          <div className="info-item">📍 العنوان: دمشق - سوريا</div>
        </div>

        <form className="contact-form">
          <input type="text" placeholder="الاسم الكامل" />
          <input type="email" placeholder="البريد الإلكتروني" />
          <input type="text" placeholder="رقم الهاتف" />
          <textarea placeholder="اكتب رسالتك هنا"></textarea>
          <button type="button">إرسال الرسالة</button>
        </form>
      </div>
    </section>
  );
}

export default Contact;