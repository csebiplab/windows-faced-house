import { connectToDatabase } from "@/lib/connectToDb";
import { responseMessageUtilities } from "@/lib/response.message.utility";
import { AppError, route } from "@/lib/route";
import { HeroSectionModel, SectionModel } from "@/models/section.model";
import { NextRequest } from "next/server";

export const PATCH = route(async (req: NextRequest) => {
  const body = await req.json();
  const { kind, page, sectionId, ...updateData } = body;

  if (!sectionId || !page || !kind) {
    throw new AppError("sectionId, page, and kind are required", 400);
  }

  let model = SectionModel || HeroSectionModel;

  const options = {
    new: true,
    runValidators: true,
    upsert: true,
  };

  const payload = { page, kind, sectionId, ...updateData };

  await connectToDatabase();
  const updatedDoc = await model.findOneAndUpdate(
    { page, kind },
    payload,
    options
  );

  if (!updatedDoc) {
    throw new AppError("Section not found or update failed", 404);
  }

  return {
    data: updatedDoc,
    message: "Section updated successfully",
    statusCode: responseMessageUtilities.created,
  };
});
