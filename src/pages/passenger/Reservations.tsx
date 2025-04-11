
import { useAuth } from '@/context/AuthContext';
import { useTrip } from '@/context/TripContext';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import TripCard from '@/components/TripCard';
import { Button } from '@/components/ui/button';
import { Clock, Route } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const ReservationsPage = () => {
  const { user } = useAuth();
  const { getPassengerReservations, trips, cancelReservation } = useTrip();
  const navigate = useNavigate();
  
  // Get passenger's reservations
  const reservations = user ? getPassengerReservations(user.id) : [];
  const reservedTrips = reservations.map(res => {
    const trip = trips.find(t => t.id === res.tripId);
    return {
      ...trip,
      reservationId: res.id,
      reservationStatus: res.status,
      reservationDate: res.createdAt,
    };
  }).filter(trip => trip !== undefined);

  // Format date
  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { day: 'numeric', month: 'long', year: 'numeric' };
    return new Date(dateString).toLocaleDateString('fr-FR', options);
  };

  const handleCancelReservation = (reservationId: string) => {
    cancelReservation(reservationId);
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      
      <main className="flex-grow bg-gray-50">
        {/* Page Header */}
        <div className="bg-trajetly-600 text-white py-8">
          <div className="container mx-auto px-4">
            <h1 className="text-2xl font-bold">Mes réservations</h1>
            <p className="text-trajetly-100">Suivez l'état de vos réservations en cours et passées</p>
          </div>
        </div>
        
        {/* Reservations List */}
        <div className="container mx-auto px-4 py-8">
          {reservedTrips.length > 0 ? (
            <div className="space-y-6">
              {reservedTrips.map((trip) => (
                <div key={trip.reservationId} className="bg-white rounded-lg shadow-md overflow-hidden">
                  <div className="p-4 bg-gray-50 border-b flex justify-between items-center">
                    <div className="flex items-center">
                      <Clock className="h-5 w-5 text-trajetly-500 mr-2" />
                      <span className="text-sm text-gray-600">
                        Réservation effectuée le {formatDate(trip.reservationDate)}
                      </span>
                    </div>
                    <div>
                      <span
                        className={`text-sm font-medium py-1 px-2 rounded-full ${
                          trip.reservationStatus === 'confirmed'
                            ? 'bg-green-100 text-green-800'
                            : trip.reservationStatus === 'pending'
                            ? 'bg-yellow-100 text-yellow-800'
                            : 'bg-red-100 text-red-800'
                        }`}
                      >
                        {trip.reservationStatus === 'confirmed'
                          ? 'Confirmée'
                          : trip.reservationStatus === 'pending'
                          ? 'En attente'
                          : 'Annulée'}
                      </span>
                    </div>
                  </div>
                  <TripCard trip={trip} showActions={false} />
                  {trip.reservationStatus === 'pending' && (
                    <div className="p-4 bg-gray-50 border-t flex justify-end">
                      <Button 
                        variant="outline" 
                        className="text-red-500 border-red-200 hover:bg-red-50"
                        onClick={() => handleCancelReservation(trip.reservationId)}
                      >
                        Annuler ma réservation
                      </Button>
                    </div>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <div className="bg-white rounded-lg shadow-md p-8 text-center">
              <Route className="h-16 w-16 mx-auto text-gray-400 mb-4" />
              <h3 className="text-lg font-medium text-gray-800 mb-2">Aucune réservation</h3>
              <p className="text-gray-600 mb-6">
                Vous n'avez pas encore réservé de trajet. Commencez par rechercher un trajet qui vous convient.
              </p>
              <Button onClick={() => navigate('/search')}>
                Rechercher un trajet
              </Button>
            </div>
          )}
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default ReservationsPage;
