import React from "react";
import { Circle } from "lucide-react";
import { motion } from "framer-motion";

export default function LiveIndicator({ count }:{count:number}) {
  if (count === 0) return null;

  return (
    <motion.div
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      className="flex items-center gap-2 bg-gradient-to-r from-green-500/20 to-green-600/20 border border-green-500/30 px-4 py-2 rounded-full backdrop-blur-sm"
    >
      <div className="relative">
        <Circle className="w-3 h-3 fill-green-400 text-green-400" />
        <Circle className="w-3 h-3 fill-green-400 text-green-400 absolute inset-0 animate-ping opacity-75" />
      </div>
      <span className="text-green-400 font-medium text-sm">
        {count} developer{count > 1 ? "s" : ""} coding live
      </span>
    </motion.div>
  );
}
