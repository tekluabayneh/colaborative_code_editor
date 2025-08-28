import { FilesystemItem } from './filesystem-item';
import { Node } from '@/types/Node';

export default function Page({folders}) {
    console.log("from FileSytem", folders)
  return (
    <ul>
      {folders?.map((node:Node) => (
        <FilesystemItem node={node} key={node.name} />
      ))}
    </ul>
  );
}

