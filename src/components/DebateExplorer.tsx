import React, { useState } from 'react';
import { INITIAL_ARGUMENTS, StanceArgument } from '../data/dossierData';
import { ThumbsUp, MessageSquarePlus, Filter, UserCheck, Shield, Sparkles } from 'lucide-react';

export const DebateExplorer: React.FC = () => {
  const [argumentsList, setArgumentsList] = useState<StanceArgument[]>(INITIAL_ARGUMENTS);
  const [filter, setFilter] = useState<'all' | 'support' | 'oppose' | 'moderate'>('all');
  const [upvotedIds, setUpvotedIds] = useState<string[]>([]);
  
  // New argument form state
  const [showForm, setShowForm] = useState(false);
  const [authorName, setAuthorName] = useState('');
  const [authorRole, setAuthorRole] = useState('');
  const [newStance, setNewStance] = useState<'support' | 'oppose' | 'moderate'>('support');
  const [newTitle, setNewTitle] = useState('');
  const [newContent, setNewContent] = useState('');

  const filteredArguments = argumentsList.filter((arg) => {
    if (filter === 'all') return true;
    return arg.stance === filter;
  });

  const handleUpvote = (id: string) => {
    if (upvotedIds.includes(id)) {
      setArgumentsList(argumentsList.map(a => a.id === id ? { ...a, upvotes: a.upvotes - 1 } : a));
      setUpvotedIds(upvotedIds.filter(i => i !== id));
    } else {
      setArgumentsList(argumentsList.map(a => a.id === id ? { ...a, upvotes: a.upvotes + 1 } : a));
      setUpvotedIds([...upvotedIds, id]);
    }
  };

  const handleAddArgument = (e: React.FormEvent) => {
    e.preventDefault();
    if (!authorName.trim() || !newTitle.trim() || !newContent.trim()) return;

    const newArg: StanceArgument = {
      id: `user-arg-${Date.now()}`,
      author: authorName.trim(),
      role: authorRole.trim() || 'مشارك في الحوار المجتمعي',
      avatarText: authorName.trim().slice(0, 2).toUpperCase(),
      stance: newStance,
      title: newTitle.trim(),
      content: newContent.trim(),
      upvotes: 1,
      timestamp: 'الآن',
      keyPoints: ['مساهمة من الحوار التفاعلي']
    };

    setArgumentsList([newArg, ...argumentsList]);
    setUpvotedIds([...upvotedIds, newArg.id]);

    // Reset
    setAuthorName('');
    setAuthorRole('');
    setNewTitle('');
    setNewContent('');
    setShowForm(false);
  };

  return (
    <section id="debate" className="py-16 border-b border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-6">
          <div>
            <div className="text-xs uppercase tracking-widest text-stone-500 mb-2 font-mono">
              المناظرة الفكرية والاجتماعية
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-editorial font-bold text-stone-900 mb-3 text-wrap-balance">
              حوار الرؤى: بين حماية القيم ووصاية الرقابة
            </h2>
            <p className="text-stone-600 text-sm sm:text-base max-w-2xl leading-relaxed">
              تتقاطع في هذه القضية أسئلة عميقة حول حدود دور الدولة في تشكيل الذوق العام، وحرية الترفيه في مجتمعات مضغوطة بالعمل، والتأثيرات الخفية لاقتصاد الدوبامين السريع.
            </p>
          </div>

          <div className="flex items-center gap-3">
            {/* Filter buttons */}
            <div className="flex items-center gap-1 p-1 bg-stone-100 rounded-lg border border-stone-200/80">
              <button
                onClick={() => setFilter('all')}
                className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors cursor-pointer ${
                  filter === 'all' ? 'bg-white text-stone-900 shadow-xs' : 'text-stone-600 hover:text-stone-900'
                }`}
              >
                الكل
              </button>
              <button
                onClick={() => setFilter('support')}
                className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors cursor-pointer ${
                  filter === 'support' ? 'bg-white text-emerald-800 shadow-xs' : 'text-stone-600 hover:text-stone-900'
                }`}
              >
                المؤيدون
              </button>
              <button
                onClick={() => setFilter('oppose')}
                className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors cursor-pointer ${
                  filter === 'oppose' ? 'bg-white text-rose-800 shadow-xs' : 'text-stone-600 hover:text-stone-900'
                }`}
              >
                المعارضون
              </button>
              <button
                onClick={() => setFilter('moderate')}
                className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors cursor-pointer ${
                  filter === 'moderate' ? 'bg-white text-amber-800 shadow-xs' : 'text-stone-600 hover:text-stone-900'
                }`}
              >
                المصلحون
              </button>
            </div>

            <button
              onClick={() => setShowForm(!showForm)}
              className="px-4 py-2 bg-stone-900 hover:bg-stone-800 text-white text-xs font-medium rounded-lg transition-colors flex items-center gap-1.5 cursor-pointer shadow-xs whitespace-nowrap shrink-0"
            >
              <MessageSquarePlus className="w-3.5 h-3.5" />
              <span>أضف رؤيتك</span>
            </button>
          </div>
        </div>

        {/* Add argument drawer form */}
        {showForm && (
          <form
            onSubmit={handleAddArgument}
            className="mb-10 bg-white border border-stone-300 rounded-xl p-6 sm:p-8 shadow-sm animate-in fade-in duration-200"
          >
            <h3 className="text-base font-bold text-stone-900 mb-4 pb-2 border-b border-stone-100">
              أضف تحليلك أو وجهة نظرك في المناظرة
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-4">
              <div>
                <label className="block text-xs font-bold text-stone-700 mb-1">الاسم أو اللقب:</label>
                <input
                  type="text"
                  required
                  value={authorName}
                  onChange={(e) => setAuthorName(e.target.value)}
                  placeholder="مثال: د. أحمد / باحث إعلامي"
                  className="w-full p-2.5 text-xs border border-stone-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-stone-800"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-stone-700 mb-1">الصفة أو التخصص:</label>
                <input
                  type="text"
                  value={authorRole}
                  onChange={(e) => setAuthorRole(e.target.value)}
                  placeholder="مثال: متابع للسينما الآسيوية"
                  className="w-full p-2.5 text-xs border border-stone-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-stone-800"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-stone-700 mb-1">طبيعة الموقف:</label>
                <select
                  value={newStance}
                  onChange={(e) => setNewStance(e.target.value as any)}
                  className="w-full p-2.5 text-xs border border-stone-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-stone-800 bg-white"
                >
                  <option value="support">مؤيد للإجراءات الرقابية الصينية</option>
                  <option value="oppose">معارض للرقابة ومدافع عن حرية الترفيه</option>
                  <option value="moderate">موقف وسيط: إصلاح مالي وتصنيف عمري</option>
                </select>
              </div>
            </div>

            <div className="mb-4">
              <label className="block text-xs font-bold text-stone-700 mb-1">عنوان الفكرة الأساسية:</label>
              <input
                type="text"
                required
                value={newTitle}
                onChange={(e) => setNewTitle(e.target.value)}
                placeholder="ضع عنواناً موجزاً لحجتك..."
                className="w-full p-2.5 text-xs border border-stone-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-stone-800"
              />
            </div>

            <div className="mb-4">
              <label className="block text-xs font-bold text-stone-700 mb-1">نص الحجة أو التحليل:</label>
              <textarea
                required
                rows={4}
                value={newContent}
                onChange={(e) => setNewContent(e.target.value)}
                placeholder="اشرح مبرراتك بالتفصيل، استند إلى تجارب واقعية أو حجج فكرية واقتصادية..."
                className="w-full p-2.5 text-xs border border-stone-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-stone-800"
              />
            </div>

            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                type="button"
                onClick={() => setShowForm(false)}
                className="px-4 py-2 text-xs font-medium text-stone-600 hover:text-stone-900 cursor-pointer"
              >
                إلغاء
              </button>
              <button
                type="submit"
                className="px-6 py-2 bg-stone-900 hover:bg-stone-800 text-white text-xs font-medium rounded-lg transition-colors cursor-pointer shadow-xs"
              >
                نشر الحجة في المرصد
              </button>
            </div>
          </form>
        )}

        {/* Arguments Stream */}
        <div className="space-y-6">
          {filteredArguments.map((arg) => {
            const isUpvoted = upvotedIds.includes(arg.id);
            return (
              <div
                key={arg.id}
                className="bg-white border border-stone-200 rounded-xl p-6 sm:p-8 shadow-xs hover:border-stone-300 transition-all"
              >
                {/* Author Lockup (No pill tags, clean text metadata) */}
                <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-stone-100 border border-stone-200 flex items-center justify-center text-xs font-mono font-bold text-stone-700 shrink-0">
                      {arg.avatarText}
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-stone-900">{arg.author}</h4>
                      <p className="text-xs text-stone-500">{arg.role}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 text-xs text-stone-500 font-mono">
                    <span className={
                      arg.stance === 'support'
                        ? 'text-emerald-700 font-bold'
                        : arg.stance === 'oppose'
                        ? 'text-rose-700 font-bold'
                        : 'text-amber-700 font-bold'
                    }>
                      {arg.stance === 'support' && 'مؤيد للإجراء'}
                      {arg.stance === 'oppose' && 'معارض للرقابة'}
                      {arg.stance === 'moderate' && 'موقف إصلاحي وسيط'}
                    </span>
                    <span aria-hidden="true">·</span>
                    <span>{arg.timestamp}</span>
                  </div>
                </div>

                {/* Argument Content */}
                <h3 className="text-lg sm:text-xl font-editorial font-bold text-stone-900 mb-3 leading-snug">
                  {arg.title}
                </h3>

                <p className="text-sm sm:text-base text-stone-700 leading-relaxed mb-6 font-sans">
                  {arg.content}
                </p>

                {/* Key takeaway points */}
                <div className="flex flex-wrap items-center gap-2 mb-6 text-xs text-stone-600">
                  <span className="font-semibold text-stone-800">النقاط المفصلية:</span>
                  {arg.keyPoints.map((kp, i) => (
                    <span key={i} className="bg-stone-100 text-stone-700 px-2.5 py-1 rounded text-xs">
                      {kp}
                    </span>
                  ))}
                </div>

                {/* Footer and Upvote interaction */}
                <div className="pt-4 border-t border-stone-100 flex items-center justify-between">
                  <button
                    onClick={() => handleUpvote(arg.id)}
                    className={`flex items-center gap-2 text-xs px-3 py-1.5 rounded-lg border transition-all cursor-pointer ${
                      isUpvoted
                        ? 'bg-stone-900 border-stone-900 text-white font-medium'
                        : 'border-stone-200 text-stone-700 hover:border-stone-400 bg-stone-50'
                    }`}
                  >
                    <ThumbsUp className="w-3.5 h-3.5" />
                    <span>تأييد هذه الرؤية</span>
                    <span className="font-mono-num font-bold">({arg.upvotes})</span>
                  </button>

                  <span className="text-xs text-stone-400 font-mono">
                    معرف الحوار: #{arg.id.slice(-4)}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
