import { NextResponse } from "next/server";

export class AppError extends Error {
  status: number;
  constructor(message: string, status = 500) {
    super(message);
    this.status = status;
  }
}

type RouteHandler = (req: Request) => Promise<Response> | Response;

export function withErrorHandler(handler: RouteHandler): RouteHandler {
  return async (req: Request) => {
    try {
      return await handler(req);
    } catch (err: unknown) {
      console.error("[Global Error]", err);

      if (err instanceof AppError) {
        return NextResponse.json(
          { success: false, message: err.message },
          { status: err.status }
        );
      }

      return NextResponse.json(
        { success: false, message: "Internal Server Error" },
        { status: 500 }
      );
    }
  };
}
