import mongoose, { Model, Schema } from "mongoose";
import { BaseCardModel, IBaseCard } from "./base-card.model";

export interface IWorkWithUsCard extends IBaseCard {
  cardType: "WorkWithUsCard";
  description?: string;
  order?: number;
}

const WorkWithUsCardSchema = new Schema<IWorkWithUsCard>({
  cardType: { type: String, default: "WorkWithUsCard" },
  description: { type: String, required: false },
  order: { type: Number, required: false },
});

export const WorkWithUsCardModel: Model<IWorkWithUsCard> =
  mongoose.models.WorkWithUsCard ||
  BaseCardModel.discriminator<IWorkWithUsCard>(
    "WorkWithUsCard",
    WorkWithUsCardSchema
  );
