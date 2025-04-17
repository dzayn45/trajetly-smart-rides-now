
import { Link } from 'react-router-dom';
import { Bed, Mail, Phone, MapPin, Facebook, Twitter, Instagram } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gray-100 mt-auto">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <Bed className="h-6 w-6 text-blue-500" />
              <span className="text-xl font-bold text-blue-600">SkyView Hotel</span>
            </div>
            <p className="text-gray-600 mb-4">
              Luxury accommodations with stunning views and exceptional service. Experience the perfect stay at SkyView Hotel.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-500 hover:text-blue-500">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-500 hover:text-blue-500">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-500 hover:text-blue-500">
                <Instagram className="h-5 w-5" />
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4 text-gray-800">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-gray-600 hover:text-blue-500">Home</Link>
              </li>
              <li>
                <Link to="/search" className="text-gray-600 hover:text-blue-500">Rooms & Suites</Link>
              </li>
              <li>
                <Link to="/search" className="text-gray-600 hover:text-blue-500">Special Offers</Link>
              </li>
              <li>
                <Link to="/about" className="text-gray-600 hover:text-blue-500">About Us</Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4 text-gray-800">Hotel Services</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/restaurant" className="text-gray-600 hover:text-blue-500">Restaurant & Bar</Link>
              </li>
              <li>
                <Link to="/spa" className="text-gray-600 hover:text-blue-500">Spa & Wellness</Link>
              </li>
              <li>
                <Link to="/events" className="text-gray-600 hover:text-blue-500">Meetings & Events</Link>
              </li>
              <li>
                <Link to="/policies" className="text-gray-600 hover:text-blue-500">Policies</Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4 text-gray-800">Contact</h3>
            <ul className="space-y-3">
              <li className="flex items-start space-x-3">
                <MapPin className="h-5 w-5 text-blue-500 mt-0.5" />
                <span className="text-gray-600">123 Oceanview Boulevard<br />Miami, FL 33139, USA</span>
              </li>
              <li className="flex items-center space-x-3">
                <Phone className="h-5 w-5 text-blue-500" />
                <span className="text-gray-600">+1 (305) 555-1234</span>
              </li>
              <li className="flex items-center space-x-3">
                <Mail className="h-5 w-5 text-blue-500" />
                <span className="text-gray-600">reservations@skyviewhotel.com</span>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-200 mt-8 pt-6 text-center">
          <p className="text-gray-500">© {new Date().getFullYear()} SkyView Hotel. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
