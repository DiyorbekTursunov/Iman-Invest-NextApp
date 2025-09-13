export type Language = "uz" | "ru" | "en";

export interface Translations {
  header: {
    nav: {
      application: string;
      contact: string;
      iman: string;
    };
    language: string;
  };
  hero: {
    title: string;
    text: string;
    signature: {
      name: string;
      position: string;
    };
  };
  form: {
    title: string;
    description: string;
    tabs: {
      client: string;
      company: string;
    };
    fields: {
      clientName: string;
      companyName: string;
      companyInn: string;
      phone: string;
      email: string;
      documentNumber: string;
      subject: string;
      message: string;
    };
    placeholders: {
      phoneFormat: string;
      phoneHover: string;
    };
    submit: string;
    success: {
      title: string;
    };
    footer: string;
  };
  footer: {
    title: string;
    phone: string;
    social: string;
    workTime: {
      title: string;
      schedule: string;
    };
    address: {
      title: string;
      text: string;
    };
    copyright: string;
  };
}

export const translations: Record<Language, Translations> = {
  uz: {
    header: {
      nav: {
        application: "Ariza qoldirish",
        contact: "Bog'lanish",
        iman: "IMAN",
      },
      language: "Uz",
    },
    hero: {
      title: "Rustam Rahmatov murojaati",
      text: "IMAN'da biz nafaqat innovatsion moliyaviy mahsulotlar yaratishga, balki bizga ishonch bildirgan har bir inson bilan shaffof va halol munosabatlar o'rnatishga intilamiz. Bizning jamoamiz o'z sohasining mutaxassislari Rustam Rahmatov portali, men ularga chuqur ishonaman va hurmat qilaman. Shu bilan birga, shaxsiy e'tiborimni talab qiladigan vaziyatlar uchun men alohida aloqa kanalini ochishga qaror qildim.\n\nBizning ishonchimiz komilki, uzoq muddatli muvaffaqiyat faqat halollik, ishonch va mas'uliyat tamoyillariga asoslangan holda erishilishi mumkin. Men shaxsan IMAN faoliyati ushbu qadriyatlar va kompaniya missiyasiga — axloqiy moliya tizimini rivojlantirishga — doimo mos bo'lishini ta'minlayman.\n\nAgar siz ushbu tamoyillar buzilgan deb hisoblasangiz yoki biz bilan muloqot jarayonida adolatsizlikka duch kelgan bo'lsangiz, iltimos, quyidagi havola orqali shaklni to'ldirib bizga xabar bering.",
      signature: {
        name: "Rahmatov Rustam",
        position: "Founder & CEO",
      },
    },
    form: {
      title: "Murojaatingizni yuboring",
      description:
        "Har bir murojaatni shaxsan ko'rib chiqishga kafolat beraman.\n\nP.S. Iltimos, faqat mazmunli murojaatlar bilan murojaat qiling.\n\nIsh faoliyatiga aloqasi bo'lmagan xabarlar ko'rib chiqilmaydi.\n\nHurmat bilan,\n<b>Rustam Rahmatov</b>\n\nIMAN hammuassisi va bosh direktori",
      tabs: {
        client: "Mijoz",
        company: "Kompaniya",
      },
      fields: {
        clientName: "Ism-Sharif",
        companyName: "Kompaniya Nomi",
        companyInn: "Kompaniya INNsi",
        phone: "Telefon raqam",
        email: "Elektron pochta",
        documentNumber: "Hujjat raqami",
        subject: "Murojaat mavzusi",
        message: "Xabar",
      },
      placeholders: {
        phoneFormat: "+998 __ ___ __ __",
        phoneHover: "Telefon raqami",
      },
      submit: "Yuborish",
      success: {
        title: "Murojaatingiz muvaffaqiyatli yuborildi!",
      },
      footer:
        "Har bir murojaatni shaxsan ko'rib chiqishga kafolat beraman. <br/><br/>\n\nP.S. Iltimos, faqat mazmunli murojaatlar bilan murojaat qiling. Ish faoliyatiga aloqasi bo'lmagan xabarlar ko'rib chiqilmaydi.<br/><br/>\n\nHurmat bilan, <br/>\n<b>Rustam Rahmatov</b> <br/><br/>\n\nIMAN hammuassisi va bosh direktori",
    },
    footer: {
      title: "Bog'lanish uchun",
      phone: "Telefon",
      social: "Ijtimoiy tarmoqlarda",
      workTime: {
        title: "Ish vaqti",
        schedule: "Dushanba – Juma: 09:00 - 18:00",
      },
      address: {
        title: "Manzil",
        text: "Toshkent shahri, Mirobod tumani, Oybek MFY, <br/> Shaxrisabz ko'chasi, 16-uy",
      },
      copyright: "© IMAN Group Ltd.\nBarcha huquqlar himoyalangan.",
    },
  },
  ru: {
    header: {
      nav: {
        application: "Подать заявку",
        contact: "Связаться",
        iman: "ИМАН",
      },
      language: "Ру",
    },
    hero: {
      title: "Обращение Рустама Рахматова",
      text: "В IMAN мы стремимся не только создавать инновационные финансовые продукты, но и строить прозрачные и честные отношения с каждым человеком, который доверяет нам. Наша команда состоит из специалистов своего дела, которым я глубоко доверяю и уважаю. Вместе с тем, для ситуаций, требующих моего личного внимания, я решил открыть отдельный канал связи.\n\nМы твердо убеждены, что долгосрочный успех может быть достигнут только на основе принципов честности, доверия и ответственности. Я лично обеспечиваю, чтобы деятельность IMAN всегда соответствовала этим ценностям и миссии компании — развитию этичной финансовой системы.\n\nЕсли вы считаете, что эти принципы были нарушены, или столкнулись с несправедливостью в процессе общения с нами, пожалуйста, заполните форму по ссылке ниже и сообщите нам об этом.",
      signature: {
        name: "Рахматов Рустам",
        position: "Генеральный директор IMAN",
      },
    },
    form: {
      title: "Отправьте ваше обращение",
      description:
        "Гарантирую личное рассмотрение каждого обращения.\n\nP.S. Пожалуйста, обращайтесь только с содержательными вопросами.\n\nСообщения, не связанные с рабочей деятельностью, рассматриваться не будут.\n\nС уважением,\n<b>Рустам Рахматов</b>\n\nСооснователь и генеральный директор IMAN",
      tabs: {
        client: "Клиент",
        company: "Компания",
      },
      fields: {
        clientName: "ФИО",
        companyName: "Название компании",
        companyInn: "ИНН компании",
        phone: "Номер телефона",
        email: "Электронная почта",
        documentNumber: "Номер документа",
        subject: "Тема обращения",
        message: "Сообщение",
      },
      placeholders: {
        phoneFormat: "+998 __ ___ __ __",
        phoneHover: "Номер телефона",
      },
      submit: "Отправить",
      success: {
        title: "Ваше обращение успешно отправлено!",
      },
      footer:
        "Гарантирую личное рассмотрение каждого обращения.\n\nP.S. Пожалуйста, обращайтесь только с содержательными вопросами. Сообщения, не связанные с рабочей деятельностью, рассматриваться не будут.\n\nС уважением,\nРустам Рахматов\n\nСооснователь и генеральный директор IMAN",
    },
    footer: {
      title: "Для связи",
      phone: "Телефон",
      social: "В социальных сетях",
      workTime: {
        title: "Рабочее время",
        schedule: "Понедельник – Пятница: 09:00 - 18:00",
      },
      address: {
        title: "Адрес",
        text: "г. Ташкент, Мирабадский район, МФЯ Ойбек, <br/> ул. Шахрисабз, дом 16",
      },
      copyright: "© IMAN Group Ltd.\nВсе права защищены.",
    },
  },

  en: {
    header: {
      nav: {
        application: "Submit Application",
        contact: "Contact",
        iman: "IMAN",
      },
      language: "EN",
    },
    hero: {
      title: "Message from Rustam Rahmatov",
      text: "At IMAN, we strive not only to create innovative financial products, but also to build transparent and honest relationships with everyone who places their trust in us. Our team consists of true professionals, whom I deeply trust and respect. At the same time, for situations requiring my personal attention, I decided to open a separate communication channel.\n\nWe firmly believe that long-term success can only be achieved based on the principles of honesty, trust, and responsibility. I personally ensure that IMAN’s activities always align with these values and the company’s mission — developing an ethical financial system.\n\nIf you believe these principles have been violated, or you have faced injustice in your communication with us, please fill out the form at the link below and let us know.",
      signature: {
        name: "Rustam Rahmatov",
        position: "Founder & CEO",
      },
    },
    form: {
      title: "Send Your Appeal",
      description:
        "I guarantee personal review of every appeal.\n\nP.S. Please contact us only with meaningful inquiries.\n\nMessages not related to business activities will not be considered.\n\nRespectfully,\n<b>Rustam Rahmatov</b>\n\nCo-founder and Founder & CEO",
      tabs: {
        client: "Client",
        company: "Company",
      },
      fields: {
        clientName: "Full Name",
        companyName: "Company Name",
        companyInn: "Company Tax ID",
        phone: "Phone Number",
        email: "Email",
        documentNumber: "Document Number",
        subject: "Subject",
        message: "Message",
      },
      placeholders: {
        phoneFormat: "+998 __ ___ __ __",
        phoneHover: "Phone Number",
      },
      submit: "Submit",
      success: {
        title: "Your appeal has been successfully sent!",
      },
      footer:
        "I guarantee personal review of every appeal.\n\nP.S. Please contact us only with meaningful inquiries. Messages not related to business activities will not be considered.\n\nRespectfully,\nRustam Rahmatov\n\nCo-founder and Founder & CEO",
    },
    footer: {
      title: "Contact Information",
      phone: "Phone",
      social: "Social Networks",
      workTime: {
        title: "Working Hours",
        schedule: "Monday – Friday: 09:00 - 18:00",
      },
      address: {
        title: "Address",
        text: "Tashkent city, Mirobod district, Oybek MFY, <br/> Shakhrisabz street, building 16",
      },
      copyright: "© IMAN Group Ltd.\nAll rights reserved.",
    },
  },
};

export function getTranslations(lang: Language): Translations {
  return translations[lang] || translations.uz;
}
