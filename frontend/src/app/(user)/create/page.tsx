"use client";

import { useState } from "react";
import CollageCanvas from "../../components/CollageCanvas";
import Navbar from "../../components/Navbar";
import { useRouter } from "next/navigation";
import { Item, PlacedItem } from "@/types";
import api from "@/lib/axios";

export default function TestCanvasPage() {
  const router = useRouter();

const dummyInventory: Item[] = [
  {
    id: "a27a11e9-21c0-4535-99f8-cc2cc11444c1", // Boots UUID
    name: "Boots",
    price: 100,
    category: "punk",
    type: "shoes",
    imageUrl: "https://res.cloudinary.com/dnpwoxc4e/image/upload/v1776604789/NEW_ROCK_METALLIC_M-106-S112-removebg-preview_yjaxmb.png",
    stock: 10,
  },
  {
    id: "c55536fb-3a94-4562-815d-2c9878335d68", // Neckpiece UUID
    name: "Neckpiece",
    price: 200,
    category: "goth",
    type: "neckpiece",
    imageUrl: "https://res.cloudinary.com/dnpwoxc4e/image/upload/v1776604787/download__1_-removebg-preview_he9abj.png",
    stock: 5,
  },
  {
    id: "201d4e7e-6925-4211-8def-9a0f334724fb", // Bag UUID
    name: "Bag",
    price: 200,
    category: "goth",
    type: "bag",
    imageUrl: "https://res.cloudinary.com/dnpwoxc4e/image/upload/v1776604786/_y2koutfit__y2k__y2kfashion__fyp__oufit__baddie__y2kstyle-removebg-preview_btrmxs.png",
    stock: 5,
  },
  {
    id: "e6172881-5988-4107-b847-a8d4c5f18bed", // Jean UUID
    name: "Jean",
    price: 200,
    category: "punk",
    type: "jean",
    imageUrl: "https://res.cloudinary.com/dnpwoxc4e/image/upload/v1776604786/cool_jeans_with_thigh_cutout-removebg-preview_mo3nh7.png",
    stock: 5,
  },
  {
    id: "2b55ce92-0add-4b7c-9d51-96ae4b01a2b0", // Jean alt UUID
    name: "Jean",
    price: 200,
    category: "punk",
    type: "jean",
    imageUrl: "https://res.cloudinary.com/dnpwoxc4e/image/upload/v1776604785/download-removebg-preview_lujax4.png",
    stock: 5,
  },
  {
    id: "19fab644-901d-4ff7-8a30-09b334623046", // Perfume UUID
    name: "Perfume",
    price: 200,
    category: "goth",
    type: "perfume",
    imageUrl: "https://res.cloudinary.com/dnpwoxc4e/image/upload/v1776604787/download__2_-removebg-preview_dytrua.png",
    stock: 5,
  },
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

  const handleModal1Submit = async () => {
    try {
      const payload = {
        name: outfitName,
        description: "Created via TestCanvasPage",
        styleCategory: "punk",
        coverImage: items[0]?.imageUrl || null,
        pieces: items.map(i => ({
          productId: i.id,
          label: i.name
        })),
        visibility
      };

      const res = await api.post("/outfits", payload);

      // ✅ Don’t assume response shape
      console.log("Saved outfit:", res.data);

      if (visibility === "public") {
        setShowModal1(false);
        setShowModal2(true);
      } else {
        setShowModal1(false);
        alert(`Saved ${outfitName} to board "${boardName}" as private`);
      }
    } catch (err: any) {
      console.error("Error saving outfit", err.response?.data || err.message);
      alert("Failed to save outfit");
    }
  };

  const handleModal2Submit = async (postOnInspire: boolean) => {
    setShowModal2(false);
    try {
      if (postOnInspire) {
        router.push("/inspire");
      } else {
        alert(`Saved ${outfitName} to board "${boardName}" as public`);
      }
    } catch (err: any) {
      console.error("Error updating outfit", err.response?.data || err.message);
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white font-mono">
      <Navbar />
      <div className="grid grid-cols-[220px_1fr_160px] gap-4 p-4 items-start flex-1">
        <aside className="flex flex-col gap-3">
          <div className="bg-black/40 border border-[#811b1b] rounded-xl p-3">
            <h2 className="text-xs font-bold text-center text-[#ce1c1c] mb-2">LIBRARY</h2>
            <div className="grid grid-cols-2 gap-2">
              {dummyInventory.map((item) => (
                <div key={item.id} className="aspect-[3/4] bg-white rounded-lg p-1 cursor-pointer hover:scale-105 transition-transform" onClick={() => addItem(item)}>
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

        <div className="flex flex-col items-center gap-3">
          <input value={outfitName} onChange={(e) => setOutfitName(e.target.value.toUpperCase())} className="bg-transparent text-lg font-bold text-[#ce1c1c] outline-none text-center" />
          <CollageCanvas items={items} selectedId={selectedId} setItems={setItems} setSelectedId={setSelectedId} handleDrag={handleDrag} />
        </div>

        <div className="flex justify-end items-start">
          <button onClick={handleArchive} className="bg-[#811b1b] hover:bg-[#ce1c1c] text-white px-4 py-2 rounded-full text-xs font-bold">
            ARCHIVE
          </button>
        </div>
      </div>

      <footer className="text-center py-2 text-[10px] text-zinc-500 border-t border-[#811b1b]">
        © 2025 FASHTECH — Digital Wardrobe Experiment
      </footer>

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
