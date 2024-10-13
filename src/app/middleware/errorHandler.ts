// src/app/middleware/errorHandler.ts
const errorHandler = (error: unknown): Response => {
  console.error("Error:", error);
  const body = {
    status: "error",
    message: error instanceof Error ? error.message : "Internal Server Error",
  };
  return new Response(JSON.stringify(body), {
    status: 500,
    headers: {
      "Content-Type": "application/json",
    },
  });
};

export default errorHandler;
