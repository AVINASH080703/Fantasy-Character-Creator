import { CharacterClassDetails, FantasyCharacter, FantasyClassName } from '../types/character';

// Predefined list of at least 10 creative fantasy names (includes prompt examples and lore-rich heroes)
export const PREDEFINED_FANTASY_NAMES: string[] = [
  'Aeloria Whisperwind',
  'Thorgar Ironbreaker',
  'Kaelen Shadowmend',
  'Morvath Nightweaver',
  'Lyra Sunstrider',
  'Zephyr Starfall',
  'Branok Deepdelver',
  'Sylas Frostvale',
  'Vespera Mooncaller',
  'Valerius Dawnseeker',
  'Faelyn Birchwhisper',
  'Garrick Stonegaze',
  'Elowen Emberveil',
  'Drakar Bloodthorn',
  'Caelum Runebound',
  'Seraphina Silverblade',
  'Baelor Stormcaller',
  'Xandria Voidwalker',
  'Rowan Wildheart',
  'Theron Ashwalker',
];

// Predefined 5 distinct classes with details and image paths
export const CLASS_DETAILS_MAP: Record<FantasyClassName, CharacterClassDetails> = {
  Warrior: {
    name: 'Warrior',
    title: 'The Vanguard of Iron',
    role: 'Frontline Combatant & Stalwart Defender',
    primaryStat: 'Strength',
    signatureAbility: 'Colossus Slam & Battle Trance',
    favoredWeapon: 'Rune-Forged Greatsword & Tower Shield',
    armorProficiency: 'Tempered Full Plate & Steel Chainmail',
    quote: 'Steel does not weep, and neither shall I when the battlefield roars.',
    imagePath: '/src/assets/images/fantasy_portrait_warrior_1792728561033.jpg',
    accentHex: '#f59e0b',
  },
  Mage: {
    name: 'Mage',
    title: 'The Arcanist of the Weave',
    role: 'Mystic Conjurer & Element Weaver',
    primaryStat: 'Intelligence',
    signatureAbility: 'Dimensional Rift & Prismatic Flare',
    favoredWeapon: 'Aether-Infused Crystal Staff & Ancient Grimoire',
    armorProficiency: 'Enchanted Silk Mantle & Runic Robes',
    quote: 'The fabric of the cosmos bends to those who comprehend its ancient script.',
    imagePath: '/src/assets/images/fantasy_portrait_mage_1792728577238.jpg',
    accentHex: '#a855f7',
  },
  Rogue: {
    name: 'Rogue',
    title: 'The Phantom of Shadows',
    role: 'Silent Infiltrator & Critical Striker',
    primaryStat: 'Dexterity',
    signatureAbility: 'Shadow Veil & Twin Lotus Flurry',
    favoredWeapon: 'Twin Serrated Daggers & Concealed Throwing Spikes',
    armorProficiency: 'Supple Chimera Leather & Midnight Cloak',
    quote: 'You will never see the strike that parts your thread of destiny.',
    imagePath: '/src/assets/images/fantasy_portrait_rogue_1792728577963.jpg',
    accentHex: '#06b6d4',
  },
  Paladin: {
    name: 'Paladin',
    title: 'The Beacon of the Sacred Dawn',
    role: 'Righteous Crusader & Divine Protector',
    primaryStat: 'Strength / Charisma',
    signatureAbility: 'Radiant Smite & Blessing of Dawn',
    favoredWeapon: 'Sun-Blessed Claymore & Aegis of Valor',
    armorProficiency: 'Gilded Ornate Plate with Sacred Talismans',
    quote: 'Where darkness encroaches, our blade shines with the fire of the sun.',
    imagePath: '/src/assets/images/fantasy_portrait_paladin_1792728578662.jpg',
    accentHex: '#eab308',
  },
  Ranger: {
    name: 'Ranger',
    title: 'The Warden of the Wild',
    role: 'Deadeye Marksman & Wild Tracker',
    primaryStat: 'Dexterity / Wisdom',
    signatureAbility: 'Gale-Force Volley & Forest Camouflage',
    favoredWeapon: 'Ancient Yew Recurve Bow & Hunter Hatchet',
    armorProficiency: 'Reinforced Woodland Hide & Camouflaged Cowl',
    quote: 'The forest whispers every intruder’s heartbeat long before they enter.',
    imagePath: '/src/assets/images/fantasy_portrait_ranger_1792728578895.jpg',
    accentHex: '#10b981',
  },
};

export const PREDEFINED_CLASSES: FantasyClassName[] = [
  'Warrior',
  'Mage',
  'Rogue',
  'Paladin',
  'Ranger',
];

export const ORIGIN_REALMS: string[] = [
  'Citadel of Elendar',
  'Iron Peak Mountain Forge',
  'Shadowfen of Umbra',
  'Whispering Glade of Avelorn',
  'Sunken Spires of Thalor',
  'Skyward Bastion of Solitude',
  'Ashen Coast of Valgard',
  'Mist-Veiled Ruins of Kel-Drak',
  'Golden Dunes of Qasr-Nur',
  'Frostpeak Glaciers of Niflheim',
];

export const CHARACTER_EPITHETS: string[] = [
  'The Unbroken',
  'Bane of the Wyrm',
  'Seeker of the Lost Dawn',
  'The Silver Shadow',
  'Warden of the Deep',
  'The Arcane Flame',
  'Ghost of the Old Wood',
  'The Iron Sovereign',
  'Voice of the Silent Sky',
  'Bearer of the Eclipse',
];

export const ALIGNMENTS: string[] = [
  'Lawful Good',
  'Neutral Good',
  'Chaotic Good',
  'Lawful Neutral',
  'True Neutral',
  'Chaotic Neutral',
];

// Helper to roll 3d6 + mod (range 10 - 18)
function rollAttribute(bonus = 0): number {
  const d6_1 = Math.floor(Math.random() * 6) + 1;
  const d6_2 = Math.floor(Math.random() * 6) + 1;
  const d6_3 = Math.floor(Math.random() * 6) + 1;
  return Math.min(18, Math.max(10, d6_1 + d6_2 + d6_3 + bonus));
}

export function generateRandomCharacter(preferredClass?: FantasyClassName | null): FantasyCharacter {
  // Randomly select Name from predefined list
  const nameIndex = Math.floor(Math.random() * PREDEFINED_FANTASY_NAMES.length);
  const name = PREDEFINED_FANTASY_NAMES[nameIndex];

  // Randomly select Class (or use preferred)
  const chosenClass = preferredClass || PREDEFINED_CLASSES[Math.floor(Math.random() * PREDEFINED_CLASSES.length)];
  const classDetails = CLASS_DETAILS_MAP[chosenClass];

  // Randomly select Epithet, Origin, Alignment
  const epithet = CHARACTER_EPITHETS[Math.floor(Math.random() * CHARACTER_EPITHETS.length)];
  const origin = ORIGIN_REALMS[Math.floor(Math.random() * ORIGIN_REALMS.length)];
  const alignment = ALIGNMENTS[Math.floor(Math.random() * ALIGNMENTS.length)];

  // Attribute allocation based on class strengths
  const stats = {
    str: rollAttribute(chosenClass === 'Warrior' || chosenClass === 'Paladin' ? 3 : 0),
    dex: rollAttribute(chosenClass === 'Rogue' || chosenClass === 'Ranger' ? 3 : 0),
    con: rollAttribute(chosenClass === 'Warrior' || chosenClass === 'Paladin' ? 2 : 0),
    int: rollAttribute(chosenClass === 'Mage' ? 4 : 0),
    wis: rollAttribute(chosenClass === 'Ranger' || chosenClass === 'Paladin' ? 2 : 0),
    cha: rollAttribute(chosenClass === 'Paladin' || chosenClass === 'Mage' ? 2 : 0),
  };

  const powerRating = Math.round(
    (stats.str + stats.dex + stats.con + stats.int + stats.wis + stats.cha) / 6 * 10
  );

  const bioSnippets: Record<FantasyClassName, string[]> = {
    Warrior: [
      'Trained in martial monasteries since youth, wielding heavy forged armaments with devastating precision.',
      'A decorated veteran of the Siege of Grimspire, bearing scars of battles that reshaped the kingdom.',
      'Sworn to an ancient pact of iron, standing as the vanguard barrier between civilization and chaos.',
    ],
    Mage: [
      'Scholar of forgotten celestial scrolls who deciphered runes long deemed hazardous to mortal minds.',
      'Exiled from the High Academies for conducting deep planar resonance experiments in search of the pure Weave.',
      'Channels cosmic constellations into physical matter, weaving barrier shields and localized temporal tears.',
    ],
    Rogue: [
      'A legendary shadow operative whose true face has never been recorded by guild registers or guard watches.',
      'Navigates trapped catacombs with effortless grace, retrieving forbidden artifacts from sealed crypts.',
      'Equally lethal in whispered court diplomacy as in nocturnal ambushes along foggy harbor docks.',
    ],
    Paladin: [
      'Chosen in an awakening of solar fire, carrying a sacred mandate to banish fiends and purge corruption.',
      'An anointed knight whose silver vows grant celestial fortitude against the darkest dark.',
      'Protector of the defenseless whose presence radiates an aura of clarity and restorative warmth.',
    ],
    Ranger: [
      'Guides expeditions through lethal thornlands, speaking the silent dialect of beasts and wind.',
      'Can strike a falling autumn leaf from three hundred paces amid torrential mountain squalls.',
      'Patrols the ancient perimeter stones where primeval wilderness meets the frontiers of mortal realm.',
    ],
  };

  const snippets = bioSnippets[chosenClass];
  const bioSnippet = snippets[Math.floor(Math.random() * snippets.length)];

  // Randomly generated combat stats: Health, Mana, and Strength
  const healthBonus = chosenClass === 'Warrior' ? 50 : chosenClass === 'Paladin' ? 40 : chosenClass === 'Ranger' ? 20 : chosenClass === 'Rogue' ? 10 : 0;
  const health = Math.floor(80 + Math.random() * 45 + healthBonus);

  const manaBonus = chosenClass === 'Mage' ? 90 : chosenClass === 'Paladin' ? 45 : chosenClass === 'Ranger' ? 25 : chosenClass === 'Rogue' ? 15 : 0;
  const mana = Math.floor(40 + Math.random() * 40 + manaBonus);

  const strBonus = chosenClass === 'Warrior' ? 35 : chosenClass === 'Paladin' ? 30 : chosenClass === 'Ranger' ? 15 : chosenClass === 'Rogue' ? 12 : 0;
  const strength = Math.floor(40 + Math.random() * 25 + strBonus);

  return {
    id: 'char-' + Date.now().toString(36) + '-' + Math.random().toString(36).substring(2, 6),
    name,
    className: chosenClass,
    classDetails,
    epithet,
    origin,
    stats,
    powerRating,
    alignment,
    bioSnippet,
    generatedAt: Date.now(),
    health,
    maxHealth: health,
    mana,
    maxMana: mana,
    strength,
  };
}

// Predefined Cartoon / Video Game Style Portraits for each class
export const CARTOON_PORTRAITS_MAP: Record<FantasyClassName, string[]> = {
  Warrior: [
    '/src/assets/images/cartoon_warrior_portrait_1792728903618.jpg',
    '/src/assets/images/cartoon_warrior_portrait_b_1792728926982.jpg',
  ],
  Mage: [
    '/src/assets/images/cartoon_mage_portrait_1792728903310.jpg',
    '/src/assets/images/cartoon_mage_portrait_b_1792728927489.jpg',
  ],
  Rogue: [
    '/src/assets/images/cartoon_rogue_portrait_1792728905074.jpg',
    '/src/assets/images/cartoon_rogue_portrait_b_1792728928954.jpg',
  ],
  Paladin: [
    '/src/assets/images/cartoon_paladin_portrait_1792728905325.jpg',
    '/src/assets/images/cartoon_paladin_portrait_b_1792728929356.jpg',
  ],
  Ranger: [
    '/src/assets/images/cartoon_ranger_portrait_1792728905476.jpg',
    '/src/assets/images/cartoon_ranger_portrait_b_1792728929411.jpg',
  ],
};

export function getCartoonPortrait(className: FantasyClassName, currentUrl?: string): string {
  const list = CARTOON_PORTRAITS_MAP[className] || [];
  if (list.length === 0) return '';
  if (!currentUrl) return list[0];
  const remaining = list.filter((url) => url !== currentUrl);
  if (remaining.length > 0) {
    return remaining[Math.floor(Math.random() * remaining.length)];
  }
  return list[Math.floor(Math.random() * list.length)];
}

/**
 * Generates a unique, one-to-two-sentence origin story for the character currently on screen.
 */
export function generateUniqueBackstory(
  character: {
    name: string;
    className: FantasyClassName;
    origin: string;
    epithet: string;
    classDetails: CharacterClassDetails;
  },
  currentBackstory?: string
): string {
  const { name, className, origin, epithet, classDetails } = character;
  const weapon = classDetails.favoredWeapon.split('&')[0].trim();
  const ability = classDetails.signatureAbility.split('&')[0].trim();

  // Class-specific rich 1-to-2 sentence origin stories
  const backstoryTemplates: Record<FantasyClassName, string[]> = {
    Warrior: [
      `Raised amid the iron smelters and siege-engines of ${origin}, ${name} earned the title "${epithet}" after single-handedly holding the shattered city gate against a horde of behemoths. Now bearing their trusty ${weapon}, they march across the realm upholding an ancient martial vow written in dragon's blood.`,
      `Born into an honorable warrior bloodline in ${origin}, ${name} mastered the devastating ${ability} during their brutal trials in the high colosseums. Today, their resolute blade defends the helpless wherever darkness and lawlessness threaten the realm.`,
      `A battle-tested veteran from ${origin}, ${name} survived catastrophic legion ambushes through unmatched tenacity and ferocious will. With their ${weapon} slung over their shoulder, they seek legendary champions worthy of testing their iron conviction.`,
      `Cast out from the warrior guild of ${origin} for sparing a captive foe, ${name} embraced the wandering life under the moniker "${epithet}". They now roam the frontiers, turning their battlefield prowess into salvation for remote frontier hamlets.`,
      `When the citadel of ${origin} fell to traitorous warlords, ${name} salvaged only their ancestral ${weapon} and an oath of retribution. Through countless skirmishes, they have proven that their shield and honor cannot be bent by mortal hands.`,
    ],
    Mage: [
      `While studying the forbidden celestial archives of ${origin}, ${name} accidentally deciphered the primordial cipher of the ${ability}, binding their soul to the cosmic Weave. Now recognized as "${epithet}", they traverse the world searching for ancient ley-lines to prevent an impending astral cataclysm.`,
      `Born with luminescent silver eyes in the mystic spires of ${origin}, ${name} was apprenticed to the Grand Arcanists before their seventh winter. Channeling primordial elements through their ${weapon}, they unravel esoteric mysteries that mortal scholars have long feared to utter.`,
      `Exiled from the high academies of ${origin} for dabbling in unorthodox temporal enchantments, ${name} forged their own path through the arcane wastes. Today, their mastery over the Weave allows them to bend reality and outwit the most cunning adversary.`,
      `Discovered meditating atop the highest wind-carved peak of ${origin}, ${name} heard the silent voice of the stars calling them toward a perilous destiny. They now wield their ${weapon} in service of cosmic equilibrium, extinguishing foul dimensional incursions wherever they awaken.`,
      `A prodigy of elemental alchemy from ${origin}, ${name} unlocked the secrets of the ${ability} after surviving a planar resonance chamber collapse. Their name is now whispered in reverent awe among sorcerous conclaves across the known kingdoms.`,
    ],
    Rogue: [
      `Raised in the labyrinthine underbelly and fog-drenched alleys of ${origin}, ${name} gained the epithet "${epithet}" after slipping into the high vault of the Guildmaster without triggering a single rune. With their concealed ${weapon} always primed, they navigate the razor's edge between underworld kingpin and silent protector.`,
      `Orphaned early in the shadow-draped district of ${origin}, ${name} survived by mastering acrobatic roof-running and the deadly ${ability}. Now answering to neither crown nor guild, they strike exclusively from the gloaming to strip tyrannical despots of their ill-gotten wealth.`,
      `Once the foremost royal phantom spy of ${origin}, ${name} broke their contract upon uncovering a conspiracy against the common people. Moving like smoke with their ${weapon}, they keep watch from the midnight rooftops to ensure true justice prevail.`,
      `Known throughout the taverns of ${origin} merely as a whisper, ${name} has turned deception into high art through flawless execution of the ${ability}. Every lock is an invitation, and every corrupt merchant’s strongbox is merely temporary custody.`,
      `Trained in an ancient catacomb order beneath ${origin}, ${name} emerged into the mortal realm with twin blades and eyes that pierce absolute dark. Though hunted by city watch and assassin syndicates alike, they remain forever two steps ahead in the shadows.`,
    ],
    Paladin: [
      `During a catastrophic night of blood and ruin in ${origin}, ${name} received a blazing solar revelation that marked them as "${epithet}". Girded in consecrated armor with their ${weapon} ablaze in holy wrath, they lead the charge against fiends and undead encroachers.`,
      `Sworn to the ancient Order of the Dawn atop the sacred hill of ${origin}, ${name} channel the restorative miracles of the ${ability} to mend the broken and purge corruption. Their very presence acts as a sanctuary of warmth amidst the encroaching chill of evil.`,
      `A former temple guardian from ${origin}, ${name} took up a vow of perpetual pilgrimage after witnessing a divine sign in the morning sky. Armed with their righteous ${weapon}, they stand as an immovable bulwark between innocent travelers and the horrors of the wilderness.`,
      `Anointed by the High Justiciars of ${origin} after demonstrating unbreakable moral fortitude during the Plague of Shadows, ${name} bears the mantle of "${epithet}". They believe that true strength lies not merely in smiting wickedness, but in lifting up those who have lost all hope.`,
      `Blessed by an angelic herald over the ruins of ${origin}, ${name} wields the radiant fury of the ${ability} to scatter demonic hordes. Wherever their banner is raised, evil retreats into the dark.`,
    ],
    Ranger: [
      `Raised by a pack of celestial dire-wolves in the primeval depths of ${origin}, ${name} learned to interpret the whispers of moss, wind, and river long before speaking civilized tongues. With their handcrafted ${weapon} and the lethal ${ability}, they patrol the uncharted frontier where civilization gives way to untamed wilderness.`,
      `Once the master boundary-tracker for the woodland realms of ${origin}, ${name} took to the roaming life when an unnatural blight began withering the sacred groves. Known simply as "${epithet}", they can track quarry across sheer rock faces and strike true in howling blizzards.`,
      `After guiding lost pilgrims safely through the lethal thorn-marshes of ${origin}, ${name} pledged their bow to the defense of ancient beast clans. Armed with their ${weapon}, they ensure that arrogant hunters and defilers never leave the forest alive.`,
      `Survivor of an ancient forest awakening in ${origin}, ${name} moves through dense underbrush without displacing a single dewdrop. Their mastery of the ${ability} makes them the undisputed guardian of the wild borders.`,
      `Born under a harvest moon in the frontier settlements of ${origin}, ${name} spent decades defending isolated logging outposts from ravenous shadow beasts. Now traveling under the name "${epithet}", their keen gaze pierces the thickest canopy to keep danger at bay.`,
    ],
  };

  const pool = backstoryTemplates[className] || [];
  const available = pool.filter((story) => story !== currentBackstory);
  const selected = available.length > 0 ? available[Math.floor(Math.random() * available.length)] : pool[0];

  return selected;
}


