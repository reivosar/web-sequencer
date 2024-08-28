import { useEffect } from "react";
import * as Tone from "tone";

export const useInitializeSynths = (tracks: any[], setSynths: Function) => {
  useEffect(() => {
    const numRows = 16;
    const synthArray = tracks.map((track) => {
      if (track.instrument === "drums") {
        return [
          new Tone.MembraneSynth().toDestination(), // Kick
          new Tone.NoiseSynth({ noise: { type: "white" } }).toDestination(), // Snare
          new Tone.MetalSynth({
            harmonicity: 5.1,
            modulationIndex: 32,
          }).toDestination(), // Hi-hat
          new Tone.MetalSynth({
            harmonicity: 4.0,
            modulationIndex: 16,
          }).toDestination(), // Cymbal
          new Tone.MembraneSynth().toDestination(), // Tom 1
          new Tone.MembraneSynth().toDestination(), // Tom 2
          new Tone.MembraneSynth().toDestination(), // Tom 3
          new Tone.NoiseSynth({ noise: { type: "pink" } }).toDestination(), // Clap
          new Tone.MetalSynth({
            harmonicity: 2.0,
            modulationIndex: 16,
          }).toDestination(), // Rimshot
          new Tone.MetalSynth({
            harmonicity: 5.0,
            modulationIndex: 32,
          }).toDestination(), // Ride Cymbal
          new Tone.MetalSynth({
            harmonicity: 3.0,
            modulationIndex: 24,
          }).toDestination(), // Cowbell
          new Tone.MembraneSynth().toDestination(), // Low Conga
          new Tone.MembraneSynth().toDestination(), // High Conga
          new Tone.NoiseSynth({ noise: { type: "brown" } }).toDestination(), // Tambourine
          new Tone.NoiseSynth({ noise: { type: "white" } }).toDestination(), // Shaker
          new Tone.MembraneSynth().toDestination(), // Kick 2
        ];
      } else if (track.instrument === "bass") {
        return Array(numRows).fill(new Tone.MonoSynth().toDestination());
      } else {
        return Array(numRows).fill(new Tone.Synth().toDestination());
      }
    });
    setSynths(synthArray);
  }, [tracks, setSynths]);
};
