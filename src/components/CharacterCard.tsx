import { useState } from 'react';
import {
  Shield,
  Sparkles,
  Zap,
  Bookmark,
  BookmarkCheck,
  Copy,
  Check,
  Crosshair,
  Flame,
  Award,
  Compass,
  RefreshCw,
  Palette,
  Image as ImageIcon,
  Scroll,
  Feather,
  Heart,
  Layers,
  Sword,
} from 'lucide-react';
import { FantasyCharacter } from '../types/character';
import { getCartoonPortrait, generateUniqueBackstory } from '../data/fantasyData';

interface CharacterCardProps {
  character: FantasyCharacter;
  isSaved?: boolean;
  isInDeck?: boolean;
  onToggleSave?: (character: FantasyCharacter) => void;
  onToggleDeck?: (character: FantasyCharacter) => void;
  onUpdateCharacter: (character: FantasyCharacter) => void;
}

export function CharacterCard({
  character,
  isSaved,
  isInDeck,
  onToggleSave,
  onToggleDeck,
  onUpdateCharacter,
}: CharacterCardProps) {
  const [imageError, setImageError] = useState(false);
  const [copied, setCopied] = useState(false);
  const [isGeneratingPortrait, setIsGeneratingPortrait] = useState(false);
  const [isGeneratingBackstory, setIsGeneratingBackstory] = useState(false);

  // Check if character is saved in My Deck
  const savedInDeck = isInDeck ?? isSaved ?? false;
  const handleToggle = () => {
    if (onToggleDeck) {
      onToggleDeck(character);
    } else if (onToggleSave) {
      onToggleSave(character);
    }
  };

  // Active portrait image: custom generated cartoon portrait or base class image
  const activePortraitUrl = character.customPortraitUrl || character.classDetails.imagePath;
  const isCartoonStyle = character.customPortraitStyle === 'cartoon';

  // Handler to Generate a cartoon / video game style portrait
  const handleGeneratePortrait = () => {
    setIsGeneratingPortrait(true);
    setImageError(false);

    setTimeout(() => {
      const newPortrait = getCartoonPortrait(character.className);
      onUpdateCharacter({
        ...character,
        customPortraitUrl: newPortrait,
        customPortraitStyle: 'cartoon',
      });
      setIsGeneratingPortrait(false);
    }, 250);
  };

  // Handler to Regenerate a cartoon / video game style portrait
  const handleRegeneratePortrait = () => {
    setIsGeneratingPortrait(true);
    setImageError(false);

    setTimeout(() => {
      const newPortrait = getCartoonPortrait(character.className, character.customPortraitUrl);
      onUpdateCharacter({
        ...character,
        customPortraitUrl: newPortrait,
        customPortraitStyle: 'cartoon',
      });
      setIsGeneratingPortrait(false);
    }, 250);
  };

  // Handler to reset back to classical concept art portrait
  const handleResetToConceptArt = () => {
    setImageError(false);
    onUpdateCharacter({
      ...character,
      customPortraitUrl: character.classDetails.imagePath,
      customPortraitStyle: 'concept',
    });
  };

  // Handler to Generate Backstory (unique 1-to-2 sentence origin story)
  const handleGenerateBackstory = () => {
    setIsGeneratingBackstory(true);
    setTimeout(() => {
      const currentStory = character.backstory || character.bioSnippet;
      const newBackstory = generateUniqueBackstory(character, currentStory);
      onUpdateCharacter({
        ...character,
        backstory: newBackstory,
        bioSnippet: newBackstory,
      });
      setIsGeneratingBackstory(false);
    }, 250);
  };

  const handleCopy = () => {
    const text = [
      `🎴 PLAYER CARD: ${character.name}`,
      `Class: ${character.className} (${character.classDetails.title})`,
      `Epithet: ${character.epithet}`,
      `Origin: ${character.origin}`,
      `Alignment: ${character.alignment}`,
      `❤️ Health: ${character.health}/${character.maxHealth}`,
      `🔷 Mana: ${character.mana}/${character.maxMana}`,
      `⚔️ Strength: ${character.strength}`,
      `Signature Ability: ${character.classDetails.signatureAbility}`,
      `Favored Weapon: ${character.classDetails.favoredWeapon}`,
      `Armor: ${character.classDetails.armorProficiency}`,
      `Attributes: STR ${character.stats.str} | DEX ${character.stats.dex} | CON ${character.stats.con} | INT ${character.stats.int} | WIS ${character.stats.wis} | CHA ${character.stats.cha}`,
      `Power Rating: ${character.powerRating}`,
      `Backstory: "${character.backstory || character.bioSnippet}"`,
    ].join('\n');

    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const getClassIcon = () => {
    switch (character.className) {
      case 'Warrior':
        return <Shield className="h-5 w-5 text-amber-400" />;
      case 'Mage':
        return <Sparkles className="h-5 w-5 text-purple-400" />;
      case 'Rogue':
        return <Zap className="h-5 w-5 text-cyan-400" />;
      case 'Paladin':
        return <Award className="h-5 w-5 text-yellow-300" />;
      case 'Ranger':
        return <Crosshair className="h-5 w-5 text-emerald-400" />;
    }
  };

  return (
    <div className="relative mx-auto max-w-4xl">
      {/* Full-Featured Bordered Player Card Container */}
      <article className="relative overflow-hidden rounded-3xl border-4 border-amber-600/70 alchemist-parchment-card p-6 sm:p-8 lg:p-10 shadow-[0_0_50px_rgba(217,119,6,0.2)] ring-2 ring-amber-400/30">
        {/* Ornate Card Filigree Inset Border */}
        <div className="pointer-events-none absolute inset-2 rounded-[22px] border border-amber-500/30" />

        {/* Ancient Alchemist Brass Corner Ornaments */}
        <div className="pointer-events-none absolute top-3 left-4 font-cinzel text-xs font-bold text-amber-500/70 select-none">
          ⌜ 🜂
        </div>
        <div className="pointer-events-none absolute top-3 right-4 font-cinzel text-xs font-bold text-amber-500/70 select-none">
          🜄 ⌝
        </div>
        <div className="pointer-events-none absolute bottom-3 left-4 font-cinzel text-xs font-bold text-amber-500/70 select-none">
          ⌞ 🜃
        </div>
        <div className="pointer-events-none absolute bottom-3 right-4 font-cinzel text-xs font-bold text-amber-500/70 select-none">
          🜁 ⌟
        </div>

        {/* Decorative ambient candle glow */}
        <div
          className="pointer-events-none absolute -top-32 left-1/2 h-64 w-full -translate-x-1/2 rounded-full blur-3xl opacity-20"
          style={{ backgroundColor: character.classDetails.accentHex }}
        />

        {/* Player Card Top Header Ribbon */}
        <div className="relative z-10 mb-6 flex flex-wrap items-center justify-between gap-3 border-b-2 border-amber-800/60 pb-3">
          <div className="flex items-center gap-2">
            <span className="rounded bg-amber-950/80 px-2.5 py-1 font-cinzel text-[11px] font-bold uppercase tracking-widest text-amber-300 border border-amber-700/50">
              Player Card · Legendary Champion
            </span>
            <span className="text-amber-500/60">✦</span>
            <span className="text-xs text-amber-200/80 font-medium">
              Level {Math.round(character.powerRating / 4)}
            </span>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1.5 rounded-lg border border-amber-600/50 bg-[#160e0a]/90 px-3 py-1 text-xs">
              <Flame className="h-3.5 w-3.5 text-amber-400" />
              <span className="text-[11px] uppercase tracking-wider text-amber-300/80">Power</span>
              <span className="font-mono text-sm font-bold text-amber-200 tabular-nums">
                {character.powerRating}
              </span>
            </div>

            {savedInDeck && (
              <span className="rounded-lg border border-emerald-500/60 bg-emerald-950/40 px-2.5 py-1 text-[11px] font-bold text-emerald-300">
                In My Deck
              </span>
            )}
          </div>
        </div>

        {/* Player Card Body Grid */}
        <div className="relative z-10 grid grid-cols-1 gap-8 lg:grid-cols-12 items-stretch">
          {/* Left Column: Framed Portrait, Portrait Studio & Deck Actions (5 cols) */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-4">
            {/* Framed Portrait Box */}
            <div className="relative aspect-square w-full overflow-hidden rounded-2xl border-2 border-amber-500/60 bg-slate-950 shadow-2xl group">
              {isGeneratingPortrait ? (
                <div className="flex h-full w-full flex-col items-center justify-center bg-gradient-to-br from-[#1c120c] via-[#2a1b12] to-[#120a06] p-6 text-center">
                  <RefreshCw className="h-8 w-8 animate-spin text-amber-400 mb-3" />
                  <p className="font-fantasy-name text-base font-bold text-amber-200">
                    Transmuting Portrait...
                  </p>
                  <p className="mt-1 text-xs text-amber-300/70">
                    Rendering cartoon video game style avatar
                  </p>
                </div>
              ) : !imageError ? (
                <img
                  key={activePortraitUrl}
                  src={activePortraitUrl}
                  alt={`${character.name} player card portrait`}
                  referrerPolicy="no-referrer"
                  onError={() => setImageError(true)}
                  className="h-full w-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
                />
              ) : (
                <div className="flex h-full w-full flex-col items-center justify-center bg-gradient-to-br from-slate-900 via-slate-800 to-amber-950/40 p-6 text-center">
                  <div className="mb-3 rounded-full border border-amber-400/40 bg-amber-900/30 p-4">
                    {getClassIcon()}
                  </div>
                  <p className="font-fantasy-name text-xl font-bold text-amber-200">
                    {character.className}
                  </p>
                  <p className="mt-1 text-xs text-slate-400">{character.classDetails.role}</p>
                </div>
              )}

              {/* Class Emblem Corner Overlay */}
              <div className="absolute top-3 right-3 flex items-center gap-1.5 rounded-lg border border-amber-600/70 bg-black/85 px-3 py-1.5 backdrop-blur-md shadow-md">
                {getClassIcon()}
                <span className="font-cinzel text-xs font-bold uppercase tracking-wider text-amber-200">
                  {character.className}
                </span>
              </div>

              {/* Portrait Style Badge Overlay */}
              <div className="absolute top-3 left-3 flex items-center gap-1.5 rounded-lg border border-amber-600/60 bg-black/85 px-2.5 py-1 backdrop-blur-md text-[11px] shadow-md">
                <Palette className="h-3 w-3 text-amber-400" />
                <span className="text-amber-200 font-medium">
                  {isCartoonStyle ? 'Cartoon Style' : 'Concept Art'}
                </span>
              </div>
            </div>

            {/* Portrait Studio: Cartoon / Video Game Style Buttons */}
            <div className="rounded-xl border border-amber-600/40 bg-[#160f0b]/90 p-3 space-y-2 shadow-inner">
              <div className="flex items-center justify-between text-xs font-bold text-amber-300">
                <span className="flex items-center gap-1.5">
                  <Sparkles className="h-3.5 w-3.5 text-amber-400" />
                  <span>Cartoon / Video Game Portrait</span>
                </span>
                {isCartoonStyle && (
                  <button
                    type="button"
                    onClick={handleResetToConceptArt}
                    className="text-[11px] text-amber-400/80 hover:text-amber-200 underline underline-offset-2 transition-colors"
                  >
                    Classic Art
                  </button>
                )}
              </div>

              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={handleGeneratePortrait}
                  disabled={isGeneratingPortrait}
                  aria-label="Generate cartoon/video game style portrait"
                  className="flex items-center justify-center gap-1.5 rounded-lg border border-amber-500/60 bg-gradient-to-r from-amber-600/30 to-amber-700/30 py-2 px-2.5 text-xs font-semibold text-amber-200 hover:bg-amber-600/40 transition-all shadow-sm active:scale-95 disabled:opacity-50"
                >
                  <Sparkles className="h-3.5 w-3.5 text-amber-300" />
                  <span>Generate Portrait</span>
                </button>

                <button
                  type="button"
                  onClick={handleRegeneratePortrait}
                  disabled={isGeneratingPortrait}
                  aria-label="Regenerate cartoon/video game style portrait"
                  className="flex items-center justify-center gap-1.5 rounded-lg border border-amber-800/60 bg-amber-950/40 py-2 px-2.5 text-xs font-semibold text-amber-100 hover:border-amber-600 hover:bg-amber-900/50 transition-all shadow-sm active:scale-95 disabled:opacity-50"
                >
                  <RefreshCw className={`h-3.5 w-3.5 text-amber-300 ${isGeneratingPortrait ? 'animate-spin' : ''}`} />
                  <span>Regenerate Portrait</span>
                </button>
              </div>
            </div>

            {/* Prominent Card Deck Action: Save to Deck */}
            <div className="flex items-center gap-3 pt-1">
              <button
                type="button"
                onClick={handleToggle}
                aria-label="Save to Deck"
                className={`flex-1 flex items-center justify-center gap-2 rounded-xl border-2 py-3 px-4 text-xs font-bold tracking-wide transition-all shadow-lg active:scale-95 cursor-pointer ${
                  savedInDeck
                    ? 'border-emerald-500/80 bg-gradient-to-r from-emerald-900/40 to-emerald-800/40 text-emerald-200 shadow-emerald-950/40'
                    : 'border-amber-500/70 bg-gradient-to-r from-amber-600/30 to-amber-700/30 text-amber-200 hover:border-amber-400 hover:bg-amber-600/40 shadow-amber-950/40'
                }`}
              >
                {savedInDeck ? (
                  <>
                    <BookmarkCheck className="h-4 w-4 text-emerald-400" />
                    <span>In My Deck (Saved)</span>
                  </>
                ) : (
                  <>
                    <Bookmark className="h-4 w-4 text-amber-300" />
                    <span>Save to Deck</span>
                  </>
                )}
              </button>

              <button
                type="button"
                onClick={handleCopy}
                className="flex items-center justify-center gap-1.5 rounded-xl border border-amber-800/60 bg-amber-950/30 px-4 py-3 text-xs font-semibold text-amber-200 hover:border-amber-600 hover:bg-amber-900/40 transition-colors shadow-sm"
                title="Copy player card details"
              >
                {copied ? (
                  <>
                    <Check className="h-4 w-4 text-emerald-400" />
                    <span>Copied</span>
                  </>
                ) : (
                  <>
                    <Copy className="h-4 w-4" />
                    <span>Copy Card</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Right Column: Name, Health/Mana/Strength, Backstory & Combat Stats (7 cols) */}
          <div className="lg:col-span-7 flex flex-col justify-between space-y-5">
            <div>
              {/* Unboxed Metadata Header */}
              <div className="flex flex-wrap items-center gap-2 text-xs text-amber-300/80 font-medium">
                <span className="text-amber-400 font-bold">{character.className}</span>
                <span aria-hidden="true">·</span>
                <span>{character.classDetails.title}</span>
                <span aria-hidden="true">·</span>
                <span className="flex items-center gap-1">
                  <Compass className="h-3 w-3 text-amber-400/60" />
                  {character.origin}
                </span>
                <span aria-hidden="true">·</span>
                <span>{character.alignment}</span>
              </div>

              {/* Character Name in Stylized Fantasy-Style Font */}
              <div className="relative mt-2">
                <h2 className="font-fantasy-name text-3xl sm:text-4xl lg:text-5xl font-black tracking-wide fantasy-name-engraved text-balance leading-tight py-1">
                  {character.name}
                </h2>
              </div>
              <p className="mt-1 font-medieval text-base sm:text-lg font-semibold tracking-wider text-amber-300/90">
                « {character.epithet} »
              </p>

              {/* Class Quote */}
              <blockquote className="mt-2.5 border-l-2 border-amber-500/50 pl-3 text-xs italic text-amber-200/60 leading-relaxed">
                "{character.classDetails.quote}"
              </blockquote>
            </div>

            {/* NEW: Prominently Displayed Randomly Generated Stats for Health, Mana, and Strength */}
            <div className="rounded-2xl border-2 border-amber-600/50 bg-[#160f0b]/90 p-4 shadow-xl">
              <div className="mb-2 flex items-center justify-between text-xs font-bold uppercase tracking-wider text-amber-300">
                <span className="flex items-center gap-1.5">
                  <Sword className="h-3.5 w-3.5 text-amber-400" />
                  <span>Primary Player Card Combat Stats</span>
                </span>
                <span className="font-mono text-[11px] text-amber-400/80">Active Vitals</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1">
                {/* Health Stat Meter */}
                <div className="rounded-xl border border-rose-800/60 bg-gradient-to-b from-rose-950/40 to-[#120707] p-3 shadow-inner">
                  <div className="flex items-center justify-between text-xs">
                    <span className="flex items-center gap-1.5 font-bold uppercase tracking-wider text-rose-400">
                      <Heart className="h-4 w-4 fill-rose-500 text-rose-500" />
                      <span>Health</span>
                    </span>
                    <span className="font-mono text-sm font-black text-rose-300 tabular-nums">
                      {character.health} <span className="text-[10px] text-rose-400/70">/ {character.maxHealth}</span>
                    </span>
                  </div>
                  {/* Gauge Bar */}
                  <div className="mt-2 h-2 w-full overflow-hidden rounded-full bg-rose-950/80 border border-rose-900/60">
                    <div
                      className="h-full rounded-full bg-gradient-to-r from-rose-600 to-rose-400 transition-all duration-500"
                      style={{ width: `${Math.min(100, Math.round((character.health / 200) * 100))}%` }}
                    />
                  </div>
                </div>

                {/* Mana Stat Meter */}
                <div className="rounded-xl border border-cyan-800/60 bg-gradient-to-b from-cyan-950/40 to-[#071116] p-3 shadow-inner">
                  <div className="flex items-center justify-between text-xs">
                    <span className="flex items-center gap-1.5 font-bold uppercase tracking-wider text-cyan-400">
                      <Zap className="h-4 w-4 fill-cyan-400 text-cyan-400" />
                      <span>Mana</span>
                    </span>
                    <span className="font-mono text-sm font-black text-cyan-300 tabular-nums">
                      {character.mana} <span className="text-[10px] text-cyan-400/70">/ {character.maxMana}</span>
                    </span>
                  </div>
                  {/* Gauge Bar */}
                  <div className="mt-2 h-2 w-full overflow-hidden rounded-full bg-cyan-950/80 border border-cyan-900/60">
                    <div
                      className="h-full rounded-full bg-gradient-to-r from-cyan-600 to-cyan-400 transition-all duration-500"
                      style={{ width: `${Math.min(100, Math.round((character.mana / 250) * 100))}%` }}
                    />
                  </div>
                </div>

                {/* Strength Stat Meter */}
                <div className="rounded-xl border border-amber-700/60 bg-gradient-to-b from-amber-950/40 to-[#160e08] p-3 shadow-inner">
                  <div className="flex items-center justify-between text-xs">
                    <span className="flex items-center gap-1.5 font-bold uppercase tracking-wider text-amber-400">
                      <Flame className="h-4 w-4 fill-amber-500 text-amber-500" />
                      <span>Strength</span>
                    </span>
                    <span className="font-mono text-sm font-black text-amber-300 tabular-nums">
                      {character.strength} <span className="text-[10px] text-amber-400/70">PTS</span>
                    </span>
                  </div>
                  {/* Gauge Bar */}
                  <div className="mt-2 h-2 w-full overflow-hidden rounded-full bg-amber-950/80 border border-amber-900/60">
                    <div
                      className="h-full rounded-full bg-gradient-to-r from-amber-600 to-amber-400 transition-all duration-500"
                      style={{ width: `${Math.min(100, Math.round((character.strength / 120) * 100))}%` }}
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Origin Story & Lore Section with Generate Backstory Button */}
            <div className="rounded-2xl border-2 border-amber-800/40 bg-[#160f0b]/85 p-4 shadow-inner space-y-2.5">
              <div className="flex flex-wrap items-center justify-between gap-2 border-b border-amber-900/40 pb-2">
                <span className="text-xs font-bold uppercase tracking-wider text-amber-300 flex items-center gap-1.5">
                  <Scroll className="h-3.5 w-3.5 text-amber-400" />
                  <span>Character Origin Story & Lore</span>
                </span>

                {/* Prominent Button strictly labeled 'Generate Backstory' */}
                <button
                  type="button"
                  onClick={handleGenerateBackstory}
                  disabled={isGeneratingBackstory}
                  aria-label="Generate unique origin backstory for character"
                  className="flex items-center gap-1.5 rounded-lg border border-amber-500/60 bg-gradient-to-r from-amber-600/30 to-amber-700/30 px-3 py-1.5 text-xs font-semibold text-amber-200 hover:border-amber-400 hover:bg-amber-600/40 transition-all shadow-sm active:scale-95 disabled:opacity-50 cursor-pointer"
                >
                  <Feather className={`h-3.5 w-3.5 text-amber-300 ${isGeneratingBackstory ? 'animate-bounce' : ''}`} />
                  <span>Generate Backstory</span>
                </button>
              </div>

              {isGeneratingBackstory ? (
                <div className="flex items-center gap-2 py-2 text-xs text-amber-300/80 animate-pulse font-serif italic">
                  <Scroll className="h-4 w-4 animate-spin text-amber-400" />
                  <span>Inscribing a unique origin story for {character.name}...</span>
                </div>
              ) : (
                <p className="text-sm leading-relaxed text-amber-100/90 font-serif italic">
                  "{character.backstory || character.bioSnippet}"
                </p>
              )}
            </div>

            {/* Armament & Combat Specs Strip */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 rounded-xl border border-amber-900/50 bg-[#120a06]/80 p-3 text-xs">
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-wider text-amber-400/80">
                  Favored Armament
                </p>
                <p className="mt-0.5 font-medium text-amber-100">
                  {character.classDetails.favoredWeapon}
                </p>
              </div>
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-wider text-amber-400/80">
                  Signature Ability
                </p>
                <p className="mt-0.5 font-medium text-amber-300">
                  {character.classDetails.signatureAbility}
                </p>
              </div>
            </div>

            {/* RPG Attributes Row (STR, DEX, CON, INT, WIS, CHA) */}
            <div>
              <div className="mb-2 flex items-center justify-between text-xs text-amber-300/70">
                <span className="font-semibold uppercase tracking-wider">
                  D20 Attributes Matrix
                </span>
                <span className="font-mono tabular-nums text-[11px]">
                  Roll Modifiers
                </span>
              </div>

              <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
                <StatBlock label="STR" value={character.stats.str} />
                <StatBlock label="DEX" value={character.stats.dex} />
                <StatBlock label="CON" value={character.stats.con} />
                <StatBlock label="INT" value={character.stats.int} />
                <StatBlock label="WIS" value={character.stats.wis} />
                <StatBlock label="CHA" value={character.stats.cha} />
              </div>
            </div>
          </div>
        </div>
      </article>
    </div>
  );
}

function StatBlock({ label, value }: { label: string; value: number }) {
  const isHigh = value >= 15;
  const modifier = Math.floor((value - 10) / 2);
  const modString = modifier >= 0 ? `+${modifier}` : `${modifier}`;

  return (
    <div
      className={`flex flex-col items-center justify-center rounded-lg border p-2 transition-colors ${
        isHigh
          ? 'border-amber-500/50 bg-amber-950/30 text-amber-300'
          : 'border-amber-900/40 bg-[#120a07]/80 text-amber-100/90'
      }`}
    >
      <span className="text-[10px] font-bold tracking-wider text-amber-400/70">{label}</span>
      <span className="font-mono text-base font-extrabold tabular-nums leading-tight">
        {value}
      </span>
      <span className="font-mono text-[10px] text-amber-400/60 tabular-nums">
        {modString}
      </span>
    </div>
  );
}
