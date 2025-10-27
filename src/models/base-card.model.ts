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
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
    discriminatorKey: "cardType", // <-- important for discriminators
  }
);

const BaseCardModel: Model<IBaseCard> =
  mongoose.models.BaseCard ||
  mongoose.model<IBaseCard>("BaseCard", BaseCardSchema);

export interface IWorkWithUsCard extends IBaseCard {
  icon: string;
  // description?: string;
  // order?: number;
}

const WorkWithUsCardSchema = new Schema<IWorkWithUsCard>({
  icon: { type: String, required: true },
  // description: { type: String, required: false },
  // order: { type: Number, required: false },
});

const WorkWithUsCardModel: Model<IWorkWithUsCard> =
  (BaseCardModel.discriminators?.WorkWithUsCard as Model<IWorkWithUsCard>) ||
  BaseCardModel.discriminator<IWorkWithUsCard>(
    "WorkWithUsCard",
    WorkWithUsCardSchema
  );

export interface IOurPromotionsCard extends IBaseCard {
  description: string;
  slug?: string;
}

const OurPromotionCardSchema = new Schema<IOurPromotionsCard>({
  description: { type: String, required: true },
  slug: { type: String },
});

const OurPromotionCardModel: Model<IOurPromotionsCard> =
  (BaseCardModel.discriminators
    ?.OurPromotionsCard as Model<IOurPromotionsCard>) ||
  BaseCardModel.discriminator<IOurPromotionsCard>(
    "OurPromotionsCard",
    OurPromotionCardSchema
  );

export interface IArticlesCard extends IBaseCard {
  slug: string;
  slugLabel?: string;
  description?: string;
}

const ArticleSchema = new Schema<IArticlesCard>({
  slug: { type: String, required: true },
  slugLabel: { type: String },
  description: { type: String },
});

const ArticleModel: Model<IArticlesCard> =
  (BaseCardModel.discriminators?.ArticleCard as Model<IArticlesCard>) ||
  BaseCardModel.discriminator<IArticlesCard>("ArticleCard", ArticleSchema);

export {
  BaseCardModel,
  WorkWithUsCardModel,
  OurPromotionCardModel,
  ArticleModel,
};
