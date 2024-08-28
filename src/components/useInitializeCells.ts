import { useEffect } from "react";
import * as Tone from "tone";

type Track = {
  id: number;
  name: string;
  instrument: "piano" | "drums" | "bass" | "synth";
};

export const useInitializeCells = (
  tracks: Track[],
  activeCells: boolean[][][],
  setActiveCells: React.Dispatch<React.SetStateAction<boolean[][][]>>,
  synths: (
    | Tone.Synth
    | Tone.MembraneSynth
    | Tone.NoiseSynth
    | Tone.MetalSynth
  )[][],
  setSynths: React.Dispatch<
    React.SetStateAction<
      (Tone.Synth | Tone.MembraneSynth | Tone.NoiseSynth | Tone.MetalSynth)[][]
    >
  >
) => {
  const numRows = 16;
  const numCols = 32;

  useEffect(() => {
    if (tracks.length > activeCells.length) {
      setActiveCells((prevActiveCells: boolean[][][]) => [
        ...prevActiveCells,
        Array.from({ length: numRows }, () => Array(numCols).fill(false)),
      ]);
    }

    if (tracks.length > synths.length) {
      const newTrack = tracks[tracks.length - 1];
      const newSynths =
        newTrack.instrument === "drums"
          ? [
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
              new Tone.MembraneSynth().toDestination(),
              new Tone.MembraneSynth().toDestination(),
              new Tone.MembraneSynth().toDestination(),
              new Tone.NoiseSynth({ noise: { type: "pink" } }).toDestination(),
              new Tone.MetalSynth({
                harmonicity: 2.0,
                modulationIndex: 16,
              }).toDestination(),
              new Tone.MetalSynth({
                harmonicity: 5.0,
                modulationIndex: 32,
              }).toDestination(),
              new Tone.MetalSynth({
                harmonicity: 3.0,
                modulationIndex: 24,
              }).toDestination(),
              new Tone.MembraneSynth().toDestination(),
              new Tone.MembraneSynth().toDestination(),
              new Tone.NoiseSynth({
                noise: { type: "brown" },
              }).toDestination(),
              new Tone.NoiseSynth({
                noise: { type: "white" },
              }).toDestination(),
              new Tone.MembraneSynth().toDestination(),
            ]
          : newTrack.instrument === "bass"
          ? Array(numRows).fill(new Tone.MonoSynth().toDestination())
          : Array(numRows).fill(new Tone.Synth().toDestination());

      setSynths(
        (
          prevSynths: (
            | Tone.Synth
            | Tone.MembraneSynth
            | Tone.NoiseSynth
            | Tone.MetalSynth
          )[][]
        ) => [...prevSynths, newSynths]
      );
    }
  }, [tracks, activeCells, setActiveCells, synths, setSynths]);
};
