"use client";

import React from "react";
import { PlacedItem } from "@/types";

interface CollageCanvasProps {
  items: PlacedItem[];
  selectedId: string | null;
  setItems: React.Dispatch<React.SetStateAction<PlacedItem[]>>;
  setSelectedId: React.Dispatch<React.SetStateAction<string | null>>;
  handleDrag: (e: React.MouseEvent | React.TouchEvent, id: string) => void;
}

export default function CollageCanvas({
  items,
  selectedId,
  setItems,
  setSelectedId,
  handleDrag,
}: CollageCanvasProps) {
  const shrinkItem = (id: string) => {
    setItems(prev =>
      prev.map(i =>
        i.instanceId === id ? { ...i, scale: i.scale * 0.9 } : i
      )
    );
  };

  const enlargeItem = (id: string) => {
    setItems(prev =>
      prev.map(i =>
        i.instanceId === id ? { ...i, scale: i.scale * 1.1 } : i
      )
    );
  };

  const rotateItem = (id: string) => {
    setItems(prev =>
      prev.map(i =>
        i.instanceId === id ? { ...i, rotation: i.rotation + 15 } : i
      )
    );
  };

  const deleteItem = (id: string) => {
    setItems(prev => prev.filter(i => i.instanceId !== id));
  };

  return (
    <div
      className="relative w-full max-w-[320px] aspect-[3/4] bg-white border border-[#811b1b] rounded-lg overflow-hidden select-none"
      onClick={() => setSelectedId(null)} // click background to deselect
    >
      {items.map(item => (
        <div
          key={item.instanceId}
          className="select-none"
          style={{
            position: "absolute",
            left: `${item.x}%`,
            top: `${item.y}%`,
            zIndex: item.zIndex,
          }}
          onMouseDown={(e) => handleDrag(e, item.instanceId)} // drag only moves
          onTouchStart={(e) => handleDrag(e, item.instanceId)}
          onClick={(e) => {
            e.stopPropagation(); // prevent background deselect
            setSelectedId(item.instanceId); // only click sets selection
          }}
        >
          {/* Inner wrapper for transforms */}
          <div
            style={{
              transform: `scale(${item.scale}) rotate(${item.rotation}deg)`,
              transformOrigin: "center center",
            }}
          >
            <img
              src={item.imageUrl}
              alt={item.name}
              className="w-20 h-20 object-contain pointer-events-none"
              draggable={false} // prevent browser image drag
            />
          </div>

          {/* Controls only appear when clicked/selected */}
          {selectedId === item.instanceId && (
            <div
              className="absolute top-0 left-1/2 -translate-x-1/2 flex gap-1"
              style={{ zIndex: item.zIndex + 1 }}
            >
              <button
                onClick={() => shrinkItem(item.instanceId)}
                className="bg-zinc-700 text-white text-xs px-2 rounded"
              >
                -
              </button>
              <button
                onClick={() => enlargeItem(item.instanceId)}
                className="bg-zinc-700 text-white text-xs px-2 rounded"
              >
                +
              </button>
              <button
                onClick={() => rotateItem(item.instanceId)}
                className="bg-zinc-700 text-white text-xs px-2 rounded"
              >
                ⟳
              </button>
              <button
                onClick={() => deleteItem(item.instanceId)}
                className="bg-red-700 text-white text-xs px-2 rounded"
              >
                x
              </button>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
