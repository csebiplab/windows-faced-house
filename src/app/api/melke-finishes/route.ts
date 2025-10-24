import { connectToDatabase } from "@/lib/connectToDb";
import { responseMessageUtilities } from "@/lib/response.message.utility";
import { route } from "@/lib/route";
import MelkeFinishModel, { IMelkeFinish } from "@/models/melke-finish.model";
import { NextRequest } from "next/server";

export const GET = route(
  async (req: NextRequest) => {
    await connectToDatabase();
    const res = await MelkeFinishModel.find().lean();

    return res;
  },
  { requireAuth: false }
);

export const POST = route(
  async (req: NextRequest) => {
    await connectToDatabase();

    try {
      const payload: Partial<IMelkeFinish[]> = await req.json();

      const res = await MelkeFinishModel.create(payload);

      return {
        data: res,
        message: "Successfully Created",
        statusCode: responseMessageUtilities.created,
      };
    } catch (error) {
      console.log(error);
    }
  },
  { requireAuth: false }
);
