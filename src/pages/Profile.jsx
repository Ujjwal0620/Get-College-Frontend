import React, { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

const Profile = () => {
  const { user, logout } = useContext(AuthContext);

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center py-10">
      <div className="bg-white rounded-2xl shadow-lg w-full max-w-2xl p-6">
        {/* Profile Header */}
        <div className="flex items-center space-x-6 border-b pb-6">
          <img
            src={`https://ui-avatars.com/api/?name=${user.name}&background=0D8ABC&color=fff&size=150`}
            alt="Profile"
            className="w-28 h-28 rounded-full object-cover border-4 border-gray-200"
          />
          <div className="flex-1">
            <div className="flex items-center space-x-4">
              <h2 className="text-2xl font-bold">{user.name}</h2>
              <button
                onClick={logout}
                className="px-4 py-1 border rounded-lg text-sm font-medium hover:bg-gray-100"
              >
                Logout
              </button>
            </div>
            <div className="flex space-x-8 mt-4">
              <div className="text-center">
                <p className="font-bold">12</p>
                <p className="text-gray-500 text-sm">Posts</p>
              </div>
              <div className="text-center">
                <p className="font-bold">1.5k</p>
                <p className="text-gray-500 text-sm">Followers</p>
              </div>
              <div className="text-center">
                <p className="font-bold">300</p>
                <p className="text-gray-500 text-sm">Following</p>
              </div>
            </div>
          </div>
        </div>

        {/* User Info */}
        <div className="mt-6 space-y-2">
          <p className="font-semibold">{user.name}</p>
          <p className="text-gray-600 text-sm">{user.email}</p>
          <p className="text-gray-600 text-sm capitalize">Role: {user.role}</p>
          <p className="text-gray-500 text-xs">User ID: {user._id}</p>
        </div>

        {/* Placeholder for user posts */}
        <div className="mt-8 grid grid-cols-3 gap-2">
          <div className="w-full h-32 bg-gray-200 rounded-lg"></div>
          <div className="w-full h-32 bg-gray-200 rounded-lg"></div>
          <div className="w-full h-32 bg-gray-200 rounded-lg"></div>
          <div className="w-full h-32 bg-gray-200 rounded-lg"></div>
          <div className="w-full h-32 bg-gray-200 rounded-lg"></div>
          <div className="w-full h-32 bg-gray-200 rounded-lg"></div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
