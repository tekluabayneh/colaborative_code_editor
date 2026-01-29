import { EnvFileSystem } from "../../context/getNextConfigEnv"
import { FileSystemProvider } from "../../context/FileTreeContext"
import { FileContentProvider } from "../../context/EditorContext"
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
                    <FileContentProvider>
                        {children}
                    </FileContentProvider>
                </FileSystemProvider>
            </EnvFileSystem>
        </div>
    );
}
