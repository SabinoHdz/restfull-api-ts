-- CreateTable
CREATE TABLE "todo" (
    "id" SERIAL NOT NULL,
    "textn" VARCHAR NOT NULL,
    "completedAt" TIMESTAMP,

    CONSTRAINT "todo_pkey" PRIMARY KEY ("id")
);
