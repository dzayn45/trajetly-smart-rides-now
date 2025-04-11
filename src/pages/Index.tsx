
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { useTrip } from '@/context/TripContext'; 
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import RoleSelector from '@/components/RoleSelector';
import TripSearch from '@/components/TripSearch';
import TripCard from '@/components/TripCard';
import { UserRole } from '@/types';
import { Car, Search, Shield, Ticket } from 'lucide-react';
import { 
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';

const Index = () => {
  const { isAuthenticated, userRole } = useAuth();
  const { trips } = useTrip();
  const navigate = useNavigate();
  const [showRoleSelector, setShowRoleSelector] = useState(false);

  // Get featured trips (just taking a few trips for display)
  const featuredTrips = trips.slice(0, 3);

  // Removed auto-redirect for authenticated users
  // The home page is now always accessible

  const handleRoleSelect = (role: UserRole) => {
    if (role === 'driver') {
      navigate('/driver/dashboard');
    } else if (role === 'passenger') {
      navigate('/passenger/dashboard');
    } else if (role === 'admin') {
      navigate('/admin/dashboard');
    }
  };

  const handleGetStarted = () => {
    setShowRoleSelector(true);
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="hero-gradient text-white">
          <div className="container mx-auto px-4 py-16 md:py-24">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-4xl md:text-5xl font-bold mb-6">
                Trajetly – Covoiturage Intelligent, À Votre Façon
              </h1>
              <p className="text-xl md:text-2xl mb-8">
                Que vous soyez conducteur ou passager, Trajetly vous connecte au trajet dont vous avez besoin — rapide, sûr et adapté à vos préférences.
              </p>
              
              {!isAuthenticated && (
                showRoleSelector ? (
                  <div>
                    <h2 className="text-2xl font-semibold mb-6">Choisissez votre rôle</h2>
                    <RoleSelector onRoleSelect={handleRoleSelect} />
                  </div>
                ) : (
                  <button
                    className="bg-white text-trajetly-600 font-semibold px-8 py-3 rounded-md shadow-lg hover:bg-gray-100 transition"
                    onClick={handleGetStarted}
                  >
                    Commencer maintenant
                  </button>
                )
              )}
              
              {isAuthenticated && (
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                  <Button 
                    onClick={() => navigate(`/${userRole}/dashboard`)}
                    className="bg-white text-trajetly-600 hover:bg-gray-100"
                  >
                    Aller à mon tableau de bord
                  </Button>
                  
                  {userRole === 'passenger' && (
                    <Button 
                      onClick={() => navigate('/search')}
                      variant="outline"
                      className="border-white text-white hover:bg-white/10"
                    >
                      Rechercher un trajet
                    </Button>
                  )}
                  
                  {userRole === 'driver' && (
                    <Button 
                      onClick={() => navigate('/create-trip')}
                      variant="outline"
                      className="border-white text-white hover:bg-white/10"
                    >
                      Créer un trajet
                    </Button>
                  )}
                </div>
              )}
            </div>
          </div>
        </section>
        
        {/* Featured Trip Offers Section */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <div className="inline-flex items-center justify-center h-16 w-16 rounded-full bg-trajetly-100 text-trajetly-600 mb-4">
                <Ticket className="h-8 w-8" />
              </div>
              <h2 className="text-3xl font-bold mb-4">Trajets Populaires</h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Découvrez nos trajets les plus populaires. Réservez rapidement votre place et partez à l'aventure en toute simplicité.
              </p>
            </div>
            
            {featuredTrips.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {featuredTrips.map(trip => (
                  <TripCard key={trip.id} trip={trip} />
                ))}
              </div>
            ) : (
              <div className="text-center">
                <p className="text-gray-600">Aucun trajet disponible pour le moment.</p>
              </div>
            )}
            
            <div className="text-center mt-8">
              <Button 
                variant="outline" 
                className="mt-4"
                onClick={() => navigate('/search')}
              >
                Voir tous les trajets disponibles
              </Button>
            </div>
          </div>
        </section>
        
        {/* Features Section */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">Comment ça marche</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-white p-8 rounded-lg shadow-md text-center">
                <div className="inline-flex items-center justify-center h-16 w-16 rounded-full bg-trajetly-100 text-trajetly-600 mb-6">
                  <Car className="h-8 w-8" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Pour les conducteurs</h3>
                <ul className="text-gray-600 space-y-2 text-left">
                  <li className="flex items-start">
                    <div className="min-w-2 h-2 rounded-full bg-trajetly-500 mt-2 mr-2"></div>
                    <span>Créez et gérez vos propres trajets</span>
                  </li>
                  <li className="flex items-start">
                    <div className="min-w-2 h-2 rounded-full bg-trajetly-500 mt-2 mr-2"></div>
                    <span>Ajoutez les détails de votre véhicule</span>
                  </li>
                  <li className="flex items-start">
                    <div className="min-w-2 h-2 rounded-full bg-trajetly-500 mt-2 mr-2"></div>
                    <span>Acceptez et gérez les réservations</span>
                  </li>
                  <li className="flex items-start">
                    <div className="min-w-2 h-2 rounded-full bg-trajetly-500 mt-2 mr-2"></div>
                    <span>Connectez-vous en toute sécurité à tout moment</span>
                  </li>
                </ul>
              </div>
              
              <div className="bg-white p-8 rounded-lg shadow-md text-center">
                <div className="inline-flex items-center justify-center h-16 w-16 rounded-full bg-trajetly-100 text-trajetly-600 mb-6">
                  <Search className="h-8 w-8" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Pour les passagers</h3>
                <ul className="text-gray-600 space-y-2 text-left">
                  <li className="flex items-start">
                    <div className="min-w-2 h-2 rounded-full bg-trajetly-500 mt-2 mr-2"></div>
                    <span>Recherchez et filtrez les trajets</span>
                  </li>
                  <li className="flex items-start">
                    <div className="min-w-2 h-2 rounded-full bg-trajetly-500 mt-2 mr-2"></div>
                    <span>Réservez ou annulez facilement</span>
                  </li>
                  <li className="flex items-start">
                    <div className="min-w-2 h-2 rounded-full bg-trajetly-500 mt-2 mr-2"></div>
                    <span>Évaluez votre expérience</span>
                  </li>
                  <li className="flex items-start">
                    <div className="min-w-2 h-2 rounded-full bg-trajetly-500 mt-2 mr-2"></div>
                    <span>Suivez l'état de vos réservations en temps réel</span>
                  </li>
                </ul>
              </div>
              
              <div className="bg-white p-8 rounded-lg shadow-md text-center">
                <div className="inline-flex items-center justify-center h-16 w-16 rounded-full bg-trajetly-100 text-trajetly-600 mb-6">
                  <Shield className="h-8 w-8" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Administration</h3>
                <ul className="text-gray-600 space-y-2 text-left">
                  <li className="flex items-start">
                    <div className="min-w-2 h-2 rounded-full bg-trajetly-500 mt-2 mr-2"></div>
                    <span>Gérez tous les utilisateurs</span>
                  </li>
                  <li className="flex items-start">
                    <div className="min-w-2 h-2 rounded-full bg-trajetly-500 mt-2 mr-2"></div>
                    <span>Signalez les comportements inappropriés</span>
                  </li>
                  <li className="flex items-start">
                    <div className="min-w-2 h-2 rounded-full bg-trajetly-500 mt-2 mr-2"></div>
                    <span>Bloquez les utilisateurs malveillants</span>
                  </li>
                  <li className="flex items-start">
                    <div className="min-w-2 h-2 rounded-full bg-trajetly-500 mt-2 mr-2"></div>
                    <span>Gardez la plateforme sûre pour tous</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>
            
        {/* Search Section */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-4">Rechercher un trajet</h2>
            <p className="text-gray-600 text-center mb-8 max-w-2xl mx-auto">
              Trouvez le trajet parfait avec notre moteur de recherche avancé. Filtrez par ville, date, préférences et budget.
            </p>
            
            <TripSearch />
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
