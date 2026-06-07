import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PpmReportsController } from './ppm-reports.controller';
import { PpmReportsService } from './ppm-reports.service';
import { PpmReport, PpmReportSchema } from './schemas/ppm-report.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: PpmReport.name, schema: PpmReportSchema }]),
  ],
  controllers: [PpmReportsController],
  providers: [PpmReportsService],
})
export class PpmReportsModule {}
