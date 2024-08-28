import React, { useState } from "react";
import Header from "./components/Header";
import TrackList from "./components/TrackList";
import SequencerGrid from "./components/SequencerGrid";
import FooterControls from "./components/FooterControls";

interface Track {
  id: number;
  name: string;
  instrument: "piano" | "drums" | "bass" | "synth";
}

const App: React.FC = () => {
  const [tracks, setTracks] = useState<Track[]>([
    { id: 1, name: "Track 1", instrument: "piano" },
  ]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [tempo, setTempo] = useState(120);

  const addTrack = () => {
    const newTrack: Track = {
      id: tracks.length + 1,
      name: `Track ${tracks.length + 1}`,
      instrument: "piano",
    };
    setTracks([...tracks, newTrack]);
  };

  const changeInstrument = (
    id: number,
    instrument: "piano" | "drums" | "bass" | "synth"
  ) => {
    setTracks((prevTracks) =>
      prevTracks.map((track) =>
        track.id === id ? { ...track, instrument } : track
      )
    );
  };

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
  };

  const handleTempoChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTempo(Number(event.target.value));
  };

  return (
    <div className="flex flex-col h-screen bg-primary text-dark">
      <Header />
      <div className="flex flex-grow min-h-0">
        <TrackList
          tracks={tracks}
          onAddTrack={addTrack}
          onChangeInstrument={changeInstrument}
        />
        <div className="w-5/6 flex flex-col p-6 h-full">
          <div className="flex-grow flex flex-col h-full">
            <SequencerGrid
              isPlaying={isPlaying}
              tempo={tempo}
              tracks={tracks}
            />
            <FooterControls
              isPlaying={isPlaying}
              togglePlay={togglePlay}
              tempo={tempo}
              handleTempoChange={handleTempoChange}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
