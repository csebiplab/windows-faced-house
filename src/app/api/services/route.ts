import { connectToDatabase } from "@/lib/connectToDb";
import { responseMessageUtilities } from "@/lib/response.message.utility";
import { route } from "@/lib/route";
import { IService, ServiceModel } from "@/models/service.model";
import { NextRequest } from "next/server";

export const GET = route(
  async (req: NextRequest) => {
    await connectToDatabase();
    const res = await ServiceModel.find().lean();

    return res;
  },
  { requireAuth: false }
);

export const POST = route(
  async (req: NextRequest) => {
    await connectToDatabase();

    const payload: Partial<IService[]> = await req.json();

    const res = await ServiceModel.create(payload);

    return {
      data: res,
      message: "Successfully Created",
      statusCode: responseMessageUtilities.created,
    };
  },
  { requireAuth: false }
);
