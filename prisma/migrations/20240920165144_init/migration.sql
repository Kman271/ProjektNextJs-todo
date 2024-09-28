-- CreateEnum
CREATE TYPE "taskdifficulty" AS ENUM ('easy', 'medium', 'hard');

-- CreateTable
CREATE TABLE "dones" (
    "done_id" SERIAL NOT NULL,
    "user_id" INTEGER,
    "task_txt" VARCHAR(50) NOT NULL,
    "difficulty" "taskdifficulty" NOT NULL,

    CONSTRAINT "dones_pkey" PRIMARY KEY ("done_id")
);

-- CreateTable
CREATE TABLE "todos" (
    "todo_id" SERIAL NOT NULL,
    "user_id" INTEGER,
    "task_txt" VARCHAR(50) NOT NULL,
    "difficulty" "taskdifficulty" NOT NULL,

    CONSTRAINT "todos_pkey" PRIMARY KEY ("todo_id")
);

-- CreateTable
CREATE TABLE "users" (
    "user_id" SERIAL NOT NULL,
    "username" VARCHAR(50) NOT NULL,
    "password" VARCHAR(50) NOT NULL,

    CONSTRAINT "users_pkey" PRIMARY KEY ("user_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_username_key" ON "users"("username");

-- AddForeignKey
ALTER TABLE "dones" ADD CONSTRAINT "fk_user" FOREIGN KEY ("user_id") REFERENCES "users"("user_id") ON DELETE SET NULL ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "todos" ADD CONSTRAINT "fk_user" FOREIGN KEY ("user_id") REFERENCES "users"("user_id") ON DELETE SET NULL ON UPDATE NO ACTION;
