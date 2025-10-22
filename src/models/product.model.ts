import mongoose, { Schema, model, Document, Model } from "mongoose";

export type ProductType =
  | "windows"
  | "aluminum"
  | "cottages"
  | "balconies"
  | "doors";

export enum ProductCategoryEnum {
  BUDGET = "budget",
  COMFORT = "comfort",
  PREMIUM = "premium",
}

export interface IProduct extends Document {
  serial: number;
  title?: string;
  type?: ProductType;
  items?: string;
  description?: string;
  priceFrom?: number;
  priceUnit?: string;
  imageUrl?: string;
  // newly added optional fields
  category?: ProductCategoryEnum; // e.g. budget / comfort / premium
  label?: string; // e.g. “ECO”, “Bestseller”, “New product”, etc.
  tag?: string; // e.g. “The warmest”, “More light”, “Best price”, etc.
  airChambers?: string; // e.g. “6/7 pcs.”
  frameSashWidth?: string; // e.g. “80/100 mm”
  thermalProtection?: string; // e.g. “1.23”
  buttonText?: string; // e.g. “Request a quote”
  deletedAt?: Date | null;
  createdAt: Date;
  updatedAt: Date;
}

const ProductSchema = new Schema<IProduct>(
  {
    serial: { type: Number, required: true },
    title: { type: String },
    type: {
      type: String,
      enum: ["windows", "aluminum", "cottages", "balconies", "doors"],
    },
    items: { type: String },
    description: { type: String },
    priceFrom: { type: Number },
    priceUnit: { type: String, default: "₽/m²" },
    imageUrl: { type: String },

    // New optional fields from UI
    category: {
      type: String,
      enum: Object.values(ProductCategoryEnum),
      required: false,
    },
    label: { type: String },
    tag: { type: String },
    airChambers: { type: String },
    frameSashWidth: { type: String },
    thermalProtection: { type: String },
    buttonText: { type: String, default: "Request a quote" },

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
