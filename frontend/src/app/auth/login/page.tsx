"use client"
import { useState } from "react"
import { useRouter } from "next/navigation"
import api from "@/lib/axios"
import { useAuthStore } from "@/lib/store/authStore"

export default function LoginPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const { setAuth } = useAuthStore()
  const router = useRouter()

  const handleLogin = async () => {
    try {
      const res = await api.post("/auth/login", { email, password })
      setAuth(res.data.user, res.data.token)
      router.push("/home")
    } catch {
      setError("Invalid credentials")
    }
  }

  return (
    <div style={{ backgroundColor: "#0a0a0a", minHeight: "100vh", display: "flex", fontFamily: "monospace" }}>
      
      {/* Left Panel */}
      <div style={{ width: "50%", backgroundColor: "#0a0a0a", display: "flex", flexDirection: "column", justifyContent: "center", padding: "60px" }}>
        <div style={{ marginBottom: "60px" }}>
          <h1 style={{ color: "#808080", fontSize: "2rem", fontWeight: "100", letterSpacing: "0.3em", margin: 0, fontFamily: "var(--font-saira)"}}>FASHTECH</h1>
          <p style={{ color: "#811b1b", fontSize: "0.7rem", letterSpacing: "0.5em", margin: "4px 0 0 0" }}>DIGITAL_STYLE_PROTOCOL</p>
        </div>

        <h2 style={{ color: "#fff", fontSize: "1.8rem", fontWeight: "700", letterSpacing: "0.1em", marginBottom: "8px" }}>SIGN IN</h2>
        <p style={{ color: "#555", fontSize: "0.75rem", letterSpacing: "0.2em", marginBottom: "40px" }}>ACCESS YOUR DIGITAL WARDROBE</p>

        {error && <p style={{ color: "#ce1c1c", fontSize: "0.75rem", marginBottom: "16px", letterSpacing: "0.1em" }}>{error}</p>}

        <div style={{ marginBottom: "20px" }}>
          <label style={{ color: "#811b1b", fontSize: "0.65rem", letterSpacing: "0.3em", display: "block", marginBottom: "8px" }}>EMAIL</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={{
              width: "100%", padding: "14px 0", backgroundColor: "transparent",
              border: "none", borderBottom: "1px solid #333", color: "#fff",
              fontSize: "0.85rem", outline: "none", letterSpacing: "0.1em"
            }}
          />
        </div>

        <div style={{ marginBottom: "40px" }}>
          <label style={{ color: "#811b1b", fontSize: "0.65rem", letterSpacing: "0.3em", display: "block", marginBottom: "8px" }}>PASSWORD</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={{
              width: "100%", padding: "14px 0", backgroundColor: "transparent",
              border: "none", borderBottom: "1px solid #333", color: "#fff",
              fontSize: "0.85rem", outline: "none", letterSpacing: "0.1em"
            }}
          />
        </div>

        <button
          onClick={handleLogin}
          style={{
            backgroundColor: "#811b1b", color: "#fff", border: "none",
            padding: "16px", fontSize: "0.75rem", letterSpacing: "0.3em",
            fontWeight: "700", cursor: "pointer", width: "100%"
          }}
        >
          ENTER
        </button>

        <p style={{ color: "#555", fontSize: "0.7rem", letterSpacing: "0.2em", marginTop: "24px" }}>
          NO ACCOUNT?{" "}
          <a href="/auth/register" style={{ color: "#ce1c1c", textDecoration: "none" }}>REGISTER</a>
        </p>
      </div>

      {/* Right Panel */}
      <div style={{
        width: "50%",
        backgroundColor: "#910b0b",
        backgroundImage: "radial-gradient(ellipse at top, #910b0b 0%, #811b1b 40%, #0a0a0a 100%)",
        display: "flex", alignItems: "center", justifyContent: "center", position: "relative", overflow: "hidden"
      }}>
        <div style={{ textAlign: "center", zIndex: 1 }}>
          <p style={{ color: "rgba(255,255,255,0.1)", fontSize: "6rem", letterSpacing: "0.2em", lineHeight: 1, margin: 0, fontFamily: "var(--font-saira)" }}>FASH</p>
          <p style={{ color: "rgba(255,255,255,0.1)", fontSize: "6rem", letterSpacing: "0.2em", lineHeight: 1, margin: 0, fontFamily: "var(--font-saira)" }}>TECH</p>
        </div>
      </div>

    </div>
  )
}