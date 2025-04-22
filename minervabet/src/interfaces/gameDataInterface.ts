export interface GamePerk {
  perkStyle: number;
  perkSubStyle: number;
  perkIds: number[];
}

export interface GameParticipant {
  puuid: string;
  teamId: number;
  riotId: string;
  spell1Id: number;
  spell2Id: number;
  championId: number;
  perks: GamePerk;
}

export interface GameData {
  gameId: number;
  gameQueueConfigId: number;
  participants: GameParticipant[];
}
