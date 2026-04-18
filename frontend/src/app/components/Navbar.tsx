"use client"
import { usePathname, useRouter } from "next/navigation"

const navItems = [
  { label: "HOME", href: "/home" },
  { label: "CREATE", href: "/create" },
  { label: "BOARDS", href: "/boards" },
  { label: "INSPIRE", href: "/inspire" },
]

export default function Navbar() {
  const pathname = usePathname()
  const router = useRouter()

  return (
    <nav style={{
      position: "sticky", top: 0, zIndex: 100,
      backgroundColor: "rgba(10,10,10,0.92)", backdropFilter: "blur(10px)",
      borderBottom: "1px solid #1a1a1a",
      display: "flex", alignItems: "center", justifyContent: "space-between",
      padding: "0 40px", height: "64px"
    }}>
      <h1 style={{ color: "#ce1c1c", fontSize: "1.4rem", letterSpacing: "0.3em", margin: 0, fontFamily: "var(--font-saira)", cursor: "pointer" }}
        onClick={() => router.push("/home")}>
        FASHTECH
      </h1>

      <div style={{ display: "flex", gap: "40px" }}>
        {navItems.map((item) => (
          <a key={item.label} href={item.href} style={{
            color: pathname === item.href ? "#ce1c1c" : "#fff",
            textDecoration: "none", fontSize: "0.7rem",
            letterSpacing: "0.25em", opacity: pathname === item.href ? 1 : 0.7,
            pointerEvents: pathname === item.href ? "none" : "auto"
          }}>{item.label}</a>
        ))}
      </div>

      <div style={{ display: "flex", alignItems: "center", gap: "24px" }}>
        <div style={{ cursor: "pointer", color: "#fff", fontSize: "1.2rem" }}>🛒</div>
        <div
          onClick={() => router.push("/profile")}
          style={{
            width: "36px", height: "36px", borderRadius: "50%",
            backgroundColor: "#ce1c1c", display: "flex", alignItems: "center",
            justifyContent: "center", cursor: "pointer", fontSize: "0.7rem",
            color: "#fff", fontWeight: 700, letterSpacing: "0.05em",
            transition: "opacity 0.2s"
          }}
          title="Go to Profile"
        >
          U
        </div>
      </div>
    </nav>
  )
}