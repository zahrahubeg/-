import React, { useState } from 'react';
import { CATEGORIES_DOSSIER, CategoryDossier } from '../data/dossierData';
import { ChevronLeft, X, Eye, FileText, AlertTriangle } from 'lucide-react';

export const EightCategoriesGrid: React.FC = () => {
  const [filter, setFilter] = useState<string>('all');
  const [activeModalItem, setActiveModalItem] = useState<CategoryDossier | null>(null);

  const filteredCategories = CATEGORIES_DOSSIER.filter((item) => {
    if (filter === 'all') return true;
    return item.categoryType === filter;
  });

  return (
    <section id="categories" className="py-16 border-b border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-6">
          <div>
            <div className="text-xs uppercase tracking-widest text-stone-500 mb-2 font-mono">
              دليل الرقابة الرسمي 2026
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-editorial font-bold text-stone-900 mb-3 text-wrap-balance">
              الفئات الثمانية المستهدفة في حملة التطهير الرقابي
            </h2>
            <p className="text-stone-600 text-sm sm:text-base max-w-2xl leading-relaxed">
              حددت الهيئات التنظيمية الصينية 8 محاور رئيسية اعتبرتها "مشوهة للقيم الاجتماعية"، تشمل تمجيد الثروة الاستعراضية، العلاقات القسرية، وتطبيع الاحتيال والانتقام.
            </p>
          </div>

          {/* Interactive Filter Segmented Control (Allowed functional button tabs) */}
          <div className="flex items-center gap-1.5 p-1 bg-stone-100 rounded-lg border border-stone-200/80 self-start md:self-auto overflow-x-auto max-w-full">
            <button
              onClick={() => setFilter('all')}
              className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors whitespace-nowrap cursor-pointer ${
                filter === 'all'
                  ? 'bg-white text-stone-900 shadow-xs'
                  : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              جميع الفئات (8)
            </button>
            <button
              onClick={() => setFilter('financial')}
              className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors whitespace-nowrap cursor-pointer ${
                filter === 'financial'
                  ? 'bg-white text-stone-900 shadow-xs'
                  : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              مالية واستهلاكية
            </button>
            <button
              onClick={() => setFilter('psychological')}
              className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors whitespace-nowrap cursor-pointer ${
                filter === 'psychological'
                  ? 'bg-white text-stone-900 shadow-xs'
                  : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              نفسية وعاطفية
            </button>
            <button
              onClick={() => setFilter('social')}
              className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors whitespace-nowrap cursor-pointer ${
                filter === 'social'
                  ? 'bg-white text-stone-900 shadow-xs'
                  : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              أسرية واجتماعية
            </button>
            <button
              onClick={() => setFilter('ethical')}
              className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors whitespace-nowrap cursor-pointer ${
                filter === 'ethical'
                  ? 'bg-white text-stone-900 shadow-xs'
                  : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              أخلاقية وقانونية
            </button>
          </div>
        </div>

        {/* 8 Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredCategories.map((cat) => (
            <div
              key={cat.id}
              className="bg-white border border-stone-200 rounded-xl p-6 flex flex-col justify-between hover:border-stone-400 transition-all shadow-xs group"
            >
              <div>
                {/* Clean unboxed metadata with typographic middle-dots (NO PILLS) */}
                <div className="flex items-center gap-2 text-xs text-stone-500 mb-3 font-mono">
                  <span>فئة {cat.number}</span>
                  <span aria-hidden="true">·</span>
                  <span className="text-stone-700">{cat.titleZh}</span>
                </div>

                <h3 className="text-lg font-bold text-stone-900 mb-2 leading-snug group-hover:text-stone-950">
                  {cat.titleAr}
                </h3>

                <p className="text-xs sm:text-sm text-stone-600 leading-relaxed mb-4">
                  {cat.shortDesc}
                </p>
              </div>

              <div className="pt-4 border-t border-stone-100 flex items-center justify-between text-xs">
                <span className="text-stone-500">
                  درجة الحظر: <strong className="text-stone-800 font-medium">{cat.severityLevel}</strong>
                </span>

                <button
                  onClick={() => setActiveModalItem(cat)}
                  className="font-medium text-stone-900 hover:text-amber-800 flex items-center gap-1 cursor-pointer"
                >
                  <span>تفاصيل الملف</span>
                  <ChevronLeft className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Modal for In-depth Case Analysis */}
        {activeModalItem && (
          <div className="fixed inset-0 z-50 bg-stone-950/50 backdrop-blur-xs flex items-center justify-center p-4">
            <div className="bg-white rounded-xl border border-stone-200 max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6 sm:p-8 shadow-xl relative animate-in fade-in duration-200">
              {/* Close Button */}
              <button
                onClick={() => setActiveModalItem(null)}
                className="absolute top-5 left-5 p-1.5 rounded-lg text-stone-500 hover:text-stone-900 hover:bg-stone-100 transition-colors cursor-pointer"
                aria-label="إغلاق النافذة"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Modal Metadata */}
              <div className="flex items-center gap-2 text-xs text-stone-500 font-mono mb-2">
                <span>الملف الرقابي {activeModalItem.number}</span>
                <span aria-hidden="true">·</span>
                <span>{activeModalItem.titleZh}</span>
                <span aria-hidden="true">·</span>
                <span>حظر رسمي لعام 2026</span>
              </div>

              <h3 className="text-2xl font-editorial font-bold text-stone-900 mb-4">
                {activeModalItem.titleAr}
              </h3>

              <div className="space-y-6 text-sm text-stone-700">
                {/* Section 1: Classic Trope */}
                <div>
                  <h4 className="text-xs uppercase tracking-wider text-stone-500 font-bold mb-1.5">
                    النمط السردي الكلاسيكي (Trope Archetype)
                  </h4>
                  <p className="bg-stone-50 p-3.5 rounded-lg border border-stone-200/70 text-stone-800 leading-relaxed">
                    {activeModalItem.classicTrope}
                  </p>
                </div>

                {/* Section 2: Sample banned script line */}
                <div>
                  <h4 className="text-xs uppercase tracking-wider text-amber-800 font-bold mb-1.5">
                    نموذج من الحوارات الممنوعة في السيناريو
                  </h4>
                  <div className="p-3.5 bg-amber-50/50 border border-amber-200/80 rounded-lg text-amber-950 italic font-editorial text-base">
                    {activeModalItem.sampleSceneQuote}
                  </div>
                </div>

                {/* Section 3: Why Regulators Ban It */}
                <div>
                  <h4 className="text-xs uppercase tracking-wider text-stone-500 font-bold mb-1.5">
                    العلة الرقابية الرسمية (لماذا تحظره السلطات الصينية؟)
                  </h4>
                  <p className="leading-relaxed text-stone-700">
                    {activeModalItem.regulatoryReason}
                  </p>
                </div>

                {/* Section 4: Audience Appeal */}
                <div>
                  <h4 className="text-xs uppercase tracking-wider text-stone-500 font-bold mb-1.5">
                    علم نفس الجمهور (لماذا يدمنه ملايين المشاهدين؟)
                  </h4>
                  <p className="leading-relaxed text-stone-700">
                    {activeModalItem.audienceAppeal}
                  </p>
                </div>
              </div>

              <div className="mt-8 pt-4 border-t border-stone-200 flex justify-end">
                <button
                  onClick={() => setActiveModalItem(null)}
                  className="px-5 py-2 bg-stone-900 text-white text-xs font-medium rounded-lg hover:bg-stone-800 transition-colors cursor-pointer"
                >
                  إغلاق الملف
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
