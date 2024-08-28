import React from "react";
import { PauseIcon, PlayIcon } from "@heroicons/react/24/solid";

interface FooterControlsProps {
  isPlaying: boolean;
  togglePlay: () => void;
  tempo: number;
  handleTempoChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const FooterControls: React.FC<FooterControlsProps> = ({
  isPlaying,
  togglePlay,
  tempo,
  handleTempoChange,
}) => {
  return (
    <div className="mt-4 bg-secondary p-4 rounded-lg flex justify-between items-center">
      <button
        onClick={togglePlay}
        className="bg-blue-500 text-white w-16 h-16 rounded-full hover:bg-blue-600 transition-all duration-200 flex items-center justify-center"
      >
        {isPlaying ? (
          <PauseIcon className="h-8 w-8" />
        ) : (
          <PlayIcon className="h-8 w-8" />
        )}
      </button>
      <div className="flex items-center justify-center w-full">
        <label htmlFor="tempo" className="text-white text-lg mr-2">
          Tempo:
        </label>
        <input
          id="tempo"
          type="number"
          value={tempo}
          onChange={handleTempoChange}
          className="w-48 h-12 bg-gray-700 text-white rounded-lg p-2 text-center text-lg"
          min="40"
          max="240"
        />
      </div>
      <div className="w-16"></div>
    </div>
  );
};

export default FooterControls;
