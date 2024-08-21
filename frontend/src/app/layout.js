import { Teko } from "next/font/google";
import "./globals.css";
import { WalletContextProvider } from "@/context/wallet";

const teko = Teko({ subsets: ["latin"] });

export const metadata = {
  title: "EDUVERSE",
  description: "Where Education Meets Blockchain Innovation",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <WalletContextProvider>
        <body className={teko.className}>{children}</body>
      </WalletContextProvider>
    </html>
  );
}
