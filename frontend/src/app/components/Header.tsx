import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router";
import { Menu, X } from "lucide-react";
import { motion } from "motion/react";

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const isLightPage = ['/login', '/register', '/profile', '/tours'].includes(location.pathname);
  const shouldBeSolid = isScrolled || isLightPage;

  const navItems = [
    { label: "Home", path: "/" },
    { label: "Tours", path: "/tours" },
    { label: "About", path: "/about" },
    { label: "Contact", path: "/contact" },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${shouldBeSolid
        ? "bg-white/95 backdrop-blur-md shadow-sm"
        : "bg-transparent"
        }`}
    >
      <nav className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <img
              src="/new-logo.png"
              alt="Bhinchar India Tours Logo"
              className="w-10 h-10 object-contain rounded-lg shadow-sm"
            />
            <span
              className={`text-xl font-semibold transition-colors ${shouldBeSolid ? "text-gray-900" : "text-white"
                }`}
            >
              Bhinchar India Tours
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`transition-colors relative font-medium ${location.pathname === item.path
                    ? (shouldBeSolid ? "text-orange-600" : "text-white")
                    : (shouldBeSolid ? "text-gray-900 hover:text-orange-500" : "text-white/80 hover:text-white")
                  }`}
              >
                {item.label}
                {location.pathname === item.path && (
                  <motion.div
                    layoutId="activeNav"
                    className={`absolute -bottom-1 left-0 right-0 h-0.5 ${shouldBeSolid ? 'bg-orange-500' : 'bg-white'}`}
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
              </Link>
            ))}
            <Link
              to="/contact"
              className="px-6 py-2.5 bg-gradient-to-r from-orange-500 to-pink-600 text-white rounded-full hover:shadow-lg hover:scale-105 transition-all"
            >
              Book Now
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className={`md:hidden ${shouldBeSolid ? "text-gray-900" : "text-white"
              }`}
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="md:hidden py-4 bg-white rounded-lg shadow-lg mt-2"
          >
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => setIsMobileMenuOpen(false)}
                className={`block px-4 py-3 hover:bg-orange-50 transition-colors ${location.pathname === item.path
                  ? "text-orange-500 bg-orange-50"
                  : "text-gray-900"
                  }`}
              >
                {item.label}
              </Link>
            ))}
            <Link
              to="/contact"
              onClick={() => setIsMobileMenuOpen(false)}
              className="block mx-4 mt-2 px-6 py-2.5 bg-gradient-to-r from-orange-500 to-pink-600 text-white rounded-full text-center hover:shadow-lg transition-all"
            >
              Book Now
            </Link>
          </motion.div>
        )}
      </nav>
    </header>
  );
}
