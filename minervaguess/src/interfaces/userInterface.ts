import { Bet } from "./betInterface";

export interface User {
  id: string;
  username: string;
  email: string;
  points: number;
  bets: Bet[];
  createdAt: Date;
}
