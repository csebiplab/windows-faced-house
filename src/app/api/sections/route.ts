import { connectToDatabase } from "@/lib/connectToDb";
import { responseMessageUtilities } from "@/lib/response.message.utility";
import { AppError, route } from "@/lib/route";
import { SectionModel } from "@/models/section.model";
import { Model, PipelineStage } from "mongoose";
import { NextRequest } from "next/server";

export const PATCH = route(async (req: NextRequest) => {
  const body = await req.json();
  const { kind, page, ...updateData } = body;

  if (!page || !kind) {
    throw new AppError("page and kind are required", 400);
  }

  await connectToDatabase();

  // Pick the correct model dynamically based on discriminator
  const model = SectionModel.discriminators?.[kind] as Model<any>;
  if (!model) {
    throw new AppError(`Invalid section kind: ${kind}`, 400);
  }

  const options = {
    new: true,
    runValidators: true,
    upsert: true,
  };

  const updatedDoc = await model.findOneAndUpdate(
    { page, kind },
    updateData,
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

  const filter: any = {
    deletedAt: null,
  };

  if (pageName) {
    filter.page = pageName;
  }

  if (sectionKind) {
    filter.kind = sectionKind;
  }
  await connectToDatabase();
  const pipeline: PipelineStage[] = [
    {
      $match: { ...filter },
    },
  ];
  if (sectionKind === "ProductSection") {
    const lookup = {
      $lookup: {
        from: "products",
        let: { productIds: "$items" },
        pipeline: [
          {
            $match: {
              $expr: {
                $in: ["$_id", "$$productIds"],
              },
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
    };
    pipeline.push(lookup);
  }
  if (sectionKind === "ServiceSection") {
    const lookup = {
      $lookup: {
        from: "services",
        let: { serviceIds: "$items" },
        pipeline: [
          {
            $match: {
              $expr: {
                $in: ["$_id", "$$serviceIds"],
              },
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
    };
    pipeline.push(lookup);
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
