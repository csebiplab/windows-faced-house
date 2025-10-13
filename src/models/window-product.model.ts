import mongoose, { Schema, model, Document, Model } from "mongoose";

export interface IWindowProduct extends Document {
  title: string;
  windowType: "single" | "double" | "triple" | "balcony";
  size: string;
  price: number;
  discount?: number;
  ecoFriendly?: boolean;
  description?: string;
  imageUrl?: string;

  profile: {
    brand?: string;
    type: "standard" | "evolution";
    tag?: string;
  };

  glassType: "single" | "double";

  coolColoursEnabled?: boolean;
  colours?: {
    name: string;
    hex?: string;
    twoSided?: boolean;
    inMass?: boolean;
  }[];

  createdAt?: Date;
  updatedAt?: Date;
}

const WindowProductSchema = new Schema<IWindowProduct>(
  {
    title: { type: String, required: true },
    windowType: {
      type: String,
      enum: ["single", "double", "triple", "balcony"],
      required: true,
    },
    size: { type: String, required: true },
    price: { type: Number, required: true },
    discount: { type: Number },
    ecoFriendly: { type: Boolean, default: false },
    description: { type: String },
    imageUrl: { type: String },

    profile: {
      brand: { type: String },
      type: {
        type: String,
        enum: ["standard", "evolution"],
        required: true,
      },
      tag: { type: String },
    },

    glassType: {
      type: String,
      enum: ["single", "double"],
      default: "single",
    },

    coolColoursEnabled: { type: Boolean, default: false },
    colours: [
      {
        name: { type: String, required: true },
        hex: { type: String },
        twoSided: { type: Boolean, default: false },
        inMass: { type: Boolean, default: false },
      },
    ],
  },
  {
    timestamps: true,
    toObject: { virtuals: true },
    toJSON: { virtuals: true },
  }
);

export const WindowProductModel: Model<IWindowProduct> =
  mongoose.models.WindowProduct ||
  model<IWindowProduct>("WindowProduct", WindowProductSchema);
