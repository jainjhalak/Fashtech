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
  return (
    <div
      className="relative bg-zinc-900 border border-[#811b1b] rounded-lg"
      style={{ width: "300px", height: "400px" }}
    >
      {items.map((item) => (
        <img
          key={item.instanceId}
          src={item.imageUrl}
          alt={item.name}
          className={`absolute cursor-pointer ${
            selectedId === item.instanceId ? "ring-2 ring-[#ce1c1c]" : ""
          }`}
          style={{
            left: `${item.x}%`,
            top: `${item.y}%`,
            transform: `translate(-50%, -50%) scale(${item.scale}) rotate(${item.rotation}deg)`,
            zIndex: item.zIndex,
          }}
          onClick={() => setSelectedId(item.instanceId)}
          onMouseDown={(e) => handleDrag(e, item.instanceId)}
          onTouchStart={(e) => handleDrag(e, item.instanceId)}
        />
      ))}
    </div>
  );
}
