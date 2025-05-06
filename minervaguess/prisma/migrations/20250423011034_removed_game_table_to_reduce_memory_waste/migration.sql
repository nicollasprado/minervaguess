/*
  Warnings:

  - You are about to drop the `Game` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `GameParticipant` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Bet" DROP CONSTRAINT "Bet_gameId_fkey";

-- DropForeignKey
ALTER TABLE "GameParticipant" DROP CONSTRAINT "GameParticipant_gameId_fkey";

-- DropForeignKey
ALTER TABLE "MinervaGame" DROP CONSTRAINT "MinervaGame_gameId_fkey";

-- DropTable
DROP TABLE "Game";

-- DropTable
DROP TABLE "GameParticipant";

-- DropEnum
DROP TYPE "GameTeam";

-- DropEnum
DROP TYPE "RunePath";

-- DropEnum
DROP TYPE "Spell";
