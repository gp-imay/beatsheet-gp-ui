import React from 'react';
import Xarrow from 'xarrows';
import { Beat } from '../types/beat';
import { BeatCard } from './BeatCard';

interface CanvasProps {
  beats: Beat[];
  onUpdateBeat: (id: string, beat: Partial<Beat>) => void;
  onUpdatePosition: (id: string, position: { x: number; y: number }) => void;
  onValidateBeat: (id: string) => void;
  onGenerateScenes: (id: string) => void;
}

export const Canvas: React.FC<CanvasProps> = ({
  beats,
  onUpdateBeat,
  onUpdatePosition,
  onValidateBeat,
  onGenerateScenes,
}) => {
  return (
    <div className="relative w-full h-full overflow-hidden bg-gray-50">
      {beats.map((beat) => (
        <BeatCard
          key={beat.id}
          beat={beat}
          onUpdate={onUpdateBeat}
          onPositionChange={onUpdatePosition}
          onValidate={onValidateBeat}
          onGenerateScenes={onGenerateScenes}
        />
      ))}
      
      {beats.map((beat, index) => {
        if (index === beats.length - 1) return null;
        return (
          <Xarrow
            key={`${beat.id}-${beats[index + 1].id}`}
            start={`beat-${beat.id}`}
            end={`beat-${beats[index + 1].id}`}
            color="#94a3b8"
            strokeWidth={2}
            path="smooth"
          />
        );
      })}
    </div>
  );
};