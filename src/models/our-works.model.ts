import mongoose, { Document, model, Model, Schema } from "mongoose";

export interface IOurWork extends Document {
  title: string;
  description: string;
  workArea: string;
  developer: string;
  startAt: Date;
  endAt: Date;
  url: string;
  slug?: string;
  slugLabel?: string;
  deletedAt: Date | null;
}

const OurWorkSchema = new Schema<IOurWork>(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    workArea: { type: String, required: true },
    developer: { type: String, required: true },
    startAt: { type: Date, required: true },
    endAt: { type: Date, required: true },
    url: { type: String, required: true },
    slug: { ype: String, required: false },
    slugLabel: { type: String, required: false },
    deletedAt: { type: Date, default: null },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

export const OurWorkModel: Model<IOurWork> =
  mongoose.models.OurWork || model<IOurWork>("OurWork", OurWorkSchema);
