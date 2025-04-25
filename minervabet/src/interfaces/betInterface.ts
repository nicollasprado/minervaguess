export const BetProperties = {
  kills: {
    average: 7,
    highMultiplier: 1.5,
    lowMultiplier: 1.3,
  },
  assists: {
    average: 8,
    highMultiplier: 1.4,
    lowMultiplier: 1.3,
  },
  deaths: {
    average: 5,
    highMultiplier: 1.4,
    lowMultiplier: 1.6,
  },
  exactMultiplier: 2,
};

export interface Bet {
  id: string;
  betPoints: number;
  totalMultipliers: number;
  receivedPoints: number | null;
  pastUserPoints: number | null;
  newUserPoints: number | null;
  result: boolean | null;
  resultBet: string;
  killBet: string;
  deathBet: string;
  assistBet: string;
  createdAt: Date;
  userId: string;
  gameId: string;
}
