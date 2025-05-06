/*
  Warnings:

  - Added the required column `result` to the `MinervaGame` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "MinervaGame" ADD COLUMN     "result" BOOLEAN NOT NULL;
