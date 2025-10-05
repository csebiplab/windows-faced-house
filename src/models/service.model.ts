import mongoose, { Schema, model, Document, Model } from "mongoose";

export type ServiceType = "A" | "B" | "C" | "D" | "E";

export interface IService extends Document {
  serial: number;
  title?: string;
  type?: ServiceType;
  slug?: string;
  description?: string;
  imageUrl?: string;
  deletedAt?: Date | null;
  createdAt: Date;
  updatedAt: Date;
}

const SerivceSchema = new Schema<IService>(
  {
    serial: { type: Number, required: true },
    title: { type: String, required: false },
    type: {
      type: String,
      enum: ["A", "B", "C", "D", "E"],
      required: false,
    },
    slug: { type: String, required: false },
    description: { type: String, required: false },
    imageUrl: { type: String, required: false },
    deletedAt: { type: Date, default: null },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

export const ServiceModel: Model<IService> =
  mongoose.models.Service || model<IService>("Service", SerivceSchema);
