import { IsString, IsNumber, IsDateString, IsOptional } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateProductDto {
  @IsOptional()
  @IsString()
  type_piece?: string;

  @IsOptional()
  @IsDateString()
  date_creation?: string;

  @IsOptional()
  @IsString()
  order_ref?: string;

  @IsOptional()
  @IsString()
  cep?: string;

  @IsOptional()
  @IsString()
  article?: string;

  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  quantite?: number;

  @IsOptional()
  @IsString()
  decision?: string;

  @IsOptional()
  @IsString()
  nom_fournisseur?: string;

  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  valeur_ifs?: number;
}
