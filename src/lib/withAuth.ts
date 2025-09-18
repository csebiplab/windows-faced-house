import { jsonResponse } from "./response.utils";
import * as jwt from "jsonwebtoken";
import type { NextResponse } from "next/server";

type Handler = (req: Request) => Promise<NextResponse>;

const withAuth = (handler: Handler) => {
  const JWT_SECRET = process.env.JWT_SECRET as string;

  return async (req: Request) => {
    try {
      const authHeader = req.headers.get("authorization");
      if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return jsonResponse({
          message: "Unauthorized",
          statusCode: 401,
        });
      }

      const token = authHeader.split(" ")[1];

      try {
        jwt.verify(token, JWT_SECRET);
      } catch (err) {
        return jsonResponse({
          message: "Invalid or expired token",
          statusCode: 401,
        });
      }

      return handler(req);
    } catch (err: any) {
      console.error(err);
      return jsonResponse({
        message: err.message || "Something went wrong",
        statusCode: 500,
      });
    }
  };
};

export default withAuth;
