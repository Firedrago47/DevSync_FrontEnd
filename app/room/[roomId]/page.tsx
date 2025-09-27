// 'use client';

// import { useParams } from 'next/navigation';
// import dynamic from 'next/dynamic';

// const Editor = dynamic(() => import('../../components/Editor'), { ssr: false });
// const ActivityBar = dynamic(() => import('../../components/ActivityBar'), { ssr: false });
// const FileExplorer = dynamic(() => import('../../components/FileExplorer'), { ssr: false });
// const TabBar = dynamic(() => import('../../components/TabBar'), { ssr: false });
// const Terminal = dynamic(() => import('../../components/Terminal'), { ssr: false });

// export default function RoomPage() {
//   const { roomId } = useParams();

//   if (!roomId || typeof roomId !== 'string') {
//     return (
//       <div className="h-screen flex items-center justify-center bg-[#1e1e1e] text-white text-lg">
//         Initializing…
//       </div>
//     );
//   }

//   return (
//     <div className="flex h-screen w-screen bg-[#1e1e1e] text-white font-mono overflow-hidden">
//       {/* ActivityBar */}
//       <div className="flex-shrink-0">
//         <ActivityBar />
//       </div>

//       {/* Explorer + Editor pane */}
//       <div className="flex flex-1 overflow-hidden">
//         <div className="flex-shrink-0">
//           <FileExplorer />
//         </div>

//         {/* Editor */}
//           <div className="flex flex-col flex-1 overflow-hidden">
//             {/* Editor */}
//             <div className="flex-1 overflow-y-auto">
//               <Editor roomId={roomId} />
//             </div>

//           </div>

//       </div>
//     </div>
//   );
// }
