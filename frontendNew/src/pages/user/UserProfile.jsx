// 🔐 Code developed by Jay Rana © 26/09/2025. Not for reuse or redistribution.
// If you theft this code, you will be punished or may face legal action by the owner.

// src/pages/user/UserProfile.jsx
import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import {
  Camera,
  ShoppingCart,
  Calendar,
  History,
  Package,
} from "lucide-react";
import { BACKEND_URL } from "../../utils/config";

const ActivityCard = ({ icon, label, count, link }) => (
  <Link to={link}>
    <div className="bg-white shadow-md p-4 rounded-xl border-l-4 border-[#C0402B] flex items-center space-x-4 hover:shadow-lg transition-all">
      <div className="bg-[#C0402B] text-white p-3 rounded-full">{icon}</div>
      <div>
        <h3 className="text-lg font-semibold text-gray-800">{label}</h3>
        <p className="text-sm text-gray-500">{count} items</p>
      </div>
    </div>
  </Link>
);

const UserProfile = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [image, setImage] = useState(null);
  const [uploadedUrl, setUploadedUrl] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [activity, setActivity] = useState({
    bookings: 0,
    orders: 0,
    cart: 0,
  });

  const navigate = useNavigate();

  const handleImageChange = (e) => setImage(e.target.files[0]);

  const handleUpload = async () => {
    if (!image) return alert("Please select an image.");

    const formData = new FormData();
    formData.append("file", image);

    try {
      const res = await fetch(`${BACKEND_URL}/user/upload-image`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: formData,
      });

      const result = await res.json();
      if (result.success) {
        setUploadedUrl(result.data);
        alert("✅ Image uploaded!");
      } else {
        alert("❌ Upload failed: " + result.message);
      }
    } catch (err) {
      console.error("Image upload failed:", err);
      alert("❌ Image upload failed");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const userProfileData = {
      name,
      email,
      profileImage: uploadedUrl,
    };

    try {
      const response = await fetch(`${BACKEND_URL}/user/profile`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify(userProfileData),
      });

      const data = await response.json();
      if (data.success) {
        alert("✅ Profile updated successfully!");
        fetchProfile();
      } else {
        alert("❌ Failed to update profile: " + data.message);
      }
    } catch (err) {
      console.error("Error submitting profile:", err);
    }
  };

  const fetchProfile = async () => {
    try {
      const res = await fetch(`${BACKEND_URL}/user/profile`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      const result = await res.json();
      if (result.success) {
        const { user, bookings, orders, cart } = result.data;
        setName(user.name || "");
        setEmail(user.email || "");
        setUploadedUrl(user.profileImage || "");
        setActivity({
          bookings: bookings?.length || 0,
          orders: orders?.length || 0,
          cart: cart?.length || 0,
        });
      } else {
        setError(result.message);
      }
    } catch (err) {
      setError("Failed to load profile");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
    } else {
      fetchProfile();
    }
    // eslint-disable-next-line
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <p className="text-lg font-semibold text-[#C0402B]">Loading profile...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-red-600 font-medium">{error}</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-50 to-red-50 p-6">
      <div className="max-w-6xl mx-auto bg-white shadow-2xl rounded-xl p-8">
        <h1 className="text-4xl font-bold text-[#C0402B] mb-6">My Profile</h1>

        {/* Profile Info */}
        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 mb-10">
          <div className="relative w-40 h-40">
            <img
              src={uploadedUrl || "/default-avatar.png"}
              alt="Profile"
              className="w-full h-full rounded-full object-cover border-4 border-[#C0402B]"
            />
            <label className="absolute bottom-2 right-2 bg-white p-2 rounded-full shadow cursor-pointer">
              <Camera className="w-5 h-5 text-[#C0402B]" />
              <input type="file" onChange={handleImageChange} hidden />
            </label>
          </div>

          <form onSubmit={handleSubmit} className="flex-1 space-y-4 w-full">
            <div>
              <label className="block text-sm font-medium text-gray-700">Full Name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="mt-1 w-full border border-gray-300 rounded-md px-3 py-2 shadow-sm focus:ring-red-500 focus:border-red-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Email Address</label>
              <input
                type="email"
                value={email}
                readOnly
                className="mt-1 w-full bg-gray-100 border border-gray-300 rounded-md px-3 py-2 shadow-sm"
              />
            </div>
            <div className="flex gap-4 mt-3">
              <button
                type="button"
                onClick={handleUpload}
                className="bg-[#4A1C1C] text-white px-4 py-2 rounded-md hover:bg-[#5e2a2a]"
              >
                Upload Image
              </button>
              <button
                type="submit"
                className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700"
              >
                Save Profile
              </button>
            </div>
          </form>
        </div>

        {/* Activity Summary */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <ActivityCard icon={<Calendar />} label="My Bookings" count={activity.bookings} link="/booking" />
          <ActivityCard icon={<ShoppingCart />} label="My Cart" count={activity.cart} link="/cart" />
          <ActivityCard icon={<Package />} label="My Orders" count={activity.orders} link="/orders" />
          <ActivityCard icon={<History />} label="Booking History" count={activity.bookings} link="/booking/history" />
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
