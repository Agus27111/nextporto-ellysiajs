import { Elysia } from "elysia";
import { socialMediaRoutes, userRoutes } from "@/app/routes";
import errorHandler from "@/app/middleware/errorHandler";

const app = new Elysia({ prefix: "/api" })
  .use(socialMediaRoutes) // Rute dengan prefiks "/api/social-media"
  .use(userRoutes) // Rute dengan prefiks "/api/users"
  .get("/", () => "Hello, Elysia!"); // Route dasar untuk GET

app.onError(errorHandler);

export const GET = app.handle;
export const POST = app.handle;
export const fetch = app.fetch; // Ekspor handler fetch untuk digunakan oleh Next.js
