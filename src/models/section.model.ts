import mongoose, { Schema, Model, Document } from "mongoose";

interface SectionBase extends Document {
  page: string;
  kind: string;
  deletedAt?: Date;
  createdAt: Date;
  updatedAt: Date;
}

// Base schema
const SectionSchema = new Schema<SectionBase>(
  {
    page: { type: String, required: true },
    kind: { type: String, required: true },
    deletedAt: { type: Date, default: null },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
    discriminatorKey: "kind", // <-- important for discriminators
  }
);

const SectionModel: Model<SectionBase> =
  mongoose.models.Section ||
  mongoose.model<SectionBase>("Section", SectionSchema);

/**
 * Hero Section Starts
 */
interface HeroSectionContent {
  sectionId: number;
  state: string;
  title: string;
  buttonName: string;
  description: string;
  imgUrl: string;
}

interface HeroSection extends SectionBase {
  sectionContent: HeroSectionContent[];
}

// Schema for individual section content
const heroSectionContentSchema = new Schema<HeroSectionContent>({
  sectionId: { type: Number, required: true },
  state: { type: String, required: true },
  title: { type: String, required: true },
  buttonName: { type: String, required: true },
  description: { type: String, required: true },
  imgUrl: { type: String, required: true },
});

// HeroSection schema with array of sectionContent
const HeroSectionSchema = new Schema<HeroSection>({
  sectionContent: { type: [heroSectionContentSchema], required: true },
});

// Discriminator model
const HeroSectionModel: Model<HeroSection> =
  (SectionModel.discriminators?.HeroSection as Model<HeroSection>) ||
  SectionModel.discriminator<HeroSection>("HeroSection", HeroSectionSchema);

/**
 * Hero Section Ends
 */

/**
 * Product Section Starts
 */
interface IProductsSection extends SectionBase {
  title: string;
  products: mongoose.Types.ObjectId[];
}

const ProductSectionSchema = new Schema<IProductsSection>({
  title: { type: String, required: true },
  products: { type: [mongoose.Types.ObjectId], required: true },
});

// Discriminator model
const ProductSectionModel: Model<IProductsSection> =
  (SectionModel.discriminators?.ProductSection as Model<IProductsSection>) ||
  SectionModel.discriminator<IProductsSection>(
    "ProductSection",
    ProductSectionSchema
  );

export { SectionModel, HeroSectionModel, ProductSectionModel };
