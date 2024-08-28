# Web-Based Music Sequencer

This project is a web-based music sequencer that allows users to create and manage multiple tracks with different instruments. It supports various instruments such as piano, drums, bass, and synth. Each track is independent, allowing for complex compositions.

## Features

- **Multiple Tracks**: Create and manage multiple tracks, each with its own instrument.
- **Instrument Selection**: Choose from piano, drums, bass, or synth for each track.
- **Step Sequencer**: Each track uses a step sequencer grid to enable users to create rhythmic patterns.
- **Real-time Playback**: Play back your composition in real-time, with each track playing simultaneously.
- **Tempo Control**: Adjust the tempo of the playback to suit your composition.

## Installation

1. **Clone the repository**:
    ```bash
    git clone https://github.com/yourusername/web-music-sequencer.git
    cd web-music-sequencer
    ```

2. **Install dependencies**:
    ```bash
    npm install
    ```

3. **Run the development server**:
    ```bash
    npm run dev
    ```

4. **Open the app**:
    Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

## Usage

1. **Add a Track**:
    - Click on the "Add Track" button in the sidebar to create a new track.
    - You can add multiple tracks and assign each track a different instrument.

2. **Select an Instrument**:
    - Use the dropdown menu next to each track's name to select the instrument for that track.

3. **Compose**:
    - Click on the cells in the step sequencer grid to activate or deactivate steps.
    - Each row represents a different note or drum sound, depending on the instrument.

4. **Playback**:
    - Click the play button to start the playback. Adjust the tempo if necessary.

5. **Save/Load**:
    - Currently, there is no built-in functionality for saving or loading compositions. Future updates may include this feature.

## Development

This project is built using the following technologies:

- **React**: A JavaScript library for building user interfaces.
- **Next.js**: A React framework for server-side rendering and generating static websites.
- **Vite**: A build tool that provides fast development and hot module replacement.
- **Tone.js**: A framework for creating interactive music in the browser.
- **Tailwind CSS**: A utility-first CSS framework for styling.

### Project Structure

- `components/`: Contains reusable React components like `SequencerGrid`, `TrackList`, and `FooterControls`.
- `pages/`: The main application pages.
- `public/`: Static assets such as images or audio files.
- `styles/`: Global styles and Tailwind configuration.

## Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository.
2. Create a new branch for your feature or bugfix.
3. Make your changes and ensure they pass all tests.
4. Submit a pull request with a description of your changes.

## License

This project is licensed under the MIT License.
