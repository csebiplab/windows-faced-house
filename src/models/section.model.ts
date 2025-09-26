import mongoose, { Schema, Model, Document } from "mongoose";

interface SectionBase extends Document {
  sectionId: number;
  page: string;
  kind: string;
  deletedAt?: Date;
  createdAt: Date;
  updatedAt: Date;
}

// Base schema
const SectionSchema = new Schema<SectionBase>(
  {
    sectionId: { type: Number, required: true },
    page: { type: String, required: true },
    kind: { type: String, required: true },
    deletedAt: { type: Date, default: null },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
    discriminatorKey: "kind", // <- important
  }
);

const SectionModel =
  mongoose.models.Section ||
  mongoose.model<SectionBase>("Section", SectionSchema);

/**
 * Hero Section
 */
interface HeroSection extends SectionBase {
  state: string;
  title: string;
  buttonName: string;
  description: string;
  imgUrl: string;
}

const HeroSectionSchema = new Schema<HeroSection>({
  state: { type: String, required: true },
  title: { type: String, required: true },
  buttonName: { type: String, required: true },
  description: { type: String, required: true },
  imgUrl: { type: String, required: true },
});

const HeroSectionModel: Model<HeroSection> =
  (SectionModel.discriminators?.HeroSection as Model<HeroSection>) ||
  SectionModel.discriminator<HeroSection>("HeroSection", HeroSectionSchema);

export { SectionModel, HeroSectionModel };
