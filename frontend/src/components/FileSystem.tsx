import { FilesystemItem } from "./filesystem-item";
import { Node } from "@/types/Node";

export default function Page({ folders }: { folders: Node[] }) {
    return (
        <ul>
            {folders?.map((node, index: number) => (
                // @ts-expect-error node tyeps is spesifyed
                <FilesystemItem node={node} key={index} />
            ))}
        </ul>
    );
}
