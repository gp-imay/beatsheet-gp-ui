import React, { useState } from 'react';
import { X, Save } from 'lucide-react';
import { Beat, Scene } from '../types/beat';

interface ScenePanelProps {
  beat: Beat;
  onClose: () => void;
  onUpdate: (scenes: Scene[]) => void;
}

export const ScenePanel: React.FC<ScenePanelProps> = ({ beat, onClose, onUpdate }) => {
  const [scenes, setScenes] = useState(beat.scenes);
  const [editingScene, setEditingScene] = useState<string | null>(null);

  const handleSceneChange = (sceneId: string, description: string) => {
    const updatedScenes = scenes.map(scene =>
      scene.id === sceneId ? { ...scene, description } : scene
    );
    setScenes(updatedScenes);
  };

  const handleSave = () => {
    onUpdate(scenes);
    setEditingScene(null);
  };

  return (
    <div className="h-full flex flex-col">
      <div className="p-4 border-b flex items-center justify-between bg-gray-50">
        <h3 className="font-semibold text-gray-900">Scenes for {beat.title}</h3>
        <button
          onClick={onClose}
          className="p-1 hover:bg-gray-100 rounded"
        >
          <X className="w-5 h-5 text-gray-500" />
        </button>
      </div>

      <div className="flex-1 overflow-y-auto p-4">
        <div className="space-y-4">
          {scenes.map((scene) => (
            <div key={scene.id} className="space-y-2">
              {editingScene === scene.id ? (
                <div className="space-y-2">
                  <textarea
                    value={scene.description}
                    onChange={(e) => handleSceneChange(scene.id, e.target.value)}
                    className="w-full p-3 text-sm border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    rows={4}
                  />
                  <div className="flex justify-end gap-2">
                    <button
                      onClick={() => setEditingScene(null)}
                      className="px-3 py-1 text-sm text-gray-600 hover:bg-gray-100 rounded"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={handleSave}
                      className="px-3 py-1 text-sm text-white bg-blue-600 hover:bg-blue-700 rounded flex items-center gap-1"
                    >
                      <Save className="w-4 h-4" />
                      Save
                    </button>
                  </div>
                </div>
              ) : (
                <div
                  className="p-3 bg-gray-50 rounded-lg text-sm text-gray-700 cursor-pointer hover:bg-gray-100"
                  onClick={() => setEditingScene(scene.id)}
                >
                  {scene.description}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}