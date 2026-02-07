-- CreateIndex
CREATE INDEX "Records_user_id_created_at_record_type_idx" ON "Records"("user_id", "created_at", "record_type");
