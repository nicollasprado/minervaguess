export interface MinervaGame {
  gameId: string;
  kills: number;
  deaths: number;
  assists: number;
  kda: number;
  championName: string;
  highestKillStreak: number;
  result: boolean;
  date: Date;
}
