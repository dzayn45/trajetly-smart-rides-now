
import { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { MenuIcon, XIcon, Car, User, UserCog, LogOut } from 'lucide-react';

const Header = () => {
  const { isAuthenticated, userRole, user, logout } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="bg-white shadow-sm">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <Link to="/" className="flex items-center space-x-2">
          <Car className="h-8 w-8 text-trajetly-500" />
          <span className="text-2xl font-bold text-trajetly-600">Trajetly</span>
        </Link>

        {/* Desktop Menu */}
        <nav className="hidden md:flex items-center space-x-6">
          {isAuthenticated ? (
            <>
              <div className="flex items-center space-x-4">
                {userRole === 'driver' && (
                  <>
                    <Link to="/driver/trips" className="text-gray-700 hover:text-trajetly-600">
                      Mes trajets
                    </Link>
                    <Link to="/driver/vehicles" className="text-gray-700 hover:text-trajetly-600">
                      Mes véhicules
                    </Link>
                  </>
                )}
                
                {userRole === 'passenger' && (
                  <>
                    <Link to="/search" className="text-gray-700 hover:text-trajetly-600">
                      Rechercher
                    </Link>
                    <Link to="/passenger/reservations" className="text-gray-700 hover:text-trajetly-600">
                      Mes réservations
                    </Link>
                  </>
                )}
                
                {userRole === 'admin' && (
                  <>
                    <Link to="/admin/users" className="text-gray-700 hover:text-trajetly-600">
                      Utilisateurs
                    </Link>
                    <Link to="/admin/trips" className="text-gray-700 hover:text-trajetly-600">
                      Trajets
                    </Link>
                  </>
                )}
              </div>
              
              <div className="flex items-center space-x-3">
                <Link to="/profile" className="flex items-center space-x-2">
                  {user?.avatar ? (
                    <img src={user.avatar} alt={user.name} className="w-8 h-8 rounded-full" />
                  ) : (
                    <User className="w-8 h-8 p-1 rounded-full bg-trajetly-100 text-trajetly-600" />
                  )}
                  <span className="text-gray-700">{user?.name}</span>
                </Link>
                <Button variant="ghost" onClick={logout} className="text-gray-500" size="icon">
                  <LogOut className="h-5 w-5" />
                </Button>
              </div>
            </>
          ) : (
            <div className="flex items-center space-x-4">
              <Link to="/" className="text-gray-700 hover:text-trajetly-600">
                Accueil
              </Link>
              <Link to="/about" className="text-gray-700 hover:text-trajetly-600">
                À propos
              </Link>
              <Link to="/contact" className="text-gray-700 hover:text-trajetly-600">
                Contact
              </Link>
            </div>
          )}
        </nav>

        {/* Mobile Menu Button */}
        <Button 
          variant="ghost" 
          className="md:hidden" 
          onClick={toggleMenu}
          size="icon"
        >
          {isMenuOpen ? (
            <XIcon className="h-6 w-6 text-gray-700" />
          ) : (
            <MenuIcon className="h-6 w-6 text-gray-700" />
          )}
        </Button>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white shadow-md">
          <div className="container mx-auto px-4 py-3 flex flex-col space-y-3">
            {isAuthenticated ? (
              <>
                <div className="flex items-center space-x-2 py-2 border-b">
                  {user?.avatar ? (
                    <img src={user.avatar} alt={user.name} className="w-8 h-8 rounded-full" />
                  ) : (
                    <User className="w-8 h-8 p-1 rounded-full bg-trajetly-100 text-trajetly-600" />
                  )}
                  <span className="text-gray-700">{user?.name}</span>
                </div>
                
                {userRole === 'driver' && (
                  <>
                    <Link to="/driver/trips" className="text-gray-700 py-2 border-b">
                      Mes trajets
                    </Link>
                    <Link to="/driver/vehicles" className="text-gray-700 py-2 border-b">
                      Mes véhicules
                    </Link>
                  </>
                )}
                
                {userRole === 'passenger' && (
                  <>
                    <Link to="/search" className="text-gray-700 py-2 border-b">
                      Rechercher
                    </Link>
                    <Link to="/passenger/reservations" className="text-gray-700 py-2 border-b">
                      Mes réservations
                    </Link>
                  </>
                )}
                
                {userRole === 'admin' && (
                  <>
                    <Link to="/admin/users" className="text-gray-700 py-2 border-b">
                      Utilisateurs
                    </Link>
                    <Link to="/admin/trips" className="text-gray-700 py-2 border-b">
                      Trajets
                    </Link>
                  </>
                )}
                
                <Link to="/profile" className="text-gray-700 py-2 border-b flex items-center">
                  <User className="h-5 w-5 mr-2" />
                  Mon profil
                </Link>
                
                <Button 
                  variant="ghost" 
                  onClick={logout} 
                  className="text-gray-700 py-2 justify-start"
                >
                  <LogOut className="h-5 w-5 mr-2" />
                  Se déconnecter
                </Button>
              </>
            ) : (
              <>
                <Link to="/" className="text-gray-700 py-2 border-b">
                  Accueil
                </Link>
                <Link to="/about" className="text-gray-700 py-2 border-b">
                  À propos
                </Link>
                <Link to="/contact" className="text-gray-700 py-2">
                  Contact
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
