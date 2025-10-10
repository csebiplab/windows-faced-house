import { connectToDatabase } from "@/lib/connectToDb";
import { route } from "@/lib/route";
import { ProductModel } from "@/models/product.model";
import { ServiceModel } from "@/models/service.model";
import { PipelineStage } from "mongoose";
import { NextRequest } from "next/server";

export const GET = route(
  async (req: NextRequest) => {
    const optFor = new URL(req.url).searchParams.get("optFor");
    if (!optFor) return [];

    const modelMap = {
      products: ProductModel,
      services: ServiceModel,
    };

    if (!(optFor in modelMap)) return [];

    const model = modelMap[optFor as keyof typeof modelMap];

    await connectToDatabase();

    const pipeline: PipelineStage[] = [
      {
        $match: {},
      },
      {
        $project: {
          label: "$title",
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
