import { Text } from '@/shared/components/atoms';

export default function MemberBoard({ user }) {
  return (
    <div className="profile-header">
      <div className="avatar-wrapper">
        {user.avatar ? (
          <img src={user.avatar} alt="Avatar" className="avatar" />
        ) : (
          <div className="avatar-placeholder">
            {user.displayName.charAt(0).toUpperCase()}
          </div>
        )}
      </div>

      <div className="user-info">
        <h1 className="user-name">{user.displayName}</h1>
        <Text>Nike Member • Since {user.memberSince}</Text>
      </div>
    </div>
  );
}