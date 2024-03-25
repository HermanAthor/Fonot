//import { ClerkProvider } from "@clerk/nextjs";
import "./globals.css";
import { Inter } from "next/font/google";
import "react-loading-skeleton/dist/skeleton.css";
import "@uploadthing/react/styles.css";
import { NextSSRPlugin } from "@uploadthing/react/next-ssr-plugin";
import { ourFileRouter } from "./api/uploadthing/core";
import { extractRouterConfig } from "uploadthing/server";
import { Toaster } from "@/components/ui/sonner";
import AuthProvider from "@/components/AuthProviders";
import { ThemeProvider } from "@/components/theme-provider";
import RecoilStateProvider from "@/components/providers/RecoilStateProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Fonot",
  description: "Home to your recipes",
};

export default function RootLayout({ children }) {
  return (
    <AuthProvider>
      <html lang="en">
        <body className={inter.className}>
          <RecoilStateProvider>
            <ThemeProvider
              attribute="class"
              defaultTheme="system"
              enableSystem
              disableTransitionOnChange
            >
              <NextSSRPlugin
                routerConfig={extractRouterConfig(ourFileRouter)}
              />

              {children}
              <Toaster />
            </ThemeProvider>
          </RecoilStateProvider>
        </body>
      </html>
    </AuthProvider>
  );
}
