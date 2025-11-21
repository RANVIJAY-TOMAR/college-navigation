import React from 'react';
import PropTypes from 'prop-types';
import { motion } from 'framer-motion';
import { IconButton, Button } from './UiComponents/Button.jsx';
import { ThemeToggle } from './ThemeToggle.jsx';
import { FiMapPin, FiExternalLink } from 'react-icons/fi';

export function TopBar({ onCenterOnUser }) {
  return (
    <motion.header
      initial={{ y: -16, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ type: 'spring', stiffness: 260, damping: 22 }}
      className="flex items-center justify-between gap-3 px-4 py-2 md:px-6 md:py-3 bg-slate-900/70 border-b border-slate-800/80 backdrop-blur-xl shadow-lg shadow-black/50"
    >
      <div className="flex items-center gap-3">
        <div className="flex h-9 w-9 items-center justify-center rounded-2xl bg-gradient-to-tr from-[#6a11cb] to-[#2575fc] shadow-lg shadow-indigo-500/40">
          <FiMapPin className="text-xl text-white" />
        </div>
        <div className="leading-tight">
          <div className="text-sm font-semibold tracking-tight text-slate-50 md:text-base">
            Bhhraman
          </div>
          <div className="text-[11px] text-slate-400 md:text-xs">
            Smart campus navigation for GL Bajaj
          </div>
        </div>
      </div>

      <div className="flex items-center gap-2 md:gap-3">
        <Button
          variant="secondary"
          size="sm"
          className="hidden md:inline-flex"
          onClick={onCenterOnUser}
        >
          <FiMapPin className="text-sm" />
          <span>Recenter</span>
        </Button>

        <IconButton label="Open routes guide" className="hidden md:inline-flex">
          <FiExternalLink className="text-lg text-slate-300" />
        </IconButton>

        <ThemeToggle />
      </div>
    </motion.header>
  );
}

TopBar.propTypes = {
  onCenterOnUser: PropTypes.func,
};

export default TopBar;
