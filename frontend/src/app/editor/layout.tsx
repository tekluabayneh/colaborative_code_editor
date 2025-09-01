import type { Metadata } from "next";
import {FileContentProvider} from "../../context/EditorContext"

export const metadata: Metadata = {
  title: "editor page",
  description: "editor apge",
};

export default function RootLayout({ children, }: Readonly<{ children: React.ReactNode; }>) {
  return (
      <div> 
        <FileContentProvider>
		{children}
        </FileContentProvider>
      </div>
  );
}

