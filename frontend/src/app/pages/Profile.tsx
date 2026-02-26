import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import axios from "axios";
import { motion } from "motion/react";
import { User as UserIcon, LogOut, Calendar, MapPin } from "lucide-react";
import { Button } from "../components/ui/button";
import { useAuth } from "../context/AuthContext";

export function Profile() {
  const { user, token, logout } = useAuth();
  const navigate = useNavigate();
  const [bookings, setBookings] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    // If not logged in, redirect to login page
    if (!user || !token) {
      navigate("/login");
      return;
    }

    const fetchBookings = async () => {
      try {
        const backendUrl = import.meta.env.VITE_BACKEND_URL || "http://localhost:5001";
        const response = await axios.get(`${backendUrl}/api/bookings/my-bookings`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setBookings(response.data);
      } catch (err: any) {
        console.error("Error fetching bookings:", err);
        setError("Failed to load your bookings. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, [user, token, navigate]);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  if (!user) return null; // Prevent flash before redirect

  return (
    <div className="w-full min-h-screen pt-24 pb-12 bg-gray-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Sidebar Profiler */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            className="lg:col-span-1"
          >
            <div className="bg-white rounded-3xl p-8 shadow-md">
              <div className="flex flex-col items-center">
                <div className="w-24 h-24 bg-gradient-to-br from-orange-500 to-pink-600 rounded-full flex items-center justify-center text-white text-3xl font-bold mb-4 shadow-lg">
                  {user.name.charAt(0).toUpperCase()}
                </div>
                <h2 className="text-2xl font-bold text-gray-900">{user.name}</h2>
                <p className="text-gray-500 mb-6">{user.email}</p>
                
                <div className="w-full h-px bg-gray-100 mb-6"></div>

                <div className="w-full space-y-4">
                  <div className="flex items-center text-gray-700 p-3 rounded-xl bg-orange-50/50">
                    <UserIcon className="w-5 h-5 mr-3 text-orange-500" />
                    <span className="font-medium">Account Details</span>
                  </div>
                  <Button
                    onClick={handleLogout}
                    variant="outline"
                    className="w-full text-red-600 border-red-200 hover:bg-red-50 hover:text-red-700 py-6 text-base rounded-xl flex items-center justify-center font-medium"
                  >
                    <LogOut className="w-5 h-5 mr-2" />
                    Sign Out
                  </Button>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Bookings Display */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            className="lg:col-span-2"
          >
            <div className="bg-white rounded-3xl p-8 shadow-md h-full">
              <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                <Calendar className="w-6 h-6 mr-2 text-orange-500" />
                Your Adventures
              </h3>

              {error && (
                <div className="mb-6 p-4 bg-red-50 text-red-600 rounded-xl text-sm">
                  {error}
                </div>
              )}

              {loading ? (
                <div className="flex justify-center items-center py-20">
                  <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-orange-500"></div>
                </div>
              ) : bookings.length === 0 ? (
                <div className="text-center py-16 bg-gray-50 rounded-2xl border border-dashed border-gray-200">
                  <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <MapPin className="text-orange-500 w-8 h-8" />
                  </div>
                  <h4 className="text-xl font-semibold text-gray-800 mb-2">No active bookings</h4>
                  <p className="text-gray-500 mb-6 max-w-sm mx-auto">
                    Looks like you haven't booked any adventures with us yet.
                  </p>
                  <Button onClick={() => navigate('/tours')} className="bg-gradient-to-r from-orange-500 to-pink-600 hover:opacity-90 text-white px-8 py-2 rounded-full">
                    Explore Tours
                  </Button>
                </div>
              ) : (
                <div className="space-y-6">
                  {bookings.map((booking, index) => (
                    <div 
                      key={booking._id || index} 
                      className="border border-gray-100 rounded-2xl p-6 hover:shadow-md transition-shadow bg-gray-50/50 relative overflow-hidden"
                    >
                      <div className="absolute top-0 left-0 w-2 h-full bg-gradient-to-b from-orange-500 to-pink-600"></div>
                      <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4">
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <span className={`px-2 py-1 text-xs font-semibold rounded-full ${
                              booking.status === 'confirmed' ? 'bg-green-100 text-green-700' :
                              booking.status === 'pending' ? 'bg-orange-100 text-orange-700' :
                              'bg-gray-200 text-gray-700'
                            }`}>
                              {booking.status ? booking.status.toUpperCase() : 'PENDING'}
                            </span>
                          </div>
                          <h4 className="text-lg font-bold text-gray-900">
                            {booking.tour?.title || "Custom Tour Booking"}
                          </h4>
                          <div className="flex items-center text-sm text-gray-600 mt-2">
                            <Calendar className="w-4 h-4 mr-1 text-gray-400" />
                            {new Date(booking.date || booking.createdAt).toLocaleDateString()}
                          </div>
                        </div>
                        <div className="text-left sm:text-right">
                          <p className="text-sm text-gray-500">Travelers</p>
                          <p className="font-semibold text-gray-900">{booking.travelers} Guests</p>
                          {booking.totalPrice && (
                            <p className="font-bold text-orange-600 mt-1">${booking.totalPrice}</p>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
