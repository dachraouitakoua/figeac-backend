import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { PpmReport, PpmReportDocument } from './schemas/ppm-report.schema';
import { CreatePpmReportDto } from './dto/create-ppm-report.dto';

@Injectable()
export class PpmReportsService {
  constructor(
    @InjectModel(PpmReport.name)
    private readonly ppmReportModel: Model<PpmReportDocument>,
  ) {}

  async create(dto: CreatePpmReportDto, userId: string, username: string) {

    const newReport = new this.ppmReportModel({
      ...dto,
      created_by: userId,
      created_by_username: username,
    });
    return newReport.save();
  }

  async findAll() {
    return this.ppmReportModel.find().sort({ createdAt: -1 }).exec();
  }

  async remove(id: string, userId: string) {
    const report = await this.ppmReportModel.findById(id);
    if (!report) {
      throw new NotFoundException('Rapport PPM non trouvé');
    }
    return this.ppmReportModel.findByIdAndDelete(id);
  }
}
