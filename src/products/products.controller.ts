import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Body,
  Param,
  UseGuards,
  Request,
} from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import {
  UpdateQualiteDto,
  UpdateFinanceDto,
  UpdateAchatDto,
} from './dto/update-product.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';

@Controller('products')
@UseGuards(JwtAuthGuard, RolesGuard)
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Get()
  findAll() {
    return this.productsService.findAll();
  }

  @Post()
  @Roles('service_qualite')
  create(@Body() dto: CreateProductDto, @Request() req) {
    return this.productsService.create(dto, req.user.userId, req.user.username);
  }

  @Patch(':id/qualite')
  @Roles('service_qualite')
  updateQualite(
    @Param('id') id: string,
    @Body() dto: UpdateQualiteDto,
    @Request() req,
  ) {
    return this.productsService.updateQualite(
      id,
      dto,
      req.user.userId,
      req.user.username,
    );
  }

  @Patch(':id/finance')
  @Roles('service_finance')
  updateFinance(
    @Param('id') id: string,
    @Body() dto: UpdateFinanceDto,
    @Request() req,
  ) {
    return this.productsService.updateFinance(id, dto, req.user.username);
  }

  @Patch(':id/achat')
  @Roles('service_achat')
  updateAchat(
    @Param('id') id: string,
    @Body() dto: UpdateAchatDto,
    @Request() req,
  ) {
    return this.productsService.updateAchat(id, dto, req.user.username);
  }

  @Delete(':id')
  @Roles('service_qualite')
  remove(@Param('id') id: string, @Request() req) {
    return this.productsService.remove(id, req.user.userId);
  }
}
