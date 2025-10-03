import { connectToDatabase } from "@/lib/connectToDb";
import { route } from "@/lib/route";
import { ProductModel } from "@/models/product.model";
import { PipelineStage } from "mongoose";
import { NextRequest } from "next/server";

export const GET = route(
  async (req: NextRequest) => {
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
    const data = await ProductModel.aggregate(pipeline);

    return data;
  },
  { requireAuth: false }
);
