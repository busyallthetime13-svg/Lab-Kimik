import React, { useState, useMemo } from 'react';
import { Grade, Experiment } from './types';
import { experiments } from './data/experiments';
import GradeSelector from './components/GradeSelector';
import ExperimentCard from './components/ExperimentCard';
import ExperimentVideo from './components/ExperimentVideo';
import ExperimentGame from './components/ExperimentGame';
import ReactionLab from './components/ReactionLab';
import k11d1Video from './data/videoplayback.mp4';

const App: React.FC = () => {
  const [selectedGrade, setSelectedGrade] = useState<Grade>('all');
  const [activeExperimentId, setActiveExperimentId] = useState<string | null>(null);
  const [isGameOpen, setIsGameOpen] = useState(false);
  const [isReactionLabOpen, setIsReactionLabOpen] = useState(false);

  const filteredExperiments = useMemo(() => 
    selectedGrade === 'all' 
      ? experiments 
      : experiments.filter((exp) => exp.grade === selectedGrade), 
    [selectedGrade]
  );

  const activeExperiment = useMemo(
    () => experiments.find((exp) => exp.id === activeExperimentId),
    [activeExperimentId]
  );

  const getVideoSrcForExperiment = (experiment: Experiment): string | null => {
    if (!experiment.videoUrl) return null;

    // For now we only have a local file for k11-d1
    if (experiment.id === 'k11-d1') {
      return k11d1Video;
    }

    // Fallback: treat videoUrl as an absolute/remote URL
    return experiment.videoUrl;
  };

  const scrollToVideo = () => {
    const videoSection = document.getElementById('video-section');
    if (videoSection) {
      videoSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-white pb-20 font-sans selection:bg-orange-100 selection:text-orange-900">
      {/* Orange/Warm Header */}
      <nav className="bg-[#ea580c] text-white sticky top-0 z-50 py-4 shadow-md border-b border-orange-400/20">
        <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
          <div className="flex items-center space-x-3 cursor-pointer group" onClick={() => {setActiveExperimentId(null); setIsGameOpen(false); setIsReactionLabOpen(false);}}>
            <div className="w-10 h-10 border-2 border-white/40 rounded-xl flex items-center justify-center group-hover:bg-white group-hover:border-white transition-all duration-300">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white group-hover:text-orange-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
              </svg>
            </div>
            <span className="text-2xl font-bold tracking-tight uppercase">
              Laboratori Virtual Kimi
            </span>
          </div>
          
          <div className="hidden md:flex items-center space-x-2">
            <button 
              onClick={() => setIsReactionLabOpen(true)}
              className="flex items-center space-x-2 px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-lg font-bold text-sm transition-all duration-300 border border-slate-700 shadow-xl"
            >
              <svg className="w-4 h-4 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"/></svg>
              <span>Reaction Lab</span>
            </button>
            <button 
              onClick={() => {setActiveExperimentId(null); setIsGameOpen(false); setIsReactionLabOpen(false);}} 
              className="flex items-center space-x-2 px-4 py-2 bg-white/10 hover:bg-white text-white hover:text-orange-600 rounded-lg font-bold text-sm transition-all duration-300 border border-white/10"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"/></svg>
              <span>Të gjitha</span>
            </button>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-6">
        {!activeExperiment ? (
          <>
            <div className="py-24 text-center max-w-4xl mx-auto animate-in fade-in slide-in-from-top-4 duration-1000">
              <div className="inline-flex items-center space-x-2 px-4 py-2 bg-orange-50 text-orange-600 rounded-full text-[11px] font-black uppercase tracking-[0.2em] mb-10 border border-orange-100 shadow-sm">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"/></svg>
                <span>Programi Mësimor Virtual</span>
              </div>
              
              <h1 className="text-6xl md:text-7xl font-black text-slate-900 mb-10 leading-[1.05] tracking-tight">
                Eksploro Botën e <span className="text-orange-600">Kimisë</span> në Laborator
              </h1>
              
              <p className="text-slate-500 text-2xl leading-relaxed mb-16 max-w-3xl mx-auto font-medium opacity-80">
                Zbuloni të gjitha detyrat eksperimentale për klasat 10, 11 dhe 12 me udhëzime hap pas hapi.
              </p>
              
              <GradeSelector 
                selectedGrade={selectedGrade} 
                onGradeChange={setSelectedGrade} 
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 pb-32 animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-200">
              {filteredExperiments.map((exp) => (
                <ExperimentCard 
                  key={exp.id} 
                  experiment={exp} 
                  onClick={setActiveExperimentId} 
                />
              ))}
            </div>
          </>
        ) : (
          <div className="max-w-5xl mx-auto py-12 animate-in zoom-in-95 duration-500">
            <button 
              onClick={() => setActiveExperimentId(null)}
              className="flex items-center text-orange-400 hover:text-orange-600 transition-colors mb-10 font-bold text-[11px] uppercase tracking-[0.2em] group"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 group-hover:-translate-x-1 transition-transform" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
              </svg>
              Kthehu te portali
            </button>

            <div className="bg-white rounded-[2.5rem] shadow-2xl border border-slate-100 overflow-hidden">
              <div className="bg-gradient-to-br from-slate-900 to-orange-950 p-8 md:p-16 text-white relative">
                <div className="absolute -bottom-10 -right-10 opacity-10">
                  <svg className="w-64 h-64" fill="currentColor" viewBox="0 0 24 24"><path d="M19 15.21l-5-5V5h1V4H9v1h1v5.21l-5 5A2 2 0 006.83 19h10.34A2 2 0 0019 15.21z" /></svg>
                </div>
                <div className="relative z-10">
                  <div className="flex items-center space-x-3 mb-8">
                    <span className="px-4 py-1.5 bg-orange-700 rounded-xl text-[10px] font-black uppercase tracking-[0.2em]">Klasa {activeExperiment.grade}</span>
                    <span className="px-4 py-1.5 bg-white/10 backdrop-blur-md rounded-xl text-[10px] font-bold uppercase tracking-[0.2em]">{activeExperiment.category}</span>
                  </div>
                  <h2 className="text-4xl md:text-5xl font-bold mb-8 leading-[1.1] tracking-tight">{activeExperiment.title}</h2>
                  <div className="flex items-start max-w-3xl bg-white/5 p-6 rounded-[2rem] backdrop-blur-sm border border-white/10">
                    <div className="bg-yellow-600 p-3 rounded-2xl mr-5 shadow-lg shadow-red-90/30">
                      <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                    </div>
                    <div>
                      <h4 className="text-white-300 font-black text-[10px] uppercase mb-2 tracking-[0.2em]">Qëllimi</h4>
                      <p className="text-slate-100 text-xl font-semibold leading-relaxed opacity-90">{activeExperiment.goal}</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-12 md:p-20 space-y-20">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
                  <div className="lg:col-span-8 space-y-20">
                   <section>
                      <h3 className="text-2xl font-black text-slate-900 mb-6 flex items-center">
                        <span className="w-10 h-10 bg-red-100 text-red-700 rounded-xl flex items-center justify-center mr-4 text-lg font-black italic">T</span>
                        Baza Teorike
                      </h3>
                      <div className="text-lg text-slate-600 leading-relaxed bg-slate-50 p-8 rounded-[2rem] border border-slate-100 shadow-inner">
                        {activeExperiment.theory}
                      </div>
                    </section>

                     <section>
                      <h3 className="text-2xl font-black text-slate-900 mb-6 flex items-center">
                        <span className="w-10 h-10 bg-orange-100 text-orange-700 rounded-xl flex items-center justify-center mr-4 text-lg font-black italic">M</span>
                        Materialet dhe Reagentët
                      </h3>
                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                        {activeExperiment.materials.map((m, i) => (
                          <div key={i} className="bg-white border border-slate-200 p-4 rounded-2xl text-sm font-bold text-slate-700 shadow-sm flex items-center hover:border-orange-300 transition-colors">
                            <div className="w-3 h-3 bg-orange-500 rounded-full mr-3 shadow-sm"></div>
                            {m}
                          </div>
                        ))}
                      </div>
                    </section>
                  </div>

                  <aside className="lg:col-span-6 bg-orange-50/50 p-8 rounded-[2.5rem] border-2 border-orange-100/50 self-start">
                    <div className="flex items-center mb-6">
                      <div className="w-10 h-10 bg-orange-500 rounded-xl flex items-center justify-center mr-4 shadow-lg shadow-orange-500/20">
                        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
                      </div>
                      <h3 className="text-xl font-black text-orange-900">Rregullat e Sigurisë</h3>
                    </div>
                    <ul className="space-y-4">
                      {activeExperiment.safetyInfo.map((info, i) => (
                        <li key={i} className="text-sm text-orange-800 flex items-start font-medium leading-tight">
                          <span className="mr-3 mt-1 w-2 h-2 bg-orange-400 rounded-full flex-shrink-0"></span>
                          {info}
                        </li>
                      ))}
                    </ul>
                  </aside>
                </div>


                <hr className="border-slate-100" />

                <section>
                  <h3 className="text-3xl font-black text-slate-900 mb-10 text-center tracking-tight">Ecuria e Punës (Hapat)</h3>
                  <div className="space-y-8 max-w-4xl mx-auto">
                    {activeExperiment.steps.map((step, i) => (
                      <div key={i} className="group flex items-center bg-white p-6 rounded-[1.5rem] border border-slate-200 hover:border-orange-500 hover:shadow-xl transition-all duration-500">
                        <span className="flex-shrink-0 w-12 h-12 rounded-2xl bg-slate-100 group-hover:bg-orange-600 group-hover:text-white text-slate-900 flex items-center justify-center font-black text-lg mr-6 transition-all">
                          {i + 1}
                        </span>
                        <p className="text-slate-700 text-lg font-semibold tracking-tight leading-snug">{step}</p>
                      </div>
                    ))}
                  </div>
                </section>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-10 pt-10">
                  {activeExperiment.observation && (
                    <div className="bg-yellow-900 p-10 rounded-[3rem] text-white shadow-2xl relative overflow-hidden">
                      <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -mr-16 -mt-16"></div>
                      <h4 className="text-yellow-200 font-black uppercase text-xs tracking-widest mb-6">Vëzhgimi</h4>
                      <p className="text-indigo-50 text-xl leading-relaxed font-medium italic">"{activeExperiment.observation}"</p>
                    </div>
                   )}

                   
                  {activeExperiment.conclusion && (
                    <div className="bg-white p-10 rounded-[3rem] border-4 border-slate-900 shadow-xl">
                      <h4 className="text-slate-400 font-black uppercase text-xs tracking-widest mb-6">Perfundimi</h4>
                      <p className="text-slate-900 text-xl leading-relaxed font-bold">{activeExperiment.conclusion}</p>
                    </div>
                  )}
                </div>
              </div>

              {getVideoSrcForExperiment(activeExperiment) && (
                <div id="video-section">
                  <ExperimentVideo
                    title={activeExperiment.title}
                    videoUrl={getVideoSrcForExperiment(activeExperiment)!}
                  />
                </div>
              )}
            </div>
          </div>
        )}
      </main>

  
      {/* Modals */}
      {isGameOpen && activeExperiment && (
        <ExperimentGame 
          steps={activeExperiment.steps} 
          title={activeExperiment.title.includes(':') ? activeExperiment.title.split(': ')[1] : activeExperiment.title}
          onClose={() => setIsGameOpen(false)}
        />
      )}

      {isReactionLabOpen && (
        <ReactionLab onClose={() => setIsReactionLabOpen(false)} />
      )}

      <footer className="mt-40 py-24 border-t border-orange-100 bg-orange-50/10">
        <div className="max-w-7xl mx-auto px-6 text-center">
           <div className="inline-flex items-center space-x-3 bg-white px-8 py-3 rounded-3xl shadow-sm mb-10 border border-orange-100">
              <span className="w-2.5 h-2.5 bg-orange-600 rounded-full animate-pulse"></span>
              <span className="text-[10px] font-black text-orange-500 uppercase tracking-[0.2em]">Laboratori Virtual Shqiptar</span>
           </div>
           <p className="text-orange-400/60 text-lg font-bold">
             © 2026 Kimia Lab • Ekselencë në Edukim
           </p>
        </div>
      </footer>
    </div>
  );
};

export default App;
