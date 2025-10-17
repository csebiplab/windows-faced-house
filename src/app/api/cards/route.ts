import { connectToDatabase } from "@/lib/connectToDb";
import { responseMessageUtilities } from "@/lib/response.message.utility";
import { AppError, route } from "@/lib/route";
import { BaseCardModel } from "@/models/base-card.model";
import { Model } from "mongoose";
import { NextRequest } from "next/server";

export const POST = route(async (req: NextRequest) => {
  const body = await req.json();
  const { cardType, items } = body;

  if (!cardType) throw new AppError("cardType is required", 400);

  await connectToDatabase();

  // console.log(Object.keys(BaseCardModel.discriminators || {}));
  // should print ["WorkWithUsCard"]

  const model =
    (BaseCardModel.discriminators?.[cardType] as Model<any>) ?? BaseCardModel;

  if (!model) throw new AppError(`Invalid card type: ${cardType}`, 400);

  const payload = items.map((item: any) => ({
    cardType,
    ...item,
  }));

  const createdDocs = await model.insertMany(payload, {
    ordered: true,
    rawResult: false,
  });

  if (!createdDocs?.length) throw new AppError("Create failed!", 400);

  return {
    data: createdDocs,
    message: "Cards created successfully",
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
