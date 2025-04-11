
import { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useTrip } from '@/context/TripContext';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import TripCard from '@/components/TripCard';
import { Button } from '@/components/ui/button';
import { Link, useNavigate } from 'react-router-dom';
import { Plus, Settings, Car, User, Route } from 'lucide-react';

const DriverDashboard = () => {
  const { user } = useAuth();
  const { getDriverTrips, getVehiclesByOwnerId } = useTrip();
  const navigate = useNavigate();
  
  // Get driver's trips and vehicles
  const driverTrips = user ? getDriverTrips(user.id) : [];
  const driverVehicles = user ? getVehiclesByOwnerId(user.id) : [];
  
  // Active section state
  const [activeSection, setActiveSection] = useState<'trips' | 'reservations'>('trips');

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      
      <main className="flex-grow bg-gray-50">
        {/* Dashboard Header */}
        <div className="bg-trajetly-600 text-white py-8">
          <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between">
              <div>
                <h1 className="text-2xl font-bold">Tableau de bord conducteur</h1>
                <p className="text-trajetly-100">Bienvenue, {user?.name}</p>
              </div>
              
              <div className="mt-4 md:mt-0 flex space-x-2">
                <Button
                  onClick={() => navigate('/create-trip')}
                  className="bg-white text-trajetly-600 hover:bg-trajetly-50"
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Nouveau trajet
                </Button>
              </div>
            </div>
          </div>
        </div>
        
        {/* Dashboard Tabs */}
        <div className="border-b border-gray-200 bg-white">
          <div className="container mx-auto px-4">
            <nav className="flex space-x-8">
              <button
                className={`py-4 px-1 font-medium border-b-2 ${
                  activeSection === 'trips'
                    ? 'border-trajetly-500 text-trajetly-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}
                onClick={() => setActiveSection('trips')}
              >
                <Route className="h-5 w-5 inline mr-2" />
                Mes trajets
              </button>
              
              <button
                className={`py-4 px-1 font-medium border-b-2 ${
                  activeSection === 'reservations'
                    ? 'border-trajetly-500 text-trajetly-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}
                onClick={() => setActiveSection('reservations')}
              >
                <User className="h-5 w-5 inline mr-2" />
                Réservations
              </button>
            </nav>
          </div>
        </div>
        
        {/* Dashboard Content */}
        <div className="container mx-auto px-4 py-8">
          {activeSection === 'trips' && (
            <div>
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold">Mes trajets proposés</h2>
                
                <div className="flex items-center space-x-4">
                  <Link to="/driver/vehicles" className="text-trajetly-600 hover:text-trajetly-700 flex items-center">
                    <Car className="h-5 w-5 mr-1" />
                    Gérer mes véhicules ({driverVehicles.length})
                  </Link>
                </div>
              </div>
              
              {driverTrips.length > 0 ? (
                <div className="grid grid-cols-1 gap-6">
                  {driverTrips.map(trip => (
                    <TripCard key={trip.id} trip={trip} />
                  ))}
                </div>
              ) : (
                <div className="bg-white rounded-lg shadow-md p-8 text-center">
                  <Car className="h-16 w-16 mx-auto text-gray-400 mb-4" />
                  <h3 className="text-lg font-medium text-gray-800 mb-2">Vous n'avez pas encore de trajets</h3>
                  <p className="text-gray-600 mb-6">Commencez par proposer un nouveau trajet aux passagers.</p>
                  <Button onClick={() => navigate('/create-trip')}>
                    <Plus className="h-4 w-4 mr-2" />
                    Créer un trajet
                  </Button>
                </div>
              )}
            </div>
          )}
          
          {activeSection === 'reservations' && (
            <div>
              <h2 className="text-xl font-semibold mb-6">Demandes de réservation</h2>
              
              <div className="bg-white rounded-lg shadow-md p-8 text-center">
                <User className="h-16 w-16 mx-auto text-gray-400 mb-4" />
                <h3 className="text-lg font-medium text-gray-800 mb-2">Aucune demande de réservation</h3>
                <p className="text-gray-600">
                  Les réservations pour vos trajets apparaîtront ici lorsque des passagers réserveront une place.
                </p>
              </div>
            </div>
          )}
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default DriverDashboard;
