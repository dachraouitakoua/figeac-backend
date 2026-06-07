import { IsString, IsNumber, IsNotEmpty } from 'class-validator';

export class CreatePpmReportDto {
  @IsString()
  @IsNotEmpty()
  fournisseur: string;

  @IsNumber()
  @IsNotEmpty()
  total_nc_parts: number;

  @IsNumber()
  @IsNotEmpty()
  total_delivered_qty: number;

  @IsNumber()
  @IsNotEmpty()
  ppm: number;
}
