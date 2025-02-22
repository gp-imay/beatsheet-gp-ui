import React, { useState, useRef } from 'react';
import Draggable from 'react-draggable';
import { Edit3, Check, Plus, Trash2 } from 'lucide-react';
import { Beat } from '../types/beat';

interface BeatCardProps {
  beat: Beat;
  onUpdate: (id: string, beat: Partial<Beat>) => void;
  onPositionChange: (id: string, position: { x: number; y: number }) => void;
  onValidate: (id: string) => void;
  onGenerateScenes: (id: string) => void;
  onShowScenes: () => void;
  isSelected: boolean;
}

export const BeatCard: React.FC<BeatCardProps> = ({
  beat,
  onUpdate,
  onPositionChange,
  onValidate,
  onGenerateScenes,
  onShowScenes,
  isSelected,
}) => {
  const [editMode, setEditMode] = useState(false);
  const [localBeat, setLocalBeat] = useState(beat);
  const nodeRef = useRef(null);

  const handleDragStop = (_: any, data: { x: number; y: number }) => {
    onPositionChange(beat.id, { x: data.x, y: data.y });
  };

  const handleInputChange = (field: keyof Beat, value: string) => {
    setLocalBeat(prev => ({ ...prev, [field]: value }));
  };

  const handleSave = () => {
    onUpdate(beat.id, localBeat);
    setEditMode(false);
  };

  const handleCancel = () => {
    setLocalBeat(beat);
    setEditMode(false);
  };

  const handleGenerateScenes = () => {
    onValidate(beat.id);
    onGenerateScenes(beat.id);
  };

  const truncateDescription = (text: string, maxLength: number = 100) => {
    if (text.length <= maxLength) return text;
    return text.slice(0, maxLength).trim() + '...';
  };

  return (
    <Draggable
      nodeRef={nodeRef}
      position={beat.position}
      onStop={handleDragStop}
      handle=".drag-handle"
      bounds="parent"
      axis="x"
    >
      <div
        ref={nodeRef}
        id={`beat-${beat.id}`}
        style={{ position: 'absolute', width: '300px', height: '180px' }}
        className={`rounded-lg shadow-lg transition-all flex flex-col ${
          isSelected ? 'ring-2 ring-blue-500' : ''
        } ${beat.isValidated ? 'bg-green-50' : 'bg-white'}`}
      >
        <div className="drag-handle cursor-move p-4 border-b flex items-center justify-between bg-gray-50 rounded-t-lg flex-shrink-0">
          <h3 className="font-semibold text-gray-900 truncate pr-2">{beat.title}</h3>
          <div className="flex gap-2 flex-shrink-0">
            {editMode ? (
              <>
                <button
                  onClick={handleSave}
                  className="p-1 hover:bg-green-100 rounded text-green-600"
                  title="Save"
                >
                  <Check className="w-4 h-4" />
                </button>
                <button
                  onClick={handleCancel}
                  className="p-1 hover:bg-red-100 rounded text-red-600"
                  title="Cancel"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </>
            ) : (
              <button
                onClick={() => setEditMode(true)}
                className="p-1 hover:bg-gray-100 rounded"
                title="Edit"
              >
                <Edit3 className="w-4 h-4 text-gray-600" />
              </button>
            )}
          </div>
        </div>

        <div className="p-4 space-y-3 flex-1 flex flex-col overflow-hidden">
          {editMode ? (
            <textarea
              value={localBeat.description}
              onChange={(e) => handleInputChange('description', e.target.value)}
              className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500 flex-1 resize-none"
              placeholder="Description"
              rows={3}
            />
          ) : (
            <p className="text-sm text-gray-600 overflow-hidden">
              {isSelected ? beat.description : truncateDescription(beat.description)}
            </p>
          )}

          <div className="flex-shrink-0 space-y-2">
            {!beat.isValidated && !editMode && (
              <button
                onClick={handleGenerateScenes}
                className="w-full py-1 px-2 text-sm text-blue-600 hover:bg-blue-50 rounded-md border border-blue-200"
              >
                Generate Scenes
              </button>
            )}

            {beat.scenes.length > 0 && (
              <button
                onClick={onShowScenes}
                className="w-full py-1 px-2 text-sm text-blue-600 hover:bg-blue-50 rounded-md border border-blue-200 flex items-center justify-center gap-1"
              >
                <Plus className="w-4 h-4" />
                {isSelected ? 'Hide Scenes' : 'Show Scenes'}
              </button>
            )}
          </div>
        </div>
      </div>
    </Draggable>
  );
};