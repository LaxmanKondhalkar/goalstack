import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "./components/ThemeProvider";

// Configure Poppins font with specific weights
const poppins = Poppins({
  weight: ["300", "400", "500", "600", "700"],
  subsets: ["latin"],
  variable: "--font-poppins",
});

// Define metadata for SEO and browser tab display
export const metadata: Metadata = {
  title: "GoalStack - Student Savings Dashboard",
  description: "Track your savings goals and financial progress",
};

/**
 * Root layout component that wraps the entire application
 * 
 * Provides:
 * - Font configuration with Poppins
 * - Theme management via ThemeProvider
 * - Basic HTML structure
 * 
 * @param {Object} props - Component props
 * @param {React.ReactNode} props.children - Application content
 * @returns {JSX.Element} The application root layout
 */
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${poppins.variable} font-poppins min-h-screen`}>
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
