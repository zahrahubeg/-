import React, { useState, useEffect } from 'react';
import { CheckCircle2, ThumbsUp, MessageSquare, AlertCircle, BarChart3, HelpCircle } from 'lucide-react';

interface PollStats {
  support: number;
  oppose: number;
  moderate: number;
}

const STORAGE_KEY_VOTE = 'china_microdrama_user_vote';
const STORAGE_KEY_STATS = 'china_microdrama_poll_stats';

const INITIAL_STATS: PollStats = {
  support: 1742,
  oppose: 1318,
  moderate: 614,
};

const RATIONALE_OPTIONS = {
  support: [
    'حماية الشباب من التوقعات الزوجية الوهمية والسامة',
    'مكافحة ثقافة عبادة المال والاستهلاك المظهري',
    'إيقاف استنزاف كبار السن والقصر عبر بوابات الدفع الخفية',
    'تشجيع ثقافة الكدح والاعتماد على الذات بدلاً من الحظ',
    'الحفاظ على التماسك الأسري ومواجهة تفاقم العزوبية'
  ],
  oppose: [
    'حرية الإبداع والخيال الفني حق أصيل ولا يجوز تقييده',
    'المشاهدون يحتاجون إلى التنفيس بعد أيام العمل الطويلة والمرهقة',
    'وصاية أبوية مفرطة تقلل من وعي ونضج الجمهور البالغ',
    'الدراما القصيرة منتج تصديري وثقافي صيني ناجح عالمياً',
    'حظر المواضيع يخلق ركوداً ويدفع المنتجين للهروب خارج البلاد'
  ],
  moderate: [
    'فرض قيود مالية وسقف أعلى للدفع الرقمي دون حظر السيناريو',
    'تطبيق نظام تصنيف عمري صارم (18+ للمحتوى الجريء)',
    'إلزام المنصات بشفافية تسعير الحلقات وسياسة استرجاع الأموال',
    'دعم الأعمال الهادفة مالياً بدلاً من معاقبة السرد التجاري'
  ]
};

export const InteractivePoll: React.FC = () => {
  const [stats, setStats] = useState<PollStats>(INITIAL_STATS);
  const [selectedStance, setSelectedStance] = useState<'support' | 'oppose' | 'moderate' | null>(null);
  const [selectedRationales, setSelectedRationales] = useState<string[]>([]);
  const [userComment, setUserComment] = useState('');
  const [hasVoted, setHasVoted] = useState(false);
  const [submittedComment, setSubmittedComment] = useState<string | null>(null);

  useEffect(() => {
    const savedVote = localStorage.getItem(STORAGE_KEY_VOTE);
    const savedStats = localStorage.getItem(STORAGE_KEY_STATS);
    if (savedStats) {
      try {
        setStats(JSON.parse(savedStats));
      } catch (e) {
        console.error(e);
      }
    }
    if (savedVote) {
      try {
        const parsed = JSON.parse(savedVote);
        setSelectedStance(parsed.stance);
        setSelectedRationales(parsed.rationales || []);
        setSubmittedComment(parsed.comment || null);
        setHasVoted(true);
      } catch (e) {
        console.error(e);
      }
    }
  }, []);

  const totalVotes = stats.support + stats.oppose + stats.moderate;
  const supportPercent = Math.round((stats.support / totalVotes) * 100);
  const opposePercent = Math.round((stats.oppose / totalVotes) * 100);
  const moderatePercent = 100 - supportPercent - opposePercent;

  const handleSelectStance = (stance: 'support' | 'oppose' | 'moderate') => {
    setSelectedStance(stance);
    setSelectedRationales([]);
  };

  const handleToggleRationale = (rationale: string) => {
    if (selectedRationales.includes(rationale)) {
      setSelectedRationales(selectedRationales.filter(r => r !== rationale));
    } else {
      setSelectedRationales([...selectedRationales, rationale]);
    }
  };

  const handleCastVote = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedStance) return;

    const newStats = {
      ...stats,
      [selectedStance]: stats[selectedStance] + 1
    };

    setStats(newStats);
    setHasVoted(true);
    setSubmittedComment(userComment.trim() || null);

    const votePayload = {
      stance: selectedStance,
      rationales: selectedRationales,
      comment: userComment.trim() || null,
      timestamp: new Date().toISOString()
    };

    localStorage.setItem(STORAGE_KEY_VOTE, JSON.stringify(votePayload));
    localStorage.setItem(STORAGE_KEY_STATS, JSON.stringify(newStats));
  };

  const handleResetVote = () => {
    if (selectedStance) {
      const newStats = {
        ...stats,
        [selectedStance]: Math.max(0, stats[selectedStance] - 1)
      };
      setStats(newStats);
      localStorage.setItem(STORAGE_KEY_STATS, JSON.stringify(newStats));
    }
    localStorage.removeItem(STORAGE_KEY_VOTE);
    setHasVoted(false);
    setSelectedStance(null);
    setSelectedRationales([]);
    setUserComment('');
    setSubmittedComment(null);
  };

  return (
    <section id="poll" className="py-16 bg-white border-b border-stone-200">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-10">
          <div className="text-xs uppercase tracking-widest text-stone-500 mb-2 font-mono">
            الاستطلاع العام التفاعلي
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-editorial font-bold text-stone-900 mb-4 text-wrap-balance">
            فهل تؤيد إجراءات الصين ضد مسلسلات "الرئيس المتسلط" والثراء الفاحش؟
          </h2>
          <p className="text-stone-600 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
            تستهدف الجهات الرقابية هذه الأعمال بدعوى ترويج عبادة المال، والرومانسية الخيالية المشوهة، وفخاخ الدفع الإدمانية. عبّر عن موقفك وشارك أسبابك في الحوار المجتمعي.
          </p>
        </div>

        {/* Live Voting Results Bar */}
        <div className="bg-[#FBF9F5] border border-stone-200 rounded-xl p-6 mb-10 shadow-xs">
          <div className="flex items-center justify-between mb-3 text-xs sm:text-sm text-stone-600">
            <span className="font-semibold text-stone-900 flex items-center gap-1.5">
              <BarChart3 className="w-4 h-4 text-stone-700" />
              توزيع الأصوات المباشر ({totalVotes.toLocaleString('ar-EG')} مشارك)
            </span>
            <span className="font-mono-num text-xs text-stone-500">
              تحديث مباشر للمرصد
            </span>
          </div>

          {/* Segmented Percentage Bar */}
          <div className="h-4 w-full bg-stone-200 rounded-full overflow-hidden flex mb-4">
            <div
              style={{ width: `${supportPercent}%` }}
              className="bg-emerald-700 transition-all duration-700"
              title={`مؤيد: ${supportPercent}%`}
            />
            <div
              style={{ width: `${opposePercent}%` }}
              className="bg-rose-700 transition-all duration-700"
              title={`معارض: ${opposePercent}%`}
            />
            <div
              style={{ width: `${moderatePercent}%` }}
              className="bg-amber-600 transition-all duration-700"
              title={`موقف وسيط: ${moderatePercent}%`}
            />
          </div>

          {/* Legend and Numbers */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs sm:text-sm pt-2 border-t border-stone-200/60">
            <div className="flex items-center justify-between sm:justify-start sm:gap-2">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-xs bg-emerald-700 shrink-0" />
                <span className="text-stone-700 font-medium">نعم، أؤيد الإجراء</span>
              </div>
              <span className="font-mono-num font-bold text-stone-900">{supportPercent}%</span>
            </div>

            <div className="flex items-center justify-between sm:justify-start sm:gap-2">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-xs bg-rose-700 shrink-0" />
                <span className="text-stone-700 font-medium">لا، أرفض الرقابة</span>
              </div>
              <span className="font-mono-num font-bold text-stone-900">{opposePercent}%</span>
            </div>

            <div className="flex items-center justify-between sm:justify-start sm:gap-2">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-xs bg-amber-600 shrink-0" />
                <span className="text-stone-700 font-medium">إصلاح مالي وتقني فقط</span>
              </div>
              <span className="font-mono-num font-bold text-stone-900">{moderatePercent}%</span>
            </div>
          </div>
        </div>

        {/* Voting Form / Active Vote State */}
        {!hasVoted ? (
          <form onSubmit={handleCastVote} className="space-y-8">
            {/* Step 1: Choose Stance */}
            <div>
              <label className="block text-sm font-bold text-stone-900 mb-3">
                1. اختر موقفك الأساسي من الإجراء الرقابي:
              </label>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {/* Support Card */}
                <button
                  type="button"
                  onClick={() => handleSelectStance('support')}
                  className={`p-5 rounded-xl border text-right transition-all cursor-pointer ${
                    selectedStance === 'support'
                      ? 'border-emerald-700 bg-emerald-50/50 shadow-sm'
                      : 'border-stone-200 bg-white hover:border-stone-300'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-bold text-base text-stone-900">نعم، أؤيد الإجراء</span>
                    <span className={`w-4 h-4 rounded-full border flex items-center justify-center ${
                      selectedStance === 'support' ? 'border-emerald-700 bg-emerald-700 text-white' : 'border-stone-300'
                    }`}>
                      {selectedStance === 'support' && <span className="w-1.5 h-1.5 bg-white rounded-full" />}
                    </span>
                  </div>
                  <p className="text-xs text-stone-600 leading-relaxed">
                    لحماية الشباب من أوهام الثراء السريع، وصون التماسك الأسري، ومنع استغلال الجمهور عبر الخوارزميات الاحتيالية.
                  </p>
                </button>

                {/* Oppose Card */}
                <button
                  type="button"
                  onClick={() => handleSelectStance('oppose')}
                  className={`p-5 rounded-xl border text-right transition-all cursor-pointer ${
                    selectedStance === 'oppose'
                      ? 'border-rose-700 bg-rose-50/50 shadow-sm'
                      : 'border-stone-200 bg-white hover:border-stone-300'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-bold text-base text-stone-900">لا، أرفض الرقابة</span>
                    <span className={`w-4 h-4 rounded-full border flex items-center justify-center ${
                      selectedStance === 'oppose' ? 'border-rose-700 bg-rose-700 text-white' : 'border-stone-300'
                    }`}>
                      {selectedStance === 'oppose' && <span className="w-1.5 h-1.5 bg-white rounded-full" />}
                    </span>
                  </div>
                  <p className="text-xs text-stone-600 leading-relaxed">
                    لأن الجمهور البالغ يحق له اختيار ترفيهه كمتنفس بعد العمل، والتدخل الحكومي يخنق صناعة إبداعية سريعة النمو.
                  </p>
                </button>

                {/* Moderate Card */}
                <button
                  type="button"
                  onClick={() => handleSelectStance('moderate')}
                  className={`p-5 rounded-xl border text-right transition-all cursor-pointer ${
                    selectedStance === 'moderate'
                      ? 'border-amber-600 bg-amber-50/50 shadow-sm'
                      : 'border-stone-200 bg-white hover:border-stone-300'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-bold text-base text-stone-900">تنظيم اقتصادي فقط</span>
                    <span className={`w-4 h-4 rounded-full border flex items-center justify-center ${
                      selectedStance === 'moderate' ? 'border-amber-600 bg-amber-600 text-white' : 'border-stone-300'
                    }`}>
                      {selectedStance === 'moderate' && <span className="w-1.5 h-1.5 bg-white rounded-full" />}
                    </span>
                  </div>
                  <p className="text-xs text-stone-600 leading-relaxed">
                    ضبط بوابات الدفع وإلزام المنصات بالتصنيف العمري وحماية المستهلك، دون التدخل في الحبكات الرومانسية والسرد.
                  </p>
                </button>
              </div>
            </div>

            {/* Step 2: Choose Reasons (conditional on stance selection) */}
            {selectedStance && (
              <div className="bg-stone-50 border border-stone-200 rounded-xl p-5">
                <label className="block text-sm font-bold text-stone-900 mb-2">
                  2. ما هي أبرز الأسباب التي بنيت عليها موقفك؟ (يمكنك تحديد عدة خيارات)
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 mt-3">
                  {RATIONALE_OPTIONS[selectedStance].map((rationale, idx) => {
                    const isChecked = selectedRationales.includes(rationale);
                    return (
                      <button
                        type="button"
                        key={idx}
                        onClick={() => handleToggleRationale(rationale)}
                        className={`text-right p-3 rounded-lg border text-xs sm:text-sm transition-all flex items-start gap-2.5 cursor-pointer ${
                          isChecked
                            ? 'bg-white border-stone-800 text-stone-900 font-medium shadow-xs'
                            : 'bg-white/70 border-stone-200 text-stone-600 hover:border-stone-300'
                        }`}
                      >
                        <span className={`w-4 h-4 rounded border mt-0.5 shrink-0 flex items-center justify-center text-[10px] ${
                          isChecked ? 'bg-stone-900 border-stone-900 text-white' : 'border-stone-300'
                        }`}>
                          {isChecked && '✓'}
                        </span>
                        <span>{rationale}</span>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Step 3: Optional Comment */}
            {selectedStance && (
              <div>
                <label className="block text-sm font-bold text-stone-900 mb-2">
                  3. تعليقك أو وجهة نظرك الإضافية (اختياري):
                </label>
                <textarea
                  value={userComment}
                  onChange={(e) => setUserComment(e.target.value)}
                  placeholder="شارك تحليلك الشخصي لهذه الظاهرة الاجتماعية والاقتصادية..."
                  rows={3}
                  className="w-full p-3 text-sm border border-stone-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-stone-800 bg-white"
                />
              </div>
            )}

            {/* Submit Button */}
            <div className="flex items-center justify-between pt-2">
              <button
                type="submit"
                disabled={!selectedStance}
                className={`px-8 py-3 rounded-lg text-sm font-semibold transition-colors cursor-pointer ${
                  selectedStance
                    ? 'bg-stone-900 hover:bg-stone-800 text-white shadow-sm'
                    : 'bg-stone-200 text-stone-400 cursor-not-allowed'
                }`}
              >
                تأكيد وتسجيل صوتي
              </button>
              <span className="text-xs text-stone-500">
                صوتك يُحسب فوراً في نتائج المرصد المباشرة
              </span>
            </div>
          </form>
        ) : (
          /* Confirmation & User Stance Summary */
          <div className="bg-stone-50 border border-stone-300 rounded-xl p-6 sm:p-8">
            <div className="flex items-start gap-4">
              <CheckCircle2 className="w-6 h-6 text-emerald-700 shrink-0 mt-0.5" />
              <div className="flex-1">
                <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                  <h3 className="text-lg font-bold text-stone-900">
                    تم تسجيل مشاركتك بنجاح في المرصد
                  </h3>
                  <button
                    onClick={handleResetVote}
                    className="text-xs text-stone-500 hover:text-stone-800 underline cursor-pointer"
                  >
                    تعديل تصويتي
                  </button>
                </div>

                <div className="text-sm text-stone-700 mb-4">
                  موقفك المسجل:{' '}
                  <strong className="text-stone-900 font-bold">
                    {selectedStance === 'support' && 'نعم، أؤيد الإجراء الرقابي بحزم'}
                    {selectedStance === 'oppose' && 'لا، أرفض الرقابة وأدعم حرية الترفيه'}
                    {selectedStance === 'moderate' && 'موقف وسيط: تنظيم اقتصادي ورقابي دون مساس بالسرد'}
                  </strong>
                </div>

                {selectedRationales.length > 0 && (
                  <div className="mb-4">
                    <span className="text-xs text-stone-500 block mb-1.5 font-medium">
                      المبررات التي اخترتها:
                    </span>
                    <ul className="list-disc list-inside space-y-1 text-xs text-stone-600">
                      {selectedRationales.map((r, i) => (
                        <li key={i}>{r}</li>
                      ))}
                    </ul>
                  </div>
                )}

                {submittedComment && (
                  <div className="p-3 bg-white border border-stone-200 rounded-lg text-xs text-stone-700 italic">
                    «{submittedComment}»
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
