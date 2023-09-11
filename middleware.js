import { authMiddleware } from "@clerk/nextjs";
 
// configured routes that are public and protected
export default authMiddleware({
    publicRoutes: ["/","/api/creatNote","/api/getNote","/api/getNote/[id]"],
    //ignoredRoutes: ["/((?!api|trpc))(_next|.+\..+)(.*)", "/api/getNote/64e65787580eb6c61bef9687"]
});
 
export const config = {
  matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
};
