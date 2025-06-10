-- CreateTable
CREATE TABLE "Usuario" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nome" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "telefone" TEXT,
    "senha" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Planta" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nomePopular" TEXT NOT NULL,
    "nomeCientifico" TEXT NOT NULL,
    "idFamilia" INTEGER NOT NULL,
    "ambienteCultivo" TEXT,
    "frequenciaIrrigacao" TEXT,
    "exposicaoSolar" TEXT,
    "temperaturaIdeal" REAL,
    "alturaMax" REAL,
    "larguraMax" REAL,
    "velocidadeAltura" REAL,
    "velocidadeLargura" REAL,
    CONSTRAINT "Planta_idFamilia_fkey" FOREIGN KEY ("idFamilia") REFERENCES "FamiliaPlanta" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "FamiliaPlanta" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nome" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "TipoSensor" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "modelo" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Sensor" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "idTipoSensor" INTEGER NOT NULL,
    "numeroSerie" INTEGER NOT NULL,
    "dataAquisicao" DATETIME NOT NULL,
    CONSTRAINT "Sensor_idTipoSensor_fkey" FOREIGN KEY ("idTipoSensor") REFERENCES "TipoSensor" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Vaso" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "idUser" INTEGER,
    "dataAquisicao" DATETIME NOT NULL,
    "dataAtualizacao" DATETIME NOT NULL,
    CONSTRAINT "Vaso_idUser_fkey" FOREIGN KEY ("idUser") REFERENCES "Usuario" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Plantio" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "idPlanta" INTEGER NOT NULL,
    "idVaso" INTEGER NOT NULL,
    "dataInicio" DATETIME NOT NULL,
    "dataFim" DATETIME,
    CONSTRAINT "Plantio_idPlanta_fkey" FOREIGN KEY ("idPlanta") REFERENCES "Planta" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Plantio_idVaso_fkey" FOREIGN KEY ("idVaso") REFERENCES "Vaso" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Placa" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "numeroSerie" INTEGER NOT NULL,
    "modelo" TEXT NOT NULL,
    "dataAquisicao" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "PlacaVaso" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "idVaso" INTEGER NOT NULL,
    "idPlaca" INTEGER NOT NULL,
    "DataInstalacao" DATETIME NOT NULL,
    "DataRemocao" DATETIME,
    CONSTRAINT "PlacaVaso_idVaso_fkey" FOREIGN KEY ("idVaso") REFERENCES "Vaso" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "PlacaVaso_idPlaca_fkey" FOREIGN KEY ("idPlaca") REFERENCES "Placa" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "SensorVaso" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "idVaso" INTEGER NOT NULL,
    "idSensor" INTEGER NOT NULL,
    "DataInstalacao" DATETIME NOT NULL,
    "DataRemocao" DATETIME,
    CONSTRAINT "SensorVaso_idVaso_fkey" FOREIGN KEY ("idVaso") REFERENCES "Vaso" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "SensorVaso_idSensor_fkey" FOREIGN KEY ("idSensor") REFERENCES "Sensor" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Leituras" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "idSensorVaso" INTEGER NOT NULL,
    "umidade" INTEGER NOT NULL,
    "status" TEXT NOT NULL,
    "temperatura" REAL NOT NULL,
    "datetime" DATETIME NOT NULL,
    CONSTRAINT "Leituras_idSensorVaso_fkey" FOREIGN KEY ("idSensorVaso") REFERENCES "SensorVaso" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "Usuario_email_key" ON "Usuario"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Placa_numeroSerie_key" ON "Placa"("numeroSerie");
