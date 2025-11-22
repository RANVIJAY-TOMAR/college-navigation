// Imperative helper to animate a marker along a polyline.
// Consumers pass callbacks to update position and active segment.
export class MarkerAnimator {
  constructor({ points, durationMs = 6000, onUpdate, onComplete, onSegmentChange }) {
    this.points = points || [];
    this.durationMs = durationMs;
    this.onUpdate = onUpdate;
    this.onComplete = onComplete;
    this.onSegmentChange = onSegmentChange;

    this._raf = null;
    this._startTime = null;
    this._pauseTime = null;
    this._isPlaying = false;
    this._speedMultiplier = 1;
    this._lastSegmentIndex = null;
  }

  setPoints(points) {
    this.points = points || [];
  }

  setSpeed(multiplier) {
    this._speedMultiplier = Math.max(0.2, Math.min(multiplier, 4));
  }

  play() {
    if (!this.points || this.points.length < 2) return;
    if (this._isPlaying && this._raf) return;

    this._isPlaying = true;

    const now = performance.now();
    if (this._pauseTime != null) {
      const pausedDuration = now - this._pauseTime;
      this._startTime += pausedDuration;
      this._pauseTime = null;
    } else if (!this._startTime) {
      this._startTime = now;
    }

    const step = timestamp => {
      if (!this._isPlaying) return;

      const elapsed = (timestamp - this._startTime) * this._speedMultiplier;
      const progress = Math.min(1, elapsed / this.durationMs);

      const t = progress * (this.points.length - 1);
      const idx = Math.floor(t);
      const frac = t - idx;
      const a = this.points[idx];
      const b = this.points[Math.min(idx + 1, this.points.length - 1)];

      // Guard against any bad/undefined points so we don't crash with "reading 'x' of undefined".
      // If data is bad for a frame, just skip updating instead of killing the whole animation.
      if (
        !a ||
        !b ||
        typeof a.x !== 'number' ||
        typeof a.y !== 'number' ||
        typeof b.x !== 'number' ||
        typeof b.y !== 'number'
      ) {
        console.warn('[MarkerAnimator] Invalid point data, skipping frame', { a, b, idx, progress });
        this._raf = requestAnimationFrame(step);
        return;
      }

      const x = a.x + (b.x - a.x) * frac;
      const y = a.y + (b.y - a.y) * frac;

      let angleDeg = 0;
      const dx = b.x - a.x;
      const dy = b.y - a.y;
      if (dx !== 0 || dy !== 0) {
        angleDeg = (Math.atan2(dy, dx) * 180) / Math.PI;
      }

      if (this.onUpdate) {
        this.onUpdate({ x, y, angleDeg, progress });
      }

      if (this.onSegmentChange && idx !== this._lastSegmentIndex) {
        this._lastSegmentIndex = idx;
        this.onSegmentChange(idx);
      }

      if (progress >= 1) {
        this._isPlaying = false;
        this._raf = null;
        this._startTime = null;
        this._pauseTime = null;
        if (this.onComplete) this.onComplete();
        return;
      }

      this._raf = requestAnimationFrame(step);
    };

    this._raf = requestAnimationFrame(step);
  }

  pause() {
    if (!this._isPlaying) return;
    this._isPlaying = false;
    if (this._raf) cancelAnimationFrame(this._raf);
    this._raf = null;
    this._pauseTime = performance.now();
  }

  stop() {
    this._isPlaying = false;
    if (this._raf) cancelAnimationFrame(this._raf);
    this._raf = null;
    this._startTime = null;
    this._pauseTime = null;
    this._lastSegmentIndex = null;
  }

  replay() {
    this.stop();
    this.play();
  }

  destroy() {
    this.stop();
    this.points = [];
    this.onUpdate = null;
    this.onComplete = null;
    this.onSegmentChange = null;
  }
}
