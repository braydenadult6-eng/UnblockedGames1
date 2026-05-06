import React, { useState, useMemo } from 'react';
import { Search, Gamepad2, Globe, X, Maximize2, RotateCcw, ChevronLeft } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import gamesData from './data/games.json';

export default function App() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedGame, setSelectedGame] = useState(null);
  const [isExplorerMode, setIsExplorerMode] = useState(false);
  const [explorerUrl, setExplorerUrl] = useState('');
  const [activeUrl, setActiveUrl] = useState(null);

  const filteredGames = useMemo(() => {
    return gamesData.filter(game => 
      game.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      game.category.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [searchQuery]);

  const handleStartExplorer = (e) => {
    e.preventDefault();
    let url = explorerUrl.trim();
    if (url && !url.startsWith('http')) {
      url = `https://${url}`;
    }
    setActiveUrl(url);
  };

  return (
    <div className="min-h-screen bg-[#020617] text-slate-200 font-sans selection:bg-indigo-500/30 selection:text-white">
      {/* Cosmic Background */}
      <div className="nebula-glow" />

      {/* Navigation */}
      <header className="sticky top-0 z-40 border-b border-white/5 bg-slate-950/60 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between gap-4">
          <div 
            className="flex items-center gap-3 cursor-pointer group"
            onClick={() => {
              setSelectedGame(null);
              setIsExplorerMode(false);
              setActiveUrl(null);
            }}
          >
            <div className="p-2 bg-indigo-600 rounded-xl group-hover:scale-110 group-hover:rotate-6 transition-all shadow-[0_0_20px_rgba(79,70,229,0.4)]">
              <Gamepad2 size={24} className="text-white" />
            </div>
            <h1 className="text-2xl font-extrabold tracking-tighter font-display bg-gradient-to-br from-white via-indigo-200 to-indigo-400 bg-clip-text text-transparent">
              NOVA
            </h1>
          </div>

          <div className="flex-1 max-w-xl hidden md:flex items-center relative">
            <Search className="absolute left-4 text-slate-500" size={18} />
            <input
              type="text"
              placeholder="Explore games..."
              className="w-full glass-input rounded-2xl py-3 pl-12 pr-4 text-sm"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsExplorerMode(!isExplorerMode)}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold transition-all ${
                isExplorerMode 
                ? 'bg-white text-slate-950 shadow-[0_0_20px_rgba(255,255,255,0.2)]' 
                : 'bg-slate-900/50 hover:bg-slate-800 text-slate-300 border border-white/10'
              }`}
            >
              <Globe size={16} />
              <span className="hidden sm:inline">Explorer</span>
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-12 relative z-10">
        {isExplorerMode ? (
          <div className="flex flex-col gap-8 items-center max-w-4xl mx-auto">
            <div className="text-center space-y-3">
              <h2 className="text-4xl font-extrabold font-display tracking-tight text-white">Web Explorer</h2>
              <p className="text-slate-400 max-w-md mx-auto">Access unblocked tools and sites within the Nova ecosystem.</p>
            </div>
            
            <form onSubmit={handleStartExplorer} className="w-full relative flex items-center group">
              <input
                type="text"
                placeholder="Enter URL (google.com)"
                className="w-full glass-input rounded-3xl py-5 px-8 text-lg shadow-2xl"
                value={explorerUrl}
                onChange={(e) => setExplorerUrl(e.target.value)}
              />
              <button 
                type="submit"
                className="absolute right-3 px-8 py-3 bg-indigo-600 text-white font-bold rounded-2xl hover:bg-indigo-500 transition-all shadow-lg active:scale-95"
                id="search-proxy-btn"
              >
                Launch
              </button>
            </form>

            {activeUrl && (
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="w-full mt-4 h-[70vh] rounded-3xl border border-white/10 overflow-hidden bg-white shadow-2xl"
              >
                <div className="bg-slate-950 border-b border-white/10 p-3 flex items-center justify-between px-6">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                    <span className="text-xs text-slate-400 font-medium truncate max-w-[400px]">{activeUrl}</span>
                  </div>
                  <button onClick={() => setActiveUrl(null)} className="text-slate-500 hover:text-white transition-colors">
                    <X size={18} />
                  </button>
                </div>
                <iframe 
                  src={activeUrl} 
                  className="w-full h-full border-none"
                  referrerPolicy="no-referrer"
                />
              </motion.div>
            )}
          </div>
        ) : (
          <div className="space-y-12">
            <section className="flex flex-col gap-8">
              <div className="flex items-end justify-between border-b border-white/5 pb-6">
                <div className="space-y-1">
                  <h2 className="text-3xl font-extrabold font-display tracking-tight text-white">Trending Now</h2>
                  <p className="text-slate-500 text-sm">Curated unblocked games for maximum performance.</p>
                </div>
                <div className="bg-indigo-500/10 text-indigo-400 px-4 py-1.5 rounded-full text-xs font-bold border border-indigo-500/20">
                  {filteredGames.length} MODULES_READY
                </div>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                {filteredGames.map((game) => (
                  <motion.div
                    key={game.id}
                    layoutId={game.id}
                    onClick={() => setSelectedGame(game)}
                    className="group relative cursor-pointer glass-card rounded-[2rem] overflow-hidden hover:scale-[1.02] transition-all duration-300 hover:border-indigo-500/50"
                    id={`game-card-${game.id}`}
                  >
                    <div className="aspect-[16/10] overflow-hidden relative">
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-900 to-transparent opacity-60 z-10" />
                      <img 
                        src={game.thumbnail} 
                        alt={game.title}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                        referrerPolicy="no-referrer"
                      />
                      <div className="absolute top-4 left-4 z-20">
                        <span className="bg-white/10 backdrop-blur-md border border-white/10 text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                          {game.category}
                        </span>
                      </div>
                    </div>
                    <div className="p-6 relative z-20">
                      <h3 className="font-bold text-xl text-white mb-2 group-hover:text-indigo-400 transition-colors">{game.title}</h3>
                      <p className="text-sm text-slate-400 line-clamp-2 font-medium">{game.description}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </section>
          </div>
        )}
      </main>

      {/* Game Modal */}
      <AnimatePresence>
        {selectedGame && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-12 bg-slate-950/90 backdrop-blur-sm"
            id="game-modal"
          >
            <div className="relative w-full h-full flex flex-col glass-card rounded-[2.5rem] overflow-hidden shadow-[0_0_100px_rgba(0,0,0,0.5)]">
              {/* Toolbar */}
              <div className="flex items-center justify-between p-5 border-b border-white/10 shrink-0 bg-slate-950/40">
                <div className="flex items-center gap-4">
                  <button 
                    onClick={() => setSelectedGame(null)}
                    className="p-2 hover:bg-white/10 rounded-xl transition-all"
                  >
                    <ChevronLeft size={24} className="text-white" />
                  </button>
                  <div>
                    <h3 className="font-bold text-xl text-white leading-none font-display">{selectedGame.title}</h3>
                    <p className="text-xs text-slate-500 font-bold mt-1 uppercase tracking-widest">{selectedGame.category} &bull; FULL_ACCESS</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-3">
                  <button 
                    className="p-3 hover:bg-white/10 rounded-xl text-slate-400 hover:text-white transition-all"
                    onClick={() => {
                        const iframe = document.getElementById('game-frame');
                        if (iframe) iframe.src = iframe.src;
                    }}
                  >
                    <RotateCcw size={20} />
                  </button>
                  <button 
                    className="p-3 hover:bg-white/10 rounded-xl text-slate-400 hover:text-white transition-all"
                    onClick={() => {
                        const iframe = document.getElementById('game-frame');
                        if (iframe) iframe.requestFullscreen();
                    }}
                  >
                    <Maximize2 size={20} />
                  </button>
                  <button 
                    onClick={() => setSelectedGame(null)}
                    className="p-3 bg-red-500/10 text-red-400 hover:bg-red-500 hover:text-white rounded-xl transition-all ml-2"
                  >
                    <X size={20} />
                  </button>
                </div>
              </div>

              <div className="flex-1 w-full bg-black relative">
                <iframe
                  id="game-frame"
                  src={selectedGame.url}
                  className="w-full h-full border-none"
                  allowFullScreen
                  referrerPolicy="no-referrer"
                />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <footer className="max-w-7xl mx-auto px-6 py-12 border-t border-white/5 text-sm text-slate-500 flex flex-col md:flex-row justify-between items-center gap-4 text-center md:text-left">
        <div className="flex items-center gap-4">
          <Gamepad2 size={20} className="text-indigo-500/50" />
          <p>&copy; 2026 Nova Games Hub &bull; Powered by Antigravity</p>
        </div>
        <div className="flex items-center gap-6 font-medium">
          <span className="text-indigo-500/50">SECURE_TUNNEL: ACTIVE</span>
          <span className="text-slate-600">v1.2.0-NEBULA</span>
        </div>
      </footer>
    </div>
  );
}
