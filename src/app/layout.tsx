import "@/styles/globals.css";

import { GeistSans } from "geist/font/sans";
import { type Metadata } from "next";
import { Layout } from "@/components/layout";
import { TRPCReactProvider } from "@/trpc/react";
import { SessionProvider } from "next-auth/react";
import { ThemeProvider } from "next-themes";
import { Toaster } from "react-hot-toast";
import { Toaster as ShadcnToaster } from "@/components/ui/toaster";
import { auth } from "@/server/auth";

export const metadata: Metadata = {
  title: "BLUE MOON",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};
export default async function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
    // const session = await auth();
  return (
    <html lang="en" className={`${GeistSans.variable} mdl-js`}>
      <body>
        <SessionProvider >
            {/* <ThemeProvider attribute="class" defaultTheme="system" enableSystem> */}
                <Layout>
                        <TRPCReactProvider>{children}</TRPCReactProvider>
                        <Toaster />
                        <ShadcnToaster />
                </Layout>
            {/* </ThemeProvider> */}
        </SessionProvider>
      </body>
    </html>
  );
}
