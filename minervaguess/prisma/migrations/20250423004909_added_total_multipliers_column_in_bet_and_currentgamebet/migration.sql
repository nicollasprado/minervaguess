/*
  Warnings:

  - Added the required column `totalMultipliers` to the `Bet` table without a default value. This is not possible if the table is not empty.
  - Added the required column `totalMultipliers` to the `CurrentGameBet` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Bet" ADD COLUMN     "totalMultipliers" DOUBLE PRECISION NOT NULL;

-- AlterTable
ALTER TABLE "CurrentGameBet" ADD COLUMN     "totalMultipliers" DOUBLE PRECISION NOT NULL;
