import { useEffect, useState } from "react";
import Header from "@/shared/components/organisms/header/Header.jsx";
import Footer from "@/shared/components/organisms/footer/Footer.jsx";
import UserProfile from "../components/UserProfile";
import { getUserProfile } from "../profileService";
import "./Profile.css";

import shoe1 from "@/assets/shoe-1.png";
import shoe2 from "@/assets/shoe-2.png";
import shoe3 from "@/assets/shoe-3.png";
import shoe4 from "@/assets/shoe-4.png";
import shoe5 from "@/assets/shoe-5.png";
import shoe6 from "@/assets/shoe-6.png";
import shoe7 from "@/assets/shoe-7.png";
import shoe8 from "@/assets/shoe-8.png";

const recommendedImages = [shoe1, shoe2, shoe3, shoe4, shoe5, shoe6, shoe7, shoe8];

export default function Profile() {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const userId = "550e8400-e29b-41d4-a716-446655440000";
  const email = "test@gmail.com";

  useEffect(() => {
    async function fetchProfile() {
      try {
        const data = await getUserProfile(userId);
        setProfile(data);
      } catch (err) {
        console.warn("API failed → using mock data");
        setProfile({
          fullName: "User 1234",
          phoneNumber: "0901234567",
          createdAt: "2025-01-15T08:30:00Z",
          status: "Active",
        });
      } finally {
        setLoading(false);
      }
    }

    fetchProfile();
  }, [userId]);

  return (
    <div>
      <Header />

      <main className="settings-page" style={{ paddingTop: "90px" }}>
        {loading && <p className="text-center text-xl py-20">Loading profile...</p>}
        {error && <p className="text-center text-red-600 text-xl py-20">{error}</p>}

        {profile && (
          <div className="max-w-6xl mx-auto px-4">
            <UserProfile profile={profile} email={email} />
            <section className="mt-12">
              <h1 className="text-2xl font-bold mb-6 uppercase tracking-wide">
                Recommended For You
              </h1>

              <div className="recommended-scroll">
                {recommendedImages.map((img, index) => (
                  <div key={index} className="recommended-item">
                    <img
                      src={img}
                      alt={`Recommended ${index + 1}`}
                    />
                  </div>
                ))}
              </div>
              <div className="text-center mt-8">
                <button className="px-10 py-4 bg-nike-orange text-white text-lg font-bold rounded-xl hover:bg-orange-600 transition shadow-lg">
                  View More
                </button>
              </div>
            </section>
          </div>
        )
        }
      </main >

      <Footer />
    </div >
  );
}