-- CreateEnum
CREATE TYPE "Category" AS ENUM ('insurance', 'taxes', 'real_estate', 'immigration', 'tech', 'life');

-- CreateEnum
CREATE TYPE "PostStatus" AS ENUM ('published', 'trending', 'live');

-- CreateTable
CREATE TABLE "Post" (
    "id" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "category" "Category" NOT NULL,
    "date" TEXT NOT NULL,
    "readTime" INTEGER,
    "status" "PostStatus",
    "reelUrl" TEXT,
    "videoUrl" TEXT,
    "image" TEXT,
    "isDashboard" BOOLEAN NOT NULL DEFAULT false,
    "dashboardSrc" TEXT,
    "resources" JSONB,
    "notionPageId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Post_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Post_slug_key" ON "Post"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "Post_notionPageId_key" ON "Post"("notionPageId");

-- CreateIndex
CREATE INDEX "Post_date_idx" ON "Post"("date");
