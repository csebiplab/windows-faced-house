import { connectToDatabase } from "@/lib/connectToDb";
import { route } from "@/lib/route";
import { BaseCardModel } from "@/models/base-card.model";
import MelkeFinishModel from "@/models/melke-finish.model";
import { MelkeProfileModel } from "@/models/melke-profile.model";
import { ProductModel } from "@/models/product.model";
import ReviewModel from "@/models/review.model";
import { ServiceModel } from "@/models/service.model";
import { WindowInstallationModel } from "@/models/windows-installation-process.model";
import { PipelineStage } from "mongoose";
import { NextRequest } from "next/server";

export const GET = route(
  async (req: NextRequest) => {
    const optFor = new URL(req.url).searchParams.get("optFor");
    if (!optFor) return [];

    await connectToDatabase();

    // Map groups of options to their models
    const modelGroups: Record<string, any> = {
      products: ProductModel,
      services: ServiceModel,
      installationprocesses: WindowInstallationModel,
      baseCard: BaseCardModel,
      melkeProfiles: MelkeProfileModel,
      melkefinishes: MelkeFinishModel,
      reviews: ReviewModel,
    };

    // Define which opts belong to the same model
    const baseCardTypes = [
      "WorkWithUsCard",
      "WindowsFromManufacturerCard",
      "OurPromotionsCard",
      "ArticleCard",
      "NewsCard",
    ];

    // Determine the correct model
    const model = baseCardTypes.includes(optFor)
      ? modelGroups.baseCard
      : modelGroups[optFor as keyof typeof modelGroups];

    if (!model) return [];

    // Build filter and pipeline
    const filter: Record<string, any> = {};
    if (baseCardTypes.includes(optFor)) filter.cardType = optFor;

    const pipeline: PipelineStage[] = [
      { $match: filter },
      {
        $project: {
          label: { $ifNull: ["$title", "$name"] },
          value: "$_id",
          _id: 0,
        },
      },
    ];

    const data = await model.aggregate(pipeline);
    return data;
  },
  { requireAuth: false }
);
