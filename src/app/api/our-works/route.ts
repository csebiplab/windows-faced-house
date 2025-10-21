import { connectToDatabase } from "@/lib/connectToDb";
import { responseMessageUtilities } from "@/lib/response.message.utility";
import { route } from "@/lib/route";
import { IOurWork, OurWorkModel } from "@/models/our-works.model";
import { NextRequest } from "next/server";

export const GET = route(
  async (req: NextRequest) => {
    await connectToDatabase();
    const res = await OurWorkModel.find().lean();

    return res;
  },
  { requireAuth: false }
);

export const POST = route(
  async (req: NextRequest) => {
    await connectToDatabase();

    const payload: Partial<IOurWork[]> = await req.json();

    const res = await OurWorkModel.create(payload);

    return {
      data: res,
      message: "Successfully Created",
      statusCode: responseMessageUtilities.created,
    };
  },
  { requireAuth: false }
);
