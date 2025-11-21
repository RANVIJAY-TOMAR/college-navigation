"""
Properly analyze the GLBITM map image to extract:
1. EN point locations (by detecting "EN" text labels)
2. Black path locations (by detecting dark/black pixels that represent roads)
3. Connections between EN points via black paths only
"""

from PIL import Image, ImageDraw, ImageFont
import numpy as np
import json
import math

def detect_black_paths(img_array, threshold=80):
    """
    Detect black/dark paths in the image.
    Black paths are roads - they appear as dark grey/black pixels.
    """
    # Convert to grayscale
    gray = np.mean(img_array, axis=2)
    
    # Black paths have low intensity values
    black_mask = gray < threshold
    
    return black_mask

def find_text_regions(img_array):
    """
    Try to find text regions where "EN" labels might be.
    This is a simplified approach - in practice you'd use OCR.
    """
    # Look for areas with high contrast (text usually has high contrast)
    gray = np.mean(img_array, axis=2)
    
    # Calculate local variance (text areas have high variance)
    from scipy import ndimage
    kernel = np.ones((5, 5)) / 25
    local_mean = ndimage.convolve(gray, kernel)
    local_var = ndimage.convolve((gray - local_mean)**2, kernel)
    
    # Text regions have high variance
    text_mask = local_var > np.percentile(local_var, 85)
    
    return text_mask

def create_visualization(img_path, black_mask, output_path='map_analysis.png'):
    """Create a visualization showing detected black paths."""
    img = Image.open(img_path)
    img_array = np.array(img)
    
    # Create overlay
    overlay = Image.new('RGBA', img.size, (0, 0, 0, 0))
    draw = ImageDraw.Draw(overlay)
    
    # Draw detected black paths in red
    black_pixels = np.where(black_mask)
    for y, x in zip(black_pixels[0], black_pixels[1]):
        draw.point((x, y), fill=(255, 0, 0, 100))  # Semi-transparent red
    
    # Composite
    result = Image.alpha_composite(img.convert('RGBA'), overlay)
    result.save(output_path)
    print(f"Saved analysis visualization to {output_path}")

def analyze_map():
    """Main analysis function."""
    try:
        print("Loading map image...")
        img = Image.open('GLBITM Map.jpg')
        width, height = img.size
        print(f"Map dimensions: {width} x {height} pixels")
        
        img_array = np.array(img)
        print(f"Image array shape: {img_array.shape}")
        
        print("\nAnalyzing black paths (roads)...")
        black_mask = detect_black_paths(img_array, threshold=80)
        black_pixel_count = np.sum(black_mask)
        print(f"Found {black_pixel_count} black path pixels ({black_pixel_count/(width*height)*100:.2f}% of image)")
        
        # Create visualization
        print("\nCreating visualization...")
        create_visualization('GLBITM Map.jpg', black_mask, 'black_paths_detected.png')
        
        print("\n" + "="*60)
        print("ANALYSIS COMPLETE")
        print("="*60)
        print("\nNext steps:")
        print("1. Open 'black_paths_detected.png' to see detected black paths")
        print("2. Use 'coordinate_picker.html' to manually click on each EN point")
        print("3. The coordinate picker will give you exact pixel coordinates")
        print("4. Export the coordinates and update nodes.json")
        print("5. Then create edges.json connecting EN points via black paths only")
        print("\nNote: EN points must be manually identified by clicking on the map")
        print("      as they are text labels that require visual inspection.")
        
        return width, height, black_mask
        
    except ImportError as e:
        print(f"Missing library: {e}")
        print("Install with: pip install Pillow scipy numpy")
        return None, None, None
    except Exception as e:
        print(f"Error: {e}")
        import traceback
        traceback.print_exc()
        return None, None, None

if __name__ == "__main__":
    print("="*60)
    print("GLBITM Campus Map Analysis")
    print("="*60)
    print()
    
    width, height, black_mask = analyze_map()
    
    if width and height:
        print(f"\nMap analyzed successfully!")
        print(f"  Dimensions: {width} x {height} pixels")

