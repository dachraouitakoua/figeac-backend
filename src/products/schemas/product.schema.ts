import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type ProductDocument = Product & Document;

@Schema({ timestamps: true })
export class Product {
  // ── Service Qualité ──────────────────────────────────────────
  @Prop({ default: 'non-spécifié', required: true })
  type_piece: string;

  @Prop({ type: String, default: null })
  valider_par_qualite: string | null;

  @Prop({ required: true })
  date_creation: Date;

  @Prop({ required: true })
  order_ref: string;

  @Prop({ required: true })
  cep: string;

  @Prop({ required: true })
  article: string;

  @Prop({ required: true })
  quantite: number;

  @Prop({ required: true })
  decision: string;

  @Prop({ required: true })
  nom_fournisseur: string;

  @Prop({ required: true })
  valeur_ifs: number;

  // ── Service Finance ──────────────────────────────────────────
  @Prop({ type: Number, default: null })
  cout_achat: number | null;

  @Prop({ type: String, default: null })
  valider_par_finance: string | null;

  // ── Service Achat ────────────────────────────────────────────
  @Prop({ type: Number, default: null })
  prix_vente: number | null;

  @Prop({ type: Number, default: null })
  cout_presentation: number | null;

  @Prop({ type: String, default: null })
  valider_par_achat: string | null;

  // ── Computed ─────────────────────────────────────────────────
  @Prop({ type: Number, default: null })
  cout_total: number | null;

  // ── Meta ─────────────────────────────────────────────────────
  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  created_by: Types.ObjectId;
}

export const ProductSchema = SchemaFactory.createForClass(Product);
