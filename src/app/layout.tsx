import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import ThemeRegistry from "@/lib/ThemeRegistry";
import UserContextProvider from "@/lib/user.context";
import QueryProvider from "@/lib/queryProvider";

const roboto = Roboto({
  weight: ["300", "400", "500", "700"],
  subsets: ["latin"],
  display: "swap",
  variable: "--font-roboto",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://flowboard.nerdywebconsults.ng"),
  title: {
    default: "Nerdy FlowBoard",
    template: "%s | Nerdy",
  },
  description: "FlowBoard unifies your mind maps, tasks, and notes into a single, vibrant workspace. Stop switching apps and start connecting ideas.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={roboto.variable}>
      <body>
        <UserContextProvider>
          <ThemeRegistry>
            <QueryProvider>{children}</QueryProvider>
          </ThemeRegistry>
        </UserContextProvider>
      </body>
    </html>
  );
}
