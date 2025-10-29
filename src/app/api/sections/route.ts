import { connectToDatabase } from "@/lib/connectToDb";
import { responseMessageUtilities } from "@/lib/response.message.utility";
import { AppError, route } from "@/lib/route";
import { SectionModel } from "@/models/section.model";
import { allSections } from "@/utils/sections";
import { Model, PipelineStage, Types } from "mongoose";
import { NextRequest } from "next/server";

export const PATCH = route(async (req: NextRequest) => {
  const body = await req.json();
  let { kind, page, items, ...updateData } = body;

  if (!page || !kind) {
    throw new AppError("page and kind are required", 400);
  }

  await connectToDatabase();

  // Pick the correct model dynamically based on discriminator
  try {
    const model =
      (SectionModel.discriminators?.[kind] as Model<any>) ?? SectionModel;
    console.log(model, "model");
    if (!model) {
      throw new AppError(`Invalid section kind: ${kind}`, 400);
    }

    const notItems = ["HeroSection", "InstallmentPlanSection"];

    if (!notItems.includes(kind)) {
      items = items?.map((itm: string) => new Types.ObjectId(itm));
    }

    const options = {
      new: true,
      runValidators: true,
      upsert: true,
    };

    const updatedDoc = await model.findOneAndUpdate(
      { page, kind },
      { ...updateData, items },
      options
    );

    if (!updatedDoc) {
      throw new AppError("Section not found or update failed", 404);
    }

    return {
      data: updatedDoc,
      message: "Section updated successfully",
      statusCode: responseMessageUtilities.created,
    };
  } catch (error) {
    console.log(error);
    throw new AppError("Internal Server Error", 400);
  }
});

export const GET = route(async (req: NextRequest) => {
  const searchParams = req.nextUrl.searchParams;

  const pageName = searchParams.get("pagename");
  const sectionKind = searchParams.get("kind");

  const filter: Record<string, any> = { deletedAt: null };
  if (pageName) filter.page = pageName;
  if (sectionKind) filter.kind = sectionKind;

  await connectToDatabase();

  const pipeline: PipelineStage[] = [{ $match: { ...filter } }];

  const collectionMap: Record<string, string[]> = {
    products: ["ProductSection", "ChooseWindowsAtAPriceThatSuitsYou"],
    services: ["ServiceSection"],
    windowsinstallationprocesses: ["WindowInstallationProcessSection"],
    basecards: [
      "WorkWithUsSection",
      "WindowsFromManufacturerSection",
      "OurPromotionsSection",
      "ArticleSection",
      "NewsSection",
      "AccessoriesSection",
    ],
    melkeprofiles: ["ComparisonOfMelkeProfiles"],
    melkefinishes: [allSections.MELKE_FINISH_SECTION],
    reviews: [allSections.REVIEW_SECTION],
  };

  let collectionName: string | undefined;
  for (const [col, kinds] of Object.entries(collectionMap)) {
    if (kinds.includes(sectionKind!)) {
      collectionName = col;
      break;
    }
  }

  if (collectionName) {
    const localVarName = `${collectionName}Ids`;

    pipeline.push({
      $lookup: {
        from: collectionName,
        let: { [localVarName]: "$items" },
        pipeline: [
          { $match: { $expr: { $in: ["$_id", `$$${localVarName}`] } } },
          { $project: { deletedAt: 0, updatedAt: 0 } },
        ],
        as: "items",
      },
    });
  }

  pipeline.push({
    $project: {
      updatedAt: 0,
      deletedAt: 0,
      __v: 0,
    },
  });

  const sections = await SectionModel.aggregate(pipeline);

  return {
    data: sections,
    message: "Sections fetched successfully",
    statusCode: responseMessageUtilities.success,
  };
});
