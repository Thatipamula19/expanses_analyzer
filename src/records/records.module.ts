import { Module } from '@nestjs/common';
import { RecordsController } from './records.controller';
import { RecordsService } from './records.service';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  controllers: [RecordsController],
  providers: [RecordsService],
  imports: [PrismaModule]
})
export class RecordsModule {}
