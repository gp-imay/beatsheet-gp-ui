// import { create } from 'zustand';
// import { StoryState, Beat, Scene, ApiBeat } from '../types/beat';
// import { api } from '../services/api';

import { create } from 'zustand';
import { StoryState, Beat, Scene, ApiBeat, GeneratedScenesResponse, Scenes } from '../types/beat';
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

const mapSceneToSimpleScene = (scene: Scenes): Scene => ({
  id: scene.id,
  description: scene.scene_detail_for_ui,
  notes: ''  // Since the API doesn't provide notes, we'll set a default empty string
});



const mockGenerateScenes = (beatId: string): Scenes[] => {
  const now = new Date().toISOString();
  return [
    {
      id: `scene-${Math.random().toString(36).substr(2, 9)}`,
      beat_id: beatId,
      position: 1,
      scene_heading: "Opening Scene",
      scene_description: "Character establishes their normal world",
      scene_detail_for_ui: "Opening Scene: Character establishes their normal world",
      created_at: now,
      updated_at: null,
      is_deleted: false,
      deleted_at: null
    },
    {
      id: `scene-${Math.random().toString(36).substr(2, 9)}`,
      beat_id: beatId,
      position: 2,
      scene_heading: "Conflict Introduction",
      scene_description: "Introduce the main conflict or challenge",
      scene_detail_for_ui: "Conflict Introduction: Introduce the main conflict or challenge",
      created_at: now,
      updated_at: null,
      is_deleted: false,
      deleted_at: null
    },
    {
      id: `scene-${Math.random().toString(36).substr(2, 9)}`,
      beat_id: beatId,
      position: 3,
      scene_heading: "Decision Point",
      scene_description: "Character makes a decision or takes action",
      scene_detail_for_ui: "Decision Point: Character makes a decision or takes action",
      created_at: now,
      updated_at: null,
      is_deleted: false,
      deleted_at: null
    },
    {
      id: `scene-${Math.random().toString(36).substr(2, 9)}`,
      beat_id: beatId,
      position: 4,
      scene_heading: "Consequences",
      scene_description: "Show the immediate consequences",
      scene_detail_for_ui: "Consequences: Show the immediate consequences",
      created_at: now,
      updated_at: null,
      is_deleted: false,
      deleted_at: null
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
  // updateBeat: (id: string, beatUpdate: Partial<Beat>) =>
  //   set((state) => ({
  //     beats: state.beats.map((b) =>
  //       b.id === id ? { ...b, ...beatUpdate } : b
  //     ),
  //   })),
  updateBeat: (id: string, beatUpdate: Partial<Beat>) =>
    set((state) => {
      const updatedBeats: Beat[] = state.beats.map((b) =>
        b.id === id ? { ...b, ...beatUpdate } : b
      );
      return { beats: updatedBeats };
    }),
  
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

    generateScenes: async (beatId: string): Promise<GeneratedScenesResponse> => {
      try {
        const response = await api.generateScenes(beatId);
        
        set((state) => {
          const updatedBeats: Beat[] = state.beats.map((b) =>
            b.id === beatId
              ? { 
                  ...b, 
                  scenes: response.generated_scenes,  // Directly use the Scenes array
                  isValidated: true 
                }
              : b
          );
          
          return { beats: updatedBeats };
        });
    
        return response;
      } catch (error) {
        console.error('Failed to generate scenes:', error);
        throw error;
      }
    },
    
    generateScenesForAct: (act: Beat['act']) =>
    set((state) => ({
      beats: state.beats.map((b) =>
        b.act === act
          ? { ...b, scenes: mockGenerateScenes(b.description), isValidated: true }
          : b
      ),
    })),
}));