/*
  Warnings:

  - You are about to drop the `CurrentGameBet` table. If the table is not empty, all the data it contains will be lost.
  - Changed the type of `highestKillStreak` on the `MinervaGame` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "BetStatus" AS ENUM ('IN_PROGRESS', 'FINALIZED');

-- DropForeignKey
ALTER TABLE "CurrentGameBet" DROP CONSTRAINT "CurrentGameBet_userId_fkey";

-- AlterTable
ALTER TABLE "Bet" ADD COLUMN     "status" "BetStatus" NOT NULL DEFAULT 'IN_PROGRESS',
ALTER COLUMN "result" DROP NOT NULL,
ALTER COLUMN "newUserPoints" DROP NOT NULL,
ALTER COLUMN "pastUserPoints" DROP NOT NULL,
ALTER COLUMN "receivedPoints" DROP NOT NULL;

-- AlterTable
ALTER TABLE "MinervaGame" ADD COLUMN     "date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
DROP COLUMN "highestKillStreak",
ADD COLUMN     "highestKillStreak" INTEGER NOT NULL;

-- DropTable
DROP TABLE "CurrentGameBet";

-- DropEnum
DROP TYPE "KillStreak";
