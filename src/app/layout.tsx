import "@/styles/globals.css";

import { GeistSans } from "geist/font/sans";
import { type Metadata } from "next";
import { Layout } from "@/components/layout";
import { TRPCReactProvider } from "@/trpc/react";
import { SessionProvider } from "next-auth/react";
import { ThemeProvider } from "next-themes";

export const metadata: Metadata = {
  title: "Create T3 App",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};
export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${GeistSans.variable} mdl-js`}>
      <body>
        <SessionProvider>
            {/* <ThemeProvider attribute="class" defaultTheme="system" enableSystem> */}
                <Layout>
                        <TRPCReactProvider>{children}</TRPCReactProvider>
                </Layout>
            {/* </ThemeProvider> */}
        </SessionProvider>
      </body>
    </html>
  );
}
