import { connectToDatabase } from "@/lib/connectToDb";
import { responseMessageUtilities } from "@/lib/response.message.utility";
import { AppError, route } from "@/lib/route";
import { WindowProductModel } from "@/models/window-product.model";
import { NextRequest } from "next/server";

export const PATCH = route(
  async (req: NextRequest) => {
    const body = await req.json();

    await connectToDatabase();

    const options = {
      new: true,
      runValidators: true,
      upsert: true,
    };

    const res = await WindowProductModel.create({ ...body }, options);

    if (!res) {
      throw new AppError("Failed to create window product", 404);
    }

    return {
      data: res,
      message: "Window product created successfully",
      statusCode: responseMessageUtilities.created,
    };
  },
  {
    requireAuth: false,
  }
);

export const GET = route(async (req: NextRequest) => {
  const searchParams = req.nextUrl.searchParams;

  const filter: Record<string, any> = { deletedAt: null };

  const type = searchParams.get("type");
  if (type) filter.type = type;

  await connectToDatabase();

  const res = await WindowProductModel.find(filter).sort({ serial: 1 });

  if (!res) {
    throw new AppError("No window products found", 404);
  }

  return {
    data: res,
    message: "Window products fetched successfully",
    statusCode: responseMessageUtilities.success,
  };
});
