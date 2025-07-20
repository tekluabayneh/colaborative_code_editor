import { VscFolder, VscFile } from 'react-icons/vsc'
// check if the file is a folder or file

 type Document = {
    _id: string;
    name: string;
    type: "folder" | "file";
    parentId: string | null;
    ownerId: string;
    extension?: string; // Only for files
    content?: string; // Only for Files
};
const documents= [
  // User A's root folder
  {
    _id: "1",
    name: "main_folder",
    type: "folder",
    parentId: null,
    ownerId: "userA"
  },
  // Subfolder in main_folder
  {
    _id: "2",
    name: "project_alpha",
    type: "folder",
    parentId: "1",
    ownerId: "userA"
  },
  {
    _id: "3",
    name: "assets",
    type: "folder",
    parentId: "1",
    ownerId: "userA"
  },
  // Files in project_alpha
  {
    _id: "4",
    name: "index.html",
    type: "file",
    parentId: "2",
    ownerId: "userA",
    extension: "html",
    content: "<html></html>"
  },
  {
    _id: "5",
    name: "app.js",
    type: "file",
    parentId: "2",
    ownerId: "userA",
    extension: "js",
    content: "console.log('Hello');"
  },
  // Files in assets
  {
    _id: "6",
    name: "logo.png",
    type: "file",
    parentId: "3",
    ownerId: "userA",
    extension: "png",
    content: ""
  },
  // File directly in main_folder
  {
    _id: "7",
    name: "README.md",
    type: "file",
    parentId: "1",
    ownerId: "userA",
    extension: "md",
    content: "# Welcome"
  },

  // Another user: User B
  {
    _id: "10",
    name: "main_folder",
    type: "folder",
    parentId: null,
    ownerId: "userB"
  },
  {
    _id: "11",
    name: "blog_site",
    type: "folder",
    parentId: "10",
    ownerId: "userB"
  },
  {
    _id: "12",
    name: "main.py",
    type: "file",
    parentId: "11",
    ownerId: "userB",
    extension: "py",
    content: "print('Blog running')"
  }
];

 

const Folder_tree = (Documents)=> {
 console.log(Documents)

    return (
 <div className="folder-tree">
 </div>
    )
}

export default Folder_tree;
