# How to Run the Campus Navigation System

## ⚠️ IMPORTANT: You MUST use a local web server!

You cannot open the HTML files directly in your browser (double-clicking them). You need to run a local web server.

## Quick Start (Windows)

### Option 1: Use the batch file (Easiest)
1. Double-click `start_server.bat`
2. Wait for the server to start
3. Open your browser and go to: `http://localhost:8000/route_editor.html`

### Option 2: Use Command Prompt
1. Open Command Prompt in this folder
2. Type: `python -m http.server 8000`
3. Press Enter
4. Open your browser and go to: `http://localhost:8000/route_editor.html`

## Quick Start (Mac/Linux)

### Option 1: Use the shell script
1. Open Terminal in this folder
2. Type: `chmod +x start_server.sh`
3. Type: `./start_server.sh`
4. Open your browser and go to: `http://localhost:8000/route_editor.html`

### Option 2: Use Terminal
1. Open Terminal in this folder
2. Type: `python3 -m http.server 8000`
3. Press Enter
4. Open your browser and go to: `http://localhost:8000/route_editor.html`

## If you don't have Python installed:

### Install Python:
- Windows: Download from https://www.python.org/downloads/
- Mac: Usually pre-installed, or use Homebrew: `brew install python3`
- Linux: `sudo apt-get install python3` (Ubuntu/Debian)

### Alternative: Use Node.js
If you have Node.js installed:
```bash
npx http-server -p 8000
```

## Available Pages:

1. **route_editor.html** - Create manual routes between EN points
   - URL: `http://localhost:8000/route_editor.html`

2. **navigation.html** - Main navigation system for users
   - URL: `http://localhost:8000/navigation.html`

3. **path_tracer.html** - Trace individual paths (for edges.json)
   - URL: `http://localhost:8000/path_tracer.html`

4. **coordinate_picker.html** - Pick EN point coordinates
   - URL: `http://localhost:8000/coordinate_picker.html`

## Troubleshooting:

**Error: "python is not recognized"**
- Make sure Python is installed
- Try `python3` instead of `python`
- Add Python to your PATH

**Error: "Port 8000 already in use"**
- Use a different port: `python -m http.server 8080`
- Then use: `http://localhost:8080/route_editor.html`

**Still getting CORS errors?**
- Make sure you're using `http://localhost:8000/` NOT `file:///`
- Check the URL bar - it should start with `http://` not `file:///`

