export interface ErrorDetails {
  message: string;
  name?: string;
  stack?: string;
  code?: string | number;
  cause?: unknown;
}

export const getErrorDetails = (error: unknown): ErrorDetails => {
  if (error instanceof Error) {
    return {
      message: error.message || "An error occurred",
      name: error.name,
      stack: error.stack,
      code: "code" in error ? (error.code as string | number) : undefined,
      cause: "cause" in error ? error.cause : undefined,
    };
  }

  if (typeof error === "string") {
    return { message: error };
  }

  if (error && typeof error === "object") {
    const obj = error as Record<string, unknown>;
    return {
      message: obj.message ? String(obj.message) : "An error occurred",
      name: obj.name ? String(obj.name) : undefined,
      stack: obj.stack ? String(obj.stack) : undefined,
      code: obj.code ? (obj.code as string | number) : undefined,
      cause: obj.cause,
    };
  }

  // handle null, undefined, or other primitive types
  if (error === null) {
    return { message: "Null error" };
  }
  if (error === undefined) {
    return { message: "Undefined error" };
  }

  return { message: String(error) };
};
