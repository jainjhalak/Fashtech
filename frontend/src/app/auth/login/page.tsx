"use client";

import { useState } from "react";
import CollageCanvas from "../../components/CollageCanvas";
import Navbar from "../../components/Navbar";
import { useRouter } from "next/navigation";
import { Item, PlacedItem } from "@/types";

export default function TestCanvasPage() {
  const router = useRouter();

  const dummyInventory: Item[] = [
    { id: "1", name: "Boots", price: 100, category: "punk", type: "shoes", imageUrl: "/boots.png", stock: 10 },
    { id: "2", name: "Jacket", price: 200, category: "goth", type: "top", imageUrl: "/jacket.png", stock: 5 },
  ];

  const [items, setItems] = useState<PlacedItem[]>([]);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [outfitName, setOutfitName] = useState("NEW_ASSEMBLY");

  const [showModal1, setShowModal1] = useState(false);
  const [showModal2, setShowModal2] = useState(false);
  const [boardName, setBoardName] = useState("");
  const [visibility, setVisibility] = useState<"private" | "public">("private");

  const addItem = (item: Item) => {
    const newItem: PlacedItem = {
      ...item,
      instanceId: Date.now().toString(),
      x: 50,
      y: 50,
      scale: 1,
      rotation: 0,
      zIndex: items.length,
    };
    setItems((prev) => [...prev, newItem]);
    setSelectedId(newItem.instanceId);
  };

  const handleDrag = (e: React.MouseEvent | React.TouchEvent, id: string) => {
    const canvas = e.currentTarget.parentElement?.parentElement as HTMLElement;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const startX = "touches" in e ? e.touches[0].clientX : e.clientX;
    const startY = "touches" in e ? e.touches[0].clientY : e.clientY;
    const item = items.find((i) => i.instanceId === id);
    if (!item) return;
    const initX = item.x;
    const initY = item.y;

    const onMove = (mv: any) => {
      const curX = "touches" in mv ? mv.touches[0].clientX : mv.clientX;
      const curY = "touches" in mv ? mv.touches[0].clientY : mv.clientY;
      const dx = ((curX - startX) / rect.width) * 100;
      const dy = ((curY - startY) / rect.height) * 100;
      setItems((prev) =>
        prev.map((i) =>
          i.instanceId === id ? { ...i, x: initX + dx, y: initY + dy } : i
        )
      );
    };

    const onEnd = () => {
      document.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseup", onEnd);
      document.removeEventListener("touchmove", onMove);
      document.removeEventListener("touchend", onEnd);
    };

    document.addEventListener("mousemove", onMove);
    document.addEventListener("mouseup", onEnd);
    document.addEventListener("touchmove", onMove);
    document.addEventListener("touchend", onEnd);
  };

  const totalPrice = items.reduce((sum, i) => sum + (i.price || 0), 0);

  const handleArchive = () => setShowModal1(true);
  const handleModal1Submit = () => {
    if (visibility === "public") {
      setShowModal1(false);
      setShowModal2(true);
    } else {
      setShowModal1(false);
      alert(`Saved ${outfitName} to board "${boardName}" as private`);
    }
  };
  const handleModal2Submit = (postOnInspire: boolean) => {
    setShowModal2(false);
    if (postOnInspire) {
      router.push("/inspire");
    } else {
      alert(`Saved ${outfitName} to board "${boardName}" as public`);
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white font-mono">
      <Navbar />

      <div className="grid grid-cols-[220px_1fr_160px] gap-4 p-4 items-start flex-1">
        {/* Library */}
        <aside className="flex flex-col gap-3">
          <div className="bg-black/40 border border-[#811b1b] rounded-xl p-3">
            <h2 className="text-xs font-bold text-center text-[#ce1c1c] mb-2">LIBRARY</h2>
            <div className="grid grid-cols-2 gap-2">
              {dummyInventory.map((item) => (
                <div
                  key={item.id}
                  className="aspect-[3/4] bg-white rounded-lg p-1 cursor-pointer hover:scale-105 transition-transform"
                  onClick={() => addItem(item)}
                >
                  <img src={item.imageUrl} alt={item.name} className="w-full h-full object-contain" />
                  <p className="text-[10px] text-center mt-1 text-black">${item.price}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="bg-black/40 border border-[#811b1b] rounded-lg px-3 py-2 flex items-center justify-center">
            <span className="text-xs font-bold text-[#ce1c1c]">TOTAL: ${totalPrice}</span>
          </div>
        </aside>

        {/* Canvas */}
        <div className="flex flex-col items-center gap-3">
          <input
            value={outfitName}
            onChange={(e) => setOutfitName(e.target.value.toUpperCase())}
            className="bg-transparent text-lg font-bold text-[#ce1c1c] outline-none text-center"
          />
          <CollageCanvas
            items={items}
            selectedId={selectedId}
            setItems={setItems}
            setSelectedId={setSelectedId}
            handleDrag={handleDrag}
          />
        </div>

        {/* Save button */}
        <div className="flex justify-end items-start">
          <button
            onClick={handleArchive}
            className="bg-[#811b1b] hover:bg-[#ce1c1c] text-white px-4 py-2 rounded-full text-xs font-bold"
          >
            ARCHIVE
          </button>
        </div>
      </div>

      <footer className="text-center py-2 text-[10px] text-zinc-500 border-t border-[#811b1b]">
        © 2025 FASHTECH — Digital Wardrobe Experiment
      </footer>

      {/* Modal 1 */}
      {showModal1 && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
          {/* … modal content same as your example … */}
        </div>
      )}

      {/* Modal 1 */}
      {showModal1 && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
          <div className="bg-zinc-900 p-6 rounded-lg w-80 space-y-3">
            <h2 className="text-[#ce1c1c] font-bold text-sm">Save Outfit</h2>
            <input
              value={outfitName}
              onChange={(e) => setOutfitName(e.target.value)}
              className="w-full p-2 rounded bg-zinc-800 text-white text-xs"
              placeholder="Outfit Name"
            />
            <input
              value={boardName}
              onChange={(e) => setBoardName(e.target.value)}
              className="w-full p-2 rounded bg-zinc-800 text-white text-xs"
              placeholder="Board Collection (or create new)"
            />
            <div className="flex gap-3 text-xs text-white">
              <label className="flex items-center gap-1">
                <input
                  type="radio"
                  checked={visibility === "private"}
                  onChange={() => setVisibility("private")}
                />
                Private
              </label>
              <label className="flex items-center gap-1">
                <input
                  type="radio"
                  checked={visibility === "public"}
                  onChange={() => setVisibility("public")}
                />
                Public
              </label>
            </div>
            <div className="flex justify-end gap-2">
              <button
                onClick={() => setShowModal1(false)}
                className="px-3 py-1 text-xs bg-zinc-700 rounded"
              >
                Cancel
              </button>
              <button
                onClick={handleModal1Submit}
                className="px-3 py-1 text-xs bg-[#ce1c1c] rounded"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal 2 */}
      {showModal2 && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
          <div className="bg-zinc-900 p-6 rounded-lg w-80 space-y-3">
            <h2 className="text-[#ce1c1c] font-bold text-sm">Post to Inspire?</h2>
            <p className="text-xs text-white">
              You chose to make this outfit public. Would you like to also post it on Inspire?
            </p>
            <div className="flex justify-end gap-2">
              <button
                onClick={() => handleModal2Submit(false)}
                className="px-3 py-1 text-xs bg-zinc-700 rounded"
              >
                No
              </button>
              <button
                onClick={() => handleModal2Submit(true)}
                className="px-3 py-1 text-xs bg-[#ce1c1c] rounded"
              >
                Yes
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}