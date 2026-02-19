-- CreateEnum
CREATE TYPE "BriefingStatus" AS ENUM ('DRAFT', 'SENT', 'IN_PROGRESS', 'COMPLETED', 'ARCHIVED');

-- CreateEnum
CREATE TYPE "QuestionType" AS ENUM ('MULTIPLE_CHOICE', 'TEXT_SHORT', 'TEXT_LONG', 'SCALE', 'FILE_UPLOAD');

-- CreateTable
CREATE TABLE "users" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password_hash" TEXT NOT NULL,
    "avatar_url" TEXT,
    "company_name" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "briefings" (
    "id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "client_name" TEXT NOT NULL,
    "client_email" TEXT NOT NULL,
    "client_phone" TEXT,
    "business_segment" TEXT NOT NULL,
    "space_type" TEXT NOT NULL,
    "approximate_area" DOUBLE PRECISION,
    "estimated_budget" TEXT,
    "desired_deadline" TEXT,
    "is_renovation" BOOLEAN NOT NULL DEFAULT false,
    "initial_notes" TEXT,
    "status" "BriefingStatus" NOT NULL DEFAULT 'DRAFT',
    "unique_link" TEXT NOT NULL,
    "submitted_at" TIMESTAMP(3),
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "briefings_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "questions" (
    "id" TEXT NOT NULL,
    "briefing_id" TEXT NOT NULL,
    "question_text" TEXT NOT NULL,
    "question_type" "QuestionType" NOT NULL,
    "category" TEXT,
    "options" JSONB,
    "is_required" BOOLEAN NOT NULL DEFAULT true,
    "order" INTEGER NOT NULL,
    "created_by_ai" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "questions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "answers" (
    "id" TEXT NOT NULL,
    "question_id" TEXT NOT NULL,
    "answer_text" TEXT,
    "answer_files" JSONB,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "answers_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "briefings_unique_link_key" ON "briefings"("unique_link");

-- CreateIndex
CREATE UNIQUE INDEX "answers_question_id_key" ON "answers"("question_id");

-- AddForeignKey
ALTER TABLE "briefings" ADD CONSTRAINT "briefings_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "questions" ADD CONSTRAINT "questions_briefing_id_fkey" FOREIGN KEY ("briefing_id") REFERENCES "briefings"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "answers" ADD CONSTRAINT "answers_question_id_fkey" FOREIGN KEY ("question_id") REFERENCES "questions"("id") ON DELETE CASCADE ON UPDATE CASCADE;
