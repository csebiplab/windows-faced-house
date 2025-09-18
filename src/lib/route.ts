import { NextRequest, NextResponse } from "next/server";
import * as jwt from "jsonwebtoken";
import { responseMessageUtilities } from "./response.message.utility";

export class AppError extends Error {
  status: number;
  constructor(message: string, status = 500) {
    super(message);
    this.status = status;
  }
}

interface RouteOptions {
  requireAuth?: boolean;
}

interface JsonResponseMeta {
  [key: string]: any;
}

interface JsonResponse<T> {
  data: T | null;
  message: string;
  statusCode: number;
  status: boolean;
  meta?: JsonResponseMeta;
}

type HandlerReturn<T> =
  | T
  | {
      data: T;
      message?: string;
      meta?: JsonResponseMeta;
    };

export function route<T>(
  handler: (req: NextRequest) => Promise<HandlerReturn<T>> | HandlerReturn<T>,
  options: RouteOptions = {}
) {
  const JWT_SECRET = process.env.JWT_SECRET as string;

  return async (req: Request) => {
    try {
      if (options.requireAuth) {
        const authHeader = req.headers.get("authorization");
        if (!authHeader || !authHeader.startsWith("Bearer ")) {
          throw new AppError("Unauthorized", 401);
        }

        const token = authHeader.split(" ")[1];
        try {
          jwt.verify(token, JWT_SECRET);
        } catch {
          throw new AppError("Invalid or expired token", 401);
        }
      }

      const result = await handler(req as NextRequest);

      let data: T | null;
      let message: string = responseMessageUtilities.message;
      let meta: JsonResponseMeta | undefined;

      if (result && typeof result === "object" && "data" in result) {
        data = result.data;
        if (result.message) message = result.message;
        if (result.meta) meta = result.meta;
      } else {
        data = result as T;
      }

      const response: JsonResponse<T> = {
        data: data ?? null,
        message,
        statusCode: responseMessageUtilities.success,
        status: true,
        ...(meta ? { meta } : {}),
      };

      return NextResponse.json(response, { status: response.statusCode });
    } catch (err: any) {
      console.error("[Global Error]", err);

      const response: JsonResponse<null> = {
        data: null,
        message: err.message || "Internal Server Error",
        statusCode: err.status || 500,
        status: false,
      };

      return NextResponse.json(response, { status: response.statusCode });
    }
  };
}
