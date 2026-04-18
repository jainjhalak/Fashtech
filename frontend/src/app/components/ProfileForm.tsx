"use client";
import { UserProfile } from "@/types/profile";
import { saveProfile, logout } from "@/app/(user)/profile/action";

const inputWrap: React.CSSProperties = {
  display: "flex", alignItems: "center", gap: "10px",
  background: "#0f0f0f", border: "1px solid #1f1f1f",
  borderRadius: "8px", padding: "0 14px", height: "46px",
};

const inputStyle: React.CSSProperties = {
  flex: 1, background: "transparent", border: "none", outline: "none",
  color: "#fff", fontSize: "0.85rem", letterSpacing: "0.03em",
};

const labelStyle: React.CSSProperties = {
  color: "#555", fontSize: "0.7rem", letterSpacing: "0.15em",
  marginBottom: "6px", display: "block"
};

const iconStyle: React.CSSProperties = { color: "#444", flexShrink: 0 };

export default function ProfileForm({ user }: { user: UserProfile }) {
  return (
    <div style={{
      background: "#111", border: "1px solid #1f1f1f",
      borderRadius: "16px", padding: "32px 28px",
      display: "flex", flexDirection: "column", gap: "20px"
    }}>
      <span style={{ color: "#fff", fontSize: "0.75rem", letterSpacing: "0.2em", fontWeight: 600 }}>
        EDIT PROFILE
      </span>

      <form action={saveProfile} style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
        {/* USERNAME */}
        <div>
          <label style={labelStyle} htmlFor="username">USERNAME</label>
          <div style={inputWrap}>
            <span style={iconStyle}>
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                <circle cx="12" cy="7" r="4" />
              </svg>
            </span>
            <input id="username" name="username" type="text"
              style={inputStyle} defaultValue={user.username} placeholder="your username" />
          </div>
        </div>

        {/* EMAIL */}
        <div>
          <label style={labelStyle} htmlFor="email">EMAIL</label>
          <div style={inputWrap}>
            <span style={iconStyle}>
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                <rect x="2" y="4" width="20" height="16" rx="2" />
                <path d="m22 7-10 7L2 7" />
              </svg>
            </span>
            <input id="email" name="email" type="email"
              style={inputStyle} defaultValue={user.email} placeholder="your@email.com" />
          </div>
        </div>

        {/* PASSWORD */}
        <div>
          <label style={labelStyle} htmlFor="password">NEW PASSWORD</label>
          <div style={inputWrap}>
            <span style={iconStyle}>
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                <rect x="3" y="11" width="18" height="11" rx="2" />
                <path d="M7 11V7a5 5 0 0 1 10 0v4" />
              </svg>
            </span>
            <input id="password" name="password" type="password"
              style={inputStyle} placeholder="••••••••" />
          </div>
        </div>

        <button type="submit" style={{
          marginTop: "4px", background: "#ce1c1c", color: "#fff",
          border: "none", borderRadius: "8px", height: "46px",
          fontSize: "0.75rem", letterSpacing: "0.15em", fontWeight: 700,
          cursor: "pointer", transition: "opacity 0.2s"
        }}>
          SAVE CHANGES
        </button>
      </form>

      <div style={{ height: "1px", background: "#1a1a1a" }} />

      <form action={logout}>
        <button type="submit" style={{
          width: "100%", display: "flex", alignItems: "center",
          justifyContent: "center", gap: "8px",
          background: "transparent", border: "1px solid #2a2a2a",
          borderRadius: "8px", height: "42px", color: "#555",
          fontSize: "0.75rem", letterSpacing: "0.15em", cursor: "pointer",
          transition: "color 0.2s, border-color 0.2s"
        }}>
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
            <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
            <polyline points="16 17 21 12 16 7" />
            <line x1="21" y1="12" x2="9" y2="12" />
          </svg>
          LOG OUT
        </button>
      </form>
    </div>
  );
}