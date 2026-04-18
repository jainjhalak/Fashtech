"use client"
import { useState } from "react"
import { useRouter } from "next/navigation"
import api from "@/lib/axios"
import { useAuthStore } from "@/lib/store/authStore"

export default function RegisterPage() {
  const [username, setUsername] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const { setAuth } = useAuthStore()
  const router = useRouter()

  const handleRegister = async () => {
    try {
      const res = await api.post("/auth/register", { username, email, password })
      setAuth(res.data.user, res.data.token)
      router.push("/home")
    } catch {
      setError("Registration failed")
    }
  }

  return (
    <div style={{ backgroundColor: "#0a0a0a", minHeight: "100vh", display: "flex", fontFamily: "var(--font-saira)" }}>

      {/* Left Panel */}
      <div style={{ width: "50%", backgroundColor: "#0a0a0a", display: "flex", flexDirection: "column", justifyContent: "center", padding: "60px" }}>
        <div style={{ marginBottom: "60px" }}>
          <h1 style={{ color: "#ce1c1c", fontSize: "2rem", letterSpacing: "0.3em", margin: 0, fontFamily: "var(--font-saira)" }}>FASHTECH</h1>
          <p style={{ color: "#811b1b", fontSize: "0.7rem", letterSpacing: "0.5em", margin: "4px 0 0 0" }}>DIGITAL_STYLE_PROTOCOL</p>
        </div>

        <h2 style={{ color: "#fff", fontSize: "1.8rem", letterSpacing: "0.1em", marginBottom: "8px" }}>CREATE ACCOUNT</h2>
        <p style={{ color: "#555", fontSize: "0.75rem", letterSpacing: "0.2em", marginBottom: "40px" }}>JOIN THE DIGITAL WARDROBE</p>

        {error && <p style={{ color: "#ce1c1c", fontSize: "0.75rem", marginBottom: "16px", letterSpacing: "0.1em" }}>{error}</p>}

        <div style={{ marginBottom: "20px" }}>
          <label style={{ color: "#811b1b", fontSize: "0.65rem", letterSpacing: "0.3em", display: "block", marginBottom: "8px" }}>USERNAME</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            style={{
              width: "100%", padding: "14px 0", backgroundColor: "transparent",
              border: "none", borderBottom: "1px solid #333", color: "#fff",
              fontSize: "0.85rem", outline: "none", letterSpacing: "0.1em"
            }}
          />
        </div>

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
          onClick={handleRegister}
          style={{
            backgroundColor: "#ce1c1c", color: "#fff", border: "none",
            padding: "16px", fontSize: "0.75rem", letterSpacing: "0.3em",
            fontWeight: "700", cursor: "pointer", width: "100%"
          }}
        >
          REGISTER
        </button>

        <p style={{ color: "#555", fontSize: "0.7rem", letterSpacing: "0.2em", marginTop: "24px" }}>
          HAVE AN ACCOUNT?{" "}
          <a href="/auth/login" style={{ color: "#ce1c1c", textDecoration: "none" }}>SIGN IN</a>
        </p>
      </div>

      {/* Right Panel */}
      <div style={{
        width: "50%",
        backgroundImage: "radial-gradient(ellipse at top, #ce1c1c 0%, #811b1b 40%, #0a0a0a 100%)",
        display: "flex", alignItems: "center", justifyContent: "center", overflow: "hidden"
      }}>
        <div style={{ textAlign: "center" }}>
          <p style={{ color: "rgba(255,255,255,0.1)", fontSize: "6rem", letterSpacing: "0.2em", lineHeight: 1, margin: 0 }}>FASH</p>
          <p style={{ color: "rgba(255,255,255,0.1)", fontSize: "6rem", letterSpacing: "0.2em", lineHeight: 1, margin: 0 }}>TECH</p>
        </div>
      </div>

    </div>
  )
}