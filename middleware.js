import { authMiddleware } from "@clerk/nextjs";
 
// configured routes that are public and protected
export default authMiddleware({
    publicRoutes: ["/","/api/creatNote","/api/getNote"],
});
 
export const config = {
  matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
};
