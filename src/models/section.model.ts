import mongoose, { Model } from "mongoose";

interface Section {
  sectionId: number;
  page: string;
  kind: string;
  state?: string;
  title?: string;
  buttonName?: string;
  description?: string;
  imgUrl?: string;
  deletedAt?: Date;
  createdAt: Date;
  updatedAt: Date;
}

const SectionSchema = new mongoose.Schema(
  {
    sectionId: { type: Number, required: true },
    page: { type: String, required: true },
    kind: { type: String, required: true },
    state: { type: String, required: false },
    title: { type: String, required: false },
    buttonName: { type: String, required: false },
    description: { type: String, required: false },
    imgUrl: { type: String, required: false },
    deletedAt: { type: Date, default: null },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
  },
  {
    timestamps: true,
    toObject: { virtuals: true },
    toJSON: { virtuals: true },
  }
);

const SectionModel: Model<Section> =
  (mongoose.models.Section as Model<Section>) ||
  mongoose.model<Section>("Section", SectionSchema);

export default SectionModel;
