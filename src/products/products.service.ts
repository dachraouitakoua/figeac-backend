import {
  Injectable,
  NotFoundException,
  ForbiddenException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Product, ProductDocument } from './schemas/product.schema';
import { CreateProductDto } from './dto/create-product.dto';
import {
  UpdateQualiteDto,
  UpdateFinanceDto,
  UpdateAchatDto,
} from './dto/update-product.dto';

@Injectable()
export class ProductsService {
  constructor(
    @InjectModel(Product.name) private productModel: Model<ProductDocument>,
  ) {}

  private computeCoutTotal(doc: ProductDocument): number | null {
    const { quantite, cout_achat, prix_vente, cout_presentation } = doc;
    if (
      quantite != null &&
      cout_achat != null &&
      prix_vente != null &&
      cout_presentation != null
    ) {
      return quantite * (cout_achat - prix_vente) + cout_presentation;
    }
    return null;
  }

  async create(
    dto: CreateProductDto,
    userId: string,
    username: string,
  ): Promise<ProductDocument> {
    const product = new this.productModel({
      ...dto,
      date_creation: dto.date_creation
        ? new Date(dto.date_creation)
        : undefined,
      created_by: new Types.ObjectId(userId),
      valider_par_qualite: username,
    });
    return product.save();
  }

  async findAll(): Promise<ProductDocument[]> {
    return this.productModel.find().sort({ createdAt: -1 }).exec();
  }

  async findOne(id: string): Promise<ProductDocument> {
    const product = await this.productModel.findById(id);
    if (!product) throw new NotFoundException('Produit introuvable');
    return product;
  }

  async updateQualite(
    id: string,
    dto: UpdateQualiteDto,
    userId: string,
    username: string,
  ): Promise<ProductDocument> {
    const updateData: Record<string, any> = {
      ...dto,
      valider_par_qualite: username,
    };

    if (dto.date_creation) {
      updateData.date_creation = new Date(dto.date_creation);
    }

    const product = await this.productModel.findByIdAndUpdate(
      id,
      { $set: updateData },
      { new: true, runValidators: false }, // runValidators: false because we're doing a partial update
    );

    if (!product) throw new NotFoundException(`Product ${id} not found`);

    return product;
  }
  async updateFinance(
    id: string,
    dto: UpdateFinanceDto,
    username: string,
  ): Promise<ProductDocument> {
    const product = await this.findOne(id);
    product.cout_achat = dto.cout_achat;
    product.valider_par_finance = username;
    product.cout_total = this.computeCoutTotal(product);
    return product.save();
  }

  async updateAchat(
    id: string,
    dto: UpdateAchatDto,
    username: string,
  ): Promise<ProductDocument> {
    const product = await this.findOne(id);
    if (dto.prix_vente !== undefined) product.prix_vente = dto.prix_vente;
    if (dto.cout_presentation !== undefined)
      product.cout_presentation = dto.cout_presentation;
    product.valider_par_achat = username;
    product.cout_total = this.computeCoutTotal(product);
    return product.save();
  }

  async remove(id: string, userId: string): Promise<{ message: string }> {
    const product = await this.findOne(id);
    if (product.created_by.toString() !== userId) {
      throw new ForbiddenException(
        'Vous pouvez supprimer uniquement vos propres produits',
      );
    }
    await this.productModel.findByIdAndDelete(id);
    return { message: 'Produit supprimé avec succès' };
  }
}
