
import { Link } from 'react-router-dom';
import { Car, Mail, Phone, MapPin, Facebook, Twitter, Instagram } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gray-100 mt-auto">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <Car className="h-6 w-6 text-trajetly-500" />
              <span className="text-xl font-bold text-trajetly-600">Trajetly</span>
            </div>
            <p className="text-gray-600 mb-4">
              Covoiturage intelligent, adapté à vos besoins. Voyagez en toute simplicité avec Trajetly.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-500 hover:text-trajetly-500">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-500 hover:text-trajetly-500">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-500 hover:text-trajetly-500">
                <Instagram className="h-5 w-5" />
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4 text-gray-800">Liens rapides</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-gray-600 hover:text-trajetly-500">Accueil</Link>
              </li>
              <li>
                <Link to="/search" className="text-gray-600 hover:text-trajetly-500">Rechercher un trajet</Link>
              </li>
              <li>
                <Link to="/create-trip" className="text-gray-600 hover:text-trajetly-500">Proposer un trajet</Link>
              </li>
              <li>
                <Link to="/about" className="text-gray-600 hover:text-trajetly-500">À propos</Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4 text-gray-800">Support</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/faq" className="text-gray-600 hover:text-trajetly-500">FAQ</Link>
              </li>
              <li>
                <Link to="/contact" className="text-gray-600 hover:text-trajetly-500">Contact</Link>
              </li>
              <li>
                <Link to="/terms" className="text-gray-600 hover:text-trajetly-500">Conditions d'utilisation</Link>
              </li>
              <li>
                <Link to="/privacy" className="text-gray-600 hover:text-trajetly-500">Politique de confidentialité</Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4 text-gray-800">Contact</h3>
            <ul className="space-y-3">
              <li className="flex items-start space-x-3">
                <MapPin className="h-5 w-5 text-trajetly-500 mt-0.5" />
                <span className="text-gray-600">123 Rue du Covoiturage<br />75000 Paris, France</span>
              </li>
              <li className="flex items-center space-x-3">
                <Phone className="h-5 w-5 text-trajetly-500" />
                <span className="text-gray-600">+33 1 23 45 67 89</span>
              </li>
              <li className="flex items-center space-x-3">
                <Mail className="h-5 w-5 text-trajetly-500" />
                <span className="text-gray-600">contact@trajetly.com</span>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-200 mt-8 pt-6 text-center">
          <p className="text-gray-500">© {new Date().getFullYear()} Trajetly. Tous droits réservés.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
