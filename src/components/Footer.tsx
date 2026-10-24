import React from 'react';

interface FooterProps {
  onNavigate: (sectionId: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  return (
    <footer className="bg-stone-900 text-stone-300 py-12 border-t border-stone-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 pb-10 border-b border-stone-800">
          <div className="md:col-span-6">
            <h3 className="text-lg font-bold text-white mb-2">
              مرصد الدراما الصينية: معركة الرئيس المتسلط
            </h3>
            <p className="text-xs sm:text-sm text-stone-400 max-w-md leading-relaxed">
              منصة تفاعلية واستقصائية ترصد أبعاد الحملة التنظيمية الصينية لعام 2026 ضد مسلسلات الميكرو-دراما، وتفتح فضاءً تحليلياً متوازناً لنقاش قضايا الرقابة، واقتصاد الدوبامين، وتأثير السرد الدرامي على منظومة القيم والزواج.
            </p>
          </div>

          <div className="md:col-span-3">
            <h4 className="text-xs font-mono uppercase tracking-widest text-stone-400 mb-3">
              أقسام المرصد
            </h4>
            <ul className="space-y-2 text-xs sm:text-sm text-stone-400">
              <li>
                <button
                  onClick={() => onNavigate('investigation')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  التحقيق وخلفيات الحملة
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('categories')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  الفئات الثمانية المحظورة
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('simulator')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  مختبر فحص السيناريو
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('market')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  بيانات السوق واقتصاد الدوبامين
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('poll')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  الاستطلاع العام المباشر
                </button>
              </li>
            </ul>
          </div>

          <div className="md:col-span-3">
            <h4 className="text-xs font-mono uppercase tracking-widest text-stone-400 mb-3">
              المصادر والمراجع الرسمية
            </h4>
            <ul className="space-y-2 text-xs text-stone-400">
              <li>الهيئة الوطنية للإذاعة والتلفزيون بالصين (NRTA)</li>
              <li>لوائح إدارة محتوى المسلسلات القصيرة على الإنترنت 2024 - 2026</li>
              <li>مركز معلومات شبكة الإنترنت الصيني (CNNIC)</li>
              <li>تقارير رابطة خدمات البث السمعي البصري على الإنترنت (CNSA)</li>
            </ul>
          </div>
        </div>

        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-stone-500">
          <div>
            جميع الحقوق محفوظة للمرصد الثقافي والإعلامي © 2026
          </div>
          <div className="flex items-center gap-4">
            <span>مبني لأغراض البحث والتحليل الإعلامي المحايد</span>
            <span aria-hidden="true">·</span>
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="text-stone-400 hover:text-white underline cursor-pointer"
            >
              العودة إلى الأعلى ↑
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
