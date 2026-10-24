import React from 'react';

interface HeaderProps {
  onNavigate: (sectionId: string) => void;
}

export const Header: React.FC<HeaderProps> = ({ onNavigate }) => {
  return (
    <header className="sticky top-0 z-50 bg-[#FBF9F5]/95 backdrop-blur-md border-b border-stone-200/80 transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-8">
        {/* Zone 1: Brand wordmark (single element, no pills, no subtitle badges) */}
        <button 
          onClick={() => onNavigate('hero')}
          className="text-lg md:text-xl font-bold tracking-tight text-stone-900 hover:text-stone-700 transition-colors whitespace-nowrap shrink-0 text-right cursor-pointer"
        >
          مرصد الدراما الصينية
        </button>

        {/* Zone 2: 4-5 single-line text navigation links with hover underlines */}
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-stone-600">
          <button 
            onClick={() => onNavigate('investigation')} 
            className="hover:text-stone-950 transition-colors whitespace-nowrap shrink-0 cursor-pointer"
          >
            خلفية الحملة
          </button>
          <button 
            onClick={() => onNavigate('categories')} 
            className="hover:text-stone-950 transition-colors whitespace-nowrap shrink-0 cursor-pointer"
          >
            المحظورات الـ 8
          </button>
          <button 
            onClick={() => onNavigate('simulator')} 
            className="hover:text-stone-950 transition-colors whitespace-nowrap shrink-0 cursor-pointer"
          >
            مختبر السيناريو
          </button>
          <button 
            onClick={() => onNavigate('market')} 
            className="hover:text-stone-950 transition-colors whitespace-nowrap shrink-0 cursor-pointer"
          >
            أرقام الصناعة
          </button>
          <button 
            onClick={() => onNavigate('debate')} 
            className="hover:text-stone-950 transition-colors whitespace-nowrap shrink-0 cursor-pointer"
          >
            حوار الآراء
          </button>
        </nav>

        {/* Zone 3: 1 primary action */}
        <div className="flex items-center gap-3 shrink-0">
          <button 
            onClick={() => onNavigate('poll')}
            className="px-4 py-2 text-xs md:text-sm font-medium text-stone-100 bg-stone-900 rounded-lg hover:bg-stone-800 transition-colors whitespace-nowrap shrink-0 shadow-sm cursor-pointer"
          >
            شارك في الاستطلاع
          </button>
        </div>
      </div>
    </header>
  );
};
