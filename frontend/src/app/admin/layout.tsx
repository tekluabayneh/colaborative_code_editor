import { EnvFileSystem } from "../../context/getNextConfigEnv"
import { FileSystemProvider } from "../../context/FileTreeContext"
import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "admin",
    description: "this is admin page",
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
