export type FantasyClassName = 'Warrior' | 'Mage' | 'Rogue' | 'Paladin' | 'Ranger';

export interface CharacterStats {
  str: number;
  dex: number;
  con: number;
  int: number;
  wis: number;
  cha: number;
}

export interface CharacterClassDetails {
  name: FantasyClassName;
  title: string;
  role: string;
  primaryStat: string;
  signatureAbility: string;
  favoredWeapon: string;
  armorProficiency: string;
  quote: string;
  imagePath: string;
  accentHex: string;
}

export interface FantasyCharacter {
  id: string;
  name: string;
  className: FantasyClassName;
  classDetails: CharacterClassDetails;
  epithet: string;
  origin: string;
  stats: CharacterStats;
  powerRating: number;
  alignment: string;
  bioSnippet: string;
  generatedAt: number;
  customPortraitUrl?: string;
  customPortraitStyle?: 'cartoon' | 'concept';
  backstory?: string;
  health: number;
  maxHealth: number;
  mana: number;
  maxMana: number;
  strength: number;
}



