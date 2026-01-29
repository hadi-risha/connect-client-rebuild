import { useAppSelector } from "../../hooks/redux";
import { useNavigate } from "react-router-dom";
import { Role } from "../../constants/roles";
import UnisexAvatar from "../../icons/UnisexAvatar";

const ProfileView = () => {
  const { user } = useAppSelector((s) => s.user);
  const navigate = useNavigate();

  if (!user) return null;
  const hasProfileImage = Boolean(user.profilePicture?.url);

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-3xl shadow-md border border-gray-100 overflow-hidden">

          {/* Cover */}
          <div className="h-32 bg-gradient-to-r from-slate-800 via-slate-700 to-slate-800 relative">
            <div className="absolute inset-0 bg-black/10" />
          </div>

          <div className="px-8 pb-8">
            {/* Avatar + Identity */}
            <div className="flex flex-col items-center -mt-14 text-center relative z-10">

              <div className="w-28 h-28 rounded-full ring-4 ring-white shadow-lg overflow-hidden bg-gray-100 flex items-center justify-center">
                {hasProfileImage ? (
                  <img
                    src={user.profilePicture!.url}
                    alt={user.name}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <UnisexAvatar size={70} />
                )}
              </div>

              <h1 className="mt-4 text-2xl font-semibold text-gray-900">
                {user.name}
              </h1>

              <span className="mt-2 inline-block px-3 py-1 text-xs font-medium rounded-full bg-blue-200 text-slate-700">
                {user.role}
              </span>
            </div>

            {/* Info Cards */}
            <div className="mt-10 space-y-5">
              <InfoCard label="Email" value={user.email} />

              {user.role === Role.INSTRUCTOR && (
                <>
                  <InfoCard
                    label="Bio"
                    value={user.instructorProfile?.bio || "No bio added yet"}
                  />
                  <InfoCard
                    label="Expertise"
                    value={user.instructorProfile?.expertise || "Not specified"}
                  />
                </>
              )}
            </div>

            {/* Action */}
            <div className="mt-10">
              <button
                onClick={() => navigate("/instructor/profile/edit")}
                className="w-full py-3 rounded-xl bg-slate-800 text-white font-semibold shadow-lg 
                           hover:shadow-xl hover:-translate-y-[1px] active:translate-y-0 active:scale-[0.98] transition-all duration-200"
              >
                Edit Profile
              </button>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

const InfoCard = ({ label, value }: { label: string; value: string }) => (
  <div className="bg-gray-50 rounded-xl p-4 border border-gray-100 shadow-sm hover:shadow-md transition">
    <p className="text-xs font-medium text-gray-500 uppercase tracking-wide">
      {label}
    </p>
    <p className="mt-1 text-gray-800 text-sm leading-relaxed break-words">
      {value}
    </p>
  </div>
);

export default ProfileView;
