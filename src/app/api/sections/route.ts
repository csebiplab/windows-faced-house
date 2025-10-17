import { connectToDatabase } from "@/lib/connectToDb";
import { responseMessageUtilities } from "@/lib/response.message.utility";
import { AppError, route } from "@/lib/route";
import { SectionModel } from "@/models/section.model";
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
  const model =
    (SectionModel.discriminators?.[kind] as Model<any>) ?? SectionModel;
  if (!model) {
    throw new AppError(`Invalid section kind: ${kind}`, 400);
  }

  if (kind !== "HeroSection") {
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

  const lookupMap: Record<string, string> = {
    ProductSection: "products",
    ServiceSection: "services",
    WindowInstallationProcessSection: "windowsinstallationprocesses",
    WorkWithUsSection: "basecards",
  };

  if (sectionKind && lookupMap[sectionKind]) {
    const collectionName = lookupMap[sectionKind];
    const localVarName = `${collectionName}Ids`;

    pipeline.push({
      $lookup: {
        from: collectionName,
        let: { [localVarName]: "$items" },
        pipeline: [
          {
            $match: {
              $expr: { $in: ["$_id", `$$${localVarName}`] },
            },
          },
          {
            $project: {
              deletedAt: 0,
              createdAt: 0,
              updatedAt: 0,
            },
          },
        ],
        as: "items",
      },
    });
  }

  pipeline.push({
    $project: {
      createdAt: 0,
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
