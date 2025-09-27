// import { v4 as uuidv4 } from 'uuid';
// import { FileNodeType } from '../types/FileNodeType';

// const sampleFiles = [
//   'src/index.js',
//   'src/components/App.js',
//   'src/components/Button.js',
//   'public/favicon.ico',
//   'README.md',
// ];

// export function buildFileTree(files: string[]): FileNodeType {
//   const root: FileNodeType = {
//     id: uuidv4(),
//     name: 'root',
//     type: 'folder',
//     children: [],
//     path: '',
//   };

//   files.forEach((filePath) => {
//     const parts = filePath.split('/');
//     let current = root;

//     parts.forEach((part, index) => {
//       const existing = current.children?.find((child) => child.name === part);

//       if (existing) {
//         current = existing;
//       } else {
//         const isFile = index === parts.length - 1;
//         const newNode: FileNodeType = {
//           id: uuidv4(),
//           name: part,
//           type: isFile ? 'file' : 'folder',
//           children: isFile ? undefined : [],
//           path: current.path ? `${current.path}/${part}` : part, // ✅ path builds up here
//         };

//         current.children!.push(newNode);
//         current = newNode;
//       }
//     });
//   });

//   return root;
// }

// // Example usage
// const tree = buildFileTree(sampleFiles);
// console.log(JSON.stringify(tree, null, 2));
