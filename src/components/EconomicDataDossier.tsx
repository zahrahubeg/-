import React from 'react';
import { INDUSTRY_FACTS } from '../data/dossierData';
import { Smartphone, Zap, DollarSign, Globe, Clock, Layers } from 'lucide-react';

export const EconomicDataDossier: React.FC = () => {
  return (
    <section id="market" className="py-16 border-b border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="max-w-3xl mb-12">
          <div className="text-xs uppercase tracking-widest text-stone-500 mb-2 font-mono">
            الأبعاد الاقتصادية والاجتماعية
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-editorial font-bold text-stone-900 mb-3 text-wrap-balance">
            اقتصاد الدوبامين: كيف تفوقت الدراما القصيرة على السينما التقليدية؟
          </h2>
          <p className="text-stone-600 text-sm sm:text-base leading-relaxed">
            لم تعد الميكرو-دراما مجرد تسلية عابرة، بل تحولت إلى ظاهرة اقتصادية ضخمة بملايين الدولارات، أعادت هندسة عادات المشاهدة في الصين وبدأت بالتوسع عالمياً.
          </p>
        </div>

        {/* 4 Quantitative Rigor Metric Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {INDUSTRY_FACTS.map((item, idx) => (
            <div
              key={idx}
              className="bg-white border border-stone-200 rounded-xl p-6 shadow-xs flex flex-col justify-between"
            >
              <div>
                <span className="text-xs font-mono text-stone-400 block mb-1">
                  مؤشر السوق 0{idx + 1}
                </span>
                <div className="text-2xl lg:text-3xl font-bold font-editorial text-stone-900 font-mono-num mb-1">
                  {item.metric}
                </div>
                <div className="text-xs text-stone-500 font-mono mb-3">
                  {item.enMetric}
                </div>
                <h4 className="text-sm font-semibold text-stone-800 mb-2">
                  {item.label}
                </h4>
              </div>
              <p className="text-xs text-stone-600 leading-relaxed border-t border-stone-100 pt-3">
                {item.desc}
              </p>
            </div>
          ))}
        </div>

        {/* 2-Column Split: Visual & Media Analysis */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch mb-12">
          {/* Left Column: Image of Commuter on Subway */}
          <div className="lg:col-span-5 relative rounded-xl overflow-hidden bg-stone-100 border border-stone-200 flex flex-col">
            <img
              src="/src/assets/images/audience_phone_watching_1792830913484.jpg"
              alt="مشاهدة الميكرو-دراما أثناء التنقل في قطار الأنفاق"
              referrerPolicy="no-referrer"
              className="w-full h-72 sm:h-80 object-cover"
            />
            <div className="p-6 bg-white flex-1 flex flex-col justify-between">
              <div>
                <h4 className="text-lg font-bold font-editorial text-stone-900 mb-2">
                  هندسة المشاهدة: من السينما الأفقية إلى الرأسية
                </h4>
                <p className="text-xs sm:text-sm text-stone-600 leading-relaxed mb-4">
                  تم تصميم هذه الأعمال لتناسب الاستهلاك الفردي أثناء التنقل في المترو، وأوقات تناول الغداء، وقبل النوم. شاشة عمودية مقربة تركز على انفعالات الوجه السريعة دون لقطات تمهيدية طويلة.
                </p>
              </div>
              <div className="text-xs text-stone-500 font-mono pt-3 border-t border-stone-100">
                المصدر: تقرير مركز معلومات شبكة الإنترنت الصيني (CNNIC)
              </div>
            </div>
          </div>

          {/* Right Column: The 60-Second Dopamine Anatomy */}
          <div className="lg:col-span-7 bg-white border border-stone-200 rounded-xl p-6 sm:p-8 flex flex-col justify-between shadow-xs">
            <div>
              <div className="text-xs uppercase tracking-widest text-stone-400 font-mono mb-2">
                تشريح حلقة الميكرو-دراما النموذجية (60 ثانية)
              </div>
              <h3 className="text-xl font-editorial font-bold text-stone-900 mb-6">
                التركيبة الخوارزمية لانتزاع الدفع المالي
              </h3>

              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="w-12 text-xs font-mono font-bold text-amber-700 pt-0.5 shrink-0">
                    00 - 05 ث
                  </div>
                  <div className="flex-1 pb-3 border-b border-stone-100">
                    <strong className="text-stone-900 block text-sm font-semibold">
                      خطاف الصدمة الفوري (The Instant Hook)
                    </strong>
                    <span className="text-xs text-stone-600">
                      إهانة صاعقة، صفعة غير متوقعة، أو إعلان طرد فوري لمنع المشاهد من التمرير السريع.
                    </span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-12 text-xs font-mono font-bold text-amber-700 pt-0.5 shrink-0">
                    06 - 35 ث
                  </div>
                  <div className="flex-1 pb-3 border-b border-stone-100">
                    <strong className="text-stone-900 block text-sm font-semibold">
                      تصعيد الظلم واستفزاز التعاطف
                    </strong>
                    <span className="text-xs text-stone-600">
                      الشخصية الشريرة (حماة أو مدير متغطرس) تتجبر، بينما البطل المظلوم يكتم هويته السرية لزيادة التوتر.
                    </span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-12 text-xs font-mono font-bold text-amber-700 pt-0.5 shrink-0">
                    36 - 55 ث
                  </div>
                  <div className="flex-1 pb-3 border-b border-stone-100">
                    <strong className="text-stone-900 block text-sm font-semibold">
                      بداية رد الاعتبار (Cathartic Reversal)
                    </strong>
                    <span className="text-xs text-stone-600">
                      موكب من السيارات الفاخرة يصل فجأة، أو يرن هاتف المدير برقم رئيس مجلس الإدارة.
                    </span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-12 text-xs font-mono font-bold text-rose-700 pt-0.5 shrink-0">
                    56 - 60 ث
                  </div>
                  <div className="flex-1">
                    <strong className="text-rose-900 block text-sm font-semibold">
                      تجميد الشاشة وبوابة الدفع الإجبارية (Cliffhanger Trap)
                    </strong>
                    <span className="text-xs text-stone-600">
                      الشرير على وشك الركوع، فتتجمد الشاشة مطالبة بـ 9.9 يوان لمشاهدة الحلقة القادمة.
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-stone-100 flex items-center justify-between text-xs text-stone-500">
              <span>معدل الحلقات للمسلسل الواحد: 80 - 100 حلقة</span>
              <span className="font-mono-num font-semibold text-stone-800">متوسط تكلفة المسلسل الكامل: 150-300 يوان</span>
            </div>
          </div>
        </div>

        {/* Global Spread Highlight: ReelShort, DramaBox, and the Arab World */}
        <div className="bg-stone-50 border border-stone-200 rounded-xl p-6 sm:p-8">
          <div className="flex items-start gap-4">
            <Globe className="w-6 h-6 text-stone-800 shrink-0 mt-1" />
            <div>
              <h3 className="text-lg font-bold text-stone-900 mb-2">
                العولمة والتوسع: كيف وصلت "الميكرو-دراما" إلى أمريكا والشرق الأوسط؟
              </h3>
              <p className="text-xs sm:text-sm text-stone-700 leading-relaxed mb-4">
                قامت شركات صينية مثل COL Group عبر تطبيق <strong>ReelShort</strong> وتطبيق <strong>DramaBox</strong> بنقل هذا النموذج إلى لوس أنجلوس والقاهرة والرياض، عبر تصوير ممثلين محليين أمريكيين وعرب بنفس الحبكات الصينية المترجمة (الملياردير المتخفي، زواج المصلحة، والزوجة المظلومة)، مما حقق إيرادات تفوق 20 مليون دولار شهرياً خارج الصين.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs text-stone-600">
                <div className="bg-white p-3 rounded-lg border border-stone-200">
                  <span className="font-bold text-stone-900 block mb-1">الولايات المتحدة</span>
                  تصدر قوائم التنزيل في متجر App Store متفوقاً على تيك توك ونتفليكس في فترات ذروة الأعياد.
                </div>
                <div className="bg-white p-3 rounded-lg border border-stone-200">
                  <span className="font-bold text-stone-900 block mb-1">العالم العربي</span>
                  إطلاق منصات مخصصة بدبلجة وترجمة مع إنتاج مسلسلات عربية قصيرة في دبي والقاهرة.
                </div>
                <div className="bg-white p-3 rounded-lg border border-stone-200">
                  <span className="font-bold text-stone-900 block mb-1">المعادلة الاقتصادية</span>
                  عائد استثماري سريع جداً (خلال 48 ساعة من البث)، يعتمد على تسويق إعلانات فيسبوك وتيك توك.
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
