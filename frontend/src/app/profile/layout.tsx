import type { Metadata } from "next";
import { EnvFileSystem } from "../../context/getNextConfigEnv"
import { FileSystemProvider } from "../../context/FileTreeContext"

export const metadata: Metadata = {
    title: "profile page",
    description: "profile apge",
};

export default function RootLayout({ children, }: Readonly<{ children: React.ReactNode; }>) {
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
