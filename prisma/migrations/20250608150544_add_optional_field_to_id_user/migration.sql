-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Vaso" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "idUser" INTEGER,
    "dataAquisicao" DATETIME NOT NULL,
    "dataAtualizacao" DATETIME NOT NULL,
    CONSTRAINT "Vaso_idUser_fkey" FOREIGN KEY ("idUser") REFERENCES "Usuario" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_Vaso" ("dataAquisicao", "dataAtualizacao", "id", "idUser") SELECT "dataAquisicao", "dataAtualizacao", "id", "idUser" FROM "Vaso";
DROP TABLE "Vaso";
ALTER TABLE "new_Vaso" RENAME TO "Vaso";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
