import { connectToDatabase } from "@/lib/connectToDb";
import { responseMessageUtilities } from "@/lib/response.message.utility";
import { AppError, route } from "@/lib/route";
import { BaseCardModel } from "@/models/base-card.model";
import { Model } from "mongoose";
import { NextRequest } from "next/server";

export const POST = route(async (req: NextRequest) => {
  const body = await req.json();
  const { kind, ...updateData } = body;

  if (!kind) {
    throw new AppError("kind is required", 400);
  }

  await connectToDatabase();

  // Pick the correct model dynamically based on discriminator
  const model = BaseCardModel.discriminators?.[kind] as Model<any>;
  if (!model) {
    throw new AppError(`Invalid card kind: ${kind}`, 400);
  }

  const options = {
    new: true,
    runValidators: true,
    upsert: false,
  };

  const updatedDoc = await model.findOneAndUpdate(
    { kind, ...updateData },
    options
  );

  if (!updatedDoc) {
    throw new AppError("Create Failed!!!", 404);
  }

  return {
    data: updatedDoc,
    message: "Card Created successfully",
    statusCode: responseMessageUtilities.created,
  };
});

export const GET = route(async (req: NextRequest) => {
  await connectToDatabase();
  const cards = await BaseCardModel.find({});
  return {
    data: cards,
    message: "Cards retrieved successfully",
    statusCode: responseMessageUtilities.success,
  };
});
