import { motion } from "motion/react";
import { MoreHorizontal } from "lucide-react";
import { useState } from "react";

const DATA = [
  { name: "Jan", value: 2.5 },
  { name: "Feb", value: 3.8 },
  { name: "Mar", value: 2.2 },
  { name: "Apr", value: 4.6 },
  { name: "May", value: 3.4 },
  { name: "Jun", value: 5.5 },
  { name: "Jul", value: 4.2 },
  { name: "Aug", value: 6.8 },
  { name: "Sep", value: 5.1 },
  { name: "Oct", value: 8.5 },
  { name: "Nov", value: 6.2 },
  { name: "Dec", value: 9.1 },
];

const W = 280, H = 140, PL = 30, PR = 6, PT = 10, PB = 20;
const CW = W - PL - PR, CH = H - PT - PB;
const VMIN = 1, VMAX = 10;

const GPTS = DATA.map((d, i) => ({
  ...d,
  x: PL + (i / (DATA.length - 1)) * CW,
  y: PT + CH * (1 - (d.value - VMIN) / (VMAX - VMIN)),
}));
const LINE = GPTS.map((p, i) => `${i ? "L" : "M"}${p.x.toFixed(1)},${p.y.toFixed(1)}`).join(" ");

export function SpendingTrendCard() {
  const [hi, setHi] = useState<number | null>(null);

  return (
    <motion.div
      className="p-6 rounded-3xl glass-neo-card"
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.55 }}
      whileHover={{ scale: 1.01 }}
    >
      <div className="flex items-start justify-between mb-6">
        <div>
          <p className="text-[#5b7290] text-xs font-semibold uppercase tracking-wider mb-1">
            Spending Trend
          </p>
          <h3 className="text-[#1e3a8a] text-xl font-bold">Annual Overview</h3>
        </div>
        <motion.button
          className="p-2 rounded-xl glass-neo-inset"
          whileHover={{ scale: 1.1 }}
        >
          <MoreHorizontal className="w-4 h-4 text-[#2563eb]" />
        </motion.button>
      </div>

      <div className="h-[260px] p-3 rounded-2xl glass-neo-inset">
        <svg viewBox={`0 0 ${W} ${H}`} width="100%" height="100%" style={{ overflow: "visible" }}>
          {[0, 0.25, 0.5, 0.75, 1].map((t) => (
            <g key={`g${t}`}>
              <line x1={PL} y1={PT + t * CH} x2={W - PR} y2={PT + t * CH} stroke="#c5d5e8" strokeWidth={0.5} opacity={0.35} />
              <text x={PL - 4} y={PT + t * CH + 4} textAnchor="end" fontSize={7} fill="#5b7290">
                ${(VMAX - t * (VMAX - VMIN)).toFixed(0)}
              </text>
            </g>
          ))}
          {GPTS.filter((_, i) => i % 2 === 0).map((p, i) => (
            <text key={`xl${i}`} x={p.x} y={H - 2} textAnchor="middle" fontSize={7} fill="#5b7290">
              {p.name}
            </text>
          ))}
          <path d={LINE} fill="none" stroke="#2563eb" strokeWidth={3} strokeLinecap="round" strokeLinejoin="round" />
          {GPTS.map((p, i) => {
            const isHighlight = p.value === 5.5 || p.value === 8.5;
            return (
              <g key={`d${i}`} onMouseEnter={() => setHi(i)} onMouseLeave={() => setHi(null)}>
                <circle cx={p.x} cy={p.y} r={10} fill="transparent" />
                {(isHighlight || hi === i) && (
                  <circle
                    cx={p.x} cy={p.y}
                    r={isHighlight ? 6 : 4}
                    fill="#1e3a8a"
                    stroke="#f0f6ff"
                    strokeWidth={2}
                    style={{ cursor: "pointer" }}
                  />
                )}
                {isHighlight && (
                  <text x={p.x} y={p.y - 12} textAnchor="middle" fill="#1e3a8a" fontSize={9} fontWeight={600}>
                    ${p.value.toFixed(2)}
                  </text>
                )}
                {hi === i && !isHighlight && (
                  <>
                    <rect x={p.x - 20} y={p.y - 26} width={40} height={16} rx={4} fill="#1e3a8a" />
                    <text x={p.x} y={p.y - 14} textAnchor="middle" fontSize={9} fill="#fff" fontWeight={600}>
                       ${p.value}
                    </text>
                  </>
                )}
              </g>
            );
          })}
        </svg>
      </div>

      <div className="grid grid-cols-3 gap-3 mt-5">
        {[
          { label: "Peak Month", value: "Oct", color: "#1e3a8a" },
          { label: "Avg Monthly", value: "$5.1K", color: "#2563eb" },
          { label: "YoY Growth", value: "+28%", color: "#0ea5e9" },
        ].map((s, i) => (
          <motion.div
            key={s.label}
            className="p-3 rounded-xl text-center glass-neo-inset"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 + i * 0.1 }}
            whileHover={{ scale: 1.05 }}
          >
            <p className="text-[#5b7290] text-xs mb-1">{s.label}</p>
            <p className="font-bold text-sm" style={{ color: s.color }}>{s.value}</p>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
