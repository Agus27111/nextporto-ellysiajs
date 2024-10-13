
const errorHandler = (error: unknown) => {
    console.error("Error:", error);
    return {
        status: "error",
        message: error instanceof Error ? error.message : "Internal Server Error",
    };
};

export default errorHandler;
