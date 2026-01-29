import type { Metadata } from "next";
import { EnvFileSystem } from "../../context/getNextConfigEnv"
import { FileSystemProvider } from "../../context/FileTreeContext"
import { FileContentProvider } from "../../context/EditorContext"

export const metadata: Metadata = {
    title: "activity",
    description: "this is activity page",
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
                    <FileContentProvider>
                        {children}
                    </FileContentProvider>
                </FileSystemProvider>
            </EnvFileSystem>
        </div>
    );
}
