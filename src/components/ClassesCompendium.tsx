import { Shield, Sparkles, Zap, Award, Crosshair } from 'lucide-react';
import { CLASS_DETAILS_MAP, PREDEFINED_CLASSES } from '../data/fantasyData';
import { FantasyClassName } from '../types/character';

interface ClassesCompendiumProps {
  onGenerateWithClass: (className: FantasyClassName) => void;
}

export function ClassesCompendium({ onGenerateWithClass }: ClassesCompendiumProps) {
  const getClassIcon = (className: FantasyClassName) => {
    switch (className) {
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
    <div className="space-y-6">
      <div className="border-b border-amber-900/50 pb-4">
        <h2 className="font-fantasy-name text-2xl font-bold text-amber-100 flex items-center gap-2">
          <span>🜂</span>
          <span>The Five Archetypal Classes</span>
        </h2>
        <p className="mt-1 text-xs text-amber-200/70">
          Each distinct fantasy class possesses legendary arms, unique abilities, and combat specializations.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {PREDEFINED_CLASSES.map((clsName) => {
          const details = CLASS_DETAILS_MAP[clsName];
          return (
            <div
              key={clsName}
              className="flex flex-col justify-between overflow-hidden rounded-2xl border border-amber-900/60 alchemist-parchment-card transition-all hover:border-amber-600/50 hover:shadow-2xl"
            >
              <div>
                <div className="relative aspect-video w-full overflow-hidden bg-slate-950">
                  <img
                    src={details.imagePath}
                    alt={details.name}
                    referrerPolicy="no-referrer"
                    className="h-full w-full object-cover object-top"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#140e0a] via-transparent to-transparent" />
                  <div className="absolute bottom-3 left-4 flex items-center gap-2">
                    <div className="rounded-md bg-black/80 p-1.5 border border-amber-900/80 backdrop-blur-sm">
                      {getClassIcon(clsName)}
                    </div>
                    <div>
                      <h3 className="font-fantasy-name text-lg font-bold text-amber-100">
                        {details.name}
                      </h3>
                      <p className="text-[11px] text-amber-300/90 font-medium">
                        {details.title}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="p-5 space-y-4">
                  <p className="text-xs italic text-slate-400">
                    "{details.quote}"
                  </p>

                  <div className="space-y-2 text-xs border-t border-slate-800/80 pt-3">
                    <div className="flex justify-between">
                      <span className="text-slate-400">Role:</span>
                      <span className="font-medium text-slate-200 text-right">{details.role}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">Primary Stat:</span>
                      <span className="font-medium text-amber-300">{details.primaryStat}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">Favored Armament:</span>
                      <span className="font-medium text-slate-200 text-right">{details.favoredWeapon}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">Signature Ability:</span>
                      <span className="font-medium text-slate-200 text-right">{details.signatureAbility}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">Armor:</span>
                      <span className="font-medium text-slate-200 text-right">{details.armorProficiency}</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-5 pt-0">
                <button
                  type="button"
                  onClick={() => onGenerateWithClass(clsName)}
                  className="w-full rounded-lg border border-amber-500/40 bg-amber-600/10 py-2 text-xs font-semibold text-amber-300 hover:border-amber-400 hover:bg-amber-600/20 transition-colors"
                >
                  Generate {clsName}
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
