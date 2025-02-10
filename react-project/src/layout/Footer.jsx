import { Link } from 'react-router-dom';
import '../styles/Footer.css';

const Footer = () => {
  return (
<footer className="bg-gradient-to-r from-gray-600 to-gray-800 text-white py-6 mt-10 shadow-lg border-t border-gray-400">
  <div className="max-w-6xl mx-auto px-4 grid md:grid-cols-3 gap-8 text-center md:text-left">
    
    {/* About Us */}
    <div>
      <h3 className="text-lg font-semibold mb-3">About Us</h3>
      <p className="text-sm leading-relaxed">
        We are dedicated to providing the best user and article management system.
      </p>
    </div>

    {/* Quick Links */}
    <div>
      <h3 className="text-lg font-semibold mb-3">Quick Links</h3>
      <ul className="space-y-2">
        <li><Link to="/" className="hover:text-gray-300">Home</Link></li>
        <li><Link to="/users" className="hover:text-gray-300">Users</Link></li>
        <li><Link to="/articles" className="hover:text-gray-300">Articles</Link></li>
        <li><Link to="/contact" className="hover:text-gray-300">Contact</Link></li>
      </ul>
    </div>

    {/* Contact Info */}
    <div>
      <h3 className="text-lg font-semibold mb-3">Contact Info</h3>
      <p className="text-sm">Email: info@example.com</p>
      <p className="text-sm">Phone: (123) 456-7890</p>
    </div>

  </div>

  {/* Footer Bottom */}
  <div className="text-center text-sm border-t border-gray-500 mt-6 pt-4">
    <p>&copy; 2023 Your Company Name. All rights reserved.</p>
  </div>
</footer>

  );
};  

export default Footer;
