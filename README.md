# GLBITM Campus Navigation System

A navigation system for GLBITM campus that finds routes between EN (Entry) points using only black paths (roads).

## Features

- **EN Points Only**: All navigation nodes are EN (Entry) points from buildings and facilities
- **Black Paths Only**: Routes use only black/dark roads (not brown paths or other areas)
- **Interactive Map**: Click to select start and end locations
- **Visual Route Display**: Shows the complete route highlighted on the map
- **Distance Calculation**: Displays route distance in pixels and estimated meters

## Files

- `index.html` - Main navigation interface
- `nodes.json` - All EN points with coordinates
- `edges.json` - Road connections between EN points (black paths only)
- `GLBITM Map.jpg` - Campus map image
- `coordinate_picker.html` - Tool to extract accurate coordinates from the map

## Usage

1. **Run a local server** (required for loading JSON files):
   ```bash
   # Python 3
   python -m http.server 8000
   
   # Or Node.js
   npx http-server
   ```

2. **Open in browser**: Navigate to `http://localhost:8000`

3. **Select locations**: Choose start and end EN points from dropdowns

4. **Find route**: Click "Find Route" to see the path

## Refining Coordinates

If you need to adjust EN point coordinates:

1. Open `coordinate_picker.html` in your browser
2. Click on each EN point on the map
3. Enter the EN point name when prompted
4. Export the JSON and replace `nodes.json`

## Map Dimensions

- Width: 1500 pixels
- Height: 1286 pixels
- Coordinate system: (0,0) at top-left, (1500, 1286) at bottom-right

## Current EN Points

The system includes 28 EN points:
- Gate No.1 and Gate No.2
- All building entry points (Academic Blocks, Hostels, Workshops, etc.)
- Security rooms
- Facilities (Mess, Cafeteria, Gym, etc.)

All connections follow black paths (roads) only, excluding brown paths and other non-road areas.

