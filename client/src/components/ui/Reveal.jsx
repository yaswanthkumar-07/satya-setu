import { motion, useReducedMotion } from 'framer-motion';

/** Fades and slides children in once when they scroll into view. */
export default function Reveal({ children, delay = 0, y = 18, className = '' }) {
  const reduce = useReducedMotion();

  return (
    <motion.div
      initial={reduce ? false : { opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.5, delay, ease: 'easeOut' }}
      className={className}
    >
      {children}
    </motion.div>
  );
}