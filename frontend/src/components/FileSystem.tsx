import { FilesystemItem } from "./filesystem-item";
import { Node } from "@/types/Node";

export default function Page({ folders }: { folders: Node[] }) {
  return (
    <ul>
      {folders?.map((node: Node, index: number) => (
        <FilesystemItem node={node} key={index} />
      ))}
    </ul>
  );
}
