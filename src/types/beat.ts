export interface Scene {
  id: string;
  description: string;
  notes: string;
}

export interface Beat {
  id: string;
  title: string;
  description: string;
  category: string;
  act: 'Act 1' | 'Act 2A' | 'Act 2B' | 'Act 3';
  position: { x: number; y: number };
  isValidated: boolean;
  scenes: Scene[];
}

export interface ApiBeat {
  position: number;
  beat_title: string;
  beat_description: string;
  beat_id: string;
  beat_act: string;
  script_id: string;
}

export interface StoryState {
  title: string;
  premise: string;
  setPremise: (premise: string) => void;
  beats: Beat[];
  fetchBeats: () => Promise<void>;
  addBeat: (beat: Beat) => void;
  updateBeat: (id: string, beat: Partial<Beat>) => void;
  updateBeatPosition: (id: string, position: { x: number; y: number }) => void;
  validateBeat: (id: string) => void;
  generateScenes: (beatId: string) => void;
  generateScenesForAct: (act: Beat['act']) => void;
}