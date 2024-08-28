import React, { useState, useEffect } from "react";
import * as Tone from "tone";
import SequencerCell from "./SequencerCell";
import { playSound } from "./playSound";

interface Track {
  id: number;
  name: string;
  instrument: "piano" | "drums" | "bass" | "synth";
}

interface SequencerGridProps {
  isPlaying: boolean;
  tempo: number;
  tracks: Track[];
}

const SequencerGrid: React.FC<SequencerGridProps> = ({
  isPlaying,
  tempo,
  tracks,
}) => {
  const numRows = 16;
  const numCols = 32;
  const [activeCells, setActiveCells] = useState<boolean[][][]>([]);
  const [currentStep, setCurrentStep] = useState(0);
  const [isMouseDown, setIsMouseDown] = useState(false);
  const [synths, setSynths] = useState<
    (Tone.Synth | Tone.MembraneSynth | Tone.NoiseSynth | Tone.MetalSynth)[][]
  >([]);

  useEffect(() => {
    // トラック数に基づいて activeCells を初期化または更新
    if (activeCells.length !== tracks.length) {
      setActiveCells(
        Array.from(
          { length: tracks.length },
          (_, trackIndex) =>
            activeCells[trackIndex] ||
            Array.from({ length: numRows }, () => Array(numCols).fill(false))
        )
      );
    }

    // トラック数に基づいて synths を初期化または更新
    if (synths.length !== tracks.length) {
      const synthArray = tracks.map((track) => {
        if (track.instrument === "drums") {
          return [
            new Tone.MembraneSynth().toDestination(),
            new Tone.NoiseSynth({ noise: { type: "white" } }).toDestination(),
            new Tone.MetalSynth({
              harmonicity: 5.1,
              modulationIndex: 32,
            }).toDestination(),
            new Tone.MetalSynth({
              harmonicity: 4.0,
              modulationIndex: 16,
            }).toDestination(),
          ];
        } else if (track.instrument === "bass") {
          return Array(numRows).fill(new Tone.MonoSynth().toDestination());
        } else {
          return Array(numRows).fill(new Tone.Synth().toDestination());
        }
      });
      setSynths(synthArray);
    }
  }, [tracks, activeCells, synths]);

  const toggleCell = (trackIndex: number, row: number, col: number) => {
    const newActiveCells = activeCells.map((trackArr, tIndex) =>
      tIndex === trackIndex
        ? trackArr.map((rowArr, rowIndex) =>
            rowIndex === row
              ? rowArr.map((cell, colIndex) =>
                  colIndex === col ? !cell : cell
                )
              : rowArr
          )
        : trackArr
    );
    setActiveCells(newActiveCells);

    if (newActiveCells[trackIndex][row][col]) {
      playSound(
        tracks[trackIndex].instrument === "drums"
          ? synths[trackIndex][row % synths[trackIndex].length]
          : synths[trackIndex][row],
        tracks[trackIndex].instrument,
        row,
        0.25
      );
    }
  };

  const handleMouseDown = (trackIndex: number, row: number, col: number) => {
    setIsMouseDown(true);
    toggleCell(trackIndex, row, col);
  };

  const handleMouseEnter = (trackIndex: number, row: number, col: number) => {
    if (isMouseDown) {
      toggleCell(trackIndex, row, col);
    }
  };

  const handleMouseUp = () => {
    setIsMouseDown(false);
  };

  useEffect(() => {
    let intervalId: number | null = null;

    const startPlayback = async () => {
      await Tone.start();
      Tone.Transport.bpm.value = tempo;
      Tone.Transport.start();

      const interval = ((60 / tempo) * 1000) / 4;
      intervalId = window.setInterval(() => {
        setCurrentStep((prevStep) => (prevStep + 1) % numCols);
      }, interval);
    };

    if (isPlaying) {
      startPlayback();
    } else {
      Tone.Transport.stop();
      setCurrentStep(0);
      if (intervalId) clearInterval(intervalId);
    }

    return () => {
      if (intervalId) clearInterval(intervalId);
    };
  }, [isPlaying, tempo]);

  useEffect(() => {
    if (isPlaying) {
      tracks.forEach((track, trackIndex) => {
        activeCells[trackIndex].forEach((row, rowIndex) => {
          if (row[currentStep]) {
            playSound(
              track.instrument === "drums"
                ? synths[trackIndex][rowIndex % synths[trackIndex].length]
                : synths[trackIndex][rowIndex],
              track.instrument,
              rowIndex,
              0.25
            );
          }
        });
      });
    }
  }, [currentStep, activeCells, isPlaying, tracks, synths]);

  return (
    <div
      className="flex-grow bg-primary rounded-lg overflow-y-auto"
      onMouseUp={handleMouseUp}
    >
      <div
        className="grid gap-1"
        style={{ gridTemplateColumns: `repeat(${numCols}, 1fr)` }}
      >
        {tracks.map((_, trackIndex) =>
          Array.from({ length: numRows }).map((_, row) =>
            Array.from({ length: numCols }).map((_, col) => {
              const isActive = activeCells[trackIndex]?.[row]?.[col] || false;

              return (
                <SequencerCell
                  key={`${trackIndex}-${row}-${col}`}
                  isActive={isActive}
                  isPlaying={currentStep === col && isPlaying}
                  onMouseDown={() => handleMouseDown(trackIndex, row, col)}
                  onMouseEnter={() => handleMouseEnter(trackIndex, row, col)}
                />
              );
            })
          )
        )}
      </div>
    </div>
  );
};

export default SequencerGrid;
