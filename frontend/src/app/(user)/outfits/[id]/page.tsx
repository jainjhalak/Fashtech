"use client"
import { useEffect, useState } from "react"
import { useParams } from "next/navigation"
import Navbar from "@/app/components/Navbar"
import api from "@/lib/axios"
import { useProductStore } from "@/lib/store/productStore"


interface Piece {
  id: string
  label: string
  productId: string
}

interface Outfit {
  id: string
  name: string
  description: string
  styleCategory: string
  coverImage: string
}

export default function OutfitDetailPage() {

  const params = useParams()
  const id = params.id as string

  const [outfit, setOutfit] = useState<Outfit | null>(null)
  const { products, setProducts } = useProductStore()
  const [pieces, setPieces] = useState<Piece[]>([])

  useEffect(() => {
    const fetch = async () => {
      const res = await api.get(`/outfits/${id}`)
      setOutfit(res.data.outfit)
      setPieces(res.data.pieces)
      setProducts(res.data.products)
    }
    fetch()
  }, [id])

  if (!outfit) return <div style={{ backgroundColor: "#0a0a0a", minHeight: "100vh" }} />

  return (
    <div style={{ backgroundColor: "#0a0a0a", minHeight: "100vh", fontFamily: "monospace", color: "#fff" }}>
      <Navbar />

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "40px", padding: "40px" }}>

        {/* Left - Outfit Image */}
        <div>
          <img src={outfit.coverImage} alt={outfit.name}
            style={{ width: "100%", aspectRatio: "3/4", objectFit: "cover" }} />
        </div>

        {/* Right - Details */}
        <div>
          <p style={{ color: "#811b1b", fontSize: "0.7rem", letterSpacing: "0.3em" }}>{outfit.styleCategory.toUpperCase()}</p>
          <h1 style={{ fontSize: "2rem", letterSpacing: "0.2em", margin: "8px 0" }}>{outfit.name}</h1>
          <p style={{ color: "#555", fontSize: "0.8rem", lineHeight: 1.6 }}>{outfit.description}</p>

          <div style={{ marginTop: "40px" }}>
            <p style={{ color: "#ce1c1c", fontSize: "0.65rem", letterSpacing: "0.3em", marginBottom: "16px" }}>PIECES IN THIS OUTFIT</p>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "16px" }}>
              {(products || []).map((product) => (
                <div key={product.id} style={{ backgroundColor: "#111", padding: "12px" }}>
                  {product.images?.[0] && (
                    <img src={product.images[0]} alt={product.name}
                      style={{ width: "100%", aspectRatio: "1/1", objectFit: "cover", marginBottom: "8px" }} />
                  )}
                  <p style={{ color: "#811b1b", fontSize: "0.6rem", letterSpacing: "0.2em", margin: 0 }}>{product.type.toUpperCase()}</p>
                  <p style={{ color: "#fff", fontSize: "0.75rem", letterSpacing: "0.1em", margin: "4px 0" }}>{product.name}</p>
                  <p style={{ color: "#ce1c1c", fontSize: "0.7rem", margin: 0 }}>${product.price}</p>
                </div>
              ))}
            </div>
          </div>

          <button style={{
            marginTop: "40px", backgroundColor: "#ce1c1c", color: "#fff",
            border: "none", padding: "16px 40px", fontSize: "0.75rem",
            letterSpacing: "0.3em", cursor: "pointer", width: "100%"
          }}>
            ADD ALL TO CART
          </button>
        </div>
      </div>
    </div>
  )
}