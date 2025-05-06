/*
  Warnings:

  - You are about to drop the column `result` on the `CurrentGameBet` table. All the data in the column will be lost.
  - Added the required column `assistBet` to the `Bet` table without a default value. This is not possible if the table is not empty.
  - Added the required column `deathBet` to the `Bet` table without a default value. This is not possible if the table is not empty.
  - Added the required column `killBet` to the `Bet` table without a default value. This is not possible if the table is not empty.
  - Added the required column `resultBet` to the `Bet` table without a default value. This is not possible if the table is not empty.
  - Added the required column `assistBet` to the `CurrentGameBet` table without a default value. This is not possible if the table is not empty.
  - Added the required column `deathBet` to the `CurrentGameBet` table without a default value. This is not possible if the table is not empty.
  - Added the required column `killBet` to the `CurrentGameBet` table without a default value. This is not possible if the table is not empty.
  - Added the required column `resultBet` to the `CurrentGameBet` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Bet" ADD COLUMN     "assistBet" TEXT NOT NULL,
ADD COLUMN     "deathBet" TEXT NOT NULL,
ADD COLUMN     "killBet" TEXT NOT NULL,
ADD COLUMN     "resultBet" BOOLEAN NOT NULL;

-- AlterTable
ALTER TABLE "CurrentGameBet" DROP COLUMN "result",
ADD COLUMN     "assistBet" TEXT NOT NULL,
ADD COLUMN     "deathBet" TEXT NOT NULL,
ADD COLUMN     "killBet" TEXT NOT NULL,
ADD COLUMN     "resultBet" BOOLEAN NOT NULL;
