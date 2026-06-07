import {
  Controller,
  Get,
  Post,
  Delete,
  Body,
  Param,
  UseGuards,
  Request,
} from '@nestjs/common';
import { PpmReportsService } from './ppm-reports.service';
import { CreatePpmReportDto } from './dto/create-ppm-report.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';

@Controller('ppm-reports')
@UseGuards(JwtAuthGuard, RolesGuard)
export class PpmReportsController {
  constructor(private readonly ppmReportsService: PpmReportsService) {}

  @Get()
  @Roles('service_qualite')
  findAll() {
    return this.ppmReportsService.findAll();
  }

  @Post()
  @Roles('service_qualite')
  create(@Body() dto: CreatePpmReportDto, @Request() req) {
    return this.ppmReportsService.create(dto, req.user.userId, req.user.username);
  }

  @Delete(':id')
  @Roles('service_qualite')
  remove(@Param('id') id: string, @Request() req) {
    return this.ppmReportsService.remove(id, req.user.userId);
  }
}
