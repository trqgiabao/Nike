import defaultAvatar from "@/assets/hero-shoe.png";

export default function UserProfile({ profile, email }) {
    return (
        <div className="profile-card">
            <div className="profile-left">
                <div className="avatar-wrapper">
                    <img
                        src={defaultAvatar}
                        alt="Default Avatar"
                        className="avatar"
                    />
                </div>

                <p className="member-since">
                    Member since{" "}
                    {profile?.createdAt
                        ? new Date(profile.createdAt).toLocaleDateString()
                        : ""}
                </p>
            </div>

            <div className="profile-right">
                <div className="profile-header">
                    <h2>User Profile</h2>
                    <button className="edit-btn">Edit Profile</button>
                </div>

                <div className="info-item">
                    <label>Full Name</label>
                    <span>{profile?.fullName || "-"}</span>
                </div>

                <div className="info-item">
                    <label>Email</label>
                    <span>{email || "-"}</span>
                </div>

                <div className="info-item">
                    <label>Phone Number</label>
                    <span>{profile?.phoneNumber || "-"}</span>
                </div>
            </div>
        </div>
    );
}