import { Link } from "react-router-dom";
import logo from "../assets/logo.png";

const Footer = () => {
  return (
    <footer className="bg-gradient-to-r from-gray-700 to-gray-900 text-gray-300 py-8 border-t border-gray-500">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 text-center md:text-left">
        
        {/* Logo */}
        <div className="flex flex-col items-center md:items-start">
          <img className="w-32 mb-2" src={logo} alt="Logo" />
          <p className="text-sm text-gray-400">&copy; {new Date().getFullYear()} SmartSphere.</p>
        </div>

        {/* About Us */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-3">About Us</h3>
          <p className="text-sm text-gray-400 leading-relaxed text-justify">
            We are dedicated to providing the best user and article management system.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-3">Quick Links</h3>
          <ul className="space-y-2">
            <li><Link to="/" className="hover:text-teal-400 transition">Home</Link></li>
            <li><Link to="/articles" className="hover:text-teal-400 transition">Shop</Link></li>
            <li><Link to="/comments" className="hover:text-teal-400 transition">Comments</Link></li>
            <li><Link to="/cart" className="hover:text-teal-400 transition">My Cart</Link></li>
          </ul>
        </div>

        {/* Contact Info */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-3">Contact Info</h3>
          <p className="text-sm text-gray-400">📧 info@example.com</p>
          <p className="text-sm text-gray-400">📞 (123) 456-7890</p>
        </div>

      </div>

      {/* Footer Bottom */}
      <div className="text-center text-sm text-gray-400 border-t border-gray-600 mt-6 pt-4">
        <p>All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
