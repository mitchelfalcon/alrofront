import React, { useState } from "react";
import { motion } from "motion/react";

interface StatsCardProps {
  title: string;
  value: string;
  change: string;
  icon: React.ReactNode;
  trend: "up" | "down";
}

export function StatsCard({ title, value, change, icon, trend }: StatsCardProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      className="p-6 rounded-3xl cursor-pointer transition-shadow glass-neo-card"
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      whileHover={{
        scale: 1.02,
      }}
      whileTap={{
        scale: 0.98,
      }}
    >
      <div className="flex items-start justify-between mb-4">
        <motion.div
          className="p-4 rounded-2xl glass-neo-inset"
          animate={{
            rotate: isHovered ? [0, -10, 10, -10, 0] : 0
          }}
          transition={{ duration: 0.5 }}
        >
          <motion.div
            className="text-[#4a7268]"
            animate={{ scale: isHovered ? 1.1 : 1 }}
            transition={{ duration: 0.3 }}
          >
            {icon}
          </motion.div>
        </motion.div>
        <motion.span
          className={`px-3 py-1 rounded-full text-sm glass-neo-inset ${
            trend === "up"
              ? "text-[#009970]"
              : "text-[#ef4444]"
          }`}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
        >
          {change}
        </motion.span>
      </div>
      <motion.p
        className="text-[#7a9a8d] mb-1 text-sm font-semibold"
        animate={{ opacity: isHovered ? 0.7 : 1 }}
      >
        {title}
      </motion.p>
      <motion.p
        className="text-[#1d3a2f] text-2xl font-bold"
        animate={{
          scale: isHovered ? 1.05 : 1,
          color: isHovered ? "#009970" : "#1d3a2f"
        }}
        transition={{ duration: 0.3 }}
      >
        {value}
      </motion.p>
    </motion.div>
  );
}
