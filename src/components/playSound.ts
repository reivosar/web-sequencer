import * as Tone from "tone";

export const playSound = (
  synth: Tone.Synth | Tone.MembraneSynth | Tone.NoiseSynth | Tone.MetalSynth,
  instrument: string,
  row: number,
  duration: number
) => {
  let note = "C4";

  if (instrument === "piano" || instrument === "synth") {
    const notes = ["C4", "D4", "E4", "F4", "G4", "A4", "B4", "C5"];
    note = notes[row % notes.length];
  } else if (instrument === "bass") {
    const bassNotes = ["C2", "D2", "E2", "F2", "G2", "A2", "B2", "C3"];
    note = bassNotes[row % bassNotes.length];
  } else if (instrument === "drums") {
    note = "C2";
  }

  synth.triggerAttackRelease(note, duration);
};
