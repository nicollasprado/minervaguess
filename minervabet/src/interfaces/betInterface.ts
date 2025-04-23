export const BetProperties = {
  kills: {
    average: 8,
    highMultiplier: 1.5,
    lowMultiplier: 1.3,
  },
  assists: {
    average: 10,
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
  receivedPoints: number;
  pastUserPoints: number;
  newUserPoints: number;
  result: boolean;
  resultBet: string;
  killBet: string;
  deathBet: string;
  assistBet: string;
  createdAt: Date;
  userId: string;
  gameId: string;
}

export interface CurrentGameBet {
  id: number;
  points: number;
  resultBet: string;
  killBet: string;
  deathBet: string;
  assistBet: string;
  totalMultipliers: number;
  createdAt: Date;
  userId: string;
  gameId: string;
}
