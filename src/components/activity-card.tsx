import { ArrowUpRight, ArrowDownRight, Minus } from "lucide-react";
import { motion } from "motion/react";

const activities = [
  { id: 1, title: "New user registered", time: "2 min ago", type: "up" },
  { id: 2, title: "Order #1234 completed", time: "15 min ago", type: "up" },
  { id: 3, title: "Server response time increased", time: "1 hour ago", type: "down" },
  { id: 4, title: "Payment processed", time: "2 hours ago", type: "up" },
  { id: 5, title: "System update", time: "3 hours ago", type: "neutral" },
  { id: 6, title: "New subscription", time: "5 hours ago", type: "up" },
];

export function ActivityCard() {
  return (
    <motion.div
      className="p-6 rounded-3xl h-full glass-neo-card"
      whileHover={{ scale: 1.01 }}
    >
      <div className="mb-6">
        <h2 className="text-[#1e3a8a] mb-1 font-bold">Recent Activity</h2>
        <p className="text-[#64748b] text-sm font-semibold">Latest updates</p>
      </div>

      <div className="space-y-4 max-h-[320px] overflow-y-auto pr-2">
        {activities.map((activity, index) => (
          <motion.div
            key={activity.id}
            className="p-4 rounded-2xl transition-shadow cursor-pointer glass-neo-inset"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            whileHover={{
              scale: 1.02,
              x: 5,
            }}
            whileTap={{ scale: 0.98 }}
          >
            <div className="flex items-start gap-3">
              <div className={`mt-1 p-2 rounded-xl glass-neo-inset
                ${activity.type === "up" ? "text-[#2563eb]" :
                  activity.type === "down" ? "text-[#ef4444]" : "text-[#475569]"}`}>
                {activity.type === "up" && <ArrowUpRight className="w-4 h-4" />}
                {activity.type === "down" && <ArrowDownRight className="w-4 h-4" />}
                {activity.type === "neutral" && <Minus className="w-4 h-4" />}
              </div>
              <div className="flex-1">
                <p className="text-[#0f172a] text-sm mb-1">{activity.title}</p>
                <p className="text-[#64748b] text-xs">{activity.time}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
