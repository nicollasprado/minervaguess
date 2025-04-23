/*
  Warnings:

  - You are about to drop the column `points` on the `Bet` table. All the data in the column will be lost.
  - You are about to alter the column `points` on the `CurrentGameBet` table. The data in that column could be lost. The data in that column will be cast from `DoublePrecision` to `Integer`.
  - Added the required column `betPoints` to the `Bet` table without a default value. This is not possible if the table is not empty.
  - Added the required column `newUserPoints` to the `Bet` table without a default value. This is not possible if the table is not empty.
  - Added the required column `pastUserPoints` to the `Bet` table without a default value. This is not possible if the table is not empty.
  - Added the required column `receivedPoints` to the `Bet` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Bet" DROP COLUMN "points",
ADD COLUMN     "betPoints" INTEGER NOT NULL,
ADD COLUMN     "newUserPoints" INTEGER NOT NULL,
ADD COLUMN     "pastUserPoints" INTEGER NOT NULL,
ADD COLUMN     "receivedPoints" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "CurrentGameBet" ALTER COLUMN "points" SET DATA TYPE INTEGER;
