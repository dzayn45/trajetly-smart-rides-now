
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
import { Car, Search, Shield, Ticket, ArrowRight, CheckCircle } from 'lucide-react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

const Index = () => {
  const {
    isAuthenticated,
    userRole
  } = useAuth();
  const {
    trips
  } = useTrip();
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
  
  return <div className="flex flex-col min-h-screen">
      <Header />
      
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="relative overflow-hidden bg-gradient-to-br from-trajetly-700 via-trajetly-600 to-trajetly-500 text-white">
          {/* Background pattern */}
          <div className="absolute inset-0 opacity-10">
            <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
              <defs>
                <pattern id="grid" width="8" height="8" patternUnits="userSpaceOnUse">
                  <path d="M 8 0 L 0 0 0 8" fill="none" stroke="white" strokeWidth="0.5" />
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#grid)" />
            </svg>
          </div>
          
          {/* Curved shape */}
          <div className="absolute bottom-0 left-0 right-0">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320" className="w-full h-24 sm:h-32 md:h-40">
              <path 
                fill="#ffffff" 
                fillOpacity="1" 
                d="M0,224L48,208C96,192,192,160,288,154.7C384,149,480,171,576,186.7C672,203,768,213,864,202.7C960,192,1056,160,1152,144C1248,128,1344,128,1392,128L1440,128L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z">
              </path>
            </svg>
          </div>
          
          <div className="container mx-auto px-4 pt-20 pb-32 md:pt-32 md:pb-40 relative z-10">
            <div className="max-w-3xl mx-auto text-center">
              <div className="inline-flex items-center justify-center mb-6 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-sm border border-white/20">
                <span className="text-sm font-medium">Trajetly — Le covoiturage facile</span>
              </div>
              
              <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight animate-fade-in">
                Covoiturage Intelligent,
                <span className="relative inline-block ml-3">
                  <span className="relative z-10">À Votre Façon</span>
                  <span className="absolute bottom-1 left-0 w-full h-3 bg-trajetly-400/40 rounded-sm -z-0"></span>
                </span>
              </h1>
              
              <p className="text-xl md:text-2xl mb-8 text-white/90 max-w-2xl mx-auto leading-relaxed">
                Que vous soyez conducteur ou passager, Trajetly vous connecte au trajet dont vous avez besoin — rapide, sûr et adapté à vos préférences.
              </p>
              
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-10">
                {!isAuthenticated && (showRoleSelector ? (
                  <div className="bg-white/10 backdrop-blur-md p-8 rounded-xl border border-white/20 w-full max-w-md">
                    <h2 className="text-2xl font-semibold mb-6">Choisissez votre rôle</h2>
                    <RoleSelector onRoleSelect={handleRoleSelect} />
                  </div>
                ) : (
                  <Button 
                    onClick={handleGetStarted}
                    className="bg-white text-trajetly-600 hover:bg-gray-100 font-semibold px-8 py-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 text-lg group"
                  >
                    Commencer maintenant
                    <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
                  </Button>
                ))}
                
                {isAuthenticated && (
                  <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                    <Button 
                      onClick={() => navigate(`/${userRole}/dashboard`)} 
                      className="bg-white text-trajetly-600 hover:bg-gray-100 font-semibold px-8 py-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 text-lg"
                    >
                      Aller à mon tableau de bord
                    </Button>
                    
                    {userRole === 'passenger' && (
                      <Button 
                        onClick={() => navigate('/search')} 
                        variant="outline" 
                        className="border-2 border-white text-white hover:bg-white/10 px-8 py-6 rounded-xl text-lg"
                      >
                        Rechercher un trajet
                      </Button>
                    )}
                    
                    {userRole === 'driver' && (
                      <Button 
                        onClick={() => navigate('/create-trip')} 
                        variant="outline" 
                        className="border-2 border-white text-white hover:bg-white/10 px-8 py-6 rounded-xl text-lg"
                      >
                        Créer un trajet
                      </Button>
                    )}
                  </div>
                )}
              </div>
              
              {/* Benefits */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-16">
                {[
                  { icon: <Car className="h-5 w-5" />, text: "Trajets sur mesure" },
                  { icon: <CheckCircle className="h-5 w-5" />, text: "Simple et sécurisé" },
                  { icon: <Shield className="h-5 w-5" />, text: "Économique et écologique" }
                ].map((item, i) => (
                  <div 
                    key={i} 
                    className="flex items-center justify-center space-x-2 text-white/90 px-4 py-2 rounded-lg bg-white/5 backdrop-blur-sm"
                  >
                    {item.icon}
                    <span>{item.text}</span>
                  </div>
                ))}
              </div>
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
                {featuredTrips.map(trip => <TripCard key={trip.id} trip={trip} />)}
              </div>
            ) : (
              <div className="text-center">
                <p className="text-gray-600">Aucun trajet disponible pour le moment.</p>
              </div>
            )}
            
            <div className="text-center mt-8">
              <Button variant="outline" className="mt-4" onClick={() => navigate('/search')}>
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
              <div className="bg-white p-8 rounded-lg shadow-md text-center transform transition-transform hover:translate-y-[-5px] duration-300">
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
              
              <div className="bg-white p-8 rounded-lg shadow-md text-center transform transition-transform hover:translate-y-[-5px] duration-300">
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
              
              <div className="bg-white p-8 rounded-lg shadow-md text-center transform transition-transform hover:translate-y-[-5px] duration-300">
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
    </div>;
};
export default Index;
