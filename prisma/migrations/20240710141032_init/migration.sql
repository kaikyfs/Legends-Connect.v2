-- CreateTable
CREATE TABLE "jogadores" (
    "nick" TEXT NOT NULL,
    "posicao" TEXT NOT NULL,
    "imgLane" TEXT NOT NULL,
    "icone" TEXT NOT NULL,
    "capa" TEXT NOT NULL,
    "elo" TEXT NOT NULL,
    "imgElo" TEXT NOT NULL,
    "campeoesMaisJogados" TEXT NOT NULL,

    CONSTRAINT "jogadores_pkey" PRIMARY KEY ("nick")
);
