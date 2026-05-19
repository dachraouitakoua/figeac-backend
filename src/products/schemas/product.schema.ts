import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type ProductDocument = Product & Document;

@Schema({ timestamps: true })
export class Product {
  // ── Service Qualité ──────────────────────────────────────────
  @Prop({ default: 'non-spécifié', required: true })
  description: string;

  @Prop({ type: String, default: null })
  valider_par_qualite: string | null;

  @Prop()
  date_creation: Date;

  @Prop()
  order_ref: string;

  @Prop()
  cep: string;

  @Prop()
  article: string;

  @Prop()
  quantite: number;

  @Prop()
  decision: string;

  @Prop()
  nom_fournisseur: string;

  @Prop()
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
  @Prop({ type: Types.ObjectId, ref: 'User' })
  created_by: Types.ObjectId;
}

export const ProductSchema = SchemaFactory.createForClass(Product);
