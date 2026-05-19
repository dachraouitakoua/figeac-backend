import { IsOptional, IsString, IsNumber, IsDateString } from 'class-validator';
import { Type } from 'class-transformer';

export class UpdateQualiteDto {
  @IsOptional()
  @IsString()
  description?: string;

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

export class UpdateFinanceDto {
  @IsNumber()
  @Type(() => Number)
  cout_achat: number;
}

export class UpdateAchatDto {
  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  prix_vente?: number;

  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  cout_presentation?: number;
}
