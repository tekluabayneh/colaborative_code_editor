import type { Metadata } from "next";
import { EnvFileSystem } from "../../context/getNextConfigEnv"
export const metadata: Metadata = {
    title: "invite page",
    description: "invite page",
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
                </EnvFileSystem>
            </body>
        </html >
    );
}
