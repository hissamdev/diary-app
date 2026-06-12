import type { Metadata } from "next";
import { Geist, Geist_Mono, Inter, Manrope } from "next/font/google";
// @ts-ignore
import "./globals.css";

const geistSans = Geist({
    variable: "--font-geist-sans",
    subsets: ["latin"],
});

const geistMono = Geist_Mono({
    variable: "--font-geist-mono",
    subsets: ["latin"],
});

const interFont = Inter({
    variable: "--font-inter",
    subsets: ["latin"],
});

const manropeFont = Manrope({
    variable: "--font-manrope",
    subsets: ["latin"],
});

export const metadata: Metadata = {
    title: "Tag-based journaling application",
    description:
        "Write down what was memorable, in a way that you can revisit.",
    robots: {
        index: false,
    },
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en" suppressHydrationWarning>
            <head>
                <link
                    rel="icon"
                    href="/favicon.svg"
                    type="image/svg+xml"
                ></link>
            </head>
            <body
                className={`${geistSans.variable} ${geistMono.variable} ${interFont.variable} ${manropeFont.variable} antialiased`}
            >
                {children}
            </body>
        </html>
    );
}
