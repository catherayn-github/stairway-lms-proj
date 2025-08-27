/* STYLES */
import "@app/_styles/reset.scss";
import "@app/_styles/globals.css";

/* FONTS */
import { Figtree } from "next/font/google";
import Providers from "./_providers";

const figtree = Figtree({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-figtree",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={figtree.className}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
