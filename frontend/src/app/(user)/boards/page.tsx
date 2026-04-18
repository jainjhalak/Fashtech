import Link from "next/link";
import BoardCard from "@/app/components/BoardCard";
import { boards } from "@/lib/boardsData";
import Navbar from "@/app/components/Navbar";

export const metadata = {
  title: "Fashtech – My Collections",
};

export default function BoardsPage() {
  return (
    <>
      <Navbar />
      <main style={{ maxWidth: "1200px", margin: "0 auto", padding: "40px 24px" }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "32px" }}>
          <h1 style={{ color: "#fff", fontSize: "1.4rem", letterSpacing: "0.25em", margin: 0, fontFamily: "var(--font-saira)" }}>
            MY COLLECTIONS
          </h1>
          <Link href="/boards/new" style={{
            display: "flex", alignItems: "center", gap: "6px",
            backgroundColor: "#ce1c1c", color: "#fff",
            padding: "8px 16px", borderRadius: "6px",
            fontSize: "0.75rem", letterSpacing: "0.15em",
            textDecoration: "none", fontWeight: 600
          }}>
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <line x1="12" y1="5" x2="12" y2="19" />
              <line x1="5" y1="12" x2="19" y2="12" />
            </svg>
            NEW BOARD
          </Link>
        </div>

        <div style={{
          columns: "4 240px",
          gap: "16px",
        }}>
          {boards.map((board) => (
            <BoardCard key={board.id} board={board} />
          ))}
        </div>
      </main>
    </>
  );
}