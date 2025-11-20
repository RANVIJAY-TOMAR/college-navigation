# How to Extract Coordinates from the Map

## Step 1: Extract EN Point Coordinates

1. **Start a local server**:
   ```bash
   python -m http.server 8000
   ```

2. **Open `coordinate_picker.html`** in your browser:
   - Go to `http://localhost:8000/coordinate_picker.html`

3. **Click on each EN point** on the map:
   - Look for "EN" labels on the map
   - Click exactly on each EN point
   - Enter the name when prompted (e.g., "Gate No.1 EN", "Academic Block 1 EN North", etc.)

4. **Export the coordinates**:
   - Click "Export JSON" button
   - Save as `nodes.json`

## Step 2: Identify Black Paths (Roads)

**Important**: Only use BLACK/DARK paths (roads), NOT brown paths.

Black paths are:
- Dark grey/black colored roads
- Have white dashed lines
- Connect different areas of campus

Brown paths (DO NOT USE):
- The "SEATING AREA" brown path
- Any other brown colored paths

## Step 3: Create Edge Connections

After you have all EN points in `nodes.json`:

1. **Identify which EN points are connected by black paths**
2. **Create `edges.json`** with connections only between EN points that are directly connected by black paths
3. **Each edge should follow the actual black path route** between two EN points

## Current Status

- ✅ All previous coordinates have been removed
- ✅ `nodes.json` is empty - ready for you to add EN points
- ✅ `edges.json` is empty - ready for you to add black path connections
- ✅ Coordinate picker tool is ready to use

## Next Steps

Use the coordinate picker to extract real coordinates from the actual map image, then manually create the edge connections based on which EN points are connected by black paths.

