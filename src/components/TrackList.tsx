import React from "react";
import { PlusCircleIcon } from "@heroicons/react/24/solid";

interface Track {
  id: number;
  name: string;
  instrument: "piano" | "drums" | "bass" | "synth";
}

interface TrackListProps {
  tracks: Track[];
  onAddTrack: () => void;
  onChangeInstrument: (
    id: number,
    instrument: "piano" | "drums" | "bass" | "synth"
  ) => void;
}

const TrackList: React.FC<TrackListProps> = ({
  tracks,
  onAddTrack,
  onChangeInstrument,
}) => {
  return (
    <div className="w-1/6 bg-secondary text-dark p-4 flex flex-col rounded-lg shadow-lg">
      <ul className="flex-grow overflow-y-auto">
        {tracks.map((track) => (
          <li
            key={track.id}
            className="py-3 px-4 bg-lightGray rounded-lg mt-2 hover:bg-accent hover:text-white transition-all duration-200 text-dark flex items-center justify-between shadow-md"
          >
            <div>
              <span>{track.name}</span>
              <select
                value={track.instrument}
                onChange={(e) =>
                  onChangeInstrument(
                    track.id,
                    e.target.value as "piano" | "drums" | "bass" | "synth"
                  )
                }
                className="ml-4 p-1 bg-white text-dark rounded"
              >
                <option value="piano">Piano</option>
                <option value="drums">Drums</option>
                <option value="bass">Bass</option>
                <option value="synth">Synth</option>
              </select>
            </div>
          </li>
        ))}
      </ul>
      <button
        onClick={onAddTrack}
        className="mt-4 p-3 bg-accent text-white rounded-lg hover:bg-blue-700 transition-all duration-200 flex items-center justify-center shadow-md"
      >
        <PlusCircleIcon className="h-6 w-6 mr-2" />
        Add Track
      </button>
    </div>
  );
};

export default TrackList;
