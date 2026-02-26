import { useState, useEffect } from "react";
import axios from "axios";
import { motion } from "motion/react";
import { MapPin, Calendar, Users, Star, Filter } from "lucide-react";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";
import { Link, useNavigate } from "react-router";
import { useAuth } from "../context/AuthContext";

export function Tours() {
  const [selectedCategory, setSelectedCategory] = useState("all");

  const categories = [
    { id: "all", label: "All Tours" },
    { id: "heritage", label: "Heritage" },
    { id: "palace", label: "Palaces & Forts" },
    { id: "desert", label: "Desert Safari" },
    { id: "spiritual", label: "Spiritual" },
  ];

  const [allTours, setAllTours] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [bookingLoading, setBookingLoading] = useState<string | null>(null);
  const { user, token } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTours = async () => {
      try {
        const backendUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:5001';
        const response = await axios.get(`${backendUrl}/api/tours`);
        setAllTours(response.data);
      } catch (error) {
        console.error("Error fetching tours:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTours();
  }, []);

  const handleBookTour = async (tourId: string, tourPrice: number) => {
    if (!user || !token) {
      navigate("/login");
      return;
    }

    setBookingLoading(tourId);
    try {
      const backendUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:5001';
      await axios.post(
        `${backendUrl}/api/bookings`,
        {
          tour: tourId,
          travelers: 1, // Defaulting to 1 for quick book
          date: new Date().toISOString(), // Defaulting to today's date
          totalPrice: tourPrice,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      // Navigate to profile to see the new booking
      navigate("/profile");
    } catch (error) {
      console.error("Error booking tour:", error);
      alert("Failed to arrange booking. Please try again.");
    } finally {
      setBookingLoading(null);
    }
  };

  const filteredTours =
    selectedCategory === "all"
      ? allTours
      : allTours.filter((tour) => tour.category === selectedCategory);

  return (
    <div className="w-full pt-20">
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-br from-orange-500 via-pink-600 to-purple-600 text-white overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.1),transparent)]" />
        </div>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center max-w-3xl mx-auto"
          >
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              Explore Our Tour Packages
            </h1>
            <p className="text-xl text-white/90">
              Curated experiences across India's most captivating destinations
            </p>
          </motion.div>
        </div>
      </section>

      {/* Filters */}
      <section className="py-8 bg-white border-b sticky top-20 z-40 shadow-sm">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-4 overflow-x-auto pb-2">
            <Filter size={20} className="text-gray-400 flex-shrink-0" />
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`px-6 py-2.5 rounded-full whitespace-nowrap transition-all ${selectedCategory === category.id
                  ? "bg-gradient-to-r from-orange-500 to-pink-600 text-white shadow-md"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
              >
                {category.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Tours Grid */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {loading ? (
              <div className="col-span-full text-center py-20 text-gray-500 flex flex-col items-center justify-center space-y-4">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500"></div>
                <p className="text-lg font-medium text-gray-700">Loading tours...</p>
                <p className="text-sm text-gray-400 max-w-md mx-auto">Please allow up to 50 seconds for the backend server to wake up from its free-tier sleep.</p>
              </div>
            ) : filteredTours.map((tour, index) => (
              <motion.div
                key={tour._id || index}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-300 group"
              >
                <div className="relative h-72 overflow-hidden">
                  <ImageWithFallback
                    src={tour.image?.startsWith('http') ? tour.image : `/${tour.image}`}
                    alt={tour.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute top-4 right-4 px-4 py-2 bg-white rounded-full font-semibold text-gray-900">
                    ${tour.price}
                  </div>
                  <div className="absolute bottom-4 left-4 px-3 py-1.5 bg-black/50 backdrop-blur-sm text-white text-sm rounded-full">
                    {categories.find((c) => c.id === tour.category)?.label}
                  </div>
                </div>

                <div className="p-6">
                  <div className="flex items-center gap-2 text-sm text-gray-600 mb-2">
                    <MapPin size={16} className="text-orange-500" />
                    <span>{tour.location}</span>
                  </div>

                  <h3 className="text-2xl font-semibold text-gray-900 mb-3">
                    {tour.title}
                  </h3>

                  <div className="flex items-center justify-between text-sm text-gray-600 mb-4 pb-4 border-b">
                    <div className="flex items-center gap-2">
                      <Calendar size={16} className="text-orange-500" />
                      <span>{tour.duration}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Users size={16} className="text-orange-500" />
                      <span>{tour.groupSize || "2-15 people"}</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 mb-4">
                    <div className="flex gap-1">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          size={16}
                          className={
                            i < Math.floor(tour.rating)
                              ? "fill-orange-500 text-orange-500"
                              : "text-gray-300"
                          }
                        />
                      ))}
                    </div>
                    <span className="text-sm text-gray-600">
                      {tour.rating} ({tour.reviews} reviews)
                    </span>
                  </div>

                  <div className="flex flex-wrap gap-2 mb-6">
                    {tour.highlights && tour.highlights.map((highlight: string, i: number) => (
                      <span
                        key={i}
                        className="px-3 py-1 bg-orange-50 text-orange-600 text-xs rounded-full"
                      >
                        {highlight}
                      </span>
                    ))}
                  </div>

                  <button
                    onClick={() => handleBookTour(tour._id, tour.price)}
                    disabled={bookingLoading === tour._id}
                    className="block w-full py-3 text-center bg-gradient-to-r from-orange-500 to-pink-600 text-white rounded-xl hover:shadow-lg transition-all disabled:opacity-70"
                  >
                    {bookingLoading === tour._id ? "Booking..." : "Book Now"}
                  </button>
                </div>
              </motion.div>
            ))}
          </div>

          {filteredTours.length === 0 && (
            <div className="text-center py-20">
              <p className="text-xl text-gray-600">
                No tours found in this category.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-gray-900 to-gray-800 text-white">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="container mx-auto px-4 sm:px-6 lg:px-8 text-center"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Can't Find Your Perfect Tour?
          </h2>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Let us create a customized itinerary tailored to your preferences,
            interests, and budget.
          </p>
          <Link
            to="/contact"
            className="inline-block px-8 py-4 bg-gradient-to-r from-orange-500 to-pink-600 rounded-full text-lg hover:shadow-2xl hover:scale-105 transition-all"
          >
            Request Custom Tour
          </Link>
        </motion.div>
      </section>
    </div>
  );
}
