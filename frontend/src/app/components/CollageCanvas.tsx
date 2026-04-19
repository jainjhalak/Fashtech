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
    <div className="relative w-full max-w-[320px] aspect-[3/4] bg-zinc-900 border border-[#811b1b] rounded-lg overflow-hidden">
      {items.map(item => (
        <div
          key={item.instanceId}
          style={{
            position: "absolute",
            left: `${item.x}%`,
            top: `${item.y}%`,
            transform: `scale(${item.scale}) rotate(${item.rotation}deg)`,
            zIndex: item.zIndex,
            border: selectedId === item.instanceId ? "1px solid #ce1c1c" : "none",
          }}
          onMouseDown={(e) => handleDrag(e, item.instanceId)}
          onTouchStart={(e) => handleDrag(e, item.instanceId)}
          onClick={() => setSelectedId(item.instanceId)}
        >
          <img
            src={item.imageUrl}
            alt={item.name}
            className="w-full h-full object-contain pointer-events-none"
          />

          {selectedId === item.instanceId && (
            <div className="flex gap-1 mt-1">
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
