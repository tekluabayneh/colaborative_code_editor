// type FileList ={
//   name:string,
//   type:string,
//   _id:string,
//   parentId:number,
//     }

// const BuildTree =(FlatList:FileList , parentId:string) => {

// return <FileList>FlatList.filter((item) => String(item.parentId) == String(parentId))
//     .map(item =>(
//      {...item,
//         children: BuildTree(FlatList, item._id)
//         }
//         ))
// }

// export default BuildTree
