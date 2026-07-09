// import IntelligenceGraph from "./components/IntelligenceGraph";
// import { useState } from "react";
// import "./App.css";

// type DashboardData = {
//   projectType: string;
//   language: string;
//   frontend: string | null;
//   backend: string | null;
//   database: string | null;
//   ai: string | null;
//   packageManager: string;
//   stats: {
//     files: number;
//     folders: number;
//     sourceFiles: number;
//     routes: number;
//     components: number;
//     functions: number;
//     dependencies: number;
//   };
// };

// const scanSteps = [
//   "locating repository...",
//   "scanning source files...",
//   "parsing TypeScript modules...",
//   "detecting framework stack...",
//   "building dependency graph...",
//   "mapping architecture layers...",
//   "generating dashboard intelligence...",
// ];

// function App() {
//   const [dashboard, setDashboard] = useState<DashboardData | null>(null);
//   const [loading, setLoading] = useState(false);
//   const [logs, setLogs] = useState<string[]>([]);

//   async function runLocalScan() {
//     setLoading(true);
//     setDashboard(null);
//     setLogs([]);

//     for (const step of scanSteps) {
//       setLogs((prev) => [...prev, `> ${step}`]);
//       await new Promise((resolve) => setTimeout(resolve, 450));
//       setLogs((prev) => [...prev, `✓ ${step.replace("...", "")} complete`]);
//     }

//     const response = await fetch(
//       "http://localhost:4000/api/repositories/summary-local",
//     );

//     const data = await response.json();

//     setDashboard(data.dashboard);
//     setLogs((prev) => [...prev, "✓ repository intelligence complete"]);
//     setLoading(false);
//   }

//   return (
//     <main className="min-h-screen bg-black text-green-400 font-mono p-8">
//       <section className="border border-green-500/40 rounded-xl p-6 shadow-[0_0_30px_rgba(34,197,94,0.2)]">
//         <p className="text-xs text-green-300">DEVLENS_AI :: SYSTEM ONLINE</p>

//         <h1 className="text-5xl font-bold mt-4 tracking-tight">
//           Repository Intelligence Command Center
//         </h1>

//         <p className="text-green-200/80 mt-4 max-w-2xl">
//           Scan repositories, detect architecture, map dependencies, and generate
//           AI-powered codebase intelligence.
//         </p>

//         <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-4">
//           {["SCAN", "PARSE", "ANALYZE", "MAP"].map((item) => (
//             <div
//               key={item}
//               className="border border-green-500/30 rounded-lg p-4 bg-green-950/10"
//             >
//               <p className="text-xs text-green-300">MODULE</p>

//               <h2 className="text-2xl">{item}</h2>

//               <p className="text-xs text-green-200/60 mt-2">
//                 {loading ? "RUNNING" : "READY"}
//               </p>
//             </div>
//           ))}
//         </div>

//         <button
//           onClick={runLocalScan}
//           disabled={loading}
//           className="mt-8 border border-green-400 px-6 py-3 rounded-lg hover:bg-green-400 hover:text-black transition disabled:opacity-50"
//         >
//           {loading ? "SCANNING..." : "RUN_LOCAL_SCAN"}
//         </button>

//         {logs.length > 0 && (
//           <section className="mt-8 border border-green-500/30 rounded-lg bg-black p-4">
//             <p className="text-xs text-green-300 mb-3">LIVE_SCAN_CONSOLE</p>

//             <div className="space-y-1 text-sm text-green-200/80">
//               {logs.map((log, index) => (
//                 <p key={index}>{log}</p>
//               ))}

//               {loading && <p className="animate-pulse">█</p>}
//             </div>
//           </section>
//         )}

//         {dashboard && (
//           <section className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
//             <div className="border border-green-500/30 rounded-lg p-4 bg-black">
//               <p className="text-xs text-green-300">PROJECT TYPE</p>

//               <h2 className="text-2xl">{dashboard.projectType}</h2>
//             </div>

//             <div className="border border-green-500/30 rounded-lg p-4 bg-black">
//               <p className="text-xs text-green-300">LANGUAGE</p>

//               <h2 className="text-2xl">{dashboard.language}</h2>
//             </div>

//             <div className="border border-green-500/30 rounded-lg p-4 bg-black">
//               <p className="text-xs text-green-300">BACKEND</p>

//               <h2 className="text-2xl">{dashboard.backend || "UNKNOWN"}</h2>
//             </div>

//             <div className="border border-green-500/30 rounded-lg p-4 bg-black">
//               <p className="text-xs text-green-300">FILES</p>

//               <h2 className="text-2xl">{dashboard.stats.files}</h2>
//             </div>

//             <div className="border border-green-500/30 rounded-lg p-4 bg-black">
//               <p className="text-xs text-green-300">ROUTES</p>

//               <h2 className="text-2xl">{dashboard.stats.routes}</h2>
//             </div>

//             <div className="border border-green-500/30 rounded-lg p-4 bg-black">
//               <p className="text-xs text-green-300">DEPENDENCIES</p>

//               <h2 className="text-2xl">{dashboard.stats.dependencies}</h2>
//             </div>
//           </section>
//         )}

//         {/* NEW */}
//         {dashboard && <IntelligenceGraph />}
//       </section>
//     </main>
//   );
// }

// export default App;
// import AIChatPanel from "./components/AIChatPanel";
// import { useState } from "react";

// type GraphNode = {
//   id: string;
//   label: string;
//   status: "COMPLETE" | "ACTIVE" | "READY";
//   x: number;
//   y: number;
//   description: string;
//   imports: string[];
// };

// const nodes: GraphNode[] = [
//   {
//     id: "scanner",
//     label: "RepositoryScanner",
//     status: "COMPLETE",
//     x: 50,
//     y: 10,
//     description:
//       "Walks the repository, counts files, and sends source files to the parser.",
//     imports: ["fs", "path", "IgnorePatterns", "CodeParser"],
//   },
//   {
//     id: "ignore",
//     label: "IgnorePatterns",
//     status: "COMPLETE",
//     x: 25,
//     y: 35,
//     description:
//       "Stores ignored folders and files like node_modules, .git, and lock files.",
//     imports: [],
//   },
//   {
//     id: "parser",
//     label: "CodeParser",
//     status: "COMPLETE",
//     x: 75,
//     y: 35,
//     description:
//       "Reads source files and extracts imports, exports, functions, components, and routes.",
//     imports: ["fs"],
//   },
//   {
//     id: "framework",
//     label: "FrameworkDetector",
//     status: "COMPLETE",
//     x: 35,
//     y: 65,
//     description:
//       "Detects TypeScript, React, Express, OpenAI, PostgreSQL, and package manager usage.",
//     imports: [],
//   },
//   {
//     id: "graph",
//     label: "DependencyGraph",
//     status: "COMPLETE",
//     x: 65,
//     y: 65,
//     description: "Builds a map of files and the modules they import.",
//     imports: [],
//   },
//   {
//     id: "architecture",
//     label: "ArchitectureEngine",
//     status: "ACTIVE",
//     x: 50,
//     y: 90,
//     description:
//       "Groups files into architecture layers like routes, controllers, services, scanner, and analyzer.",
//     imports: [],
//   },
// ];

// const edges = [
//   ["scanner", "ignore"],
//   ["scanner", "parser"],
//   ["parser", "framework"],
//   ["parser", "graph"],
//   ["framework", "architecture"],
//   ["graph", "architecture"],
// ];

// export default function IntelligenceGraph() {
//   const [selectedNode, setSelectedNode] = useState<GraphNode | null>(nodes[0]);

//   const getNode = (id: string) => nodes.find((node) => node.id === id)!;

//   return (
//     <section className="mt-8 grid grid-cols-1 lg:grid-cols-[2fr_1fr] gap-4">
//       <div className="border border-green-500/30 rounded-lg bg-black p-6">
//         <p className="text-xs text-green-300 mb-4">
//           REPOSITORY_INTELLIGENCE_MAP
//         </p>

//         <div className="relative h-[420px] border border-green-500/20 rounded-lg overflow-hidden bg-[radial-gradient(circle_at_center,rgba(34,197,94,0.12),transparent_55%)]">
//           <svg className="absolute inset-0 h-full w-full">
//             {edges.map(([from, to]) => {
//               const start = getNode(from);
//               const end = getNode(to);
//               const isActive =
//                 selectedNode?.id === from || selectedNode?.id === to;

//               return (
//                 <line
//                   key={`${from}-${to}`}
//                   x1={`${start.x}%`}
//                   y1={`${start.y}%`}
//                   x2={`${end.x}%`}
//                   y2={`${end.y}%`}
//                   className={
//                     isActive ? "stroke-green-300" : "stroke-green-500/30"
//                   }
//                   strokeWidth={isActive ? "2.5" : "1.5"}
//                 />
//               );
//             })}
//           </svg>

//           {nodes.map((node) => {
//             const isSelected = selectedNode?.id === node.id;

//             return (
//               <button
//                 key={node.id}
//                 onClick={() => setSelectedNode(node)}
//                 className={`absolute -translate-x-1/2 -translate-y-1/2 border px-4 py-3 rounded-lg text-center transition ${
//                   isSelected
//                     ? "border-green-300 bg-green-950/30 shadow-[0_0_28px_rgba(34,197,94,0.5)]"
//                     : "border-green-400/50 bg-black shadow-[0_0_18px_rgba(34,197,94,0.25)]"
//                 }`}
//                 style={{ left: `${node.x}%`, top: `${node.y}%` }}
//               >
//                 <div className="mx-auto mb-2 h-3 w-3 rounded-full bg-green-400 shadow-[0_0_16px_rgba(34,197,94,0.9)] animate-pulse" />
//                 <p className="text-sm text-green-100">{node.label}</p>
//                 <p className="text-[10px] text-green-400/70 mt-1">
//                   {node.status}
//                 </p>
//               </button>
//             );
//           })}
//         </div>
//       </div>

//       <aside className="border border-green-500/30 rounded-lg bg-black p-6">
//         <p className="text-xs text-green-300 mb-4">NODE_INTEL</p>

//         {selectedNode && (
//           <div>
//             <h2 className="text-2xl text-green-100">{selectedNode.label}</h2>
//             <p className="mt-2 text-xs text-green-400">
//               STATUS :: {selectedNode.status}
//             </p>

//             <div className="mt-6">
//               <p className="text-xs text-green-300">PURPOSE</p>
//               <p className="mt-2 text-sm text-green-200/80">
//                 {selectedNode.description}
//               </p>
//             </div>

//             <div className="mt-6">
//               <p className="text-xs text-green-300">IMPORTS</p>
//               <div className="mt-2 space-y-2">
//                 {selectedNode.imports.length ? (
//                   selectedNode.imports.map((item) => (
//                     <p
//                       key={item}
//                       className="border border-green-500/20 rounded px-3 py-2 text-sm text-green-200/80"
//                     >
//                       {item}
//                     </p>
//                   ))
//                 ) : (
//                   <p className="text-sm text-green-200/50">
//                     No imports detected.
//                   </p>
//                 )}
//               </div>
//             </div>
//           </div>
//         )}
//       </aside>
//     </section>
//   );
// }

import { useState } from "react";
import IntelligenceGraph from "./components/IntelligenceGraph";
import AIChatPanel from "./components/AIChatPanel";
import "./App.css";

type DashboardData = {
  projectType: string;
  language: string;
  frontend: string | null;
  backend: string | null;
  database: string | null;
  ai: string | null;
  packageManager: string;
  stats: {
    files: number;
    folders: number;
    sourceFiles: number;
    routes: number;
    components: number;
    functions: number;
    dependencies: number;
  };
};

const scanSteps = [
  "locating repository...",
  "scanning source files...",
  "parsing TypeScript modules...",
  "detecting framework stack...",
  "building dependency graph...",
  "mapping architecture layers...",
  "generating dashboard intelligence...",
];

function App() {
  const [dashboard, setDashboard] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(false);
  const [logs, setLogs] = useState<string[]>([]);

  async function runLocalScan() {
    setLoading(true);
    setDashboard(null);
    setLogs([]);

    for (const step of scanSteps) {
      setLogs((prev) => [...prev, `> ${step}`]);
      await new Promise((resolve) => setTimeout(resolve, 450));
      setLogs((prev) => [...prev, `✓ ${step.replace("...", "")} complete`]);
    }

    const response = await fetch(
      "http://localhost:4000/api/repositories/summary-local",
    );

    const data = await response.json();

    setDashboard(data.dashboard);
    setLogs((prev) => [...prev, "✓ repository intelligence complete"]);
    setLoading(false);
  }

  return (
    <main className="min-h-screen bg-black text-green-400 font-mono p-8">
      <section className="border border-green-500/40 rounded-xl p-6 shadow-[0_0_30px_rgba(34,197,94,0.2)]">
        <p className="text-xs text-green-300">DEVLENS_AI :: SYSTEM ONLINE</p>

        <h1 className="text-5xl font-bold mt-4 tracking-tight">
          Repository Intelligence Command Center
        </h1>

        <p className="text-green-200/80 mt-4 max-w-2xl">
          Scan repositories, detect architecture, map dependencies, and generate
          AI-powered codebase intelligence.
        </p>

        <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-4">
          {["SCAN", "PARSE", "ANALYZE", "MAP"].map((item) => (
            <div
              key={item}
              className="border border-green-500/30 rounded-lg p-4 bg-green-950/10"
            >
              <p className="text-xs text-green-300">MODULE</p>
              <h2 className="text-2xl">{item}</h2>
              <p className="text-xs text-green-200/60 mt-2">
                {loading ? "RUNNING" : "READY"}
              </p>
            </div>
          ))}
        </div>

        <button
          onClick={runLocalScan}
          disabled={loading}
          className="mt-8 border border-green-400 px-6 py-3 rounded-lg hover:bg-green-400 hover:text-black transition disabled:opacity-50"
        >
          {loading ? "SCANNING..." : "RUN_LOCAL_SCAN"}
        </button>

        {logs.length > 0 && (
          <section className="mt-8 border border-green-500/30 rounded-lg bg-black p-4">
            <p className="text-xs text-green-300 mb-3">LIVE_SCAN_CONSOLE</p>

            <div className="space-y-1 text-sm text-green-200/80">
              {logs.map((log, index) => (
                <p key={index}>{log}</p>
              ))}

              {loading && <p className="animate-pulse">█</p>}
            </div>
          </section>
        )}

        {dashboard && (
          <>
            <section className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="border border-green-500/30 rounded-lg p-4 bg-black">
                <p className="text-xs text-green-300">PROJECT TYPE</p>
                <h2 className="text-2xl">{dashboard.projectType}</h2>
              </div>

              <div className="border border-green-500/30 rounded-lg p-4 bg-black">
                <p className="text-xs text-green-300">LANGUAGE</p>
                <h2 className="text-2xl">{dashboard.language}</h2>
              </div>

              <div className="border border-green-500/30 rounded-lg p-4 bg-black">
                <p className="text-xs text-green-300">BACKEND</p>
                <h2 className="text-2xl">{dashboard.backend || "UNKNOWN"}</h2>
              </div>

              <div className="border border-green-500/30 rounded-lg p-4 bg-black">
                <p className="text-xs text-green-300">FILES</p>
                <h2 className="text-2xl">{dashboard.stats.files}</h2>
              </div>

              <div className="border border-green-500/30 rounded-lg p-4 bg-black">
                <p className="text-xs text-green-300">ROUTES</p>
                <h2 className="text-2xl">{dashboard.stats.routes}</h2>
              </div>

              <div className="border border-green-500/30 rounded-lg p-4 bg-black">
                <p className="text-xs text-green-300">DEPENDENCIES</p>
                <h2 className="text-2xl">{dashboard.stats.dependencies}</h2>
              </div>
            </section>

            <IntelligenceGraph />

            <AIChatPanel />
          </>
        )}
      </section>
    </main>
  );
}

export default App;
