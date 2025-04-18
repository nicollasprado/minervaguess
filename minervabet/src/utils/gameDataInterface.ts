export interface gamePerk {
  perkStyle: number;
  perkSubStyle: number;
  perkIds: number[];
}

export interface gameParticipant {
  puuid: string;
  teamId: number;
  riotId: string;
  spell1Id: number;
  spell2Id: number;
  championId: number;
  perks: gamePerk;
}

export interface gameData {
  gameId: number;
  gameQueueConfigId: number;
  participants: gameParticipant[];
}
