"use client";
import Link from "next/link";
import { useState } from "react";
import { Board } from "@/types/boards";

interface BoardCardProps {
  board: Board;
}

export default function BoardCard({ board }: BoardCardProps) {
  const [hovered, setHovered] = useState(false);

  return (
    <Link
      href={`/boards/${board.id}`}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        display: "block",
        breakInside: "avoid",
        marginBottom: "16px",
        borderRadius: "12px",
        overflow: "hidden",
        position: "relative",
        textDecoration: "none",
        cursor: "pointer",
        transform: hovered ? "scale(1.02)" : "scale(1)",
        transition: "transform 0.25s ease",
      }}
    >
      {/* Main image - full width */}
      <img
        src={board.images[0]}
        alt={board.title}
        loading="lazy"
        style={{ width: "100%", display: "block", objectFit: "cover" }}
      />

      {/* Two smaller images below */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "2px", marginTop: "2px" }}>
        <img src={board.images[1]} alt="" loading="lazy"
          style={{ width: "100%", height: "100px", objectFit: "cover", display: "block" }} />
        <img src={board.images[2]} alt="" loading="lazy"
          style={{ width: "100%", height: "100px", objectFit: "cover", display: "block" }} />
      </div>

      {/* Hover overlay */}
      <div style={{
        position: "absolute", inset: 0,
        background: "linear-gradient(to top, rgba(0,0,0,0.75) 0%, transparent 50%)",
        opacity: hovered ? 1 : 0,
        transition: "opacity 0.25s ease",
        display: "flex", flexDirection: "column",
        justifyContent: "flex-end", padding: "16px",
      }}>
        <span style={{ color: "#fff", fontSize: "0.85rem", fontWeight: 700, letterSpacing: "0.1em" }}>
          {board.title}
        </span>
        <span style={{ color: "rgba(255,255,255,0.6)", fontSize: "0.7rem", marginTop: "2px" }}>
          {board.images.length} items
        </span>
      </div>

      {/* Always visible footer when not hovered */}
      {!hovered && (
        <div style={{
          position: "absolute", bottom: 0, left: 0, right: 0,
          padding: "10px 14px",
          background: "linear-gradient(to top, rgba(0,0,0,0.6), transparent)",
        }}>
          <span style={{ color: "#fff", fontSize: "0.8rem", fontWeight: 600, letterSpacing: "0.08em" }}>
            {board.title}
          </span>
        </div>
      )}
    </Link>
  );
}