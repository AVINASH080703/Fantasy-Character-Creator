import { useState, useEffect } from 'react';
import {
  Sparkles,
  Dices,
  RotateCcw,
  Filter,
  History,
  Shield,
  Award,
  Zap,
  Crosshair,
  RefreshCw,
  Palette,
  Feather,
  Scroll,
  Bookmark,
  BookmarkCheck,
} from 'lucide-react';
import { FantasyCharacter, FantasyClassName } from './types/character';
import {
  generateRandomCharacter,
  PREDEFINED_CLASSES,
  getCartoonPortrait,
  generateUniqueBackstory,
} from './data/fantasyData';
import { playGenerateChime } from './utils/audio';
import { TopNav } from './components/TopNav';
import { CharacterCard } from './components/CharacterCard';
import { RosterView } from './components/RosterView';
import { ClassesCompendium } from './components/ClassesCompendium';
import { LoreCompendium } from './components/LoreCompendium';

export default function App() {
  const [currentCharacter, setCurrentCharacter] = useState<FantasyCharacter>(() =>
    generateRandomCharacter(null)
  );
  const [selectedClassFilter, setSelectedClassFilter] = useState<FantasyClassName | 'All'>('All');
  const [isGenerating, setIsGenerating] = useState<boolean>(false);
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const [currentTab, setCurrentTab] = useState<'creator' | 'classes' | 'roster' | 'lore'>('creator');

  // My Deck collection saved in localStorage
  const [deck, setDeck] = useState<FantasyCharacter[]>(() => {
    try {
      const saved =
        localStorage.getItem('my_deck_characters') ||
        localStorage.getItem('fantasy_character_roster');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Roll history for current session
  const [history, setHistory] = useState<FantasyCharacter[]>([currentCharacter]);

  // Sync deck to localStorage under both keys
  useEffect(() => {
    try {
      localStorage.setItem('my_deck_characters', JSON.stringify(deck));
      localStorage.setItem('fantasy_character_roster', JSON.stringify(deck));
    } catch {
      // Ignore localStorage errors
    }
  }, [deck]);

  // Primary action: Generate Character
  const handleGenerateCharacter = (forcedClass?: FantasyClassName) => {
    setIsGenerating(true);
    const targetClass = forcedClass || (selectedClassFilter === 'All' ? null : selectedClassFilter);
    const newChar = generateRandomCharacter(targetClass);

    playGenerateChime(isMuted);

    // Brief tactile transition
    setTimeout(() => {
      setCurrentCharacter(newChar);
      setHistory((prev) => [newChar, ...prev.slice(0, 7)]);
      setIsGenerating(false);
    }, 150);
  };

  const handleUpdateCharacter = (updated: FantasyCharacter) => {
    setCurrentCharacter(updated);
    setHistory((prev) =>
      prev.map((c) => (c.id === updated.id ? updated : c))
    );
    setDeck((prev) =>
      prev.map((c) => (c.id === updated.id ? updated : c))
    );
  };

  const handleGeneratePortrait = () => {
    const portraitUrl = getCartoonPortrait(currentCharacter.className);
    handleUpdateCharacter({
      ...currentCharacter,
      customPortraitUrl: portraitUrl,
      customPortraitStyle: 'cartoon',
    });
    playGenerateChime(isMuted);
  };

  const handleRegeneratePortrait = () => {
    const portraitUrl = getCartoonPortrait(
      currentCharacter.className,
      currentCharacter.customPortraitUrl
    );
    handleUpdateCharacter({
      ...currentCharacter,
      customPortraitUrl: portraitUrl,
      customPortraitStyle: 'cartoon',
    });
    playGenerateChime(isMuted);
  };

  const handleGenerateBackstory = () => {
    const currentStory = currentCharacter.backstory || currentCharacter.bioSnippet;
    const newBackstory = generateUniqueBackstory(currentCharacter, currentStory);
    handleUpdateCharacter({
      ...currentCharacter,
      backstory: newBackstory,
      bioSnippet: newBackstory,
    });
    playGenerateChime(isMuted);
  };

  const handleToggleDeck = (char: FantasyCharacter) => {
    setDeck((prev) => {
      const exists = prev.some((c) => c.id === char.id);
      if (exists) {
        return prev.filter((c) => c.id !== char.id);
      } else {
        return [char, ...prev];
      }
    });
  };

  const isCurrentCharacterInDeck = deck.some((c) => c.id === currentCharacter.id);

  const getClassBadgeIcon = (className: FantasyClassName) => {
    switch (className) {
      case 'Warrior':
        return <Shield className="h-3.5 w-3.5" />;
      case 'Mage':
        return <Sparkles className="h-3.5 w-3.5" />;
      case 'Rogue':
        return <Zap className="h-3.5 w-3.5" />;
      case 'Paladin':
        return <Award className="h-3.5 w-3.5" />;
      case 'Ranger':
        return <Crosshair className="h-3.5 w-3.5" />;
    }
  };

  return (
    <div className="min-h-screen alchemist-workbench-texture text-amber-50 flex flex-col font-body selection:bg-amber-600/40 selection:text-amber-100">
      {/* Top Navigation complying with Top Bar Contract */}
      <TopNav
        currentTab={currentTab}
        setCurrentTab={setCurrentTab}
        rosterCount={deck.length}
        isMuted={isMuted}
        setIsMuted={setIsMuted}
      />

      <main className="flex-1 mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 py-8 lg:py-10">
        {currentTab === 'creator' && (
          <div className="space-y-8">
            {/* Control Center & Prominent Action Button on Alchemist's Workbench */}
            <section className="flex flex-col items-center text-center max-w-3xl mx-auto space-y-6">
              <div>
                <p className="text-xs font-semibold uppercase tracking-widest text-amber-400/90 flex items-center justify-center gap-2">
                  <span>🜂</span> Ancient Alchemist's Workbench <span>🜄</span>
                </p>
                <h1 className="mt-2 font-fantasy-name text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-amber-100 drop-shadow-md text-balance">
                  Fantasy Character Creator
                </h1>
                <p className="mt-3 text-sm sm:text-base text-amber-200/70 max-w-xl mx-auto leading-relaxed">
                  Summon heroes of renown with creative names, legendary classes, combat proficiencies, and rolled attributes.
                </p>
              </div>

              {/* Class Filter Segmented Controls */}
              <div className="flex flex-wrap items-center justify-center gap-1.5 p-1.5 rounded-xl border border-amber-900/60 bg-[#140e0a]/90 text-xs shadow-lg backdrop-blur-sm">
                <span className="px-2 text-amber-300/80 font-medium flex items-center gap-1 text-[11px] uppercase tracking-wider">
                  <Filter className="h-3 w-3" /> Class:
                </span>
                <button
                  type="button"
                  onClick={() => setSelectedClassFilter('All')}
                  className={`px-3 py-1.5 rounded-lg font-medium transition-all ${
                    selectedClassFilter === 'All'
                      ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40 shadow-sm'
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  Any Class
                </button>
                {PREDEFINED_CLASSES.map((cls) => (
                  <button
                    key={cls}
                    type="button"
                    onClick={() => setSelectedClassFilter(cls)}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-medium transition-all ${
                      selectedClassFilter === cls
                        ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40 shadow-sm'
                        : 'text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    {getClassBadgeIcon(cls)}
                    <span>{cls}</span>
                  </button>
                ))}
              </div>

              {/* Prominent Button strictly labeled 'Generate Character' */}
              <div className="pt-2 flex flex-col items-center gap-3">
                <button
                  type="button"
                  onClick={() => handleGenerateCharacter()}
                  disabled={isGenerating}
                  className="group relative inline-flex items-center justify-center gap-3 overflow-hidden rounded-xl bg-gradient-to-r from-amber-500 via-amber-600 to-yellow-600 px-8 py-4 text-base font-bold text-slate-950 shadow-xl shadow-amber-900/30 transition-all duration-200 hover:scale-[1.02] hover:from-amber-400 hover:to-yellow-500 active:scale-[0.98] disabled:opacity-70 cursor-pointer"
                >
                  <Dices className={`h-5 w-5 text-slate-950 transition-transform ${isGenerating ? 'animate-spin' : 'group-hover:rotate-45'}`} />
                  <span className="font-cinzel tracking-wider text-lg">
                    Generate Character
                  </span>
                  <Sparkles className="h-4 w-4 text-slate-950/80" />
                </button>

                {/* Feature Controls: Portrait, Backstory, and Save to Deck */}
                <div className="flex flex-wrap items-center justify-center gap-2 rounded-xl border border-amber-600/40 bg-[#160f0b]/90 px-4 py-2.5 text-xs shadow-lg backdrop-blur-sm">
                  <span className="text-amber-300 font-semibold flex items-center gap-1.5 mr-1">
                    <Palette className="h-3.5 w-3.5 text-amber-400" />
                    <span>Actions:</span>
                  </span>

                  {/* Cartoon / Video Game Style Portrait Buttons */}
                  <button
                    type="button"
                    onClick={handleGeneratePortrait}
                    aria-label="Generate cartoon/video game style portrait"
                    className="flex items-center gap-1.5 rounded-lg border border-amber-500/50 bg-amber-500/20 px-3 py-1.5 font-semibold text-amber-200 hover:bg-amber-500/30 transition-all shadow-sm active:scale-95"
                  >
                    <Sparkles className="h-3 w-3 text-amber-300" />
                    <span>Generate Portrait</span>
                  </button>

                  <button
                    type="button"
                    onClick={handleRegeneratePortrait}
                    aria-label="Regenerate cartoon/video game style portrait"
                    className="flex items-center gap-1.5 rounded-lg border border-amber-800/60 bg-amber-950/40 px-3 py-1.5 font-semibold text-amber-100 hover:border-amber-600 hover:bg-amber-900/50 transition-all shadow-sm active:scale-95"
                  >
                    <RefreshCw className="h-3 w-3 text-amber-300" />
                    <span>Regenerate Portrait</span>
                  </button>

                  <span className="text-amber-700/60 hidden sm:inline">|</span>

                  {/* Prominent Button strictly labeled 'Generate Backstory' */}
                  <button
                    type="button"
                    onClick={handleGenerateBackstory}
                    aria-label="Generate Backstory"
                    className="flex items-center gap-1.5 rounded-lg border border-amber-500/60 bg-gradient-to-r from-amber-600/30 to-amber-700/30 px-3 py-1.5 font-semibold text-amber-200 hover:border-amber-400 hover:bg-amber-600/40 transition-all shadow-sm active:scale-95"
                  >
                    <Feather className="h-3 w-3 text-amber-300" />
                    <span>Generate Backstory</span>
                  </button>

                  <span className="text-amber-700/60 hidden sm:inline">|</span>

                  {/* Save to Deck Button */}
                  <button
                    type="button"
                    onClick={() => handleToggleDeck(currentCharacter)}
                    aria-label="Save to Deck"
                    className={`flex items-center gap-1.5 rounded-lg border px-3 py-1.5 font-semibold transition-all shadow-sm active:scale-95 ${
                      isCurrentCharacterInDeck
                        ? 'border-emerald-500/70 bg-emerald-950/50 text-emerald-300 hover:bg-emerald-900/50'
                        : 'border-amber-500/70 bg-gradient-to-r from-amber-600/40 to-amber-700/40 text-amber-200 hover:border-amber-400 hover:bg-amber-600/50'
                    }`}
                  >
                    {isCurrentCharacterInDeck ? (
                      <>
                        <BookmarkCheck className="h-3.5 w-3.5 text-emerald-400" />
                        <span>In My Deck</span>
                      </>
                    ) : (
                      <>
                        <Bookmark className="h-3.5 w-3.5 text-amber-300" />
                        <span>Save to Deck</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            </section>

            {/* Character Card Display */}
            <section className={`transition-opacity duration-200 ${isGenerating ? 'opacity-40' : 'opacity-100'}`}>
              <CharacterCard
                character={currentCharacter}
                isSaved={isCurrentCharacterInDeck}
                isInDeck={isCurrentCharacterInDeck}
                onToggleSave={handleToggleDeck}
                onToggleDeck={handleToggleDeck}
                onUpdateCharacter={handleUpdateCharacter}
              />
            </section>

            {/* Session History Strip */}
            {history.length > 1 && (
              <section className="space-y-3 pt-4 border-t border-amber-900/40">
                <div className="flex items-center justify-between text-xs text-amber-300/80">
                  <div className="flex items-center gap-1.5 font-semibold uppercase tracking-wider">
                    <History className="h-3.5 w-3.5 text-amber-400" />
                    <span>Recent Transmutations on Workbench</span>
                  </div>
                  <span className="font-mono tabular-nums">{history.length} summoned</span>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-2.5">
                  {history.map((hero) => {
                    const isSelected = hero.id === currentCharacter.id;
                    return (
                      <button
                        key={hero.id}
                        type="button"
                        onClick={() => setCurrentCharacter(hero)}
                        className={`flex flex-col items-start p-2.5 rounded-lg border text-left transition-all ${
                          isSelected
                            ? 'border-amber-400/80 bg-amber-900/30 shadow-md'
                            : 'border-amber-900/40 bg-[#140e0a]/80 hover:border-amber-700/60'
                        }`}
                      >
                        <span className="font-fantasy-name text-xs font-bold text-amber-100 truncate w-full">
                          {hero.name}
                        </span>
                        <span className="text-[11px] text-amber-400 font-medium">
                          {hero.className}
                        </span>
                        <span className="font-mono text-[10px] text-amber-200/60 tabular-nums">
                          PWR {hero.powerRating}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </section>
            )}
          </div>
        )}

        {currentTab === 'classes' && (
          <ClassesCompendium
            onGenerateWithClass={(cls) => {
              setSelectedClassFilter(cls);
              handleGenerateCharacter(cls);
              setCurrentTab('creator');
            }}
          />
        )}

        {currentTab === 'roster' && (
          <RosterView
            roster={deck}
            onRemove={(id) => setDeck((prev) => prev.filter((c) => c.id !== id))}
            onSelectCharacter={(char) => {
              setCurrentCharacter(char);
              setCurrentTab('creator');
            }}
            onGoToCreator={() => setCurrentTab('creator')}
            onClearRoster={() => setDeck([])}
          />
        )}

        {currentTab === 'lore' && <LoreCompendium />}
      </main>

      {/* Clean Footer adhering to design constitution */}
      <footer className="border-t border-amber-900/40 bg-[#080503]/95 py-6 text-xs text-amber-200/60">
        <div className="mx-auto flex max-w-7xl flex-col sm:flex-row items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
          <p className="font-medieval text-sm text-amber-300/80">
            Ancient Alchemist's Workbench · Predefined 20 Legendary Names & 5 Heroic Classes
          </p>
          <div className="flex items-center gap-4 text-amber-200/60 font-body">
            <span>Roll System: 3D6 Attribute Matrix</span>
            <span aria-hidden="true">·</span>
            <span>Client Persistent Party Roster</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
