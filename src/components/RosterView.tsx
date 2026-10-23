import { Trash2, Copy, Sparkles, UserPlus, Heart, Zap, Flame, Shield } from 'lucide-react';
import { FantasyCharacter } from '../types/character';

interface RosterViewProps {
  roster: FantasyCharacter[];
  onRemove: (id: string) => void;
  onSelectCharacter: (char: FantasyCharacter) => void;
  onGoToCreator: () => void;
  onClearRoster: () => void;
}

export function RosterView({
  roster,
  onRemove,
  onSelectCharacter,
  onGoToCreator,
  onClearRoster,
}: RosterViewProps) {
  const exportDeckJSON = () => {
    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(roster, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', dataStr);
    downloadAnchor.setAttribute('download', `my_deck_character_cards_${Date.now()}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-amber-900/50 pb-4">
        <div>
          <h2 className="font-fantasy-name text-2xl font-bold text-amber-100 flex items-center gap-2">
            <span>🜂</span>
            <span>My Deck ({roster.length} Cards)</span>
          </h2>
          <p className="mt-1 text-xs text-amber-200/70">
            Your collection of saved player cards featuring custom Health, Mana, Strength stats, and lore.
          </p>
        </div>

        <div className="flex items-center gap-3">
          {roster.length > 0 && (
            <>
              <button
                type="button"
                onClick={exportDeckJSON}
                className="flex items-center gap-1.5 rounded-lg border border-amber-800/60 bg-amber-950/40 px-3 py-1.5 text-xs font-medium text-amber-200 hover:border-amber-600 hover:bg-amber-900/50 transition-colors shadow-sm"
              >
                <Copy className="h-3.5 w-3.5" />
                <span>Export Deck</span>
              </button>
              <button
                type="button"
                onClick={onClearRoster}
                className="flex items-center gap-1.5 rounded-lg border border-red-900/60 bg-red-950/30 px-3 py-1.5 text-xs font-medium text-red-300 hover:bg-red-900/50 transition-colors shadow-sm"
              >
                <Trash2 className="h-3.5 w-3.5" />
                <span>Clear Deck</span>
              </button>
            </>
          )}

          <button
            type="button"
            onClick={onGoToCreator}
            className="flex items-center gap-1.5 rounded-lg border border-amber-500/50 bg-gradient-to-r from-amber-600/30 to-amber-700/30 px-3.5 py-1.5 text-xs font-medium text-amber-300 hover:border-amber-400 hover:bg-amber-600/40 transition-colors shadow-sm"
          >
            <UserPlus className="h-3.5 w-3.5" />
            <span>Generate New Card</span>
          </button>
        </div>
      </div>

      {roster.length === 0 ? (
        <div className="rounded-2xl border-2 border-dashed border-amber-900/40 p-12 text-center bg-[#120c08]/60 backdrop-blur-sm">
          <Sparkles className="mx-auto h-8 w-8 text-amber-500/60 mb-3" />
          <h3 className="font-fantasy-name text-lg font-bold text-amber-200">
            Your Deck is Empty
          </h3>
          <p className="mt-2 text-xs text-amber-200/60 max-w-md mx-auto">
            Use the Character Creator to forge unique heroes, then click "Save to Deck" to store them in your My Deck collection.
          </p>
          <button
            type="button"
            onClick={onGoToCreator}
            className="mt-6 rounded-lg bg-gradient-to-r from-amber-500 to-amber-600 px-5 py-2.5 text-xs font-bold text-slate-950 hover:from-amber-400 hover:to-amber-500 shadow-lg shadow-amber-900/40 transition-all cursor-pointer"
          >
            Go to Card Creator
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {roster.map((hero) => (
            <div
              key={hero.id}
              className="group relative flex flex-col justify-between rounded-xl border-2 border-amber-700/50 alchemist-parchment-card p-5 hover:border-amber-500/70 transition-all hover:shadow-2xl"
            >
              <div>
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <img
                      src={hero.customPortraitUrl || hero.classDetails.imagePath}
                      alt={hero.name}
                      referrerPolicy="no-referrer"
                      className="h-14 w-14 rounded-lg object-cover border-2 border-amber-600/60 shadow-md"
                    />
                    <div>
                      <h4 className="font-fantasy-name text-base font-bold text-amber-100 group-hover:text-amber-300 transition-colors">
                        {hero.name}
                      </h4>
                      <p className="text-xs text-amber-400/90 font-medium font-medieval">
                        {hero.className} · <span className="text-amber-200/60">{hero.origin}</span>
                      </p>
                      {hero.customPortraitStyle === 'cartoon' && (
                        <span className="text-[10px] text-cyan-400 font-medium">
                          Cartoon / Video Game Style
                        </span>
                      )}
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      onRemove(hero.id);
                    }}
                    title="Remove from My Deck"
                    className="rounded p-1.5 text-amber-400/60 hover:bg-red-950/60 hover:text-red-300 transition-colors"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>

                {/* Prominent Stats Strip: Health, Mana, and Strength */}
                <div className="mt-4 grid grid-cols-3 gap-2 rounded-lg border border-amber-900/60 bg-[#120b08]/80 p-2.5 text-center text-xs">
                  <div className="flex flex-col items-center">
                    <span className="flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider text-rose-400">
                      <Heart className="h-3 w-3 fill-rose-500 text-rose-500" /> HP
                    </span>
                    <span className="font-mono text-sm font-black text-rose-300 tabular-nums">
                      {hero.health}
                    </span>
                  </div>

                  <div className="flex flex-col items-center border-x border-amber-900/50">
                    <span className="flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider text-cyan-400">
                      <Zap className="h-3 w-3 fill-cyan-400 text-cyan-400" /> MP
                    </span>
                    <span className="font-mono text-sm font-black text-cyan-300 tabular-nums">
                      {hero.mana}
                    </span>
                  </div>

                  <div className="flex flex-col items-center">
                    <span className="flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider text-amber-400">
                      <Flame className="h-3 w-3 fill-amber-500 text-amber-500" /> STR
                    </span>
                    <span className="font-mono text-sm font-black text-amber-300 tabular-nums">
                      {hero.strength}
                    </span>
                  </div>
                </div>

                {/* Backstory Snippet */}
                <p className="mt-3 text-xs italic text-amber-200/70 line-clamp-2 font-serif">
                  "{hero.backstory || hero.bioSnippet}"
                </p>
              </div>

              <button
                type="button"
                onClick={() => onSelectCharacter(hero)}
                className="mt-4 w-full rounded-lg border border-amber-600/40 bg-amber-600/10 py-2 text-xs font-semibold text-amber-200 hover:border-amber-400 hover:bg-amber-600/20 transition-colors shadow-sm"
              >
                View Player Card
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
