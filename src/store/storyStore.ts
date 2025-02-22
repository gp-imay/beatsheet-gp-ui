import { create } from 'zustand';
import { StoryState, Beat, Scene, ApiBeat } from '../types/beat';
import { api } from '../services/api';

const mapActFromApi = (apiAct: string): Beat['act'] => {
  const actMap: Record<string, Beat['act']> = {
    'act_1': 'Act 1',
    'act_2a': 'Act 2A',
    'act_2b': 'Act 2B',
    'act_3': 'Act 3'
  };
  return actMap[apiAct.toLowerCase()] || 'Act 1';
};

const mockGenerateScenes = (description: string): Scene[] => {
  return [
    {
      id: `scene-${Math.random()}`,
      description: 'Scene 1: Character establishes their normal world',
      notes: ''
    },
    {
      id: `scene-${Math.random()}`,
      description: 'Scene 2: Introduce the main conflict or challenge',
      notes: ''
    },
    {
      id: `scene-${Math.random()}`,
      description: 'Scene 3: Character makes a decision or takes action',
      notes: ''
    },
    {
      id: `scene-${Math.random()}`,
      description: 'Scene 4: Show the immediate consequences',
      notes: ''
    }
  ];
};

const calculatePosition = (beats: ApiBeat[], currentBeat: ApiBeat): { x: number; y: number } => {
  const actBeats = beats.filter(b => b.beat_act === currentBeat.beat_act);
  const positionInAct = actBeats.findIndex(b => b.beat_id === currentBeat.beat_id);
  return {
    x: positionInAct * 320 + 20,
    y: 20
  };
};

export const useStoryStore = create<StoryState>((set) => ({
  title: '',
  premise: '',
  setPremise: (premise: string) => set({ premise }),
  beats: [],
  fetchBeats: async () => {
    try {
      const apiBeats = await api.getBeats();
      const beats: Beat[] = apiBeats.map((apiBeat: ApiBeat) => ({
        id: apiBeat.beat_id,
        title: apiBeat.beat_title,
        description: apiBeat.beat_description,
        category: apiBeat.beat_title,
        act: mapActFromApi(apiBeat.beat_act),
        position: calculatePosition(apiBeats, apiBeat),
        isValidated: false,
        scenes: [],
      }));
      set({ beats });
    } catch (error) {
      console.error('Failed to fetch beats:', error);
      // You might want to set an error state here
    }
  },
  addBeat: (beat: Beat) =>
    set((state) => ({ beats: [...state.beats, beat] })),
  updateBeat: (id: string, beatUpdate: Partial<Beat>) =>
    set((state) => ({
      beats: state.beats.map((b) =>
        b.id === id ? { ...b, ...beatUpdate } : b
      ),
    })),
  updateBeatPosition: (id: string, position: { x: number; y: number }) =>
    set((state) => ({
      beats: state.beats.map((b) =>
        b.id === id ? { ...b, position } : b
      ),
    })),
  validateBeat: (id: string) =>
    set((state) => ({
      beats: state.beats.map((b) =>
        b.id === id ? { ...b, isValidated: true } : b
      ),
    })),
  generateScenes: (beatId: string) =>
    set((state) => ({
      beats: state.beats.map((b) =>
        b.id === beatId
          ? { ...b, scenes: mockGenerateScenes(b.description) }
          : b
      ),
    })),
  generateScenesForAct: (act: Beat['act']) =>
    set((state) => ({
      beats: state.beats.map((b) =>
        b.act === act
          ? { ...b, scenes: mockGenerateScenes(b.description), isValidated: true }
          : b
      ),
    })),
}));