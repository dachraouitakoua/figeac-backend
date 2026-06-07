import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type PpmReportDocument = PpmReport & Document;

@Schema({ timestamps: true })
export class PpmReport {
  @Prop({ required: true })
  fournisseur: string;

  @Prop({ required: true })
  total_nc_parts: number;

  @Prop({ required: true })
  total_delivered_qty: number;

  @Prop({ required: true })
  ppm: number;

  @Prop({ type: Types.ObjectId, ref: 'User' })
  created_by: Types.ObjectId;

  @Prop({ type: String, default: null })
  created_by_username: string | null;
}

export const PpmReportSchema = SchemaFactory.createForClass(PpmReport);
