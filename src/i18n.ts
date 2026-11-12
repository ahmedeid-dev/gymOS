import i18next from 'i18next';
import { initReactI18next } from 'react-i18next';

export const i18n = i18next.createInstance({
  lng: localStorage.getItem('gympro-lang') || 'en',
  fallbackLng: 'en',
  resources: {
    en: { translation: { app: 'GymPro ERP', dashboard: 'Executive dashboard', members: 'Members', settings: 'Settings', logout: 'Sign out', welcome: 'Good morning, Ahmed', overview: 'Here is what is happening across your branches today.', add: 'Add member', search: 'Search members...', revenue: 'Total revenue', active: 'Active members', expiring: 'Expiring soon', attendance: 'Today check-ins', recent: 'Recent members', branch: 'Branch', plan: 'Plan', status: 'Status', visits: 'Visits', save: 'Save member', name: 'Full name', email: 'Email', cancel: 'Cancel', login: 'Sign in', loginHint: 'Use any email and password for the demo', password: 'Password', emailLabel: 'Work email', invalid: 'Please enter a valid email and password', language: 'العربية' } },
    ar: { translation: { app: 'جيم برو ERP', dashboard: 'لوحة التحكم التنفيذية', members: 'الأعضاء', settings: 'الإعدادات', logout: 'تسجيل الخروج', welcome: 'صباح الخير، أحمد', overview: 'إليك ما يحدث في فروعك اليوم.', add: 'إضافة عضو', search: 'ابحث عن الأعضاء...', revenue: 'إجمالي الإيرادات', active: 'الأعضاء النشطون', expiring: 'تنتهي قريباً', attendance: 'تسجيلات اليوم', recent: 'أحدث الأعضاء', branch: 'الفرع', plan: 'الخطة', status: 'الحالة', visits: 'الزيارات', save: 'حفظ العضو', name: 'الاسم الكامل', email: 'البريد الإلكتروني', cancel: 'إلغاء', login: 'تسجيل الدخول', loginHint: 'استخدم أي بريد وكلمة مرور للتجربة', password: 'كلمة المرور', emailLabel: 'البريد الوظيفي', invalid: 'أدخل بريدًا وكلمة مرور صحيحين', language: 'English' } },
  },
});
i18n.use(initReactI18next).init();
