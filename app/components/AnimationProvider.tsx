import React, { ReactNode } from 'react';
import { motion, AnimatePresence } from 'motion/react';

// Animation variants for common interactions
export const fadeIn = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
};

export const slideUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 },
};

export const slideInFromRight = {
  initial: { opacity: 0, x: 50 },
  animate: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: -50 },
};

export const slideInFromLeft = {
  initial: { opacity: 0, x: -50 },
  animate: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: 50 },
};

export const scaleIn = {
  initial: { opacity: 0, scale: 0.9 },
  animate: { opacity: 1, scale: 1 },
  exit: { opacity: 0, scale: 0.9 },
};

export const cardHover = {
  hover: { 
    scale: 1.02,
    transition: { type: "spring", stiffness: 300, damping: 20 }
  },
  tap: { scale: 0.98 }
};

export const buttonTap = {
  tap: { 
    scale: 0.95,
    transition: { type: "spring", stiffness: 400, damping: 17 }
  }
};

// Spring configurations
export const springConfig = {
  type: "spring" as const,
  stiffness: 300,
  damping: 25,
};

export const fastSpring = {
  type: "spring" as const,
  stiffness: 400,
  damping: 20,
};

export const slowSpring = {
  type: "spring" as const,
  stiffness: 200,
  damping: 30,
};

// Animated components
export const AnimatedCard = motion.div;
export const AnimatedButton = motion.button;
export const AnimatedDiv = motion.div;

// Page transition wrapper
interface PageTransitionProps {
  children: ReactNode;
  key?: string;
}

export function PageTransition({ children, key }: PageTransitionProps) {
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={key}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={springConfig}
        className="w-full"
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}

// List animation wrapper
interface StaggeredListProps {
  children: ReactNode[];
  className?: string;
}

export function StaggeredList({ children, className }: StaggeredListProps) {
  return (
    <motion.div
      className={className}
      initial="hidden"
      animate="visible"
      variants={{
        visible: {
          transition: {
            staggerChildren: 0.1
          }
        }
      }}
    >
      {children.map((child, index) => (
        <motion.div
          key={index}
          variants={{
            hidden: { opacity: 0, y: 20 },
            visible: { opacity: 1, y: 0 }
          }}
          transition={springConfig}
        >
          {child}
        </motion.div>
      ))}
    </motion.div>
  );
}

// Floating action button animation
export function FloatingButton({ children, ...props }: any) {
  return (
    <motion.button
      {...props}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      transition={fastSpring}
      className={`fixed bottom-24 right-6 w-14 h-14 bg-primary text-primary-foreground rounded-full shadow-lg flex items-center justify-center z-50 ${props.className || ''}`}
    >
      {children}
    </motion.button>
  );
}