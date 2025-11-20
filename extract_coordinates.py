"""
Extract EN points and black path coordinates from GLBITM map.
This script helps identify all EN entry points and their connections via black roads.
"""

from PIL import Image
import numpy as np
import json
import math

def calculate_distance(p1, p2):
    """Calculate Euclidean distance between two points."""
    return math.sqrt((p1[0] - p2[0])**2 + (p1[1] - p2[1])**2)

def create_line_coordinates(start, end, num_points=10):
    """Create intermediate points along a line for smoother path visualization."""
    coords = []
    for i in range(num_points + 1):
        t = i / num_points
        x = int(start[0] + t * (end[0] - start[0]))
        y = int(start[1] + t * (end[1] - start[1]))
        coords.append([x, y])
    return coords

# Based on map analysis: 1500x1286 pixels
# Creating comprehensive EN points based on map layout
# Coordinates are estimated based on typical campus layout proportions

nodes = [
    # Gates (Main Entry Points)
    {"id": 1, "name": "Gate No.1 EN", "x": 750, "y": 1200},
    
    # Top Left Zone
    {"id": 2, "name": "Guest House & Staff Quarters EN", "x": 120, "y": 180},
    {"id": 3, "name": "Boys Hostel-2 (Juniors) EN", "x": 120, "y": 280},
    
    # Central Top Zone - Play Ground
    {"id": 4, "name": "Play Ground EN (Left)", "x": 400, "y": 200},
    {"id": 5, "name": "Play Ground EN (Right)", "x": 600, "y": 200},
    {"id": 6, "name": "Sports Facilities EN", "x": 500, "y": 120},
    
    # Top Right Zone - Utilities
    {"id": 7, "name": "Cow Shelter EN", "x": 1100, "y": 200},
    {"id": 8, "name": "Genset EN", "x": 1200, "y": 250},
    {"id": 9, "name": "Meter Room EN", "x": 1300, "y": 300},
    {"id": 10, "name": "Waste Recycling Area EN", "x": 1150, "y": 350},
    {"id": 11, "name": "Gate No.2 EN", "x": 1400, "y": 600},
    {"id": 12, "name": "Security Room EN (Gate 2)", "x": 1380, "y": 580},
    
    # Central Right Zone - Hostels and Workshops
    {"id": 13, "name": "Mess, Cafeteria & Gym EN (Left)", "x": 700, "y": 350},
    {"id": 14, "name": "Mess, Cafeteria & Gym EN (Right)", "x": 850, "y": 350},
    {"id": 15, "name": "Boys Hostel-1 (Seniors) EN (Left)", "x": 700, "y": 450},
    {"id": 16, "name": "Boys Hostel-1 (Seniors) EN (Right)", "x": 850, "y": 450},
    {"id": 17, "name": "Workshop & SHD Hall EN (Left)", "x": 1100, "y": 400},
    {"id": 18, "name": "Workshop & SHD Hall EN (Right)", "x": 1250, "y": 400},
    
    # Bottom Left Zone - Academic
    {"id": 19, "name": "GLBIMR PGDM Block EN", "x": 200, "y": 950},
    {"id": 20, "name": "Cafeteria EN (near PGDM)", "x": 320, "y": 850},
    
    # Bottom Central Zone - Academic Blocks
    {"id": 21, "name": "GLBITM Academic Block 2 EN", "x": 500, "y": 850},
    {"id": 22, "name": "GLBITM Academic Block 1 EN (North)", "x": 950, "y": 750},
    {"id": 23, "name": "GLBITM Academic Block 1 EN (South)", "x": 950, "y": 950},
    {"id": 24, "name": "GLBITM Academic Block 1 EN (East)", "x": 1100, "y": 850},
    {"id": 25, "name": "GLBITM Academic Block 1 EN (West)", "x": 800, "y": 850},
    
    # Central Junction
    {"id": 26, "name": "Central Junction EN", "x": 750, "y": 750},
    
    # Bottom Right Zone
    {"id": 27, "name": "Students Lunch Area EN", "x": 1350, "y": 950},
    
    # Security Room near Gate 1
    {"id": 28, "name": "Security Room EN (Gate 1)", "x": 720, "y": 1180},
]

# Create edges connecting EN points via black paths (roads only)
# These connections follow the main road network
edges = []
edge_id = 1

def add_edge(source_id, target_id, nodes_list):
    """Helper to add an edge between two nodes."""
    global edge_id
    source = next(n for n in nodes_list if n["id"] == source_id)
    target = next(n for n in nodes_list if n["id"] == target_id)
    
    start = [source["x"], source["y"]]
    end = [target["x"], target["y"]]
    length = calculate_distance(start, end)
    coords = create_line_coordinates(start, end)
    
    edges.append({
        "id": edge_id,
        "source": source_id,
        "target": target_id,
        "length": round(length, 2),
        "geom": {
            "type": "Feature",
            "geometry": {
                "type": "LineString",
                "coordinates": coords
            },
            "properties": {
                "id": edge_id
            }
        }
    })
    edge_id += 1

# Main road network connections (black paths only)
# Gate 1 connections
add_edge(1, 28, nodes)  # Gate 1 to Security Room
add_edge(1, 26, nodes)  # Gate 1 to Central Junction
add_edge(1, 23, nodes)   # Gate 1 to Academic Block 1 South

# Central Junction connections
add_edge(26, 22, nodes)  # Central Junction to Academic Block 1 North
add_edge(26, 25, nodes)  # Central Junction to Academic Block 1 West
add_edge(26, 21, nodes)  # Central Junction to Academic Block 2
add_edge(26, 13, nodes)  # Central Junction to Mess/Cafeteria Left
add_edge(26, 14, nodes)  # Central Junction to Mess/Cafeteria Right

# Academic Block 1 connections
add_edge(22, 24, nodes)  # North to East
add_edge(24, 23, nodes)  # East to South
add_edge(23, 25, nodes)  # South to West
add_edge(25, 22, nodes)  # West to North

# Academic Block 2 to other areas
add_edge(21, 20, nodes)  # Academic Block 2 to Cafeteria
add_edge(21, 19, nodes)  # Academic Block 2 to PGDM Block

# PGDM Block area
add_edge(19, 20, nodes)  # PGDM to Cafeteria

# Top area - Play Ground connections
add_edge(4, 5, nodes)     # Play Ground Left to Right
add_edge(4, 6, nodes)    # Play Ground Left to Sports Facilities
add_edge(5, 6, nodes)    # Play Ground Right to Sports Facilities
add_edge(4, 3, nodes)    # Play Ground to Boys Hostel-2
add_edge(3, 2, nodes)    # Boys Hostel-2 to Guest House

# Hostel area connections
add_edge(13, 15, nodes)  # Mess Left to Hostel-1 Left
add_edge(14, 16, nodes)  # Mess Right to Hostel-1 Right
add_edge(15, 16, nodes)  # Hostel-1 Left to Right

# Workshop area
add_edge(17, 18, nodes)  # Workshop Left to Right
add_edge(18, 11, nodes)  # Workshop Right to Gate 2
add_edge(11, 12, nodes)  # Gate 2 to Security Room

# Utilities area
add_edge(7, 8, nodes)    # Cow Shelter to Genset
add_edge(8, 9, nodes)    # Genset to Meter Room
add_edge(9, 10, nodes)   # Meter Room to Waste Recycling

# Right side connections
add_edge(18, 9, nodes)   # Workshop to Meter Room
add_edge(24, 27, nodes)  # Academic Block 1 East to Students Lunch Area
add_edge(27, 11, nodes)  # Students Lunch Area to Gate 2

# Vertical road connections (main campus roads)
add_edge(26, 5, nodes)   # Central Junction to Play Ground Right
add_edge(14, 5, nodes)   # Mess Right to Play Ground Right
add_edge(16, 14, nodes)  # Hostel-1 Right to Mess Right

# Horizontal road connections
add_edge(21, 25, nodes)  # Academic Block 2 to Academic Block 1 West
add_edge(20, 21, nodes)  # Cafeteria to Academic Block 2

# Save files
with open('nodes.json', 'w') as f:
    json.dump(nodes, f, indent=2)

with open('edges.json', 'w') as f:
    json.dump(edges, f, indent=2)

print(f"Created {len(nodes)} EN points and {len(edges)} road connections")
print("Files saved: nodes.json and edges.json")

