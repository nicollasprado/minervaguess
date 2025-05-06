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
  gameLength: number;
}

export interface FinishedGameParticipant {
  puuid: string;
  teamId: number;
  kills: number;
  assists: number;
  deaths: number;
  win: boolean;
  largestMultiKill: number;
  firstBloodKill: boolean;
  championName: string;
  challenges: {
    kda: number;
  };
}

export interface FinishedGameData {
  info: {
    participants: FinishedGameParticipant[];
  };
}
