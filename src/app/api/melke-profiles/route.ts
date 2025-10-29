import { connectToDatabase } from "@/lib/connectToDb";
import { responseMessageUtilities } from "@/lib/response.message.utility";
import { route } from "@/lib/route";
import { IMelkeProfile, MelkeProfileModel } from "@/models/melke-profile.model";
import { NextRequest } from "next/server";

export const GET = route(
  async (req: NextRequest) => {
    await connectToDatabase();
    const res = await MelkeProfileModel.find().lean();

    return res;
  },
  { requireAuth: false }
);

export const POST = route(
  async (req: NextRequest) => {
    await connectToDatabase();

    try {
      const payload: Partial<IMelkeProfile[]> = await req.json();

      const res = await MelkeProfileModel.create(payload);

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
