import { createContext, useContext, useEffect, useMemo, useState } from "react";

const LanguageContext = createContext();

const translations = {
  ar: {
    siteName: "رحّال",
    home: "الرئيسية",
    destinations: "الوجهات",
    offers: "العروض",
    booking: "الحجز",
    contact: "تواصل معنا",
    bookNow: "احجز الآن",
    language: "اللغة",

    heroSubtitle: "اكتشف العالم معنا",
    heroTitle: "رحلات سياحية لا تُنسى حول العالم",
    heroDescription:
      "اختر وجهتك المفضلة، واستمتع بتجربة سفر متكاملة تشمل الفنادق، الرحلات، والبرامج السياحية.",
    exploreDestinations: "استكشف الوجهات",
    viewOffers: "شاهد العروض",

    destinationsSubtitle: "وجهات مميزة",
    destinationsTitle: "أشهر الرحلات السياحية",
    loadingDestinations: "جاري تحميل الوجهات...",
    destinationsError: "حدث خطأ أثناء تحميل الوجهات من السيرفر",
    noDestinations: "لا توجد وجهات حاليًا",
    startingFrom: "ابتداءً من",
    viewDetails: "عرض التفاصيل",

    offersSubtitle: "عروض خاصة",
    offersTitle: "أفضل العروض لهذا الموسم",
    honeymoonOfferTitle: "عرض شهر العسل",
    honeymoonOfferDescription:
      "7 أيام في المالديف مع فندق 5 نجوم وإفطار يومي وتجربة رومانسية مميزة.",
    familyOfferTitle: "رحلة عائلية إلى دبي",
    familyOfferDescription:
      "برنامج عائلي شامل الفندق، الجولات السياحية، والمواصلات داخل المدينة.",
    istanbulOfferTitle: "إجازة في إسطنبول",
    istanbulOfferDescription:
      "5 أيام بين التاريخ، الأسواق، المطاعم التركية، والرحلات البحرية.",
    discount25: "خصم 25%",
    discount15: "خصم 15%",
    discount20: "خصم 20%",
    bookOffer: "احجز العرض",

    loadingDestinationDetails: "جاري تحميل تفاصيل الوجهة...",
    destinationNotFound: "الوجهة غير موجودة أو حدث خطأ أثناء التحميل",
    backToDestinations: "العودة إلى الوجهات",
    price: "السعر",
    duration: "المدة",
    tripProgram: "برنامج الرحلة",
    noDescription: "لا يوجد وصف حاليًا",
    noProgram: "لا يوجد برنامج مضاف لهذه الرحلة حاليًا",
    untitledDestination: "وجهة بدون اسم",
    notSpecified: "غير محدد",
    notAvailable: "غير محددة",

    bookingSubtitle: "احجز رحلتك",
    bookingTitle: "املأ بيانات الحجز",
    bookingBoxTitle: "خطوتك الأولى نحو رحلة مميزة",
    bookingBoxText:
      "أرسل لنا بياناتك، وسيقوم فريقنا بالتواصل معك لتأكيد التفاصيل واختيار أفضل برنامج سياحي يناسبك.",
    bookingStep1: "اختيار الوجهة المناسبة",
    bookingStep2: "تحديد عدد الأشخاص",
    bookingStep3: "تنسيق الفندق والمواصلات",
    bookingStep4: "تأكيد السعر والبرنامج",
    fullName: "الاسم الكامل",
    phoneNumber: "رقم الهاتف",
    selectDestination: "اختر الوجهة",
    peopleCount: "عدد الأشخاص",
    additionalNotes: "ملاحظات إضافية",
    confirmBooking: "تأكيد الحجز",
    sending: "جاري الإرسال...",
    bookingRequiredMessage: "يرجى تعبئة جميع بيانات الحجز المطلوبة",
    bookingSuccessMessage: "تم إرسال طلب الحجز بنجاح ✅ سنتواصل معك قريبًا.",
    bookingErrorMessage: "حدث خطأ أثناء إرسال الحجز",
    serverConnectionError: "تعذر الاتصال بالسيرفر. تأكد أن السيرفر يعمل.",
    tripDate: "تاريخ الرحلة",
    tripDatePlaceholder: "مثال: 2026-05-20",
    preferredContactMethod: "طريقة التواصل المفضلة",
    whatsapp: "واتساب",
    call: "اتصال",
    email: "إيميل",

    searchPlaceholder: "ابحث",
    heroSearchTitle: "احجز تجارب وأنشطة لا تُنسى",
    heroSearchPlaceholder: "ابحث حسب الوجهة",
    login: "تسجيل الدخول",
    experiencesSubtitle: "تجارب لا تفوت",
    experiencesTitle: "اكتشف أفضل الرحلات والأنشطة",
    all: "الكل",
    searchResultsFor: "نتائج البحث عن",
    loadingExperiences: "جاري تحميل المحتوى...",
    experiencesError: "حدث خطأ أثناء تحميل المحتوى",
    noExperiences: "لا يوجد محتوى حاليًا",

    emailAddress: "البريد الإلكتروني اختياري",
    adultsCount: "عدد البالغين",
    childrenCount: "عدد الأطفال اختياري",
    bookingSummary: "ملخص الحجز",
    selectedTrip: "الرحلة المختارة",
    totalPeople: "إجمالي الأشخاص",
    estimatedPrice: "السعر التقريبي",
    noPaymentNow: "لن يتم الدفع الآن، سيتواصل معك فريقنا لتأكيد التفاصيل.",
    bookingSuccessTitle: "تم إرسال طلبك بنجاح",
    bookingSuccessText:
      "وصلنا طلبك وسيتواصل معك فريقنا قريبًا لتأكيد التفاصيل.",
    newBooking: "إرسال حجز جديد",

    footerDescription:
      "منصة سياحية تساعدك على اختيار أفضل الرحلات والأنشطة والمعالم حول العالم.",
    quickLinks: "روابط سريعة",
    contactInfo: "معلومات التواصل",
    followUs: "تابعنا",
    rightsReserved: "جميع الحقوق محفوظة",

    contactSubtitle: "تواصل معنا",
    contactTitle: "نحن هنا لمساعدتك",
    contactDescription:
      "لديك سؤال عن رحلة أو حجز؟ أرسل لنا رسالة وسيتواصل معك فريقنا في أقرب وقت.",
    contactPhone: "الهاتف",
    contactEmail: "البريد الإلكتروني",
    contactAddress: "العنوان",
    contactAddressValue: "إسطنبول، تركيا",
    workingHours: "ساعات العمل",
    workingHoursValue: "يوميًا من 9 صباحًا حتى 8 مساءً",
    messageName: "الاسم الكامل",
    messageEmail: "البريد الإلكتروني",
    messagePhone: "رقم الهاتف",
    messageText: "اكتب رسالتك هنا",
    sendMessage: "إرسال الرسالة",
    messageSent: "تم إرسال رسالتك بنجاح ✅",

    noOffers: "لا توجد عروض مميزة حاليًا",
    notFoundTitle: "الصفحة غير موجودة",
    notFoundText: "الرابط الذي تحاول الوصول إليه غير صحيح أو تم نقله.",
    backHome: "العودة للرئيسية",
  },

  en: {
    siteName: "Rahal",
    home: "Home",
    destinations: "Destinations",
    offers: "Offers",
    booking: "Booking",
    contact: "Contact",
    bookNow: "Book Now",
    language: "Language",

    heroSubtitle: "Discover the world with us",
    heroTitle: "Unforgettable travel experiences around the world",
    heroDescription:
      "Choose your favorite destination and enjoy a complete travel experience including hotels, tours, and travel programs.",
    exploreDestinations: "Explore Destinations",
    viewOffers: "View Offers",

    destinationsSubtitle: "Featured Destinations",
    destinationsTitle: "Most Popular Trips",
    loadingDestinations: "Loading destinations...",
    destinationsError: "An error occurred while loading destinations",
    noDestinations: "No destinations available right now",
    startingFrom: "Starting from",
    viewDetails: "View Details",

    offersSubtitle: "Special Offers",
    offersTitle: "Best Offers This Season",
    honeymoonOfferTitle: "Honeymoon Package",
    honeymoonOfferDescription:
      "7 days in the Maldives with a 5-star hotel, daily breakfast, and a romantic experience.",
    familyOfferTitle: "Family Trip to Dubai",
    familyOfferDescription:
      "A family package including hotel, city tours, and transportation.",
    istanbulOfferTitle: "Istanbul Vacation",
    istanbulOfferDescription:
      "5 days between history, markets, Turkish restaurants, and boat tours.",
    discount25: "25% Off",
    discount15: "15% Off",
    discount20: "20% Off",
    bookOffer: "Book Offer",

    loadingDestinationDetails: "Loading destination details...",
    destinationNotFound: "Destination not found or an error occurred",
    backToDestinations: "Back to destinations",
    price: "Price",
    duration: "Duration",
    tripProgram: "Trip Program",
    noDescription: "No description available yet",
    noProgram: "No trip program has been added yet",
    untitledDestination: "Untitled destination",
    notSpecified: "Not specified",
    notAvailable: "Not available",

    bookingSubtitle: "Book Your Trip",
    bookingTitle: "Fill in Booking Details",
    bookingBoxTitle: "Your first step toward a special trip",
    bookingBoxText:
      "Send us your details, and our team will contact you to confirm everything and choose the best travel program for you.",
    bookingStep1: "Choose the right destination",
    bookingStep2: "Set the number of people",
    bookingStep3: "Arrange hotel and transportation",
    bookingStep4: "Confirm price and program",
    fullName: "Full Name",
    phoneNumber: "Phone Number",
    selectDestination: "Select destination",
    peopleCount: "Number of people",
    additionalNotes: "Additional notes",
    confirmBooking: "Confirm Booking",
    sending: "Sending...",
    bookingRequiredMessage: "Please fill in all required booking details",
    bookingSuccessMessage:
      "Booking request sent successfully ✅ We will contact you soon.",
    bookingErrorMessage: "An error occurred while sending the booking",
    serverConnectionError:
      "Could not connect to the server. Make sure it is running.",
    tripDate: "Trip Date",
    tripDatePlaceholder: "Example: 2026-05-20",
    preferredContactMethod: "Preferred contact method",
    whatsapp: "WhatsApp",
    call: "Call",
    email: "Email",

    searchPlaceholder: "Search",
    heroSearchTitle: "Book unforgettable experiences and activities",
    heroSearchPlaceholder: "Search by destination",
    login: "Login",
    experiencesSubtitle: "Top experiences",
    experiencesTitle: "Discover the best trips and activities",
    all: "All",
    searchResultsFor: "Search results for",
    loadingExperiences: "Loading content...",
    experiencesError: "An error occurred while loading content",
    noExperiences: "No content available right now",

    emailAddress: "Email address optional",
    adultsCount: "Adults",
    childrenCount: "Children optional",
    bookingSummary: "Booking Summary",
    selectedTrip: "Selected trip",
    totalPeople: "Total people",
    estimatedPrice: "Estimated price",
    noPaymentNow:
      "You will not pay now. Our team will contact you to confirm the details.",
    bookingSuccessTitle: "Your request has been sent",
    bookingSuccessText:
      "We received your request and our team will contact you soon to confirm the details.",
    newBooking: "Send another booking",

    footerDescription:
      "A travel platform that helps you choose the best trips, activities, and attractions around the world.",
    quickLinks: "Quick Links",
    contactInfo: "Contact Info",
    followUs: "Follow Us",
    rightsReserved: "All rights reserved",

    contactSubtitle: "Contact Us",
    contactTitle: "We are here to help",
    contactDescription:
      "Have a question about a trip or booking? Send us a message and our team will contact you soon.",
    contactPhone: "Phone",
    contactEmail: "Email",
    contactAddress: "Address",
    contactAddressValue: "Istanbul, Turkey",
    workingHours: "Working Hours",
    workingHoursValue: "Daily from 9 AM to 8 PM",
    messageName: "Full Name",
    messageEmail: "Email Address",
    messagePhone: "Phone Number",
    messageText: "Write your message here",
    sendMessage: "Send Message",
    messageSent: "Your message has been sent successfully ✅",

    noOffers: "No featured offers available right now",
    notFoundTitle: "Page not found",
    notFoundText:
      "The page you are trying to access does not exist or has been moved.",
    backHome: "Back to Home",
  },

  tr: {
    siteName: "Rahal",
    home: "Ana Sayfa",
    destinations: "Rotalar",
    offers: "Teklifler",
    booking: "Rezervasyon",
    contact: "İletişim",
    bookNow: "Şimdi Rezervasyon Yap",
    language: "Dil",

    heroSubtitle: "Dünyayı bizimle keşfedin",
    heroTitle: "Dünya çapında unutulmaz seyahat deneyimleri",
    heroDescription:
      "Favori destinasyonunuzu seçin; oteller, turlar ve seyahat programlarıyla eksiksiz bir tatil deneyimi yaşayın.",
    exploreDestinations: "Rotaları Keşfet",
    viewOffers: "Teklifleri Gör",

    destinationsSubtitle: "Öne Çıkan Rotalar",
    destinationsTitle: "En Popüler Turlar",
    loadingDestinations: "Rotalar yükleniyor...",
    destinationsError: "Rotalar yüklenirken bir hata oluştu",
    noDestinations: "Şu anda rota bulunmuyor",
    startingFrom: "Başlangıç fiyatı",
    viewDetails: "Detayları Gör",

    offersSubtitle: "Özel Teklifler",
    offersTitle: "Bu Sezonun En İyi Teklifleri",
    honeymoonOfferTitle: "Balayı Paketi",
    honeymoonOfferDescription:
      "Maldivler’de 5 yıldızlı otel, günlük kahvaltı ve romantik deneyimle 7 gün.",
    familyOfferTitle: "Dubai Aile Turu",
    familyOfferDescription:
      "Otel, şehir turları ve ulaşımı içeren aile paketi.",
    istanbulOfferTitle: "İstanbul Tatili",
    istanbulOfferDescription:
      "Tarih, pazarlar, Türk restoranları ve tekne turlarıyla 5 gün.",
    discount25: "%25 İndirim",
    discount15: "%15 İndirim",
    discount20: "%20 İndirim",
    bookOffer: "Teklifi Rezerve Et",

    loadingDestinationDetails: "Rota detayları yükleniyor...",
    destinationNotFound: "Rota bulunamadı veya bir hata oluştu",
    backToDestinations: "Rotalara geri dön",
    price: "Fiyat",
    duration: "Süre",
    tripProgram: "Tur Programı",
    noDescription: "Henüz açıklama yok",
    noProgram: "Bu tur için henüz program eklenmedi",
    untitledDestination: "İsimsiz rota",
    notSpecified: "Belirtilmemiş",
    notAvailable: "Mevcut değil",

    bookingSubtitle: "Seyahatinizi Rezerve Edin",
    bookingTitle: "Rezervasyon Bilgilerini Doldurun",
    bookingBoxTitle: "Özel bir yolculuğa ilk adımınız",
    bookingBoxText:
      "Bilgilerinizi gönderin, ekibimiz detayları onaylamak ve size en uygun seyahat programını seçmek için sizinle iletişime geçecektir.",
    bookingStep1: "Uygun rotayı seçme",
    bookingStep2: "Kişi sayısını belirleme",
    bookingStep3: "Otel ve ulaşımı ayarlama",
    bookingStep4: "Fiyat ve programı onaylama",
    fullName: "Ad Soyad",
    phoneNumber: "Telefon Numarası",
    selectDestination: "Rota seçin",
    peopleCount: "Kişi sayısı",
    additionalNotes: "Ek notlar",
    confirmBooking: "Rezervasyonu Onayla",
    sending: "Gönderiliyor...",
    bookingRequiredMessage: "Lütfen gerekli rezervasyon bilgilerini doldurun",
    bookingSuccessMessage:
      "Rezervasyon talebi başarıyla gönderildi ✅ Yakında sizinle iletişime geçeceğiz.",
    bookingErrorMessage: "Rezervasyon gönderilirken bir hata oluştu",
    serverConnectionError:
      "Sunucuya bağlanılamadı. Sunucunun çalıştığından emin olun.",
    tripDate: "Seyahat Tarihi",
    tripDatePlaceholder: "Örnek: 2026-05-20",
    preferredContactMethod: "Tercih edilen iletişim yöntemi",
    whatsapp: "WhatsApp",
    call: "Arama",
    email: "E-posta",

    searchPlaceholder: "Ara",
    heroSearchTitle: "Unutulmaz turlar ve aktiviteler rezerve edin",
    heroSearchPlaceholder: "Rotaya göre ara",
    login: "Giriş",
    experiencesSubtitle: "Kaçırılmayacak deneyimler",
    experiencesTitle: "En iyi turları ve aktiviteleri keşfedin",
    all: "Tümü",
    searchResultsFor: "Arama sonuçları",
    loadingExperiences: "İçerik yükleniyor...",
    experiencesError: "İçerik yüklenirken bir hata oluştu",
    noExperiences: "Şu anda içerik bulunmuyor",

    emailAddress: "E-posta adresi isteğe bağlı",
    adultsCount: "Yetişkin sayısı",
    childrenCount: "Çocuk sayısı isteğe bağlı",
    bookingSummary: "Rezervasyon Özeti",
    selectedTrip: "Seçilen tur",
    totalPeople: "Toplam kişi",
    estimatedPrice: "Tahmini fiyat",
    noPaymentNow:
      "Şimdi ödeme yapmayacaksınız. Ekibimiz detayları onaylamak için sizinle iletişime geçecektir.",
    bookingSuccessTitle: "Talebiniz gönderildi",
    bookingSuccessText:
      "Talebinizi aldık. Ekibimiz detayları onaylamak için yakında sizinle iletişime geçecektir.",
    newBooking: "Yeni rezervasyon gönder",

    footerDescription:
      "Dünyadaki en iyi turları, aktiviteleri ve gezilecek yerleri seçmenize yardımcı olan bir seyahat platformu.",
    quickLinks: "Hızlı Bağlantılar",
    contactInfo: "İletişim Bilgileri",
    followUs: "Bizi Takip Edin",
    rightsReserved: "Tüm hakları saklıdır",

    contactSubtitle: "İletişim",
    contactTitle: "Size yardımcı olmak için buradayız",
    contactDescription:
      "Bir tur veya rezervasyon hakkında sorunuz mu var? Bize mesaj gönderin, ekibimiz yakında sizinle iletişime geçecektir.",
    contactPhone: "Telefon",
    contactEmail: "E-posta",
    contactAddress: "Adres",
    contactAddressValue: "İstanbul, Türkiye",
    workingHours: "Çalışma Saatleri",
    workingHoursValue: "Her gün 09:00 - 20:00",
    messageName: "Ad Soyad",
    messageEmail: "E-posta Adresi",
    messagePhone: "Telefon Numarası",
    messageText: "Mesajınızı buraya yazın",
    sendMessage: "Mesaj Gönder",
    messageSent: "Mesajınız başarıyla gönderildi ✅",

    noOffers: "Şu anda öne çıkan teklif yok",
    notFoundTitle: "Sayfa bulunamadı",
    notFoundText: "Ulaşmaya çalıştığınız sayfa mevcut değil veya taşınmış.",
    backHome: "Ana sayfaya dön",
  },
};

export const supportedLanguages = [
  { code: "ar", label: "العربية", nativeName: "العربية الفصحى", dir: "rtl" },
  { code: "ar-eg", label: "مصري", nativeName: "اللهجة المصرية", dir: "rtl" },
  { code: "ar-ma", label: "مغربي", nativeName: "الدارجة المغربية", dir: "rtl" },
  {
    code: "ar-dz",
    label: "جزائري",
    nativeName: "اللهجة الجزائرية",
    dir: "rtl",
  },
  { code: "en", label: "English", nativeName: "English", dir: "ltr" },
  { code: "tr", label: "Türkçe", nativeName: "Türkçe", dir: "ltr" },
  { code: "fr", label: "Français", nativeName: "Français", dir: "ltr" },
  { code: "de", label: "Deutsch", nativeName: "Deutsch", dir: "ltr" },
  { code: "es", label: "Español", nativeName: "Español", dir: "ltr" },
  { code: "it", label: "Italiano", nativeName: "Italiano", dir: "ltr" },
  { code: "ru", label: "Русский", nativeName: "Русский", dir: "ltr" },
];

const languageFallbackMap = {
  "ar-eg": "ar",
  "ar-ma": "ar",
  "ar-dz": "ar",
  fr: "en",
  de: "en",
  es: "en",
  it: "en",
  ru: "en",
};

const extraTranslations = {
  "ar-eg": {
    siteName: "رحّال",
    home: "الرئيسية",
    destinations: "الوجهات",
    offers: "العروض",
    booking: "الحجز",
    contact: "كلمنا",
    bookNow: "احجز دلوقتي",
    language: "اللغة",
    login: "دخول",
    heroSubtitle: "اكتشف الدنيا معانا",
    heroTitle: "رحلات وتجارب سفر ماتتنسيش",
    heroDescription: "اختار وجهتك وسيب علينا تنظيم الرحلة والفندق والبرنامج.",
    exploreDestinations: "شوف الوجهات",
    viewOffers: "شوف العروض",
    loadingExperiences: "بنحمّل المحتوى...",
    noExperiences: "مفيش محتوى دلوقتي",
    viewDetails: "شوف التفاصيل",
    startingFrom: "ابتداءً من",
    confirmBooking: "أكد الحجز",
    sending: "جاري الإرسال...",
    bookingSuccessMessage: "طلب الحجز اتبعت بنجاح ✅ هنتواصل معاك قريب.",
    bookingErrorMessage: "حصلت مشكلة أثناء إرسال الحجز",
    fullName: "الاسم بالكامل",
    phoneNumber: "رقم الموبايل",
    additionalNotes: "ملاحظات إضافية",
    sendMessage: "ابعت الرسالة",
    backHome: "ارجع للرئيسية",
  },

  "ar-ma": {
    siteName: "رحّال",
    home: "الرئيسية",
    destinations: "الوجهات",
    offers: "العروض",
    booking: "الحجز",
    contact: "تواصل معنا",
    bookNow: "حجز دابا",
    language: "اللغة",
    login: "دخول",
    heroSubtitle: "اكتشف العالم معانا",
    heroTitle: "رحلات وتجارب سياحية ما كتنساش",
    heroDescription:
      "اختار الوجهة ديالك، وحنا نوجدو ليك الرحلة والفندق والبرنامج.",
    exploreDestinations: "اكتشف الوجهات",
    viewOffers: "شوف العروض",
    loadingExperiences: "كنحمّلو المحتوى...",
    noExperiences: "ما كاين حتى محتوى دابا",
    viewDetails: "شوف التفاصيل",
    startingFrom: "ابتداءً من",
    confirmBooking: "أكد الحجز",
    sending: "جاري الإرسال...",
    bookingSuccessMessage:
      "تم إرسال طلب الحجز بنجاح ✅ غادي نتواصلو معاك قريب.",
    bookingErrorMessage: "وقع مشكل أثناء إرسال الحجز",
    fullName: "الاسم الكامل",
    phoneNumber: "رقم الهاتف",
    additionalNotes: "ملاحظات إضافية",
    sendMessage: "رسل الرسالة",
    backHome: "رجوع للرئيسية",
  },

  "ar-dz": {
    siteName: "رحّال",
    home: "الرئيسية",
    destinations: "الوجهات",
    offers: "العروض",
    booking: "الحجز",
    contact: "تواصل معنا",
    bookNow: "احجز الآن",
    language: "اللغة",
    login: "دخول",
    heroSubtitle: "اكتشف العالم معانا",
    heroTitle: "رحلات وتجارب سياحية ما تتنساوش",
    heroDescription:
      "اختار الوجهة تاعك، وحنا نوجدو لك الرحلة والفندق والبرنامج.",
    exploreDestinations: "اكتشف الوجهات",
    viewOffers: "شوف العروض",
    loadingExperiences: "رانا نحملو المحتوى...",
    noExperiences: "ما كاين حتى محتوى حاليا",
    viewDetails: "شوف التفاصيل",
    startingFrom: "ابتداءً من",
    confirmBooking: "أكد الحجز",
    sending: "جاري الإرسال...",
    bookingSuccessMessage: "تم إرسال طلب الحجز بنجاح ✅ راح نتواصلو معاك قريب.",
    bookingErrorMessage: "صار مشكل أثناء إرسال الحجز",
    fullName: "الاسم الكامل",
    phoneNumber: "رقم الهاتف",
    additionalNotes: "ملاحظات إضافية",
    sendMessage: "أرسل الرسالة",
    backHome: "ارجع للرئيسية",
  },

  fr: {
    siteName: "Rahal",
    home: "Accueil",
    destinations: "Destinations",
    offers: "Offres",
    booking: "Réservation",
    contact: "Contact",
    bookNow: "Réserver",
    language: "Langue",
    login: "Connexion",
    heroSubtitle: "Découvrez le monde avec nous",
    heroTitle: "Des expériences de voyage inoubliables",
    heroDescription:
      "Choisissez votre destination et profitez d’un voyage complet avec hôtels, visites et programmes.",
    exploreDestinations: "Explorer les destinations",
    viewOffers: "Voir les offres",
    destinationsTitle: "Voyages populaires",
    experiencesTitle: "Découvrez les meilleurs voyages et activités",
    viewDetails: "Voir les détails",
    startingFrom: "À partir de",
    price: "Prix",
    duration: "Durée",
    bookingTitle: "Remplir les informations de réservation",
    fullName: "Nom complet",
    phoneNumber: "Téléphone",
    emailAddress: "Adresse e-mail facultative",
    additionalNotes: "Notes supplémentaires",
    confirmBooking: "Confirmer la réservation",
    sending: "Envoi...",
    bookingSuccessMessage:
      "Votre demande de réservation a été envoyée ✅ Nous vous contacterons bientôt.",
    bookingErrorMessage:
      "Une erreur est survenue lors de l’envoi de la réservation",
    contactTitle: "Nous sommes là pour vous aider",
    sendMessage: "Envoyer le message",
    backHome: "Retour à l’accueil",
  },

  de: {
    siteName: "Rahal",
    home: "Startseite",
    destinations: "Reiseziele",
    offers: "Angebote",
    booking: "Buchung",
    contact: "Kontakt",
    bookNow: "Jetzt buchen",
    language: "Sprache",
    login: "Anmelden",
    heroSubtitle: "Entdecken Sie die Welt mit uns",
    heroTitle: "Unvergessliche Reiseerlebnisse weltweit",
    heroDescription:
      "Wählen Sie Ihr Reiseziel und genießen Sie eine komplette Reise mit Hotels, Touren und Programmen.",
    exploreDestinations: "Reiseziele entdecken",
    viewOffers: "Angebote ansehen",
    destinationsTitle: "Beliebte Reisen",
    experiencesTitle: "Entdecken Sie die besten Reisen und Aktivitäten",
    viewDetails: "Details ansehen",
    startingFrom: "Ab",
    price: "Preis",
    duration: "Dauer",
    bookingTitle: "Buchungsdaten ausfüllen",
    fullName: "Vollständiger Name",
    phoneNumber: "Telefonnummer",
    emailAddress: "E-Mail optional",
    additionalNotes: "Zusätzliche Notizen",
    confirmBooking: "Buchung bestätigen",
    sending: "Wird gesendet...",
    bookingSuccessMessage:
      "Ihre Buchungsanfrage wurde gesendet ✅ Wir kontaktieren Sie bald.",
    bookingErrorMessage: "Beim Senden der Buchung ist ein Fehler aufgetreten",
    contactTitle: "Wir sind hier, um zu helfen",
    sendMessage: "Nachricht senden",
    backHome: "Zur Startseite",
  },

  es: {
    siteName: "Rahal",
    home: "Inicio",
    destinations: "Destinos",
    offers: "Ofertas",
    booking: "Reserva",
    contact: "Contacto",
    bookNow: "Reservar ahora",
    language: "Idioma",
    login: "Iniciar sesión",
    heroSubtitle: "Descubre el mundo con nosotros",
    heroTitle: "Experiencias de viaje inolvidables",
    heroDescription:
      "Elige tu destino y disfruta de una experiencia completa con hoteles, tours y programas.",
    exploreDestinations: "Explorar destinos",
    viewOffers: "Ver ofertas",
    destinationsTitle: "Viajes populares",
    experiencesTitle: "Descubre los mejores viajes y actividades",
    viewDetails: "Ver detalles",
    startingFrom: "Desde",
    price: "Precio",
    duration: "Duración",
    bookingTitle: "Completa los datos de reserva",
    fullName: "Nombre completo",
    phoneNumber: "Teléfono",
    emailAddress: "Correo opcional",
    additionalNotes: "Notas adicionales",
    confirmBooking: "Confirmar reserva",
    sending: "Enviando...",
    bookingSuccessMessage:
      "Tu solicitud de reserva fue enviada ✅ Te contactaremos pronto.",
    bookingErrorMessage: "Ocurrió un error al enviar la reserva",
    contactTitle: "Estamos aquí para ayudarte",
    sendMessage: "Enviar mensaje",
    backHome: "Volver al inicio",
  },

  it: {
    siteName: "Rahal",
    home: "Home",
    destinations: "Destinazioni",
    offers: "Offerte",
    booking: "Prenotazione",
    contact: "Contatto",
    bookNow: "Prenota ora",
    language: "Lingua",
    login: "Accesso",
    heroSubtitle: "Scopri il mondo con noi",
    heroTitle: "Esperienze di viaggio indimenticabili",
    heroDescription:
      "Scegli la tua destinazione e vivi un’esperienza completa con hotel, tour e programmi.",
    exploreDestinations: "Esplora destinazioni",
    viewOffers: "Vedi offerte",
    destinationsTitle: "Viaggi popolari",
    experiencesTitle: "Scopri i migliori viaggi e attività",
    viewDetails: "Vedi dettagli",
    startingFrom: "A partire da",
    price: "Prezzo",
    duration: "Durata",
    bookingTitle: "Compila i dettagli della prenotazione",
    fullName: "Nome completo",
    phoneNumber: "Telefono",
    emailAddress: "Email opzionale",
    additionalNotes: "Note aggiuntive",
    confirmBooking: "Conferma prenotazione",
    sending: "Invio...",
    bookingSuccessMessage:
      "La tua richiesta è stata inviata ✅ Ti contatteremo presto.",
    bookingErrorMessage: "Si è verificato un errore durante l’invio",
    contactTitle: "Siamo qui per aiutarti",
    sendMessage: "Invia messaggio",
    backHome: "Torna alla home",
  },

  ru: {
    siteName: "Rahal",
    home: "Главная",
    destinations: "Направления",
    offers: "Предложения",
    booking: "Бронирование",
    contact: "Контакты",
    bookNow: "Забронировать",
    language: "Язык",
    login: "Войти",
    heroSubtitle: "Откройте мир вместе с нами",
    heroTitle: "Незабываемые путешествия по всему миру",
    heroDescription:
      "Выберите направление и наслаждайтесь полным путешествием с отелями, турами и программами.",
    exploreDestinations: "Смотреть направления",
    viewOffers: "Смотреть предложения",
    destinationsTitle: "Популярные поездки",
    experiencesTitle: "Лучшие туры и активности",
    viewDetails: "Подробнее",
    startingFrom: "От",
    price: "Цена",
    duration: "Длительность",
    bookingTitle: "Заполните данные бронирования",
    fullName: "Полное имя",
    phoneNumber: "Телефон",
    emailAddress: "Email необязательно",
    additionalNotes: "Дополнительные заметки",
    confirmBooking: "Подтвердить бронирование",
    sending: "Отправка...",
    bookingSuccessMessage: "Заявка отправлена ✅ Мы скоро свяжемся с вами.",
    bookingErrorMessage: "Ошибка при отправке бронирования",
    contactTitle: "Мы готовы помочь",
    sendMessage: "Отправить сообщение",
    backHome: "На главную",
  },
};

export function LanguageProvider({ children }) {
  const [language, setLanguageState] = useState(() => {
    const savedLanguage = localStorage.getItem("language");
    const isSupported = supportedLanguages.some(
      (item) => item.code === savedLanguage,
    );

    return isSupported ? savedLanguage : "ar";
  });

  const setLanguage = (newLanguage) => {
    const isSupported = supportedLanguages.some(
      (item) => item.code === newLanguage,
    );

    setLanguageState(isSupported ? newLanguage : "ar");
  };

  useEffect(() => {
    const currentLanguage =
      supportedLanguages.find((item) => item.code === language) ||
      supportedLanguages[0];

    localStorage.setItem("language", language);

    document.documentElement.lang = language;
    document.documentElement.dir = currentLanguage.dir;
    document.documentElement.setAttribute("translate", "no");
    document.documentElement.classList.add("notranslate");

    document.body.setAttribute("translate", "no");
    document.body.classList.add("notranslate");

    document.body.classList.toggle("rtl", currentLanguage.dir === "rtl");
    document.body.classList.toggle("ltr", currentLanguage.dir === "ltr");
  }, [language]);

  const t = useMemo(() => {
    const fallbackLanguage = languageFallbackMap[language] || language;
    const baseTranslations = translations[fallbackLanguage] || translations.ar;
    const selectedTranslations = translations[language] || {};
    const extraSelectedTranslations = extraTranslations[language] || {};

    return {
      ...baseTranslations,
      ...selectedTranslations,
      ...extraSelectedTranslations,
    };
  }, [language]);

  const currentLanguage =
    supportedLanguages.find((item) => item.code === language) ||
    supportedLanguages[0];

  return (
    <LanguageContext.Provider
      value={{
        language,
        setLanguage,
        t,
        supportedLanguages,
        currentLanguage,
        isRTL: currentLanguage.dir === "rtl",
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  return useContext(LanguageContext);
}
