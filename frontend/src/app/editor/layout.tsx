import type { Metadata } from "next";
import { FileContentProvider } from "../../context/EditorContext"
import { EnvFileSystem } from "../../context/getNextConfigEnv"
export const metadata: Metadata = {
    title: "editor page",
    description: "editor apge",
};

export default function RootLayout({ children, }: Readonly<{ children: React.ReactNode; }>) {
    return (
        <div>
            <FileContentProvider>
                <EnvFileSystem>
                    {children}
                </ EnvFileSystem>
            </FileContentProvider>
        </div>
    );
}

