# PCD Viewer

A Visual Studio Code extension for viewing [PCD (Point Cloud Data) files](http://pointclouds.org/documentation/tutorials/pcd_file_format.php) directly inside the editor.  
Powered by [three.js](https://threejs.org/) and supports interactive 3D navigation.

---

## Features

- 🔍 **Preview .pcd Files**: Open and inspect 3D point cloud data in real time.
- 🖱️ **Orbit Controls**: Pan, zoom, and rotate using your mouse.
- ⚡ **Fast Rendering**: Efficient visualization via WebGL.
- 🎨 **Dark UI**: Seamless integration with your VS Code theme.

## Getting Started

### Installation

1. Search for `PCD Viewer` in the VS Code Extensions Marketplace and install.
2. Or, download the latest `.vsix` from [Releases](https://github.com/your-repo-url/releases) and install manually:
   - Run `Extensions: Install from VSIX...` in the command palette.

### Usage

1. Open a `.pcd` file in VS Code.
2. Right-click and select **"Open with PCD Viewer"**  
   or run the command palette:  
   `PCD Viewer: Open Viewer`
3. Interact with the 3D point cloud using mouse controls.

#### Mouse Controls

- **Left Mouse Drag** – Orbit/rotate view
- **Right Mouse Drag** – Pan
- **Mouse Wheel** – Zoom

## Development

To build and test locally:

1. Clone this repo.
2. Run `npm install` to install dependencies.
3. Press `F5` in VS Code to launch the extension development host.
4. Open a `.pcd` file and use the command palette to launch the viewer.

The Webview uses [three.js](https://threejs.org/) and loads modules via [unpkg CDN](https://unpkg.com/).

## How it works

This extension opens a custom Webview panel and loads your PCD file into a three.js scene.  
The rendering and controls are all done client-side, with no external server dependencies.

## Known Issues

- Very large `.pcd` files may load slowly depending on your hardware.
- Only supports ASCII and binary PCD formats supported by [three.js PCDLoader](https://threejs.org/docs/#examples/en/loaders/PCDLoader).
- Some `.pcd` features may not be fully supported (e.g., extra attributes).

## License

[MIT](LICENSE)

## Credits

- [three.js](https://threejs.org/)
- [PCDLoader](https://threejs.org/docs/#examples/en/loaders/PCDLoader)
- Inspired by the [Point Cloud Library](http://pointclouds.org/)

---

Feel free to submit issues or pull requests!