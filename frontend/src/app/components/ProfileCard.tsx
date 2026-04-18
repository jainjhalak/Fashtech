import { UserProfile } from "@/types/profile";

export default function ProfileCard({ user }: { user: UserProfile }) {
  return (
    <div style={{
      background: "#111", border: "1px solid #1f1f1f",
      borderRadius: "16px", padding: "32px 28px",
      display: "flex", alignItems: "center", gap: "20px"
    }}>
      <div style={{
        width: "72px", height: "72px", borderRadius: "50%",
        background: "#ce1c1c", display: "flex", alignItems: "center",
        justifyContent: "center", fontSize: "1.4rem", fontWeight: 700,
        color: "#fff", letterSpacing: "0.05em", flexShrink: 0
      }}>
        {user.initials}
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
        <span style={{ color: "#fff", fontSize: "1.1rem", fontWeight: 700, letterSpacing: "0.05em" }}>
          {user.username}
        </span>
        <span style={{ color: "#555", fontSize: "0.8rem", letterSpacing: "0.05em" }}>
          {user.email}
        </span>
        <span style={{
          marginTop: "6px", display: "inline-block",
          background: "#1a1a1a", border: "1px solid #2a2a2a",
          color: "#ce1c1c", fontSize: "0.65rem", letterSpacing: "0.15em",
          padding: "3px 10px", borderRadius: "20px"
        }}>
          MEMBER
        </span>
      </div>
    </div>
  );
}