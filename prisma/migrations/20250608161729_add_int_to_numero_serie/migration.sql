/*
  Warnings:

  - You are about to alter the column `numeroSerie` on the `Placa` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Int`.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Placa" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "numeroSerie" INTEGER NOT NULL,
    "modelo" TEXT NOT NULL,
    "dataAquisicao" DATETIME NOT NULL
);
INSERT INTO "new_Placa" ("dataAquisicao", "id", "modelo", "numeroSerie") SELECT "dataAquisicao", "id", "modelo", "numeroSerie" FROM "Placa";
DROP TABLE "Placa";
ALTER TABLE "new_Placa" RENAME TO "Placa";
CREATE UNIQUE INDEX "Placa_numeroSerie_key" ON "Placa"("numeroSerie");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
