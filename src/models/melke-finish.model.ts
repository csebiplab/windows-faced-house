import mongoose, { Schema, model, models, Document, Model } from "mongoose";

// Each option = one color or laminate texture
export interface FinishOption {
  name: string; // e.g. "Onix" or "Дуб Золотой"
  url: string; // image URL or path
  colorCode: string;
}

export interface IMelkeFinish extends Document {
  category: "Cool Colours" | "Lamination"; // tab/category type
  title: string; // e.g. "Окна в покрытии Cool Colours"
  subtitle: string; // description intro
  description?: string; // detailed description
  availableSystems: string[]; // e.g. ["Melke Smart Ultra", "Melke Evolution"]
  price: number;
  currency?: string;
  badge?: string;
  priceNote?: string;
  options: FinishOption[]; // list of colours or laminations
  createdAt?: Date;
  updatedAt?: Date;
}

const FinishOptionSchema = new Schema<FinishOption>(
  {
    name: { type: String, required: true },
    url: { type: String, required: true },
    colorCode: { type: String, required: true },
  },
  { _id: false }
);

const MelkeFinishSchema = new Schema<IMelkeFinish>(
  {
    category: {
      type: String,
      enum: ["Cool Colours", "Lamination"],
      required: true,
    },
    title: { type: String, required: true },
    subtitle: { type: String, required: true },
    description: { type: String },
    availableSystems: [{ type: String }],
    price: { type: Number, required: true },
    currency: { type: String, default: "₽" },
    badge: { type: String },
    priceNote: { type: String },
    options: [FinishOptionSchema],
  },
  { timestamps: true }
);

const MelkeFinishModel: Model<IMelkeFinish> =
  mongoose.models.MelkeFinish ||
  mongoose.model<IMelkeFinish>("MelkeFinish", MelkeFinishSchema);
export default MelkeFinishModel;
