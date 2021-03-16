# Juicer

Juicer is a cross-platform, [Electron](http://electron.atom.io/)-based annotation tool for Portable Game Notation (PGN) files.

[Download links will be made available in the 'releases' tab when they are available](https://github.com/lonnen/juicer/releases)

Juicer can currently load PGN files into memory but cannot display them. Here is a screenshot of the current pre-alpha developer preview:

<img width="600" alt="Screen Shot 2021-03-14 showing varible names in place of actual game data" src="https://user-images.githubusercontent.com/21467/111281573-55a30f80-85fa-11eb-94f0-a847809df7ad.png">

## Development Setup

### Prerequisites

- Git
- A recent version of Node / NPM

### Building

```sh
# 1. Checkout repo
git clone git@github.com:lonnen/juicer.git
cd juicer

# 2. Install dependencies
npm install

# 3. Build the app
npm run make

# 4. Run the application
npm start
```

The application will watch for changed in non-compiled application code and rebuild automatically, but you'll need to refresh with <kbd>Ctrl+R</kbd>/<kbd>⌘+R</kbd> reload the window to pull in new changes.

This behavior is likely to change before we reach the first stable relase.

### Packaging

This application has not reached a baseline usability yet. When it does, packaging for distribution will be handled by Github CI.

This application may be manually packed using the following steps from a working dev environment:

```sh
npm run build
npm run package
```

This will package the application into a directory for your platform in the `out` folder ready for distribution.

This application is not ready for distribution yet and this packing step will not improve to neatly zipped distribution bundles until some baseline functionality is reached. This is an intentionally rough edge.

### Publishing

Juicer will eventually automatically publish to the [releases tab](https://github.com/lonnen/juicer/releases) based on versioned tags. Watch there for the first usable version.

## License

Juicer is licensed under the MIT license. See `LICENSE` for more info.
