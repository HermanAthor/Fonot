import { authMiddleware } from "@clerk/nextjs";

// configured routes that are public and protected
export default authMiddleware({
  publicRoutes: [
    "/",
    "/api/creatNote",
    "/api/getNote",
    "/api/getNote/[noteId]",
    "/api/deleteNote",
  ],
  //ignoredRoutes: ["/((?!api|trpc))(_next|.+..+)(.*)", "/api/getNote/noteId"],
});

export const config = {
  matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
};
