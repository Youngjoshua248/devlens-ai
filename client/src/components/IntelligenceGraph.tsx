type GraphNode = {
  id: string;
  label: string;
  status: "COMPLETE" | "ACTIVE" | "READY";
  x: number;
  y: number;
};

const nodes: GraphNode[] = [
  {
    id: "scanner",
    label: "RepositoryScanner",
    status: "COMPLETE",
    x: 50,
    y: 10,
  },
  { id: "ignore", label: "IgnorePatterns", status: "COMPLETE", x: 25, y: 35 },
  { id: "parser", label: "CodeParser", status: "COMPLETE", x: 75, y: 35 },
  {
    id: "framework",
    label: "FrameworkDetector",
    status: "COMPLETE",
    x: 35,
    y: 65,
  },
  { id: "graph", label: "DependencyGraph", status: "COMPLETE", x: 65, y: 65 },
  {
    id: "architecture",
    label: "ArchitectureEngine",
    status: "ACTIVE",
    x: 50,
    y: 90,
  },
];

const edges = [
  ["scanner", "ignore"],
  ["scanner", "parser"],
  ["parser", "framework"],
  ["parser", "graph"],
  ["framework", "architecture"],
  ["graph", "architecture"],
];

export default function IntelligenceGraph() {
  const getNode = (id: string) => nodes.find((node) => node.id === id)!;

  return (
    <section className="mt-8 border border-green-500/30 rounded-lg bg-black p-6">
      <p className="text-xs text-green-300 mb-4">REPOSITORY_INTELLIGENCE_MAP</p>

      <div className="relative h-[420px] border border-green-500/20 rounded-lg overflow-hidden bg-[radial-gradient(circle_at_center,rgba(34,197,94,0.12),transparent_55%)]">
        <svg className="absolute inset-0 h-full w-full">
          {edges.map(([from, to]) => {
            const start = getNode(from);
            const end = getNode(to);

            return (
              <line
                key={`${from}-${to}`}
                x1={`${start.x}%`}
                y1={`${start.y}%`}
                x2={`${end.x}%`}
                y2={`${end.y}%`}
                className="stroke-green-500/40"
                strokeWidth="1.5"
              />
            );
          })}
        </svg>

        {nodes.map((node) => (
          <div
            key={node.id}
            className="absolute -translate-x-1/2 -translate-y-1/2 border border-green-400/50 bg-black px-4 py-3 rounded-lg text-center shadow-[0_0_18px_rgba(34,197,94,0.25)]"
            style={{ left: `${node.x}%`, top: `${node.y}%` }}
          >
            <div className="mx-auto mb-2 h-3 w-3 rounded-full bg-green-400 shadow-[0_0_16px_rgba(34,197,94,0.9)] animate-pulse" />
            <p className="text-sm text-green-100">{node.label}</p>
            <p className="text-[10px] text-green-400/70 mt-1">{node.status}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
