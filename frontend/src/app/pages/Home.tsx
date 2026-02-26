import { useState, useEffect } from "react";
import axios from "axios";
import { motion } from "motion/react";
import { Star, MapPin, Calendar, Users, Award, Shield, Headphones } from "lucide-react";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";
import { Link, useNavigate } from "react-router";
import { useAuth } from "../context/AuthContext";
import { Counter } from "../components/ui/Counter";

export function Home() {
  const [tours, setTours] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [bookingLoading, setBookingLoading] = useState<string | null>(null);
  const { user, token } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTours = async () => {
      try {
        const backendUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:5001';
        const response = await axios.get(`${backendUrl}/api/tours`);
        // Only show top 4 on home page
        setTours(response.data.slice(0, 4));
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

  const features = [
    {
      icon: Award,
      title: "Award Winning",
      description: "Recognized as India's best tour operator for 5 consecutive years",
    },
    {
      icon: Shield,
      title: "Safe & Secure",
      description: "Travel with confidence with our safety protocols and insurance",
    },
    {
      icon: Headphones,
      title: "24/7 Support",
      description: "Round the clock assistance throughout your journey",
    },
  ];

  const testimonials = [
    {
      name: "Sarah Johnson",
      location: "USA",
      rating: 5,
      comment: "An absolutely incredible experience! The Golden Triangle tour was perfectly organized and our guide was exceptional.",
      avatar: "SJ",
    },
    {
      name: "Michael Chen",
      location: "Singapore",
      rating: 5,
      comment: "Kerala backwaters tour exceeded all expectations. The houseboat stay was magical and the hospitality was outstanding.",
      avatar: "MC",
    },
    {
      name: "Emma Williams",
      location: "UK",
      rating: 5,
      comment: "Rajasthan heritage tour was a dream come true. Every palace, every sunset, every moment was pure magic.",
      avatar: "EW",
    },
  ];

  return (
    <div className="w-full">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0">
          <ImageWithFallback
            src="/assets/images/Hawa-Mahal-Rajasthan-Feature.jpg"
            alt="Rajasthan Hero"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-transparent" />
        </div>

        {/* Content */}
        <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 text-white">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-3xl"
          >
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2, duration: 0.8 }}
              className="inline-block px-4 py-2 bg-orange-500/20 backdrop-blur-sm border border-orange-500/30 rounded-full mb-6"
            >
              <span className="text-orange-300">✨ Discover Incredible India</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.8 }}
              className="text-5xl md:text-7xl font-bold mb-6 leading-tight"
            >
              Experience the Magic of
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-pink-600">
                Timeless India
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.8 }}
              className="text-xl text-gray-200 mb-8"
            >
              Embark on unforgettable journeys through ancient palaces, serene
              backwaters, majestic mountains, and vibrant cultures. Your dream
              Indian adventure awaits.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.8 }}
              className="flex flex-wrap gap-4"
            >
              <Link
                to="/tours"
                className="px-8 py-4 bg-gradient-to-r from-orange-500 to-pink-600 rounded-full text-lg hover:shadow-2xl hover:scale-105 transition-all"
              >
                Explore Tours
              </Link>
              <Link
                to="/contact"
                className="px-8 py-4 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full text-lg hover:bg-white/20 transition-all"
              >
                Plan Your Trip
              </Link>
            </motion.div>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ repeat: Infinity, duration: 2 }}
            className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center pt-2"
          >
            <div className="w-1 h-2 bg-white rounded-full" />
          </motion.div>
        </motion.div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gradient-to-b from-white to-orange-50/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 }}
                className="text-center p-8 bg-white rounded-2xl shadow-sm hover:shadow-xl transition-shadow"
              >
                <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-pink-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <feature.icon className="text-white" size={32} />
                </div>
                <h3 className="text-xl font-semibold mb-2 text-gray-900">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Tours */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Popular Tour Packages
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Handpicked destinations and experiences that showcase the best of India
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {loading ? (
              <div className="col-span-full text-center py-10 text-gray-500 flex flex-col items-center justify-center space-y-4">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500"></div>
                <p className="text-lg font-medium text-gray-700">Loading featured tours...</p>
                <p className="text-sm text-gray-400 max-w-md mx-auto">Please allow up to 50 seconds for the backend server to wake up from its free-tier sleep.</p>
              </div>
            ) : tours.map((tour, index) => (
              <motion.div
                key={tour._id || index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-300"
              >
                <div className="relative h-64 overflow-hidden">
                  <ImageWithFallback
                    src={tour.image?.startsWith('http') ? tour.image : `/${tour.image}`}
                    alt={tour.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute top-4 right-4 px-3 py-1.5 bg-white rounded-full text-sm font-semibold text-gray-900">
                    ${tour.price}
                  </div>
                </div>
                <div className="p-6">
                  <div className="flex items-center gap-2 text-sm text-gray-600 mb-2">
                    <MapPin size={16} className="text-orange-500" />
                    <span>{tour.location}</span>
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    {tour.title}
                  </h3>
                  <div className="flex items-center gap-4 text-sm text-gray-600 mb-4">
                    <div className="flex items-center gap-1">
                      <Calendar size={16} />
                      <span>{tour.duration}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Star size={16} className="fill-orange-500 text-orange-500" />
                      <span>{tour.rating} ({tour.reviews})</span>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-2 mb-4">
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
                    className="block w-full py-3 text-center bg-gradient-to-r from-orange-500 to-pink-600 text-white rounded-xl hover:shadow-lg transition-all cursor-pointer disabled:opacity-70 disabled:cursor-not-allowed"
                  >
                    {bookingLoading === tour._id ? "Booking..." : "Quick Book"}
                  </button>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mt-12"
          >
            <Link
              to="/tours"
              className="inline-block px-8 py-4 border-2 border-orange-500 text-orange-500 rounded-full hover:bg-orange-500 hover:text-white transition-all"
            >
              View All Tours
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-gradient-to-r from-orange-500 to-pink-600 text-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { value: 15000, suffix: "+", label: "Happy Travelers" },
              { value: 50, suffix: "+", label: "Tour Packages" },
              { value: 25, suffix: "+", label: "Destinations" },
              { value: 4.9, decimals: 1, suffix: "", label: "Average Rating" },
            ].map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.5 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="text-center"
              >
                <div className="text-4xl md:text-5xl font-bold mb-2">
                  <Counter value={stat.value} decimals={stat.decimals} />
                  {stat.suffix}
                </div>
                <div className="text-orange-100">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Photo Gallery Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Explore Our Gallery
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Capturing the magic and beauty of Rajasthan in every frame
            </p>
          </motion.div>

          <div className="columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6">
            {[
              { src: "Hawa.png", title: "Hawa Mahal Tour Experience" },
              { src: "Taj.png", title: "Taj Mahal Golden Triangle Tour" },
              { src: "Taj2.png", title: "Memorable Agra Moments" },
              { src: "Rampuria-Haveli-Bikaner.jpg", title: "Bikaner Heritage Walk" },
              { src: "Kumbhalgarh-Fort-Udaipur.jpg", title: "Udaipur Fort Adventure" },
            ].map((imgInfo, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="overflow-hidden rounded-2xl shadow-sm hover:shadow-xl transition-shadow group break-inside-avoid relative cursor-pointer"
              >
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10 flex flex-col justify-end p-6">
                  <h3 className="text-white font-semibold text-lg translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                    {imgInfo.title}
                  </h3>
                </div>
                <ImageWithFallback
                  src={`/assets/images/${imgInfo.src}`}
                  alt={imgInfo.title}
                  className="w-full h-auto object-cover group-hover:scale-110 transition-transform duration-700"
                />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              What Our Travelers Say
            </h2>
            <p className="text-xl text-gray-600">
              Real experiences from real people
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-gradient-to-br from-orange-50 to-pink-50 rounded-2xl p-8"
              >
                <div className="flex gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} size={20} className="fill-orange-500 text-orange-500" />
                  ))}
                </div>
                <p className="text-gray-700 mb-6 italic">"{testimonial.comment}"</p>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-pink-600 rounded-full flex items-center justify-center text-white font-semibold">
                    {testimonial.avatar}
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900">{testimonial.name}</div>
                    <div className="text-sm text-gray-600">{testimonial.location}</div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <ImageWithFallback
            src="/assets/images/Hawa-Mahal-Rajasthan-Feature.jpg"
            alt="Rajasthan Feature"
            className="w-full h-full object-cover"
          />
        </div>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="container mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Ready to Start Your Indian Adventure?
          </h2>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Let us create a personalized itinerary that matches your dreams and
            exceeds your expectations.
          </p>
          <Link
            to="/contact"
            className="inline-block px-8 py-4 bg-gradient-to-r from-orange-500 to-pink-600 rounded-full text-lg hover:shadow-2xl hover:scale-105 transition-all"
          >
            Plan Your Journey
          </Link>
        </motion.div>
      </section>
    </div>
  );
}
