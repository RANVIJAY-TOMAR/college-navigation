import React from 'react';
import PropTypes from 'prop-types';
import { motion } from 'framer-motion';
import { Button, IconButton } from './UiComponents/Button.jsx';
import SearchAutocomplete from './SearchAutocomplete.jsx';
import { FiChevronLeft, FiChevronRight, FiRefreshCw, FiStar } from 'react-icons/fi';

export function LeftSidebar({
  isCollapsed,
  onToggle,
  places,
  favorites,
  startId,
  endId,
  onStartChange,
  onEndChange,
  onFindRoute,
  onClearRoute,
  onReload,
  isMobile,
}) {
  const sidebarContent = (
    <div className="flex h-full flex-col gap-3 p-3 md:p-4">
      <div className="space-y-3">
        <SearchAutocomplete
          label="Start"
          placeholder="Search starting point"
          value={startId}
          onChange={onStartChange}
          places={places}
          id="start-search"
        />
        <SearchAutocomplete
          label="Destination"
          placeholder="Search destination"
          value={endId}
          onChange={onEndChange}
          places={places}
          id="end-search"
        />
      </div>

      <div className="mt-3 flex flex-col gap-2">
        <Button onClick={onFindRoute} disabled={!startId || !endId}>
          <span>Find route</span>
        </Button>
        <div className="flex gap-2">
          <Button variant="secondary" size="sm" className="flex-1" onClick={onClearRoute}>
            Clear
          </Button>
          <Button
            variant="secondary"
            size="sm"
            className="flex-1"
            onClick={onReload}
          >
            <FiRefreshCw className="text-xs" />
            <span>Reload</span>
          </Button>
        </div>
      </div>

      {favorites && favorites.length > 0 && (
        <div className="mt-2 space-y-1">
          <div className="flex items-center justify-between text-[11px] uppercase tracking-[0.16em] text-slate-500">
            <span>Favorites</span>
          </div>
          <div className="flex flex-wrap gap-1.5">
            {favorites.map(fav => (
              <button
                key={fav.id}
                type="button"
                className="inline-flex items-center gap-1 rounded-full border border-slate-700/70 bg-slate-900/80 px-2.5 py-1 text-[11px] text-slate-100 hover:bg-slate-800/90"
                onClick={() => onEndChange(fav.id)}
              >
                <FiStar className="text-amber-300" />
                <span className="truncate max-w-[120px]">{fav.name}</span>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );

  const collapsedWidth = isMobile ? 'w-0' : 'w-[64px]';
  const expandedWidth = isMobile ? 'w-full' : 'w-[320px]';

  return (
    <div
      className={
        isMobile
          ? 'fixed bottom-0 left-0 right-0 z-20 flex justify-center pointer-events-none'
          : 'relative z-10 h-full'
      }
    >
      <motion.aside
        initial={false}
        animate={{
          width: isCollapsed ? (isMobile ? 0 : 64) : isMobile ? '100%' : 320,
          opacity: isCollapsed && isMobile ? 0 : 1,
        }}
        transition={{ type: 'spring', stiffness: 260, damping: 26 }}
        className={
          'pointer-events-auto overflow-hidden rounded-t-3xl md:rounded-3xl bg-slate-900/70 border border-slate-800/80 backdrop-blur-xl shadow-2xl shadow-black/70 md:shadow-xl md:shadow-black/60' +
          ' ' +
          (isMobile ? 'mb-3 mx-3' : 'h-full')
        }
      >
        {!isCollapsed && sidebarContent}
      </motion.aside>

      {/* Collapse / expand toggle */}
      <div
        className={
          'pointer-events-auto absolute md:top-1/2 md:-right-3 flex ' +
          (isMobile ? '-top-3 right-6' : 'items-center')
        }
      >
        <IconButton
          label={isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
          className="h-7 w-7 rounded-full bg-slate-900/90 border border-slate-700/80 shadow-lg shadow-black/60"
          onClick={onToggle}
        >
          {isCollapsed ? (
            <FiChevronRight className="text-sm" />
          ) : (
            <FiChevronLeft className="text-sm" />
          )}
        </IconButton>
      </div>
    </div>
  );
}

LeftSidebar.propTypes = {
  isCollapsed: PropTypes.bool,
  onToggle: PropTypes.func,
  places: PropTypes.array.isRequired,
  favorites: PropTypes.array,
  startId: PropTypes.string,
  endId: PropTypes.string,
  onStartChange: PropTypes.func.isRequired,
  onEndChange: PropTypes.func.isRequired,
  onFindRoute: PropTypes.func.isRequired,
  onClearRoute: PropTypes.func.isRequired,
  onReload: PropTypes.func.isRequired,
  isMobile: PropTypes.bool,
};

export default LeftSidebar;
