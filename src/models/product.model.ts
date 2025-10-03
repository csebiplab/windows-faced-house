import mongoose, { Schema, model, Document, Model } from "mongoose";

export type ProductType =
  | "windows"
  | "aluminum"
  | "cottages"
  | "balconies"
  | "doors";

export interface IProduct extends Document {
  title?: string;
  type?: ProductType;
  items?: string;
  description?: string;
  priceFrom?: number;
  priceUnit?: string;
  imageUrl?: string;
  deletedAt?: Date | null;
  createdAt: Date;
  updatedAt: Date;
}

const ProductSchema = new Schema<IProduct>(
  {
    title: { type: String, required: false },
    type: {
      type: String,
      enum: ["windows", "aluminum", "cottages", "balconies", "doors"],
      required: false,
    },
    items: { type: String, required: false },
    description: { type: String, required: false },
    priceFrom: { type: Number, required: false },
    priceUnit: { type: String, default: "₽/m²" },
    imageUrl: { type: String, required: false },
    deletedAt: { type: Date, default: null },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

export const ProductModel: Model<IProduct> =
  mongoose.models.Product || model<IProduct>("Product", ProductSchema);
