/*
  Warnings:

  - You are about to alter the column `points` on the `Users` table. The data in that column could be lost. The data in that column will be cast from `DoublePrecision` to `Integer`.

*/
-- AlterTable
ALTER TABLE "Users" ALTER COLUMN "points" SET DATA TYPE INTEGER;
