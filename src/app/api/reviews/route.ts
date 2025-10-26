import { connectToDatabase } from "@/lib/connectToDb";
import { responseMessageUtilities } from "@/lib/response.message.utility";
import { route } from "@/lib/route";
import ReviewModel, { IReview } from "@/models/review.model";
import { NextRequest } from "next/server";

export const GET = route(
  async (req: NextRequest) => {
    await connectToDatabase();
    const res = await ReviewModel.find().lean();

    return res;
  },
  { requireAuth: false }
);

export const POST = route(
  async (req: NextRequest) => {
    await connectToDatabase();

    try {
      const payload: Partial<IReview[]> = await req.json();

      const res = await ReviewModel.create(payload);

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
