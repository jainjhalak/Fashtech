import Navbar from "@/app/components/Navbar"
import ProfileCard from "@/app/components/ProfileCard"
import ProfileForm from "@/app/components/ProfileForm"
import { mockUser } from "@/lib/profileData"

export const metadata = { title: "Fashtech – Profile" };

export default function ProfilePage() {
  const user = mockUser;
  return (
    <>
      <Navbar />
      <main style={{
        minHeight: "100vh", background: "#0a0a0a",
        display: "flex", justifyContent: "center", alignItems: "flex-start",
        padding: "60px 24px"
      }}>
        <div style={{ width: "100%", maxWidth: "480px", display: "flex", flexDirection: "column", gap: "24px" }}>
          <ProfileCard user={user} />
          <ProfileForm user={user} />
        </div>
      </main>
    </>
  );
}