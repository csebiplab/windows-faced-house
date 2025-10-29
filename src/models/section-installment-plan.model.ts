import mongoose, { Schema, Model } from "mongoose";
import { SectionBase, SectionModel } from "./section.model";

//
// 💸 INSTALLMENT PLAN SECTION
//
interface InstallmentStep {
  stepNumber: number;
  title: string;
  description: string;
}

interface InstallmentPlanSection extends SectionBase {
  mainTitle: string; // "Пластиковые окна в рассрочку"
  highlightTitle: string; // "Переплата"
  duration: string; // "6 мес."
  firstPayment: string; // "20%"
  note: string; // description under the main promo text
  imageUrl?: string; // optional decorative image (₽ symbol, etc.)
  steps: InstallmentStep[];
}

const installmentStepSchema = new Schema<InstallmentStep>({
  stepNumber: { type: Number, required: true },
  title: { type: String, required: true },
  description: { type: String, required: true },
});

const InstallmentPlanSectionSchema = new Schema<InstallmentPlanSection>({
  mainTitle: { type: String, required: true },
  highlightTitle: { type: String, required: true },
  duration: { type: String, required: true },
  firstPayment: { type: String, required: true },
  note: { type: String, required: true },
  imageUrl: { type: String },
  steps: { type: [installmentStepSchema], required: true },
});

const InstallmentPlanSectionModel: Model<InstallmentPlanSection> =
  (SectionModel.discriminators
    ?.InstallmentPlanSection as Model<InstallmentPlanSection>) ||
  SectionModel.discriminator<InstallmentPlanSection>(
    "InstallmentPlanSection",
    InstallmentPlanSectionSchema
  );

export { InstallmentPlanSectionModel };
