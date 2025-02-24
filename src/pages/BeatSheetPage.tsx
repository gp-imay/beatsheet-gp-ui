import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { PenLine, FileText } from 'lucide-react';
import Xarrow from 'react-xarrows';
import { BeatCard } from '../components/BeatCard';
import { ScenePanel } from '../components/ScenePanel';
import { useStoryStore } from '../store/storyStore';
import { Beat, GeneratedScenesResponse } from '../types/beat';
import { BeatArrows } from '../components/BeatArrows';


const ACTS = ['Act 1', 'Act 2A', 'Act 2B', 'Act 3'] as const;

export function BeatSheetPage() {
  const navigate = useNavigate();
  const canvasRef = useRef<HTMLDivElement>(null);
  const [selectedBeat, setSelectedBeat] = useState<Beat | null>(null);
  const { premise, beats, fetchBeats, updateBeat, updateBeatPosition, validateBeat, generateScenes, generateScenesForAct } = useStoryStore();

  useEffect(() => {
    if (!premise) {
      navigate('/');
      return;
    }

    if (beats.length === 0) {
      fetchBeats();
    }
  }, [premise, beats.length, navigate, fetchBeats]);

  const handleGenerateScript = () => {
    console.log('Generating script...');
  };

  const handleGenerateScenes = async (beatId: string): Promise<GeneratedScenesResponse> => {
    try {
      return await generateScenes(beatId);
    } catch (error) {
      // Make sure to still return a Promise<GeneratedScenesResponse>
      throw error;
    }
  };

  const handleShowScenes = (beat: Beat) => {
    setSelectedBeat(selectedBeat?.id === beat.id ? null : beat);
  };


  const beatsByAct = ACTS.map(act => ({
    act,
    beats: beats.filter(beat => beat.act === act)
  }));

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm">
        <div className="max-w-[1920px] mx-auto px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <PenLine className="w-6 h-6 text-blue-600" />
              <h1 className="text-xl font-semibold text-gray-900">Story Beat Sheet</h1>
            </div>
            {beats.length > 0 && (
              <button
                onClick={handleGenerateScript}
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700"
              >
                <FileText className="w-4 h-4 mr-2" />
                Generate Script
              </button>
            )}
          </div>
        </div>
      </header>

      <main className="max-w-[1920px] mx-auto px-4 py-6 sm:px-6 lg:px-8">
        <div className="relative bg-white rounded-lg shadow-sm overflow-hidden flex">
          <div className="grid grid-cols-[200px,1fr] flex-1">
            {/* Acts sidebar */}
            <div className="border-r bg-gray-50">
              {ACTS.map((act) => (
                <div key={act} className="relative">
                  <div className="h-[220px] flex items-center justify-center border-b last:border-b-0 font-medium text-gray-600">
                    {act}
                  </div>
                  <button
                    onClick={() => generateScenesForAct(act)}
                    className="absolute bottom-2 left-1/2 -translate-x-1/2 text-xs text-blue-600 hover:text-blue-700 whitespace-nowrap px-2 py-1 bg-white rounded-full shadow-sm border border-blue-100"
                  >
                    Generate Scenes
                  </button>
                </div>
              ))}
            </div>
            
            {/* Beats canvas */}
            <div ref={canvasRef} className="relative overflow-x-auto">
              {beatsByAct.map(({ act, beats: actBeats }) => (
                <div 
                  key={act} 
                  className="h-[220px] relative border-b last:border-b-0 whitespace-nowrap"
                  style={{ minWidth: actBeats.length * 320 + 40 }}
                >
                  {actBeats.map((beat) => (
                    <BeatCard
                      key={beat.id}
                      beat={beat}
                      onUpdate={updateBeat}
                      onPositionChange={updateBeatPosition}
                      onValidate={validateBeat}
                      onGenerateScenes={handleGenerateScenes}
                      onShowScenes={() => handleShowScenes(beat)}
                      isSelected={selectedBeat?.id === beat.id}
                    />
                  ))}
                  <BeatArrows beats={actBeats} />
                </div>
              ))}
            </div>
          </div>

          {/* Scene Panel */}
          {selectedBeat && (
            <div className="w-96 border-l bg-white">
              <ScenePanel
                beat={selectedBeat}
                onClose={() => setSelectedBeat(null)}
                onUpdate={(scenes) => {
                  updateBeat(selectedBeat.id, { scenes });
                }}
              />
            </div>
          )}
        </div>
      </main>
    </div>
  );
}