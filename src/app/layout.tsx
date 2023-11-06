import "@/styles/globals.css";

import { GeistSans } from "geist/font";

export const metadata = {
  title: "Next Template",
  description: "Created by thoo",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export const runtime = "edge";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body className={`${GeistSans.className}`}>{children}</body>
    </html>
  );
}
