import { Link } from "react-router";
import { Facebook, Instagram, Youtube, Mail, Phone, MapPin } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <img
                src="/new-logo.png"
                alt="Bhinchar India Tours Logo"
                className="w-10 h-10 object-contain rounded-lg shadow-sm bg-white/10"
              />
              <span className="text-white font-semibold">Bhinchar India Tours</span>
            </div>
            <p className="text-sm mb-4">
              Discover the incredible beauty and rich culture of India with our
              expertly curated tour packages.
            </p>
            <div className="flex gap-4">
              <a
                href="https://www.facebook.com/share/1798vjfC5e/"
                target="_blank" rel="noopener noreferrer"
                className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-orange-500 transition-colors"
              >
                <Facebook size={18} />
              </a>
              <a
                href="https://www.instagram.com/bhincher_india_tours/"
                target="_blank" rel="noopener noreferrer"
                className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-orange-500 transition-colors"
              >
                <Instagram size={18} />
              </a>
              <a
                href="https://www.youtube.com/@bhincherindiatoursindia4404"
                target="_blank" rel="noopener noreferrer"
                className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-orange-500 transition-colors"
              >
                <Youtube size={18} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="hover:text-orange-500 transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/tours" className="hover:text-orange-500 transition-colors">
                  Tours
                </Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-orange-500 transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-orange-500 transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Popular Tours */}
          <div>
            <h3 className="text-white font-semibold mb-4">Popular Tours</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="hover:text-orange-500 transition-colors">
                  Golden Triangle Tour
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-orange-500 transition-colors">
                  Udaipur Palace & Lakes
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-orange-500 transition-colors">
                  Rajasthan Heritage
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-orange-500 transition-colors">
                  Jaisalmer Desert Safari
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-white font-semibold mb-4">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <MapPin size={18} className="mt-1 flex-shrink-0 text-orange-500" />
                <span className="text-sm">
                  Jaipur, Rajasthan, India
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone size={18} className="flex-shrink-0 text-orange-500" />
                <a href="tel:+918854948324" className="text-sm hover:text-orange-500 transition-colors">+91 8854948324</a>
              </li>
              <li className="flex items-center gap-3">
                <Mail size={18} className="flex-shrink-0 text-orange-500" />
                <a href="mailto:BhincharIndiaTours@gmail.com" className="text-sm hover:text-orange-500 transition-colors">BhincharIndiaTours@gmail.com</a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-sm">
          <p>© 2026 Bhinchar India Tours. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
