import type { Metadata } from "next";
import { EnvFileSystem } from "../../context/getNextConfigEnv"
import { FileSystemProvider } from "../../context/FileTreeContext"
import { Toaster } from 'react-hot-toast';

export const metadata: Metadata = {
    title: "invitation page",
    description: "accept invitation apge",
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
                    <Toaster />
                </FileSystemProvider>
            </EnvFileSystem>
        </div>
    );
}
