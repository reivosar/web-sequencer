import React from "react";

interface SequencerCellProps {
  isActive: boolean;
  isPlaying: boolean;
  onMouseDown: () => void;
  onMouseEnter: () => void;
}

const SequencerCell: React.FC<SequencerCellProps> = ({
  isActive,
  isPlaying,
  onMouseDown,
  onMouseEnter,
}) => {
  return (
    <div
      className={`w-10 h-10 border ${
        isPlaying ? "bg-red-500" : isActive ? "bg-blue-500" : "bg-secondary"
      } cursor-pointer transition-all duration-150`}
      onMouseDown={onMouseDown}
      onMouseEnter={onMouseEnter}
    ></div>
  );
};

export default SequencerCell;
