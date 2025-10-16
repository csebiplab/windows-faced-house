import mongoose, { Schema, Document, Model } from "mongoose";

export interface IBaseCard extends Document {
  title: string;
  url: string;
  cardType: string;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date;
}

const BaseCardSchema = new Schema<IBaseCard>(
  {
    title: { type: String, required: true },
    url: { type: String, required: true },
    cardType: { type: String, required: true },
    deletedAt: { type: Date, default: null },
  },
  {
    timestamps: true,
    discriminatorKey: "cardType",
    toObject: { virtuals: true },
    toJSON: { virtuals: true },
  }
);

export const BaseCardModel: Model<IBaseCard> =
  mongoose.models.BaseCard ||
  mongoose.model<IBaseCard>("BaseCard", BaseCardSchema);
