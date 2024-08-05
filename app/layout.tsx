import "@/styles/globals.css";
import { Metadata } from "next";
import clsx from "clsx";
import dynamic from "next/dynamic";
import { Loader } from "lucide-react";

import { siteConfig } from "@/config/site";
import NavbarCom from "@/components/navbar";
import { createClient } from "@/utils/supabase/server";

import { Providers } from "./providers";

export const metadata: Metadata = {
  title: {
    default: siteConfig.name,
    template: `%s - ${siteConfig.name}`,
  },
  description: siteConfig.description,
  icons: {
    icon: "/favicon.ico",
  },
};

const Footer = dynamic(() => import("@/components/ui/footer"), {
  ssr: false,
  loading: () => (
    <p>
      <Loader
        absoluteStrokeWidth
        className="animate-spin"
        size={28}
        strokeWidth={2.25}
      />
    </p>
  ),
});

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  let { data: username } = await supabase
    .from("profiles")
    .select("username,avatar")
    .eq(`id`, user?.id)
    .limit(1)
    .single();

  return (
    <html suppressHydrationWarning lang="en">
      <head />
      <body
        className={clsx("min-h-screen bg-background font-sans antialiased")}
      >
        <Providers themeProps={{ attribute: "class", defaultTheme: "dark" }}>
          <div className="relative flex flex-col h-screen">
            <NavbarCom ss={username} sss={user} />
            <main className="container mx-auto max-w-7xl pt-16 px-6 flex-grow">
              {children}
            </main>
            <Footer />
          </div>
        </Providers>
      </body>
    </html>
  );
}
