
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { useTrip } from '@/context/TripContext'; 
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import RoleSelector from '@/components/RoleSelector';
import TripSearch from '@/components/TripSearch';
import TripCard from '@/components/TripCard';
import { UserRole } from '@/types';
import { motion } from 'framer-motion';
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
import { BackgroundPaths } from '@/components/ui/background-paths';

const FeatureCard = ({ icon: Icon, title, items }: { icon: any; title: string; items: string[] }) => (
  <motion.div 
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.6 }}
    viewport={{ once: true }}
    className="bg-white dark:bg-neutral-900 p-8 rounded-2xl shadow-sm border border-neutral-200 dark:border-neutral-800"
  >
    <div className="inline-flex items-center justify-center h-16 w-16 rounded-full bg-neutral-100 dark:bg-neutral-800 text-neutral-900 dark:text-white mb-6">
      <Icon className="h-8 w-8" />
    </div>
    <h3 className="text-xl font-semibold mb-4">{title}</h3>
    <ul className="space-y-3">
      {items.map((item, index) => (
        <li key={index} className="flex items-start">
          <div className="min-w-2 h-2 rounded-full bg-neutral-900 dark:bg-white mt-2 mr-2"></div>
          <span className="text-neutral-700 dark:text-neutral-300">{item}</span>
        </li>
      ))}
    </ul>
  </motion.div>
);

const PopularTripCard = ({ trip }: { trip: any }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5 }}
    viewport={{ once: true }}
    className="w-full"
  >
    <TripCard trip={trip} />
  </motion.div>
);

const Index = () => {
  const { isAuthenticated, userRole } = useAuth();
  const { trips } = useTrip();
  const navigate = useNavigate();
  const [showRoleSelector, setShowRoleSelector] = useState(false);

  // Get featured trips (just taking a few trips for display)
  const featuredTrips = trips.slice(0, 3);

  useEffect(() => {
    if (isAuthenticated) {
      if (userRole === 'driver') {
        navigate('/driver/dashboard');
      } else if (userRole === 'passenger') {
        navigate('/passenger/dashboard');
      } else if (userRole === 'admin') {
        navigate('/admin/dashboard');
      }
    }
  }, [isAuthenticated, userRole, navigate]);

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
    <div className="flex flex-col min-h-screen bg-white dark:bg-neutral-950">
      <Header />
      
      <main className="flex-grow">
        {/* Hero Section with BackgroundPaths */}
        {!showRoleSelector ? (
          <BackgroundPaths 
            title="Trajetly Covoiturage" 
            subtitle="Que vous soyez conducteur ou passager, Trajetly vous connecte au trajet dont vous avez besoin — rapide, sûr et adapté à vos préférences."
            buttonText="Commencer maintenant"
            buttonLink="#get-started"
          />
        ) : (
          <div className="relative min-h-screen w-full flex items-center justify-center overflow-hidden bg-white dark:bg-neutral-950">
            <div className="absolute inset-0">
              <div className="absolute inset-0 bg-gradient-to-b from-neutral-100 to-white dark:from-neutral-900 dark:to-neutral-950"></div>
            </div>
            <div className="relative z-10 container mx-auto px-4 md:px-6 py-20">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1 }}
                className="max-w-3xl mx-auto text-center"
              >
                <h2 className="text-3xl font-bold mb-8 text-neutral-900 dark:text-white">Choisissez votre rôle</h2>
                <RoleSelector onRoleSelect={handleRoleSelect} />
              </motion.div>
            </div>
          </div>
        )}
        
        {/* Get Started Section */}
        {!showRoleSelector && (
          <section id="get-started" className="py-20 bg-neutral-50 dark:bg-neutral-900">
            <div className="container mx-auto px-4">
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
                className="text-center mb-16"
              >
                <h2 className="text-3xl md:text-4xl font-bold mb-6 text-neutral-900 dark:text-white">Prêt à Commencer?</h2>
                <p className="text-lg md:text-xl text-neutral-700 dark:text-neutral-300 max-w-3xl mx-auto mb-8">
                  Rejoignez notre communauté de covoiturage et transformez vos déplacements
                </p>
                <button
                  onClick={handleGetStarted}
                  className="inline-block relative bg-gradient-to-b from-black/10 to-white/10 
                  dark:from-white/10 dark:to-black/10 p-px rounded-2xl backdrop-blur-lg 
                  overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300"
                >
                  <span className="inline-block rounded-[1.15rem] px-8 py-4 text-lg font-semibold backdrop-blur-md 
                  bg-neutral-900 hover:bg-black dark:bg-white dark:hover:bg-gray-100 
                  text-white dark:text-neutral-900 transition-all duration-300 
                  hover:-translate-y-0.5 border border-black/10 dark:border-white/10
                  hover:shadow-md">
                    Commencer maintenant
                  </span>
                </button>
              </motion.div>
            </div>
          </section>
        )}
        
        {/* Featured Trip Offers Section */}
        {!showRoleSelector && (
          <section className="py-20 bg-white dark:bg-neutral-950">
            <div className="container mx-auto px-4">
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
                className="text-center mb-12"
              >
                <div className="inline-flex items-center justify-center h-16 w-16 rounded-full bg-neutral-100 dark:bg-neutral-800 text-neutral-900 dark:text-white mb-4">
                  <Ticket className="h-8 w-8" />
                </div>
                <h2 className="text-3xl md:text-4xl font-bold mb-6 text-neutral-900 dark:text-white">Trajets Populaires</h2>
                <p className="text-lg text-neutral-700 dark:text-neutral-300 max-w-2xl mx-auto">
                  Découvrez nos trajets les plus populaires. Réservez rapidement votre place et partez à l'aventure en toute simplicité.
                </p>
              </motion.div>
              
              {featuredTrips.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  {featuredTrips.map(trip => (
                    <PopularTripCard key={trip.id} trip={trip} />
                  ))}
                </div>
              ) : (
                <div className="text-center">
                  <p className="text-neutral-600 dark:text-neutral-400">Aucun trajet disponible pour le moment.</p>
                </div>
              )}
              
              <div className="text-center mt-12">
                <Button 
                  variant="outline" 
                  onClick={() => navigate('/search')}
                  className="rounded-xl border-neutral-200 dark:border-neutral-800 hover:bg-neutral-100 dark:hover:bg-neutral-800"
                >
                  Voir tous les trajets disponibles
                </Button>
              </div>
            </div>
          </section>
        )}
        
        {/* Features Section */}
        {!showRoleSelector && (
          <section className="py-20 bg-neutral-50 dark:bg-neutral-900">
            <div className="container mx-auto px-4">
              <motion.h2 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
                className="text-3xl md:text-4xl font-bold text-center mb-12 text-neutral-900 dark:text-white"
              >
                Comment ça marche
              </motion.h2>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <FeatureCard 
                  icon={Car} 
                  title="Pour les conducteurs"
                  items={[
                    "Créez et gérez vos propres trajets",
                    "Ajoutez les détails de votre véhicule",
                    "Acceptez et gérez les réservations",
                    "Connectez-vous en toute sécurité à tout moment"
                  ]}
                />
                
                <FeatureCard 
                  icon={Search} 
                  title="Pour les passagers"
                  items={[
                    "Recherchez et filtrez les trajets",
                    "Réservez ou annulez facilement",
                    "Évaluez votre expérience",
                    "Suivez l'état de vos réservations en temps réel"
                  ]}
                />
                
                <FeatureCard 
                  icon={Shield} 
                  title="Administration"
                  items={[
                    "Gérez tous les utilisateurs",
                    "Signalez les comportements inappropriés",
                    "Bloquez les utilisateurs malveillants",
                    "Gardez la plateforme sûre pour tous"
                  ]}
                />
              </div>
            </div>
          </section>
        )}
            
        {/* Search Section */}
        {!showRoleSelector && (
          <section className="py-20 bg-white dark:bg-neutral-950">
            <div className="container mx-auto px-4">
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
                className="text-center mb-12"
              >
                <h2 className="text-3xl md:text-4xl font-bold mb-4 text-neutral-900 dark:text-white">Rechercher un trajet</h2>
                <p className="text-lg text-neutral-700 dark:text-neutral-300 mb-8 max-w-2xl mx-auto">
                  Trouvez le trajet parfait avec notre moteur de recherche avancé. Filtrez par ville, date, préférences et budget.
                </p>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                viewport={{ once: true }}
              >
                <TripSearch />
              </motion.div>
            </div>
          </section>
        )}
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
