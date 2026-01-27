import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "../styles/globals.css"
import { EnvFileSystem } from "../../context/getNextConfigEnv"
import { Toaster } from 'react-hot-toast';
const geistSans = Geist({
    variable: "--font-geist-sans",
    subsets: ["latin"],
});

const geistMono = Geist_Mono({
    variable: "--font-geist-mono",
    subsets: ["latin"],
});

export const metadata: Metadata = {
    title: "landing page",
    description: "landing apge",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body className={`${geistSans.variable} ${geistMono.variable} antialiased`} >
                <EnvFileSystem>
                    {children}
                    <Toaster />
                </EnvFileSystem>
            </body>
        </html >
    );
}
