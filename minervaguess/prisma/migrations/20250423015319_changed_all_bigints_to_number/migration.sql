/*
  Warnings:

  - You are about to alter the column `points` on the `Bet` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Integer`.
  - You are about to alter the column `points` on the `CurrentGameBet` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Integer`.
  - You are about to alter the column `points` on the `Users` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Integer`.

*/
-- AlterTable
ALTER TABLE "Bet" ALTER COLUMN "points" SET DATA TYPE INTEGER;

-- AlterTable
ALTER TABLE "CurrentGameBet" ALTER COLUMN "points" SET DATA TYPE INTEGER;

-- AlterTable
ALTER TABLE "Users" ALTER COLUMN "points" SET DATA TYPE INTEGER;
