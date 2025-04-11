-- CreateEnum
CREATE TYPE "RunePath" AS ENUM ('PRECISION', 'DOMINATION', 'SORCERY', 'RESOLVE', 'INSPIRATION');

-- CreateEnum
CREATE TYPE "GameTeam" AS ENUM ('MINERVA', 'ENEMY');

-- CreateEnum
CREATE TYPE "Spell" AS ENUM ('HEAL', 'GHOST', 'BARRIER', 'EXHAUST', 'FLASH', 'TELEPORT', 'SMITE', 'CLEANSE', 'IGNITE');

-- CreateEnum
CREATE TYPE "KillStreak" AS ENUM ('DOUBLE', 'TRIPLE', 'QUADRA', 'PENTA');

-- CreateTable
CREATE TABLE "users" (
    "id" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "points" BIGINT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Bet" (
    "id" TEXT NOT NULL,
    "points" BIGINT NOT NULL,
    "result" BOOLEAN NOT NULL,
    "userId" TEXT NOT NULL,
    "gameId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Bet_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Game" (
    "id" TEXT NOT NULL,
    "firstKill" BOOLEAN NOT NULL,
    "firstTower" BOOLEAN NOT NULL,
    "firstDragon" BOOLEAN NOT NULL,
    "atakhanKill" BOOLEAN NOT NULL,
    "dragonSoul" BOOLEAN NOT NULL,
    "qtGrubs" INTEGER NOT NULL,
    "result" BOOLEAN NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Game_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "GameParticipant" (
    "puuid" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "tagline" TEXT NOT NULL,
    "championName" TEXT NOT NULL,
    "primaryRune" "RunePath" NOT NULL,
    "secondaryRune" "RunePath" NOT NULL,
    "team" "GameTeam" NOT NULL,
    "lane" TEXT NOT NULL,
    "spellD" "Spell" NOT NULL,
    "spellF" "Spell" NOT NULL,
    "gameId" TEXT NOT NULL,

    CONSTRAINT "GameParticipant_pkey" PRIMARY KEY ("puuid")
);

-- CreateTable
CREATE TABLE "MinervaGame" (
    "gameId" TEXT NOT NULL,
    "championName" TEXT NOT NULL,
    "kills" INTEGER NOT NULL,
    "deaths" INTEGER NOT NULL,
    "assists" INTEGER NOT NULL,
    "kda" DOUBLE PRECISION NOT NULL,
    "highestKillStreak" "KillStreak" NOT NULL,

    CONSTRAINT "MinervaGame_pkey" PRIMARY KEY ("gameId")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_username_key" ON "users"("username");

-- AddForeignKey
ALTER TABLE "Bet" ADD CONSTRAINT "Bet_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Bet" ADD CONSTRAINT "Bet_gameId_fkey" FOREIGN KEY ("gameId") REFERENCES "Game"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "GameParticipant" ADD CONSTRAINT "GameParticipant_gameId_fkey" FOREIGN KEY ("gameId") REFERENCES "Game"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MinervaGame" ADD CONSTRAINT "MinervaGame_gameId_fkey" FOREIGN KEY ("gameId") REFERENCES "Game"("id") ON DELETE CASCADE ON UPDATE CASCADE;
