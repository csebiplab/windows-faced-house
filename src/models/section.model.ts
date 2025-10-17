import mongoose, { Schema, Model, Document } from "mongoose";

interface SectionBase extends Document {
  page: string;
  kind: string;
  title?: string;
  items?: any[];
  deletedAt?: Date;
  createdAt: Date;
  updatedAt: Date;
}

const SectionSchema = new Schema<SectionBase>(
  {
    page: { type: String, required: true },
    kind: { type: String, required: true },
    title: { type: String },
    items: { type: mongoose.Schema.Types.Mixed },
    deletedAt: { type: Date, default: null },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
    discriminatorKey: "kind",
  }
);

const SectionModel: Model<SectionBase> =
  mongoose.models.Section ||
  mongoose.model<SectionBase>("Section", SectionSchema);

//
// 🦸 HERO SECTION
//
interface HeroSectionContent {
  sectionId: number;
  state: string;
  title: string;
  buttonName: string;
  description: string;
  imgUrl: string;
}

interface HeroSection extends SectionBase {
  items: HeroSectionContent[];
}

const heroSectionContentSchema = new Schema<HeroSectionContent>({
  sectionId: { type: Number, required: true },
  state: { type: String, required: true },
  title: { type: String, required: true },
  buttonName: { type: String, required: true },
  description: { type: String, required: true },
  imgUrl: { type: String, required: true },
});

const HeroSectionSchema = new Schema<HeroSection>({
  items: { type: [heroSectionContentSchema], required: true },
});

const HeroSectionModel: Model<HeroSection> =
  (SectionModel.discriminators?.HeroSection as Model<HeroSection>) ||
  SectionModel.discriminator<HeroSection>("HeroSection", HeroSectionSchema);

//
// 🪟 WINDOW INSTALLATION PROCESS SECTION
//
interface IWindowInstallationProcessSection extends SectionBase {
  descriptionTop: string;
  descriptionBottom: string;
  footerTitle: string;
  footerDescription?: string;
  items: mongoose.Types.ObjectId[];
}

const WindowInstallationSectionSchema =
  new Schema<IWindowInstallationProcessSection>({
    title: { type: String, required: true },
    descriptionTop: { type: String, required: true },
    descriptionBottom: { type: String, required: true },
    footerTitle: { type: String, required: true },
    footerDescription: { type: String },
    items: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "WindowsInstallationProcess",
        required: true,
      },
    ],
  });

const WindowInstallationProcessSectionModel: Model<IWindowInstallationProcessSection> =
  (SectionModel.discriminators
    ?.WindowInstallationProcessSection as Model<IWindowInstallationProcessSection>) ||
  SectionModel.discriminator<IWindowInstallationProcessSection>(
    "WindowInstallationProcessSection",
    WindowInstallationSectionSchema
  );

export {
  SectionModel,
  HeroSectionModel,
  WindowInstallationProcessSectionModel,
};
