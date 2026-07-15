import { motion } from "motion/react";
import { useState } from "react";

const DATA = [
  { name: "Desktop", value: 4200, color: "#1e3a8a" },
  { name: "Mobile", value: 3100, color: "#2563eb" },
  { name: "Tablet", value: 2400, color: "#0ea5e9" },
  { name: "Others", value: 1500, color: "#5b7290" },
];

const TOTAL = DATA.reduce((s, d) => s + d.value, 0);
const CX = 130, CY = 105, RO = 82, RI = 48;

function polar(r: number, a: number): [number, number] {
  return [CX + r * Math.cos(a), CY + r * Math.sin(a)];
}

const SEGS = (() => {
  let a = -Math.PI / 2;
  return DATA.map((d) => {
    const span = (d.value / TOTAL) * 2 * Math.PI;
    const a1 = a, a2 = a + span;
    a = a2;
    return { ...d, a1, a2 };
  });
})();

function segPath(a1: number, a2: number, active: boolean): string {
  const GAP = 0.025;
  const sa1 = a1 + GAP, sa2 = a2 - GAP;
  const midA = (a1 + a2) / 2;
  const expand = active ? 7 : 0;
  const tx = expand * Math.cos(midA), ty = expand * Math.sin(midA);
  const [ox1, oy1] = polar(RO, sa1);
  const [ox2, oy2] = polar(RO, sa2);
  const [ix2, iy2] = polar(RI, sa2);
  const [ix1, iy1] = polar(RI, sa1);
  const lg = (sa2 - sa1) > Math.PI ? 1 : 0;
  const f = (x: number, t: number) => (x + t).toFixed(2);
  return `M${f(ox1, tx)},${f(oy1, ty)} A${RO},${RO} 0 ${lg},1 ${f(ox2, tx)},${f(oy2, ty)} L${f(ix2, tx)},${f(iy2, ty)} A${RI},${RI} 0 ${lg},0 ${f(ix1, tx)},${f(iy1, ty)} Z`;
}

export function PieChartCard() {
  const [activeIdx, setActiveIdx] = useState<number | null>(null);

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
        <h2 className="text-[#1e3a8a] mb-1">Device Distribution</h2>
        <p className="text-[#5b7290] text-sm font-semibold">Traffic by device type</p>
      </motion.div>

      <div className="h-[350px] p-4 rounded-2xl glass-neo-inset">
        <svg viewBox="0 0 260 200" width="100%" height="100%" style={{ overflow: "visible" }}>
          {SEGS.map((seg, i) => (
            <path
              key={`s${i}`}
              d={segPath(seg.a1, seg.a2, activeIdx === i)}
              fill={seg.color}
              opacity={activeIdx === null ? 0.85 : activeIdx === i ? 1 : 0.5}
              style={{ cursor: "pointer", transition: "opacity 0.2s" }}
              onMouseEnter={() => setActiveIdx(i)}
              onMouseLeave={() => setActiveIdx(null)}
            />
          ))}
          {activeIdx !== null ? (
            <>
              <text x={CX} y={CY - 8} textAnchor="middle" fontSize={22} fontWeight={700} fill={DATA[activeIdx].color}>
                {((DATA[activeIdx].value / TOTAL) * 100).toFixed(0)}%
              </text>
              <text x={CX} y={CY + 12} textAnchor="middle" fontSize={10} fill="#5b7290">
                {DATA[activeIdx].name}
              </text>
            </>
          ) : (
            <>
              <text x={CX} y={CY - 6} textAnchor="middle" fontSize={13} fontWeight={600} fill="#5b7290">
                Total
              </text>
              <text x={CX} y={CY + 12} textAnchor="middle" fontSize={12} fontWeight={700} fill="#1e3a8a">
                {(TOTAL / 1000).toFixed(1)}k
              </text>
            </>
          )}
          {/* Legend */}
          {DATA.map((d, i) => (
            <g key={`leg${i}`}>
              <circle cx={14 + (i % 2) * 115} cy={168 + Math.floor(i / 2) * 18} r={5} fill={d.color} />
              <text x={24 + (i % 2) * 115} y={172 + Math.floor(i / 2) * 18} fontSize={11} fill="#1e3a8a">
                {d.name}
              </text>
            </g>
          ))}
        </svg>
      </div>

      <div className="grid grid-cols-2 gap-4 mt-6">
        {DATA.map((item, index) => (
          <motion.div
            key={item.name}
            className="p-3 rounded-xl glass-neo-inset"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 + index * 0.1 }}
            whileHover={{ scale: 1.05 }}
          >
            <div className="flex items-center gap-2 mb-1">
              <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }} />
              <span className="text-[#5b7290] text-sm">{item.name}</span>
            </div>
            <p className="text-[#1e3a8a] font-semibold">{item.value.toLocaleString()}</p>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
