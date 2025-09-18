import { NextResponse } from "next/server";
import { responseMessageUtilities } from "./response.message.utility";

interface JsonResponseOptions {
  status?: number;
  meta?: Record<string, any>;
}

interface JsonResponseParams<T> {
  data?: T | null; // <-- allows null as a valid value
  message?: string;
  statusCode?: number;
  status?: boolean;
  options?: JsonResponseOptions;
}

export const jsonResponse = <T>({
  data = null, // <-- default to null
  message = responseMessageUtilities.message,
  statusCode = responseMessageUtilities.success,
  status = responseMessageUtilities.statusFalse,
  options,
}: JsonResponseParams<T> = {}) => {
  const response: {
    message: string;
    data: T | null;
    statusCode: number;
    status: boolean;
    meta?: Record<string, any>;
  } = {
    message,
    data,
    statusCode,
    status,
  };

  if (options?.meta) {
    response.meta = options.meta;
  }

  const { meta, ...restOptions } = options || {};

  return NextResponse.json(response, {
    status: statusCode,
    ...restOptions,
  });
};
