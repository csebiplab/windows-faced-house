import mongoose, { Schema, model, Document, Model } from "mongoose";

export interface IWindowsInstallation extends Document {
  serial: number;
  title: string;
  slug?: string;
  description?: string;
  imageUrl?: string;
  iconUrl?: string;
  deletedAt?: Date | null;
  createdAt: Date;
  updatedAt: Date;
}

const WindowsInstallationProcessSchema = new Schema<IWindowsInstallation>(
  {
    serial: { type: Number, required: true, index: true },
    title: { type: String, required: true, trim: true },
    slug: { type: String, required: false, trim: true },
    description: { type: String, required: false, trim: true },
    imageUrl: { type: String, required: false },
    iconUrl: { type: String, required: false },
    deletedAt: { type: Date, default: null },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

export const WindowInstallationModel: Model<IWindowsInstallation> =
  mongoose.models.WindowsInstallationProcess ||
  model<IWindowsInstallation>(
    "WindowsInstallationProcess",
    WindowsInstallationProcessSchema
  );
