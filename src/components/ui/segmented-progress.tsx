import React from 'react';

interface SegmentedProgressProps {
  value: number;
  max?: number;
  className?: string;
  onChange?: (value: number) => void;
}

export const SegmentedProgress: React.FC<SegmentedProgressProps> = ({ value, max = 5, className = '', onChange }) => {
  return (
    <div className={`flex w-full gap-0.5 ${className}`} style={{ minHeight: 8 }}>
      {Array.from({ length: max }).map((_, idx) => {
        const filled = idx < value;
        if (onChange) {
          return (
            <button
              key={idx}
              type="button"
              aria-label={`Selecionar nível ${idx + 1}`}
              className={`flex-1 h-3 rounded transition border-none outline-none focus:ring-2 focus:ring-cyan-400 ${filled ? 'bg-cyan-400' : 'bg-slate-700'} hover:bg-cyan-300 cursor-pointer`}
              onClick={() => onChange(idx + 1)}
            />
          );
        }
        return (
          <div
            key={idx}
            className={`flex-1 h-2 rounded ${filled ? 'bg-cyan-400' : 'bg-slate-700'}`}
          />
        );
      })}
    </div>
  );
}; 