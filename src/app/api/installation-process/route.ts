import { connectToDatabase } from "@/lib/connectToDb";
import { responseMessageUtilities } from "@/lib/response.message.utility";
import { route } from "@/lib/route";
import {
  IWindowsInstallation,
  WindowInstallationModel,
} from "@/models/windows-installation-process.model";
import { NextRequest } from "next/server";

export const GET = route(
  async (req: NextRequest) => {
    await connectToDatabase();
    const res = await WindowInstallationModel.find().lean();

    return res;
  },
  { requireAuth: false }
);

export const POST = route(
  async (req: NextRequest) => {
    await connectToDatabase();

    const payload: Partial<IWindowsInstallation[]> = await req.json();

    const res = await WindowInstallationModel.create(payload);

    return {
      data: res,
      message: "Successfully Created",
      statusCode: responseMessageUtilities.created,
    };
  },
  { requireAuth: false }
);
