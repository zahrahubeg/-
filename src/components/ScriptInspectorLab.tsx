import React, { useState } from 'react';
import { SCRIPT_PROTAGONISTS, SCRIPT_CONFLICTS, SCRIPT_CLIFFHANGERS, ScriptOption } from '../data/dossierData';
import { Sliders, AlertOctagon, CheckCircle, AlertTriangle, RefreshCw, FileSearch } from 'lucide-react';

interface AuditResult {
  score: number;
  status: 'rejected' | 'warning' | 'approved';
  verdictTitle: string;
  violations: string[];
  recommendations: string[];
  commercialRating: string;
}

export const ScriptInspectorLab: React.FC = () => {
  const [selectedProtagonist, setSelectedProtagonist] = useState<ScriptOption>(SCRIPT_PROTAGONISTS[0]);
  const [selectedConflict, setSelectedConflict] = useState<ScriptOption>(SCRIPT_CONFLICTS[0]);
  const [selectedCliffhanger, setSelectedCliffhanger] = useState<ScriptOption>(SCRIPT_CLIFFHANGERS[0]);
  const [auditResult, setAuditResult] = useState<AuditResult | null>(null);
  const [isAuditing, setIsAuditing] = useState(false);

  const runRegulatoryAudit = () => {
    setIsAuditing(true);
    setAuditResult(null);

    setTimeout(() => {
      const totalScore = selectedProtagonist.tropeScore + selectedConflict.tropeScore + selectedCliffhanger.tropeScore;
      const violations: string[] = [];

      if (selectedProtagonist.categoryViolated && !selectedProtagonist.categoryViolated.includes('لا توجد')) {
        violations.push(`عنصر الشخصية: ${selectedProtagonist.categoryViolated}`);
      }
      if (selectedConflict.categoryViolated && !selectedConflict.categoryViolated.includes('لا توجد')) {
        violations.push(`عنصر الصراع: ${selectedConflict.categoryViolated}`);
      }
      if (selectedCliffhanger.categoryViolated && !selectedCliffhanger.categoryViolated.includes('لا توجد')) {
        violations.push(`عنصر الخاتمة: ${selectedCliffhanger.categoryViolated}`);
      }

      let status: 'rejected' | 'warning' | 'approved' = 'approved';
      let verdictTitle = '';
      const recommendations: string[] = [];
      let commercialRating = '';

      if (totalScore >= 16) {
        status = 'rejected';
        verdictTitle = 'مرفوض كلياً من البث الرقمي (حظر مباشر بموجب لائحة 2026)';
        recommendations.push('حذف مشاهد استعراض الأموال النقدية والبطاقات الائتمانية كحل للنزاعات.');
        recommendations.push('إلغاء فخاخ الدفع الإجباري وتوفير 15 حلقة مجانية على الأقل للمشاهد.');
        recommendations.push('إعادة صياغة العلاقة بين البطلين لتكون قائمة على الاحترام المتبادل وليس الخضوع والاستبداد.');
        commercialRating = 'عالي الإدمان / خطر عقوبات وسحب ترخيص المنصة';
      } else if (totalScore >= 8) {
        status = 'warning';
        verdictTitle = 'معلق بانتظار تعديل النصوص والمشاهد الاستفزازية';
        recommendations.push('تخفيف حدة النزاع العائلي وإزالة مشاهد الإذلال اللفظي أو الجسدي.');
        recommendations.push('إظهار كفاح شخصي للشخصية المحورية بدلاً من الاعتماد المطلق على الثروة.');
        commercialRating = 'متوسط الخطورة / يحتاج تدقيق تحريري من الرقيب';
      } else {
        status = 'approved';
        verdictTitle = 'مرخص للبث الرقمي (متوافق مع توجيهات الرخاء المشترك)';
        recommendations.push('العمل يعزز قيمة العمل الشريف والتعاون الإنساني والمثابرة الأكاديمية والمهنية.');
        recommendations.push('نموذج متوازن يحترم وعي المشاهد ولا يعتمد على التضليل العاطفي.');
        commercialRating = 'منخفض الإثارة الرخيصة / مدعوم في المسابقات الثقافية الرسمية';
      }

      setAuditResult({
        score: totalScore,
        status,
        verdictTitle,
        violations,
        recommendations,
        commercialRating
      });
      setIsAuditing(false);
    }, 450);
  };

  const handleReset = () => {
    setSelectedProtagonist(SCRIPT_PROTAGONISTS[1]);
    setSelectedConflict(SCRIPT_CONFLICTS[2]);
    setSelectedCliffhanger(SCRIPT_CLIFFHANGERS[1]);
    setAuditResult(null);
  };

  return (
    <section id="simulator" className="py-16 bg-[#F7F4EE] border-b border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="text-xs uppercase tracking-widest text-stone-500 mb-2 font-mono">
            المحاكي التفاعلي للسيناريو
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-editorial font-bold text-stone-900 mb-3 text-wrap-balance">
            مختبر سيناريو الميكرو-دراما وفاحص معايير الرقابة
          </h2>
          <p className="text-stone-600 text-sm sm:text-base leading-relaxed">
            جرّب بناء حلقة درامية قصيرة مدتها 60 ثانية باختيار شخصياتك وصراعاتك، ثم افحص هل ستجتاز معايير الرقابة الصينية الجديدة لعام 2026 أم سيتم حظرها وسحب ترخيصها فوراً.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Controls Column */}
          <div className="lg:col-span-7 space-y-6">
            {/* Step 1: Protagonist */}
            <div className="bg-white p-5 rounded-xl border border-stone-200 shadow-xs">
              <label className="block text-sm font-bold text-stone-900 mb-2">
                1. حدد هوية البطل / الشخصية المحورية:
              </label>
              <div className="space-y-2">
                {SCRIPT_PROTAGONISTS.map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setSelectedProtagonist(item)}
                    className={`w-full text-right p-3 rounded-lg border text-xs sm:text-sm transition-all cursor-pointer ${
                      selectedProtagonist.id === item.id
                        ? 'border-stone-900 bg-stone-50 font-medium'
                        : 'border-stone-200 hover:border-stone-300 bg-white'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-stone-900 font-semibold">{item.label}</span>
                      <span className="font-mono text-xs text-stone-500">مؤشر الجرأة: {item.tropeScore}/10</span>
                    </div>
                    <p className="text-stone-600 text-xs">{item.description}</p>
                  </button>
                ))}
              </div>
            </div>

            {/* Step 2: Conflict */}
            <div className="bg-white p-5 rounded-xl border border-stone-200 shadow-xs">
              <label className="block text-sm font-bold text-stone-900 mb-2">
                2. ذروة الصراع في المشهد (لحظة الأدرينالين):
              </label>
              <div className="space-y-2">
                {SCRIPT_CONFLICTS.map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setSelectedConflict(item)}
                    className={`w-full text-right p-3 rounded-lg border text-xs sm:text-sm transition-all cursor-pointer ${
                      selectedConflict.id === item.id
                        ? 'border-stone-900 bg-stone-50 font-medium'
                        : 'border-stone-200 hover:border-stone-300 bg-white'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-stone-900 font-semibold">{item.label}</span>
                      <span className="font-mono text-xs text-stone-500">مؤشر الجرأة: {item.tropeScore}/10</span>
                    </div>
                    <p className="text-stone-600 text-xs">{item.description}</p>
                  </button>
                ))}
              </div>
            </div>

            {/* Step 3: Cliffhanger */}
            <div className="bg-white p-5 rounded-xl border border-stone-200 shadow-xs">
              <label className="block text-sm font-bold text-stone-900 mb-2">
                3. قفلة الحلقة واستراتيجية بوابة الدفع (عند الثانية 59):
              </label>
              <div className="space-y-2">
                {SCRIPT_CLIFFHANGERS.map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setSelectedCliffhanger(item)}
                    className={`w-full text-right p-3 rounded-lg border text-xs sm:text-sm transition-all cursor-pointer ${
                      selectedCliffhanger.id === item.id
                        ? 'border-stone-900 bg-stone-50 font-medium'
                        : 'border-stone-200 hover:border-stone-300 bg-white'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-stone-900 font-semibold">{item.label}</span>
                      <span className="font-mono text-xs text-stone-500">مؤشر الاستنزاف: {item.tropeScore}/10</span>
                    </div>
                    <p className="text-stone-600 text-xs">{item.description}</p>
                  </button>
                ))}
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={runRegulatoryAudit}
                disabled={isAuditing}
                className="flex-1 py-3 px-6 bg-stone-900 hover:bg-stone-800 text-white font-medium text-sm rounded-lg transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-sm"
              >
                <FileSearch className="w-4 h-4" />
                <span>{isAuditing ? 'جارِ فحص السيناريو بموجب اللائحة...' : 'فحص الامتثال الرقابي لعام 2026'}</span>
              </button>

              <button
                type="button"
                onClick={handleReset}
                className="py-3 px-4 bg-white border border-stone-300 hover:border-stone-400 text-stone-700 text-sm rounded-lg transition-colors cursor-pointer"
                title="إعادة تعيين إلى سيناريو معتدل"
              >
                <RefreshCw className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Inspection Report Card */}
          <div className="lg:col-span-5 bg-white border border-stone-200 rounded-xl p-6 shadow-sm sticky top-24">
            <div className="flex items-center justify-between pb-3 mb-4 border-b border-stone-100">
              <h3 className="text-base font-bold text-stone-900">
                تقرير فحص المحتوى الصادر عن الرقيب
              </h3>
              <span className="text-xs font-mono text-stone-400">
                معيار NRTA-2026-V8
              </span>
            </div>

            {auditResult ? (
              <div className="space-y-5 animate-in fade-in duration-300">
                {/* Status banner */}
                <div className={`p-4 rounded-lg border flex items-start gap-3 ${
                  auditResult.status === 'rejected'
                    ? 'bg-rose-50 border-rose-200 text-rose-950'
                    : auditResult.status === 'warning'
                    ? 'bg-amber-50 border-amber-200 text-amber-950'
                    : 'bg-emerald-50 border-emerald-200 text-emerald-950'
                }`}>
                  {auditResult.status === 'rejected' && <AlertOctagon className="w-5 h-5 text-rose-700 shrink-0 mt-0.5" />}
                  {auditResult.status === 'warning' && <AlertTriangle className="w-5 h-5 text-amber-700 shrink-0 mt-0.5" />}
                  {auditResult.status === 'approved' && <CheckCircle className="w-5 h-5 text-emerald-700 shrink-0 mt-0.5" />}
                  <div>
                    <h4 className="text-sm font-bold mb-1">{auditResult.verdictTitle}</h4>
                    <span className="text-xs font-mono opacity-80">
                      مجموع نقاط المخالفة: {auditResult.score} / 30
                    </span>
                  </div>
                </div>

                {/* Violations */}
                <div>
                  <h4 className="text-xs uppercase tracking-wider text-stone-500 font-bold mb-2">
                    المخالفات المكتشفة وفق الفئات الثمانية:
                  </h4>
                  {auditResult.violations.length > 0 ? (
                    <ul className="space-y-1.5 text-xs text-rose-900 bg-rose-50/50 p-3 rounded-lg border border-rose-100">
                      {auditResult.violations.map((v, i) => (
                        <li key={i} className="flex items-start gap-1.5">
                          <span className="text-rose-600 font-bold">•</span>
                          <span>{v}</span>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <div className="text-xs text-emerald-800 bg-emerald-50/50 p-3 rounded-lg border border-emerald-100">
                      لم يتم رصد أي حبكة مسيئة أو ترويج لعبادة المال أو استغلال الجمهور.
                    </div>
                  )}
                </div>

                {/* Recommendations */}
                <div>
                  <h4 className="text-xs uppercase tracking-wider text-stone-500 font-bold mb-2">
                    توجيهات الرقيب الإلزامية للمؤلف:
                  </h4>
                  <ul className="space-y-1.5 text-xs text-stone-700 bg-stone-50 p-3 rounded-lg border border-stone-200/80">
                    {auditResult.recommendations.map((rec, i) => (
                      <li key={i} className="flex items-start gap-1.5">
                        <span className="text-stone-400 font-mono">0{i + 1}</span>
                        <span>{rec}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Commercial risk */}
                <div className="pt-3 border-t border-stone-100 text-xs text-stone-500">
                  <span>التقييم التجاري والأمني للمنصة: </span>
                  <strong className="text-stone-900 block mt-0.5">{auditResult.commercialRating}</strong>
                </div>
              </div>
            ) : (
              <div className="text-center py-10 text-stone-400">
                <FileSearch className="w-10 h-10 mx-auto mb-3 opacity-40 text-stone-500" />
                <p className="text-xs sm:text-sm text-stone-500">
                  اختر عناصر السيناريو واضغط على زر "فحص الامتثال" لعرض تقرير الرقيب الرسمي.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
