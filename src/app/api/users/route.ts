import { connectToDatabase } from "@/lib/connectToDb";
import { responseMessageUtilities } from "@/lib/response.message.utility";
import { AppError, route } from "@/lib/route";
import UserModel from "@/models/user.model";
import bcrypt from "bcryptjs";
import { NextRequest } from "next/server";

export const GET = route(
  async (req: NextRequest) => {
    await connectToDatabase();
    const users = await UserModel.find().select({ password: 0 }).lean();

    return users;
  },
  { requireAuth: true }
);

export const POST = route(
  async (req: NextRequest) => {
    await connectToDatabase();

    const { username, email, password, kind } = await req.json();

    if (!username || !email || !password || !kind) {
      throw new AppError(
        "Username, email, password, and kind are required",
        responseMessageUtilities.bad_request
      );
    }

    const lowercaseEmail = email.toLowerCase();
    const lowercaseUsername = username.toLowerCase();

    const existingUser = await UserModel.findOne({
      $or: [{ email: lowercaseEmail }, { username: lowercaseUsername }],
    });

    if (existingUser) {
      throw new AppError(
        "Username or email already exists",
        responseMessageUtilities.bad_request
      );
    }

    const hashedPassword = await bcrypt.hash(
      password,
      process.env.SALT_ROUNDS ? parseInt(process.env.SALT_ROUNDS) : 10
    );

    const user = await UserModel.create({
      username: lowercaseUsername,
      email: lowercaseEmail,
      password: hashedPassword,
      kind,
    });

    return {
      data: user,
      message: "User created successfully",
      statusCode: responseMessageUtilities.created,
    };
  },
  { requireAuth: false }
);
