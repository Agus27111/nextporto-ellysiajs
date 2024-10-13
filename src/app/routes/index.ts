import { Elysia, t } from "elysia";
import {
  getAllSocialMedia,
  createSocialMedia,
} from "@/app/controllers/socialMediaController";
import {
  getAllUsers,
  findUserById,
  createUser,
  deleteUserById,
  updateUserById,
} from "@/app/controllers/userController";

const socialMediaRoutes = new Elysia({ prefix: "/social-media" })
  .get("/", () => getAllSocialMedia())
  .post(
    "/",
    ({ body }) =>
      createSocialMedia(
        body as { platform: string; icon: string; url: string }
      ),
    {
      body: t.Object({
        platform: t.String({ minLength: 2, maxLength: 100 }),
        icon: t.String(),
        url: t.String(),
      }),
    }
  );

const userRoutes = new Elysia({ prefix: "/users" })
  .get("/", () => getAllUsers())
  .get("/:id", ({ params: { id } }) => findUserById(id))
  .post(
    "/",
    ({ body }) =>
      createUser(body as { name: string; location: string; email: string }),
    {
      body: t.Object({
        name: t.String(),
        location: t.String(),
        email: t.String(),
      }),
    }
  )
  .delete("/:id", ({ params: { id } }) => deleteUserById(id))
  .put(
    "/:id",
    ({ params: { id }, body }) =>
      updateUserById(
        id,
        body as { name?: string; location?: string; email?: string }
      ),
    {
      body: t.Object({
        name: t.String(),
        location: t.String(),
        email: t.String(),
      }),
    }
  );

// Export both route groups
export { socialMediaRoutes, userRoutes };
