import { Link } from 'react-router-dom';
import logo from '../assets/logo.png'
const Footer = () => {
  return (
    <footer className="bg-gradient-to-r from-gray-600 to-gray-900 text-gray-300 py-6 mt-10 shadow-md border-t-2 border-gray-300">
      <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-3 gap-8 text-center md:text-left">

        {/* About Us */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-3">About Us</h3>
          <div className='grid grid-cols-3'>
            <img className='w-25 m-0 p-0' src={logo} alt="" />
            <p className="text-sm leading-relaxed m-0 p-0 col-span-2">
              We are dedicated to providing the best user and article management system.
            </p>
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-3">Quick Links</h3>
          <ul className="space-y-2">
            <li><Link to="/" className="hover:text-teal-400 transition">Home</Link></li>
            <li><Link to="/articles" className="hover:text-teal-400 transition">Shop</Link></li>
            <li><Link to="/comments" className="hover:text-teal-400 transition">Comments</Link></li>
          </ul>
        </div>

        {/* Contact Info */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-3">Contact Info</h3>
          <p className="text-sm">Email: info@example.com</p>
          <p className="text-sm">Phone: (123) 456-7890</p>
        </div>

      </div>

      {/* Footer Bottom */}
      <div className="text-center text-sm border-t border-gray-500 mt-6 pt-4">
        <p>&copy; {new Date().getFullYear()} SmartSphere. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
