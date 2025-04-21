export interface Bet {
  result: boolean;
  id: string;
  points: bigint;
  createdAt: Date;
  userId: string;
  gameId: string;
}

export interface User {
  id: string;
  username: string;
  email: string;
  points: bigint;
  bets: Bet[];
  createdAt: Date;
}

export interface ParsedBet {
  result: boolean;
  id: string;
  points: string;
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
