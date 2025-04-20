/*
  Warnings:

  - You are about to drop the `Game` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[email]` on the table `Users` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `email` to the `Users` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Bet" DROP CONSTRAINT "Bet_gameId_fkey";

-- DropForeignKey
ALTER TABLE "GameParticipant" DROP CONSTRAINT "GameParticipant_gameId_fkey";

-- DropForeignKey
ALTER TABLE "MinervaGame" DROP CONSTRAINT "MinervaGame_gameId_fkey";

-- AlterTable
ALTER TABLE "Users" ADD COLUMN     "email" TEXT NOT NULL;

-- DropTable
DROP TABLE "Game";

-- CreateTable
CREATE TABLE "game" (
    "id" TEXT NOT NULL,
    "firstKill" BOOLEAN NOT NULL,
    "firstTower" BOOLEAN NOT NULL,
    "firstDragon" BOOLEAN NOT NULL,
    "atakhanKill" BOOLEAN NOT NULL,
    "dragonSoul" BOOLEAN NOT NULL,
    "qtGrubs" INTEGER NOT NULL,
    "result" BOOLEAN NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "game_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Users_email_key" ON "Users"("email");

-- AddForeignKey
ALTER TABLE "Bet" ADD CONSTRAINT "Bet_gameId_fkey" FOREIGN KEY ("gameId") REFERENCES "game"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "GameParticipant" ADD CONSTRAINT "GameParticipant_gameId_fkey" FOREIGN KEY ("gameId") REFERENCES "game"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MinervaGame" ADD CONSTRAINT "MinervaGame_gameId_fkey" FOREIGN KEY ("gameId") REFERENCES "game"("id") ON DELETE CASCADE ON UPDATE CASCADE;
