"use client"
import { useState } from "react"
import { useEffect } from "react"
import { useOutfitStore } from "@/lib/store/outfitStore"
import api from "@/lib/axios"
import Navbar from "@/app/components/Navbar"


const categories = ["ALL", "GOTH", "PUNK", "COTTAGECORE", "STREETWEAR", "DARK ACADEMIA", "Y2K", "GRUNGE", "GYARU", "WHIMSY"]


export default function HomePage() {
  const [activeCategory, setActiveCategory] = useState("ALL")

  const { outfits, setOutfits } = useOutfitStore()

useEffect(() => {
  const fetchOutfits = async () => {
    const res = await api.get("/outfits")
    setOutfits(res.data.outfits)
  }
  fetchOutfits()
}, [])


  return (
    <div style={{ backgroundColor: "#0a0a0a", minHeight: "100vh", fontFamily: "monospace" }}>

      {/* Navbar */}

        <Navbar />

      {/* Hero */}
      <div style={{
        height: "420px",
        backgroundImage: "radial-gradient(ellipse at top, #ce1c1c 0%, #811b1b 30%, #0a0a0a 100%)",
        display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center"
      }}>
        <p style={{ color: "rgba(255,255,255,0.08)", fontSize: "8rem", fontWeight: "900", letterSpacing: "0.2em", margin: 0, fontFamily: "var(--font-saira)" }}>FASHTECH</p>
        <p style={{ color: "#fff", fontSize: "0.75rem", letterSpacing: "0.5em", marginTop: "-20px", opacity: 0.5 }}>CURATING HIGH-END PIECES FROM GLOBAL BRANDS</p>
      </div>

      {/* Categories */}
      <div style={{
        display: "flex", gap: "8px", padding: "24px 40px",
        overflowX: "auto", borderBottom: "1px solid #1a1a1a"
      }}>
        {categories.map((cat) => (
          <button key={cat} onClick={() => setActiveCategory(cat)} style={{
            backgroundColor: activeCategory === cat ? "#ce1c1c" : "transparent",
            color: activeCategory === cat ? "#fff" : "#555",
            border: `1px solid ${activeCategory === cat ? "#ce1c1c" : "#2a2a2a"}`,
            padding: "8px 20px", fontSize: "0.6rem", letterSpacing: "0.25em",
            cursor: "pointer", whiteSpace: "nowrap", transition: "all 0.2s"
          }}>{cat}</button>
        ))}
      </div>

      {/* Outfit Grid */}
      <div style={{
        display: "grid", gridTemplateColumns: "repeat(4, 1fr)",
        gap: "2px", padding: "2px 40px 40px 40px"
      }}>
        {outfits.map((outfit) => (
          <div key={outfit.id} style={{ cursor: "pointer", position: "relative" }}
            onMouseEnter={e => (e.currentTarget.querySelector(".overlay")!as HTMLElement).style.opacity = "1"}
            onMouseLeave={e => (e.currentTarget.querySelector(".overlay")!as HTMLElement).style.opacity = "0"}
          >
            {/* Card */}
                <div style={{
                     backgroundColor: "#f5f5f5", aspectRatio: "3/4",
                     position: "relative", overflow: "hidden"
                }}>

             {outfit.coverImage ? (
            <img
            src={outfit.coverImage}
            alt={outfit.name}
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
            />
            ) : (
            <div style={{ display: "flex", alignItems: "center", justifyContent: "center", height: "100%", opacity: 0.2 }}>
            <div style={{ fontSize: "4rem" }}>👗</div>
            </div>
         )}

        {/* Hover Overlay */}
         <div className="overlay" style={{
            position: "absolute", inset: 0, backgroundColor: "rgba(0,0,0,0.6)",
            display: "flex", alignItems: "center", justifyContent: "center",
            opacity: 0, transition: "opacity 0.3s"
        }}>
         <button style={{
             backgroundColor: "#ce1c1c", color: "#fff", border: "none",
             padding: "10px 24px", fontSize: "0.65rem", letterSpacing: "0.2em", cursor: "pointer"
            }}>VIEW OUTFIT</button>
        </div>
        </div>

            {/* Label */}
            <div style={{ padding: "12px 0" }}>
              <p style={{ color: "#fff", fontSize: "0.7rem", letterSpacing: "0.2em", margin: 0 }}>{outfit.name}</p>
              <p style={{ color: "#555", fontSize: "0.6rem", letterSpacing: "0.15em", margin: "4px 0 0 0" }}>4 PIECES</p>
            </div>
          </div>
        ))}
      </div>

    </div>
  )
}