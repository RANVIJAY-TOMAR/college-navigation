# Next Steps After Using Coordinate Picker

## ✅ Step 1: Verify Your nodes.json

1. Check that `nodes.json` has all your EN points
2. If it's empty, go back to `coordinate_picker.html` and export the JSON

## 🔗 Step 2: Create Edge Connections

1. **Open `edge_builder.html`** in your browser (with local server running)
2. **The tool will automatically load your nodes.json**
3. **For each pair of EN points connected by a black path:**
   - Select the "From" EN point (source)
   - Select the "To" EN point (target)
   - Click "Add Edge Connection"
   - **IMPORTANT**: Only connect EN points that have a direct black road between them!

4. **Visual Guide:**
   - You'll see all EN points marked on the map
   - When you add an edge, a line will appear connecting them
   - This helps you verify the connection is correct

5. **Export edges.json:**
   - Once you've added all connections, click "Export edges.json"
   - This will save your edge connections

## 🎯 Important Rules:

- ✅ **DO**: Connect EN points that are directly connected by black paths (roads)
- ❌ **DON'T**: Connect points through brown paths
- ❌ **DON'T**: Connect points that require going through other EN points (create separate edges for each segment)

## 🧪 Step 3: Test the Navigation

1. Open `index.html` in your browser
2. Select a start and end location
3. Click "Find Route"
4. Verify the route follows black paths correctly

## 📝 Example:

If you have:
- EN Point A (Gate 1)
- EN Point B (Central Junction)  
- EN Point C (Academic Block 1)

And there's a black path: Gate 1 → Central Junction → Academic Block 1

You should create:
- Edge 1: Gate 1 → Central Junction
- Edge 2: Central Junction → Academic Block 1

NOT:
- Edge 1: Gate 1 → Academic Block 1 (skipping the junction)

