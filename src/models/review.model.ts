import mongoose, { Model } from "mongoose";

export enum ReviewType {
  TEXT = "text",
  VIDEO = "video",
}

export interface IReview {
  type: ReviewType;
  name: string;
  rating: number;

  // For text reviews
  content?: string;
  // detailsLink?: string;

  // For video reviews
  videoUrl?: string;
  // thumbnailUrl?: string;
  // videoTitle?: string;
  // city?: string;

  deletedAt?: Date;
  createdAt?: Date;
  updatedAt?: Date;
}

const ReviewSchema = new mongoose.Schema<IReview>(
  {
    type: {
      type: String,
      enum: Object.values(ReviewType),
      required: true,
    },
    name: { type: String, required: true },
    rating: { type: Number, min: 1, max: 5, required: true },

    // Text review fields
    content: { type: String },
    // detailsLink: { type: String },

    // Video review fields
    videoUrl: { type: String },
    // thumbnailUrl: { type: String },
    // videoTitle: { type: String },
    // city: { type: String },

    deletedAt: { type: Date, default: null },
  },
  {
    timestamps: true,
    toObject: { virtuals: true },
    toJSON: { virtuals: true },
  }
);

const ReviewModel: Model<IReview> =
  mongoose.models.Review || mongoose.model<IReview>("Review", ReviewSchema);

export default ReviewModel;
