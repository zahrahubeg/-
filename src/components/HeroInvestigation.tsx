import React from 'react';
import { ShieldAlert, Sparkles, TrendingUp, BookOpen, ArrowDown } from 'lucide-react';

interface HeroInvestigationProps {
  onScrollToPoll: () => void;
  onExploreCategories: () => void;
}

export const HeroInvestigation: React.FC<HeroInvestigationProps> = ({
  onScrollToPoll,
  onExploreCategories
}) => {
  return (
    <section id="investigation" className="pt-8 pb-16 border-b border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Editorial Top Line Metadata (NO PILLS - Clean unboxed text with middle dots) */}
        <div className="flex flex-wrap items-center gap-2 text-xs md:text-sm text-stone-600 mb-6">
          <span className="font-semibold text-stone-900">ملف استقصائي خاص</span>
          <span aria-hidden="true">·</span>
          <span>الهيئة الوطنية للإذاعة والتلفزيون (NRTA)</span>
          <span aria-hidden="true">·</span>
          <span>حملة تنظيم المحتوى الرقمي 2026</span>
          <span aria-hidden="true">·</span>
          <span>قراءة متعمقة: 7 دقائق</span>
        </div>

        {/* Headline & Deck */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start mb-12">
          <div className="lg:col-span-8">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-editorial font-bold text-stone-900 leading-[1.3] mb-6 text-wrap-balance">
              معركة بكين ضد "الرئيس المتسلط": لماذا تشن الصين حرباً على حبكات الثراء الفاحش والزواج من أجل المال؟
            </h1>
            <p className="text-lg sm:text-xl text-stone-700 leading-relaxed max-w-3xl mb-8">
              في واحدة من أشرس حملاتها على المحتوى الرقمي، تلاحق الهيئات التنظيمية الصينية ما يُعرف بـ "الميكرو-دراما الوهمية" (霸道总裁). أعمال مدتها دقيقة لكل حلقة، تحصد مليارات المشاهدات، وتصور المليارديرات المنقذين والارتباط بالثروة كحل وحيد لمصاعب الحياة. فهل هي حماية ضرورية لوعي المجتمع واقتصاده، أم وصاية خانقة على رغبات الترفيه البريئة؟
            </p>

            <div className="flex flex-wrap items-center gap-4">
              <button
                onClick={onScrollToPoll}
                className="px-6 py-3 bg-stone-900 hover:bg-stone-800 text-stone-100 font-medium text-sm rounded-lg transition-colors shadow-sm flex items-center gap-2 cursor-pointer"
              >
                <span>صوّت الآن: هل تؤيد هذا الإجراء؟</span>
                <ArrowDown className="w-4 h-4" />
              </button>
              <button
                onClick={onExploreCategories}
                className="px-6 py-3 bg-white border border-stone-300 hover:border-stone-400 text-stone-800 font-medium text-sm rounded-lg transition-colors cursor-pointer"
              >
                استكشف المحظورات الثمانية
              </button>
            </div>
          </div>

          {/* Quick Context Card */}
          <div className="lg:col-span-4 bg-white border border-stone-200 rounded-xl p-6 shadow-xs">
            <h3 className="text-base font-bold text-stone-900 mb-4 pb-2 border-b border-stone-100">
              ملخص وقائع الحملة الرقابية
            </h3>
            <ul className="space-y-4 text-xs sm:text-sm text-stone-600">
              <li className="flex items-start gap-3">
                <span className="font-mono text-stone-400 mt-0.5">01</span>
                <div>
                  <strong className="text-stone-900 block font-medium">المدة والنطاق</strong>
                  حملة مركزة لمدة شهرين تستهدف منصات البث القصير (Douyin, Kuaishou, WeChat Mini-Programs).
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="font-mono text-stone-400 mt-0.5">02</span>
                <div>
                  <strong className="text-stone-900 block font-medium">جوهر الحظر</strong>
                  تجريم 8 أنماط سردية تشمل استعراض البذخ، الزواج من أجل المال، ازدراء الطبقة العاملة، والتسلط العاطفي.
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="font-mono text-stone-400 mt-0.5">03</span>
                <div>
                  <strong className="text-stone-900 block font-medium">الدافع الجوهري</strong>
                  مكافحة "عبادة المال" في ظل التباطؤ الاقتصادي، وحماية الشباب من أوهام الهروب من السعي والعمل الجاد.
                </div>
              </li>
            </ul>
          </div>
        </div>

        {/* Visual Editorial Grid: Generated Images */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-stretch">
          <div className="md:col-span-7 relative rounded-xl overflow-hidden bg-stone-100 border border-stone-200">
            <img
              src="/src/assets/images/microdrama_filming_set_1792830911862.jpg"
              alt="كواليس تصوير مسلسلات الميكرو-دراما الرأسية على الهواتف"
              referrerPolicy="no-referrer"
              className="w-full h-80 sm:h-96 object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-stone-950/80 via-stone-950/30 to-transparent flex flex-col justify-end p-6 text-white">
              <span className="text-xs uppercase tracking-wider text-amber-300 font-mono mb-1">
                صناعة اللقطة الرأسية
              </span>
              <h4 className="text-lg sm:text-xl font-bold font-editorial">
                سرعة إنتاجية غير مسبوقة: 100 حلقة تُصوّر في 7 أيام فقط
              </h4>
              <p className="text-xs sm:text-sm text-stone-200 mt-1 line-clamp-2">
                تعتمد المسلسلات على ممثلين شباب، ميزانيات متواضعة (30-50 ألف دولار)، وحبكات مصممة لانتزاع الدفعات المالية عند كل منعطف.
              </p>
            </div>
          </div>

          <div className="md:col-span-5 relative rounded-xl overflow-hidden bg-stone-100 border border-stone-200">
            <img
              src="/src/assets/images/luxury_ceo_trope_1792830913724.jpg"
              alt="نمط الرئيس التنفيذي المتسلط في الميكرو-دراما الصينية"
              referrerPolicy="no-referrer"
              className="w-full h-80 sm:h-96 object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-stone-950/80 via-stone-950/30 to-transparent flex flex-col justify-end p-6 text-white">
              <span className="text-xs uppercase tracking-wider text-amber-300 font-mono mb-1">
                أيقونة "الرئيس المتسلط" (霸道总裁)
              </span>
              <h4 className="text-lg sm:text-xl font-bold font-editorial">
                رمزية البطل كلي القدرة: شراء ناطحة سحاب لحل نزاع عاطفي
              </h4>
              <p className="text-xs sm:text-sm text-stone-200 mt-1 line-clamp-2">
                الحبكة الأكثر رواجاً تكرس فكرة أن مشاكل الطبقة المتوسطة والفقراء لا يحلها سوى كرم ملياردير عاشق.
              </p>
            </div>
          </div>
        </div>

        {/* Editorial Pull Quote */}
        <div className="mt-12 py-8 px-6 sm:px-10 bg-stone-100/70 border-y border-stone-200/90 rounded-none sm:rounded-xl">
          <blockquote className="text-center max-w-3xl mx-auto">
            <p className="text-xl sm:text-2xl font-editorial italic text-stone-800 leading-relaxed">
              «إن تمجيد الثراء الفاحش والزواج من أجل المال لا يفسد الذوق العام فحسب، بل يزرع اليأس في نفوس الشباب الذين يكافحون في حياتهم اليومية، ويوحي بأن الكدح والكرامة الإنسانية بلا قيمة أمام رصيد الحساب البنكي.»
            </p>
            <footer className="mt-4 text-xs sm:text-sm text-stone-600 font-sans">
              — مقتطف من بيان الهيئة الوطنية الصينية لتنظيم البث الإذاعي والتلفزيوني (NRTA)
            </footer>
          </blockquote>
        </div>
      </div>
    </section>
  );
};
