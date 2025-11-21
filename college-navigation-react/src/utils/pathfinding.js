// Simple Euclidean distance helper
function distance(a, b) {
  const dx = a.x - b.x;
  const dy = a.y - b.y;
  return Math.hypot(dx, dy);
}

/**
 * (Legacy) simple direct route helper kept for tests/examples.
 * Prefer computing routes from real nodes/edges/routes in App.jsx.
 */
export function computeRoute(places, startId, endId) {
  const start = places.find(p => p.id === startId);
  const end = places.find(p => p.id === endId);
  if (!start || !end || start.id === end.id) {
    return { points: [], length: 0 };
  }

  const points = [
    { x: start.x, y: start.y, placeId: start.id },
    { x: end.x, y: end.y, placeId: end.id },
  ];
  const length = distance(start, end);

  return { points, length };
}

/**
 * Generate human-readable directions from a route.
 *
 * @param {{ points: Array<{x:number;y:number;placeId?:number|string}>, length: number }} route
 * @param {Record<string|number, {id:string|number; name:string}>} placesById
 * @returns {Array<{id:string; title:string; detail:string; distance:number}>}
 */
export function generateDirections(route, placesById = {}) {
  const { points, length } = route;
  if (!points || points.length < 2) return [];

  const start = points[0];
  const end = points[points.length - 1];
  const startPlace = start.placeId ? placesById[start.placeId] : null;
  const endPlace = end.placeId ? placesById[end.placeId] : null;

  const approxMeters = Math.round(length * 0.5);

  const steps = [];

  steps.push({
    id: 'start',
    title: startPlace ? `Start at ${startPlace.name}` : 'Start',
    detail: 'Head towards your destination.',
    distance: 0,
  });

  steps.push({
    id: 'continue',
    title: 'Continue straight',
    detail: `Walk for about ${approxMeters} meters.`,
    distance: approxMeters,
  });

  steps.push({
    id: 'end',
    title: endPlace ? `Arrive at ${endPlace.name}` : 'Destination',
    detail: 'You have reached your destination.',
    distance: 0,
  });

  return steps;
}
