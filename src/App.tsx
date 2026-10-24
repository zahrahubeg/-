/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Header } from './components/Header';
import { HeroInvestigation } from './components/HeroInvestigation';
import { InteractivePoll } from './components/InteractivePoll';
import { EightCategoriesGrid } from './components/EightCategoriesGrid';
import { ScriptInspectorLab } from './components/ScriptInspectorLab';
import { EconomicDataDossier } from './components/EconomicDataDossier';
import { DebateExplorer } from './components/DebateExplorer';
import { Footer } from './components/Footer';

export default function App() {
  const scrollToSection = (id: string) => {
    if (id === 'hero') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div className="min-h-screen bg-[#FBF9F5] text-stone-900 flex flex-col selection:bg-amber-100 selection:text-amber-900">
      {/* Top Bar Contract Compliant Navigation */}
      <Header onNavigate={scrollToSection} />

      {/* Main Content Sections */}
      <main className="flex-1">
        {/* Editorial Hero & Investigative Dossier */}
        <HeroInvestigation 
          onScrollToPoll={() => scrollToSection('poll')} 
          onExploreCategories={() => scrollToSection('categories')} 
        />

        {/* Central Question Poll: Do you support China's crackdown on micro-dramas? */}
        <InteractivePoll />

        {/* The 8 Banned Categories Dossier */}
        <EightCategoriesGrid />

        {/* Interactive Script & Regulatory Inspector Lab */}
        <ScriptInspectorLab />

        {/* Market Data & Economic Reality */}
        <EconomicDataDossier />

        {/* Balanced Debate & Community Argument Stream */}
        <DebateExplorer />
      </main>

      {/* Tasteful Editorial Footer */}
      <Footer onNavigate={scrollToSection} />
    </div>
  );
}
