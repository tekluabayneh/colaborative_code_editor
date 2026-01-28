import type { Metadata } from "next";
import { EnvFileSystem } from "../../context/getNextConfigEnv"
import { FileSystemProvider } from "../../context/FileTreeContext"
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
        <div>

            <EnvFileSystem>
                <FileSystemProvider>
                    {children}
                </FileSystemProvider>
            </EnvFileSystem>
        </div>
    );
}
