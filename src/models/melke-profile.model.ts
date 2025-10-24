import mongoose, { Schema, model, Document, Model } from "mongoose";

export interface ISpecs {
  width: string;
  thickness: string;
  chambers: string;
  thermal: string;
  sound: string;
  class: string;
  price: string;
}

export interface IMelkeProfile extends Document {
  serial: number;
  title: string;
  description?: string;
  image: string;
  specs: ISpecs;
  colors: string[];
  seals: string[];
  badge?: string;
  badgeColor?: string;
  deletedAt?: Date | null;
  createdAt: Date;
  updatedAt: Date;
}

const SpecsSchema = new Schema<ISpecs>(
  {
    width: { type: String, required: true },
    thickness: { type: String, required: true },
    chambers: { type: String, required: true },
    thermal: { type: String, required: true },
    sound: { type: String, required: true },
    class: { type: String, required: true },
    price: { type: String, required: true },
  },
  { _id: false }
);

const MelkeProfileSchema = new Schema<IMelkeProfile>(
  {
    serial: { type: Number, required: true, unique: true },
    title: { type: String, required: true },
    description: { type: String },
    image: { type: String, required: true },
    specs: { type: SpecsSchema, required: true },
    colors: { type: [String], default: [] },
    seals: { type: [String], default: [] },
    badge: { type: String },
    badgeColor: { type: String },
    deletedAt: { type: Date, default: null },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

export const MelkeProfileModel: Model<IMelkeProfile> =
  mongoose.models.MelkeProfile ||
  model<IMelkeProfile>("MelkeProfile", MelkeProfileSchema);
