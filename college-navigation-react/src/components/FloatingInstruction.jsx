import React from 'react';
import PropTypes from 'prop-types';
import { motion, AnimatePresence } from 'framer-motion';
import { FiNavigation } from 'react-icons/fi';

export function FloatingInstruction({ step, isVisible, isMobile }) {
  return (
    <AnimatePresence>
      {step && isVisible && (
        <motion.div
          initial={{ y: 40, opacity: 0, scale: 0.96 }}
          animate={{ y: 0, opacity: 1, scale: 1 }}
          exit={{ y: 40, opacity: 0, scale: 0.96 }}
          transition={{ type: 'spring', stiffness: 260, damping: 24 }}
          className={
            'pointer-events-none fixed z-30 flex justify-center w-full px-3 ' +
            (isMobile ? 'bottom-28' : 'top-24')
          }
        >
          <div className="pointer-events-auto max-w-md rounded-2xl bg-slate-900/90 border border-sky-500/50 shadow-2xl shadow-sky-500/40 px-3.5 py-2.5 flex items-center gap-3 floating-instruction-shadow">
            <div className="flex h-7 w-7 items-center justify-center rounded-full bg-gradient-to-tr from-[#6a11cb] to-[#2575fc] text-white shadow shadow-indigo-500/50">
              <FiNavigation className="text-sm" />
            </div>
            <div className="flex-1">
              <div className="text-[11px] font-medium text-slate-50 truncate">
                {step.title}
              </div>
              {step.distance > 0 && (
                <div className="text-[10px] text-slate-400">
                  ~{step.distance} m ahead
                </div>
              )}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

FloatingInstruction.propTypes = {
  step: PropTypes.shape({
    id: PropTypes.string,
    title: PropTypes.string,
    detail: PropTypes.string,
    distance: PropTypes.number,
  }),
  isVisible: PropTypes.bool,
  isMobile: PropTypes.bool,
};

export default FloatingInstruction;
