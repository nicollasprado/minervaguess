export interface Bet {
  id: string;
  points: number;
  result: boolean;
  resultBet: string;
  killBet: string;
  deathBet: string;
  assistBet: string;
  createdAt: Date;
  userId: string;
  gameId: string;
}

export interface User {
  id: string;
  username: string;
  email: string;
  points: number;
  bets: Bet[];
  createdAt: Date;
}

export interface ParsedBet {
  id: string;
  points: string;
  result: boolean;
  resultBet: boolean;
  killBet: string;
  deathBet: string;
  assistBet: string;
  createdAt: Date;
  userId: string;
  gameId: string;
}

export interface ParsedUser {
  id: string;
  username: string;
  email: string;
  points: string;
  bets: Bet[];
  createdAt: Date;
}
