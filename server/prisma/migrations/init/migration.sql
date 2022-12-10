-- CreateEnum
CREATE TYPE "Category" AS ENUM ('None', 'Housing', 'Transport', 'Food', 'Utilities', 'Healthcare', 'Insurance', 'Essentials', 'Personal', 'Debt', 'Savings', 'Investments', 'Education', 'Gifts', 'Entertainment');

-- CreateTable
CREATE TABLE "user" (
    "id" TEXT NOT NULL,
    "username" VARCHAR(255) NOT NULL,
    "password" VARCHAR(255) NOT NULL,
    "email" VARCHAR(255) NOT NULL,

    CONSTRAINT "user_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "account" (
    "id" TEXT NOT NULL,
    "accountName" VARCHAR(255) NOT NULL,
    "description" VARCHAR(255) NOT NULL,
    "accountBalance" DOUBLE PRECISION NOT NULL DEFAULT 0.00,
    "userId" UUID NOT NULL,
    "xPosition" BIGINT NOT NULL DEFAULT 0,
    "yPosition" BIGINT NOT NULL DEFAULT 0,
    "sourceId" UUID NOT NULL,
    "targetId" UUID NOT NULL,

    CONSTRAINT "account_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "expense" (
    "id" TEXT NOT NULL,
    "expenseName" VARCHAR(255) NOT NULL,
    "description" VARCHAR(255) NOT NULL,
    "amount" DOUBLE PRECISION NOT NULL DEFAULT 0.00,
    "category" "Category" NOT NULL DEFAULT 'None',
    "userId" UUID NOT NULL,
    "accountId" UUID NOT NULL,

    CONSTRAINT "expense_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "user_username_key" ON "user"("username");

-- CreateIndex
CREATE UNIQUE INDEX "user_email_key" ON "user"("email");

