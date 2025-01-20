import { Geist, Geist_Mono } from "next/font/google";
import 'C:/Users/Usuario/Documents/Github/app-fullstack-1/src/Styles/style.css'

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <main>
          {children}
        </main>
      </body>
    </html>
  );
}
