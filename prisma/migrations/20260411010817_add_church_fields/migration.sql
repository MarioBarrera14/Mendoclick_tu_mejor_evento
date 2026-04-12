/*
  Warnings:

  - Added the required column `userId` to the `guests` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "guests" ADD COLUMN     "dietary" TEXT,
ADD COLUMN     "status" TEXT NOT NULL DEFAULT 'PENDING',
ADD COLUMN     "userId" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "users" (
    "id" TEXT NOT NULL,
    "nombre" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "role" TEXT NOT NULL DEFAULT 'USER',
    "slug" TEXT NOT NULL,
    "templateId" TEXT NOT NULL DEFAULT 'DEMO1',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "event_config" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "heroImage" TEXT DEFAULT '',
    "videoUrl" TEXT DEFAULT '',
    "musicUrl" TEXT DEFAULT '',
    "carruselImages" TEXT DEFAULT '[]',
    "eventName" TEXT NOT NULL DEFAULT 'Mi Evento',
    "eventDate" TEXT NOT NULL DEFAULT '2026-12-19',
    "eventTime" TEXT NOT NULL DEFAULT '21:00',
    "venueName" TEXT NOT NULL DEFAULT 'Nombre del Salón',
    "venueAddress" TEXT NOT NULL DEFAULT 'Calle Falsa 123',
    "mapLink" TEXT NOT NULL DEFAULT '',
    "churchName" TEXT DEFAULT '',
    "churchAddress" TEXT DEFAULT '',
    "churchMapLink" TEXT DEFAULT '',
    "dressCode" TEXT NOT NULL DEFAULT 'Elegante Sport',
    "dressDescription" TEXT NOT NULL DEFAULT '¡Tu presencia es lo más importante!',
    "cbu" TEXT NOT NULL DEFAULT '',
    "alias" TEXT NOT NULL DEFAULT '',
    "bankName" TEXT NOT NULL DEFAULT '',
    "holderName" TEXT NOT NULL DEFAULT '',
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "event_config_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "itinerary_items" (
    "id" TEXT NOT NULL,
    "time" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "icon" TEXT NOT NULL DEFAULT 'Heart',
    "order" INTEGER NOT NULL,
    "eventConfigId" TEXT NOT NULL,

    CONSTRAINT "itinerary_items_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "witnesses" (
    "id" TEXT NOT NULL,
    "nombre" TEXT NOT NULL,
    "rol" TEXT NOT NULL,
    "imageUrl" TEXT,
    "eventConfigId" TEXT NOT NULL,

    CONSTRAINT "witnesses_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SongSuggestion" (
    "id" TEXT NOT NULL,
    "tema1" TEXT,
    "tema2" TEXT,
    "tema3" TEXT,
    "guestName" TEXT,
    "userId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "SongSuggestion_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "users_slug_key" ON "users"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "event_config_userId_key" ON "event_config"("userId");

-- AddForeignKey
ALTER TABLE "event_config" ADD CONSTRAINT "event_config_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "itinerary_items" ADD CONSTRAINT "itinerary_items_eventConfigId_fkey" FOREIGN KEY ("eventConfigId") REFERENCES "event_config"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "witnesses" ADD CONSTRAINT "witnesses_eventConfigId_fkey" FOREIGN KEY ("eventConfigId") REFERENCES "event_config"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "guests" ADD CONSTRAINT "guests_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SongSuggestion" ADD CONSTRAINT "SongSuggestion_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
