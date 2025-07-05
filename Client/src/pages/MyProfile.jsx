import React, { useState, useEffect } from "react";
import {
  User,
  Mail,
  Edit3,
  Save,
  X,
  Camera,
  Calendar,
  MapPin,
  Phone,
  Globe,
  Shield,
  Settings,
  LogOut,
  Upload,
  Eye,
  EyeOff,
} from "lucide-react";
import "../styles/Profile.css";

const ProfilePage = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState({
    username: "johndoe",
    email: "john.doe@example.com",
    fullName: "John Doe",
    bio: "Full-stack developer passionate about creating amazing web experiences. Love coding, coffee, and continuous learning.",
    phone: "+1 (555) 123-4567",
    location: "San Francisco, CA",
    website: "https://johndoe.dev",
    joinDate: "2023-01-15",
    avatar:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face",
  });
  const [editData, setEditData] = useState({ ...profileData });
  const [showPassword, setShowPassword] = useState(false);
  const [stats, setStats] = useState({
    postsCount: 42,
    followersCount: 1234,
    followingCount: 567,
  });

  useEffect(() => {
    // Simulate loading user data
    const loadUserData = () => {
      // In real app, fetch from API
      console.log("Loading user profile...");
    };
    loadUserData();
  }, []);

  const handleEdit = () => {
    setIsEditing(true);
    setEditData({ ...profileData });
  };

  const handleSave = () => {
    setProfileData({ ...editData });
    setIsEditing(false);
    // In real app, save to API
    console.log("Profile updated:", editData);
  };

  const handleCancel = () => {
    setIsEditing(false);
    setEditData({ ...profileData });
  };

  const handleInputChange = (field, value) => {
    setEditData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleAvatarUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setEditData((prev) => ({
          ...prev,
          avatar: e.target.result,
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <>
      <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 relative">
        <div className="floating-elements"></div>

        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="profile-container">
            {/* Header */}
            <div className="text-center mb-12">
              <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent mb-4">
                My Profile
              </h1>
              <p className="text-gray-600 text-lg">
                Manage your account information and preferences
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Profile Card */}
              <div className="lg:col-span-2">
                <div className="profile-card bg-white rounded-2xl shadow-xl p-8 border border-gray-200">
                  {/* Avatar Section */}
                  <div className="flex flex-col sm:flex-row items-center gap-8 mb-8">
                    <div className="avatar-container relative">
                      <img
                        src={isEditing ? editData.avatar : profileData.avatar}
                        alt="Profile"
                        className="w-32 h-32 rounded-full object-cover border-4 border-white shadow-lg"
                      />
                      {isEditing && (
                        <div className="avatar-overlay">
                          <label
                            htmlFor="avatar-upload"
                            className="cursor-pointer"
                          >
                            <Camera className="w-8 h-8 text-white" />
                            <input
                              id="avatar-upload"
                              type="file"
                              accept="image/*"
                              onChange={handleAvatarUpload}
                              className="hidden"
                            />
                          </label>
                        </div>
                      )}
                    </div>

                    <div className="flex-1 text-center sm:text-left">
                      {isEditing ? (
                        <div className="space-y-4">
                          <input
                            type="text"
                            value={editData.fullName}
                            onChange={(e) =>
                              handleInputChange("fullName", e.target.value)
                            }
                            className="form-input text-2xl font-bold w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none"
                            placeholder="Full Name"
                          />
                          <input
                            type="text"
                            value={editData.username}
                            onChange={(e) =>
                              handleInputChange("username", e.target.value)
                            }
                            className="form-input text-lg w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none"
                            placeholder="Username"
                          />
                        </div>
                      ) : (
                        <div>
                          <h2 className="text-3xl font-bold text-gray-900 mb-2">
                            {profileData.fullName}
                          </h2>
                          <p className="text-xl text-gray-600 mb-4">
                            @{profileData.username}
                          </p>
                        </div>
                      )}

                      <div className="flex items-center justify-center sm:justify-start gap-2 text-gray-500">
                        <Calendar className="w-4 h-4" />
                        <span>
                          Joined{" "}
                          {new Date(profileData.joinDate).toLocaleDateString(
                            "en-US",
                            {
                              year: "numeric",
                              month: "long",
                            }
                          )}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Bio Section */}
                  <div className="mb-8">
                    <h3 className="text-lg font-semibold text-gray-900 mb-3">
                      About
                    </h3>
                    {isEditing ? (
                      <textarea
                        value={editData.bio}
                        onChange={(e) =>
                          handleInputChange("bio", e.target.value)
                        }
                        className="form-input w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none resize-none"
                        rows="4"
                        placeholder="Tell us about yourself..."
                      />
                    ) : (
                      <p className="text-gray-700 leading-relaxed">
                        {profileData.bio}
                      </p>
                    )}
                  </div>

                  {/* Contact Information */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        <Mail className="w-4 h-4 inline mr-2" />
                        Email
                      </label>
                      {isEditing ? (
                        <input
                          type="email"
                          value={editData.email}
                          onChange={(e) =>
                            handleInputChange("email", e.target.value)
                          }
                          className="form-input w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none"
                        />
                      ) : (
                        <p className="text-gray-900 bg-gray-50 px-4 py-2 rounded-lg">
                          {profileData.email}
                        </p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        <Phone className="w-4 h-4 inline mr-2" />
                        Phone
                      </label>
                      {isEditing ? (
                        <input
                          type="tel"
                          value={editData.phone}
                          onChange={(e) =>
                            handleInputChange("phone", e.target.value)
                          }
                          className="form-input w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none"
                        />
                      ) : (
                        <p className="text-gray-900 bg-gray-50 px-4 py-2 rounded-lg">
                          {profileData.phone}
                        </p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        <MapPin className="w-4 h-4 inline mr-2" />
                        Location
                      </label>
                      {isEditing ? (
                        <input
                          type="text"
                          value={editData.location}
                          onChange={(e) =>
                            handleInputChange("location", e.target.value)
                          }
                          className="form-input w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none"
                        />
                      ) : (
                        <p className="text-gray-900 bg-gray-50 px-4 py-2 rounded-lg">
                          {profileData.location}
                        </p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        <Globe className="w-4 h-4 inline mr-2" />
                        Website
                      </label>
                      {isEditing ? (
                        <input
                          type="url"
                          value={editData.website}
                          onChange={(e) =>
                            handleInputChange("website", e.target.value)
                          }
                          className="form-input w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none"
                        />
                      ) : (
                        <a
                          href={profileData.website}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-indigo-600 hover:text-indigo-800 bg-gray-50 px-4 py-2 rounded-lg block transition-colors"
                        >
                          {profileData.website}
                        </a>
                      )}
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex flex-wrap gap-4 justify-center sm:justify-start">
                    {isEditing ? (
                      <>
                        <button
                          onClick={handleSave}
                          className="action-btn flex items-center gap-2 bg-green-600 text-white px-6 py-3 rounded-xl hover:bg-green-700 font-medium"
                        >
                          <Save className="w-4 h-4" />
                          Save Changes
                        </button>
                        <button
                          onClick={handleCancel}
                          className="action-btn flex items-center gap-2 bg-gray-600 text-white px-6 py-3 rounded-xl hover:bg-gray-700 font-medium"
                        >
                          <X className="w-4 h-4" />
                          Cancel
                        </button>
                      </>
                    ) : (
                      <button
                        onClick={handleEdit}
                        className="edit-btn action-btn flex items-center gap-2 bg-indigo-600 text-white px-6 py-3 rounded-xl hover:bg-indigo-700 font-medium"
                      >
                        <Edit3 className="w-4 h-4" />
                        Edit Profile
                      </button>
                    )}
                  </div>
                </div>
              </div>

              {/* Sidebar */}
              <div className="space-y-6">
                {/* Stats Card */}
                <div className="stat-card bg-white rounded-2xl shadow-xl p-6 border border-gray-200">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">
                    Statistics
                  </h3>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Blog Posts</span>
                      <span className="font-semibold text-indigo-600">
                        {stats.postsCount}
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Followers</span>
                      <span className="font-semibold text-indigo-600">
                        {stats.followersCount.toLocaleString()}
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Following</span>
                      <span className="font-semibold text-indigo-600">
                        {stats.followingCount}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Quick Actions */}
                <div className="stat-card bg-white rounded-2xl shadow-xl p-6 border border-gray-200">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">
                    Quick Actions
                  </h3>
                  <div className="space-y-3">
                    <button className="action-btn w-full flex items-center gap-3 text-left px-4 py-3 rounded-lg hover:bg-gray-50 transition-colors">
                      <Settings className="w-5 h-5 text-gray-600" />
                      <span>Account Settings</span>
                    </button>
                    <button className="action-btn w-full flex items-center gap-3 text-left px-4 py-3 rounded-lg hover:bg-gray-50 transition-colors">
                      <Shield className="w-5 h-5 text-gray-600" />
                      <span>Privacy & Security</span>
                    </button>
                    <button className="action-btn w-full flex items-center gap-3 text-left px-4 py-3 rounded-lg hover:bg-red-50 text-red-600 transition-colors">
                      <LogOut className="w-5 h-5" />
                      <span>Sign Out</span>
                    </button>
                  </div>
                </div>

                {/* Profile Completion */}
                <div className="stat-card gradient-bg rounded-2xl shadow-xl p-6 text-white">
                  <h3 className="text-lg font-semibold mb-4">
                    Profile Completion
                  </h3>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span>Overall Progress</span>
                      <span className="font-semibold">85%</span>
                    </div>
                    <div className="w-full bg-white bg-opacity-30 rounded-full h-2">
                      <div
                        className="bg-white h-2 rounded-full transition-all duration-500"
                        style={{ width: "85%" }}
                      ></div>
                    </div>
                    <p className="text-sm opacity-90">
                      Add more details to complete your profile and increase
                      visibility!
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProfilePage;
