import { PREDEFINED_FANTASY_NAMES, ORIGIN_REALMS, CHARACTER_EPITHETS } from '../data/fantasyData';

export function LoreCompendium() {
  return (
    <div className="space-y-8">
      <div className="border-b border-amber-900/50 pb-4">
        <h2 className="font-fantasy-name text-2xl font-bold text-amber-100 flex items-center gap-2">
          <span>🜂</span>
          <span>Compendium of Names & Realms</span>
        </h2>
        <p className="mt-1 text-xs text-amber-200/70">
          The chronicled lexicon of legendary names, sovereign realms, and ancient epithets inscribed upon the workbench.
        </p>
      </div>

      {/* Section 1: Predefined Fantasy Names */}
      <section className="space-y-4">
        <h3 className="font-fantasy-name text-lg font-bold text-amber-300">
          Chronicle of Predefined Fantasy Names ({PREDEFINED_FANTASY_NAMES.length})
        </h3>
        <p className="text-xs text-amber-200/60">
          Each name draws from classical high fantasy naming traditions—elven whispers, dwarven stone-tongue, runic bloodlines, and celestial marks.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
          {PREDEFINED_FANTASY_NAMES.map((name, idx) => (
            <div
              key={name}
              className="rounded-lg border border-amber-900/60 alchemist-parchment-card p-3 text-xs shadow-md"
            >
              <div className="flex items-center justify-between text-amber-400/70 font-mono text-[10px]">
                <span>No. {idx + 1 < 10 ? `0${idx + 1}` : idx + 1}</span>
                <span className="text-amber-400 font-semibold">Legendary</span>
              </div>
              <p className="mt-1 font-fantasy-name text-sm font-bold text-amber-100">
                {name}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Section 2: Origin Realms */}
      <section className="space-y-4">
        <h3 className="font-cinzel text-lg font-bold text-amber-300">
          Realms of Origin ({ORIGIN_REALMS.length})
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
          {ORIGIN_REALMS.map((realm) => (
            <div
              key={realm}
              className="rounded-lg border border-slate-800 bg-[#101622] p-3.5"
            >
              <h4 className="font-cinzel text-xs font-bold text-slate-200">{realm}</h4>
              <p className="mt-1 text-[11px] text-slate-400 leading-snug">
                Sovereign domain harboring ancient monasteries, arcane academies, or rugged borderlands.
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Section 3: Epithets */}
      <section className="space-y-4">
        <h3 className="font-cinzel text-lg font-bold text-amber-300">
          Honored Epithets ({CHARACTER_EPITHETS.length})
        </h3>
        <div className="flex flex-wrap gap-2 text-xs">
          {CHARACTER_EPITHETS.map((epithet) => (
            <div
              key={epithet}
              className="rounded-md border border-slate-800 bg-slate-900/50 px-3 py-1.5 font-cinzel text-slate-300"
            >
              « {epithet} »
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
