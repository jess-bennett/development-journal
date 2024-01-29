-- CreateEnum
CREATE TYPE "Skill" AS ENUM ('React', 'TypeScript');

-- CreateTable
CREATE TABLE "Entry" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "skill" "Skill" NOT NULL,

    CONSTRAINT "Entry_pkey" PRIMARY KEY ("id")
);
