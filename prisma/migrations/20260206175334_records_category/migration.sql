-- CreateTable
CREATE TABLE "RecordCategory" (
    "record_id" TEXT NOT NULL,
    "category_id" TEXT NOT NULL,

    CONSTRAINT "RecordCategory_pkey" PRIMARY KEY ("record_id","category_id")
);

-- AddForeignKey
ALTER TABLE "RecordCategory" ADD CONSTRAINT "RecordCategory_record_id_fkey" FOREIGN KEY ("record_id") REFERENCES "Records"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RecordCategory" ADD CONSTRAINT "RecordCategory_category_id_fkey" FOREIGN KEY ("category_id") REFERENCES "Categories"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
