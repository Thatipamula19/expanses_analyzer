-- CreateTable
CREATE TABLE "Records" (
    "id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "account_id" TEXT NOT NULL,
    "category_id" TEXT NOT NULL,
    "record_name" TEXT NOT NULL,
    "record_type" TEXT NOT NULL,
    "record_description" TEXT,
    "amount" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3),
    "deleted_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Records_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Records" ADD CONSTRAINT "Records_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Records" ADD CONSTRAINT "Records_account_id_fkey" FOREIGN KEY ("account_id") REFERENCES "Accounts"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Records" ADD CONSTRAINT "Records_category_id_fkey" FOREIGN KEY ("category_id") REFERENCES "Categories"("id") ON DELETE CASCADE ON UPDATE CASCADE;
