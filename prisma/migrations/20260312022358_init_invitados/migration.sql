-- CreateTable
CREATE TABLE "guests" (
    "id" TEXT NOT NULL,
    "apellido" TEXT NOT NULL,
    "cupos" INTEGER NOT NULL DEFAULT 1,
    "codigo" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "guests_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "guests_codigo_key" ON "guests"("codigo");
