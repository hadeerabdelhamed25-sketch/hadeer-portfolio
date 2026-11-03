'use client';
import { motion, useReducedMotion } from 'framer-motion';
// Re-mounts on every navigation, so each page eases in (Framer Motion).
export default function Template({ children }: { children: React.ReactNode }) {
  const reduce = useReducedMotion();
  return <motion.div initial={reduce ? false : { opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.45, ease: 'easeOut' }}>{children}</motion.div>;
}
