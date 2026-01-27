import type { Metadata } from "next";
import { EnvFileSystem } from "../../context/getNextConfigEnv"
import { Toaster } from 'react-hot-toast';

export const metadata: Metadata = {
    title: "Auth page",
    description: "Auth apge",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body>
                <EnvFileSystem>
                    {children}
                    <Toaster />
                </EnvFileSystem>

            </body>
        </html >
    );
}
