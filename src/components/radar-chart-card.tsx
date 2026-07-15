import { motion } from "motion/react";

const DATA = [
  { subject: "Sales", A: 120, B: 110 },
  { subject: "Marketing", A: 98, B: 130 },
  { subject: "Development", A: 86, B: 130 },
  { subject: "Support", A: 99, B: 100 },
  { subject: "Design", A: 85, B: 90 },
  { subject: "HR", A: 65, B: 85 },
];

const FULL = 150, N = DATA.length;
const CX = 140, CY = 115, MAX_R = 88;
const ANGLES = DATA.map((_, i) => (i / N) * 2 * Math.PI - Math.PI / 2);

function pt(r: number, i: number): [number, number] {
  return [CX + r * Math.cos(ANGLES[i]), CY + r * Math.sin(ANGLES[i])];
}

function polygon(values: number[]): string {
  return (
    values
      .map((v, i) => {
        const r = (v / FULL) * MAX_R;
        const [x, y] = pt(r, i);
        return `${i ? "L" : "M"}${x.toFixed(2)},${y.toFixed(2)}`;
      })
      .join(" ") + " Z"
  );
}

function labelAnchor(i: number): string {
  const [x] = pt(1, i);
  if (Math.abs(x - CX) < 4) return "middle";
  return x > CX ? "start" : "end";
}

export function RadarChartCard() {
  const polyA = polygon(DATA.map((d) => d.A));
  const polyB = polygon(DATA.map((d) => d.B));

  return (
    <motion.div
      className="p-6 rounded-3xl glass-neo-card"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      whileHover={{ scale: 1.01 }}
    >
      <motion.div
        className="mb-6"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.2 }}
      >
        <h2 className="text-[#1e3a8a] mb-1">Department Performance</h2>
        <p className="text-[#5b7290] text-sm font-semibold">Q4 2024 vs Q3 2024</p>
      </motion.div>

      <div className="h-[400px] p-4 rounded-2xl glass-neo-inset">
        <svg viewBox="0 0 280 230" width="100%" height="100%" style={{ overflow: "visible" }}>
          {[0.25, 0.5, 0.75, 1].map((t) => {
            const r = t * MAX_R;
            const d =
              ANGLES.map((_, i) => {
                const [x, y] = pt(r, i);
                return `${i ? "L" : "M"}${x.toFixed(2)},${y.toFixed(2)}`;
              }).join(" ") + " Z";
            return <path key={`ring${t}`} d={d} fill="none" stroke="#c5d5e8" strokeWidth={0.5} opacity={0.6} />;
          })}
          {ANGLES.map((_, i) => {
            const [x, y] = pt(MAX_R, i);
            return (
              <line key={`ax${i}`} x1={CX} y1={CY} x2={x.toFixed(2)} y2={y.toFixed(2)} stroke="#c5d5e8" strokeWidth={0.5} opacity={0.5} />
            );
          })}
          <path d={polyB} fill="#0ea5e9" fillOpacity={0.22} stroke="#0ea5e9" strokeWidth={2} strokeLinejoin="round" />
          <path d={polyA} fill="#2563eb" fillOpacity={0.32} stroke="#2563eb" strokeWidth={2} strokeLinejoin="round" />
          {DATA.map((d, i) => {
            const [x, y] = pt(MAX_R + 14, i);
            const anchor = labelAnchor(i);
            return (
              <text key={`lbl${i}`} x={x.toFixed(2)} y={(y + 4).toFixed(2)} textAnchor={anchor} fontSize={10} fill="#5b7290">
                {d.subject}
              </text>
            );
          })}
          <g>
            <circle cx={14} cy={210} r={5} fill="#2563eb" />
            <text x={24} y={214} fontSize={11} fill="#1e3a8a">Q4 2024</text>
            <circle cx={100} cy={210} r={5} fill="#0ea5e9" />
            <text x={110} y={214} fontSize={11} fill="#1e3a8a">Q3 2024</text>
          </g>
        </svg>
      </div>

      <div className="grid grid-cols-3 gap-4 mt-6">
        {[
          { label: "Average", value: "92.5", color: "#1e3a8a" },
          { label: "Best", value: "120", color: "#2563eb" },
          { label: "Growth", value: "+8.2%", color: "#0ea5e9" },
        ].map((stat, index) => (
          <motion.div
            key={stat.label}
            className="p-3 rounded-xl text-center glass-neo-inset"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 + index * 0.1 }}
            whileHover={{ scale: 1.05 }}
          >
            <p className="text-[#5b7290] text-sm mb-1">{stat.label}</p>
            <p className="font-semibold" style={{ color: stat.color }}>{stat.value}</p>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
