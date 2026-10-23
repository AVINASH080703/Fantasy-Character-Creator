import { Volume2, VolumeX, Users } from 'lucide-react';

interface TopNavProps {
  currentTab: 'creator' | 'classes' | 'roster' | 'lore';
  setCurrentTab: (tab: 'creator' | 'classes' | 'roster' | 'lore') => void;
  rosterCount: number;
  isMuted: boolean;
  setIsMuted: (muted: boolean) => void;
}

export function TopNav({
  currentTab,
  setCurrentTab,
  rosterCount,
  isMuted,
  setIsMuted,
}: TopNavProps) {
  return (
    <header className="sticky top-0 z-40 w-full border-b border-amber-800/40 bg-[#0d0907]/90 backdrop-blur-md shadow-lg shadow-black/60">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-8 px-4 sm:px-6 lg:px-8">
        {/* Zone 1: Single text element wordmark */}
        <a
          href="#creator"
          onClick={(e) => {
            e.preventDefault();
            setCurrentTab('creator');
          }}
          className="font-fantasy-name text-base sm:text-lg font-bold tracking-wider text-amber-300 hover:text-amber-200 transition-colors whitespace-nowrap shrink-0 flex items-center gap-2"
        >
          <span className="text-amber-500/70 text-sm">🜂</span>
          <span>Fantasy Character Creator</span>
        </a>

        {/* Zone 2: 4-5 concise single-line text links */}
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-slate-400">
          <button
            onClick={() => setCurrentTab('creator')}
            className={`transition-colors whitespace-nowrap shrink-0 hover:text-slate-100 ${
              currentTab === 'creator'
                ? 'text-amber-400 font-semibold underline underline-offset-8 decoration-amber-400/80 decoration-2'
                : 'text-slate-400'
            }`}
          >
            Creator
          </button>
          <button
            onClick={() => setCurrentTab('classes')}
            className={`transition-colors whitespace-nowrap shrink-0 hover:text-slate-100 ${
              currentTab === 'classes'
                ? 'text-amber-400 font-semibold underline underline-offset-8 decoration-amber-400/80 decoration-2'
                : 'text-slate-400'
            }`}
          >
            Classes
          </button>
          <button
            onClick={() => setCurrentTab('roster')}
            className={`flex items-center gap-1.5 transition-colors whitespace-nowrap shrink-0 hover:text-slate-100 ${
              currentTab === 'roster'
                ? 'text-amber-400 font-semibold underline underline-offset-8 decoration-amber-400/80 decoration-2'
                : 'text-slate-400'
            }`}
          >
            <span>My Deck</span>
            {rosterCount > 0 && (
              <span className="text-xs font-mono tabular-nums text-amber-300">
                ({rosterCount})
              </span>
            )}
          </button>
          <button
            onClick={() => setCurrentTab('lore')}
            className={`transition-colors whitespace-nowrap shrink-0 hover:text-slate-100 ${
              currentTab === 'lore'
                ? 'text-amber-400 font-semibold underline underline-offset-8 decoration-amber-400/80 decoration-2'
                : 'text-slate-400'
            }`}
          >
            Compendium
          </button>
        </nav>

        {/* Zone 3: 1 primary action */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            type="button"
            onClick={() => setIsMuted(!isMuted)}
            title={isMuted ? 'Unmute generation sound effects' : 'Mute generation sound effects'}
            className="flex h-9 w-9 items-center justify-center rounded-lg border border-slate-700/80 bg-slate-900/60 text-slate-300 hover:border-slate-600 hover:text-slate-100 transition-colors"
            aria-label={isMuted ? 'Unmute audio' : 'Mute audio'}
          >
            {isMuted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4 text-amber-400" />}
          </button>

          <button
            type="button"
            onClick={() => setCurrentTab('roster')}
            className="flex items-center gap-2 rounded-lg border border-amber-500/50 bg-gradient-to-r from-amber-600/30 to-amber-700/30 px-3.5 py-1.5 text-xs font-medium text-amber-300 hover:border-amber-400 hover:bg-amber-600/40 transition-colors whitespace-nowrap shrink-0 shadow-sm"
          >
            <Users className="h-3.5 w-3.5" />
            <span>My Deck</span>
            <span className="font-mono tabular-nums font-semibold">({rosterCount})</span>
          </button>
        </div>
      </div>

      {/* Mobile nav row */}
      <div className="flex md:hidden items-center justify-around border-t border-amber-900/50 bg-[#0d0907] px-4 py-2 text-xs font-medium text-slate-400">
        <button
          onClick={() => setCurrentTab('creator')}
          className={`py-1 ${currentTab === 'creator' ? 'text-amber-400 font-semibold' : ''}`}
        >
          Card Creator
        </button>
        <button
          onClick={() => setCurrentTab('classes')}
          className={`py-1 ${currentTab === 'classes' ? 'text-amber-400 font-semibold' : ''}`}
        >
          Classes
        </button>
        <button
          onClick={() => setCurrentTab('roster')}
          className={`py-1 ${currentTab === 'roster' ? 'text-amber-400 font-semibold' : ''}`}
        >
          My Deck ({rosterCount})
        </button>
        <button
          onClick={() => setCurrentTab('lore')}
          className={`py-1 ${currentTab === 'lore' ? 'text-amber-400 font-semibold' : ''}`}
        >
          Compendium
        </button>
      </div>
    </header>
  );
}
