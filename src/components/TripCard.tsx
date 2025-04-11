
import { Trip } from '@/types';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/context/AuthContext';
import { useTrip } from '@/context/TripContext';
import { Calendar, Clock, MapPin, Users, DollarSign, Dog, Cigarette } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useState } from 'react';
import TripDetailsDialog from './TripDetailsDialog';

interface TripCardProps {
  trip: Trip;
  showActions?: boolean;
}

const TripCard = ({ trip, showActions = true }: TripCardProps) => {
  const { userRole, user } = useAuth();
  const { makeReservation } = useTrip();
  const { toast } = useToast();
  const [showDetails, setShowDetails] = useState(false);

  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' };
    return new Date(dateString).toLocaleDateString('fr-FR', options);
  };

  const handleReservation = () => {
    if (!user) {
      toast({
        title: "Erreur",
        description: "Vous devez être connecté pour réserver un trajet",
        variant: "destructive",
      });
      return;
    }

    makeReservation({
      tripId: trip.id,
      passengerId: user.id,
      status: 'pending',
      seatsReserved: 1,
    });

    toast({
      title: "Réservation effectuée",
      description: "Votre demande de réservation a été envoyée au conducteur",
    });
  };

  return (
    <>
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xl font-semibold">
              {trip.departureCity} → {trip.arrivalCity}
            </h3>
            <span className="font-bold text-lg text-trajetly-600">{trip.price} €</span>
          </div>
          
          <div className="space-y-3 mb-4">
            <div className="flex items-center text-gray-600">
              <Calendar className="h-5 w-5 mr-2 text-trajetly-500" />
              <span>{formatDate(trip.departureDate)}</span>
            </div>
            
            <div className="flex items-center text-gray-600">
              <Clock className="h-5 w-5 mr-2 text-trajetly-500" />
              <span>Départ à {trip.departureTime}</span>
            </div>
            
            <div className="flex items-center text-gray-600">
              <Users className="h-5 w-5 mr-2 text-trajetly-500" />
              <span>{trip.availableSeats} place{trip.availableSeats > 1 ? 's' : ''} disponible{trip.availableSeats > 1 ? 's' : ''}</span>
            </div>
            
            <div className="flex space-x-4">
              <div className="flex items-center text-gray-600">
                <Dog className={`h-5 w-5 mr-1 ${trip.allowPets ? 'text-trajetly-500' : 'text-gray-400'}`} />
                <span className={trip.allowPets ? 'text-gray-600' : 'text-gray-400'}>
                  {trip.allowPets ? 'Animaux acceptés' : 'Pas d\'animaux'}
                </span>
              </div>
              
              <div className="flex items-center text-gray-600">
                <Cigarette className={`h-5 w-5 mr-1 ${trip.allowSmoking ? 'text-trajetly-500' : 'text-gray-400'}`} />
                <span className={trip.allowSmoking ? 'text-gray-600' : 'text-gray-400'}>
                  {trip.allowSmoking ? 'Fumeur autorisé' : 'Non-fumeur'}
                </span>
              </div>
            </div>
          </div>
          
          {trip.description && (
            <div className="mb-4">
              <p className="text-gray-600">{trip.description}</p>
            </div>
          )}
          
          {showActions && (
            <div className="mt-4 flex justify-end space-x-2">
              <Button 
                variant="outline" 
                onClick={() => setShowDetails(true)}
              >
                Voir détails
              </Button>
              
              {userRole === 'passenger' && trip.availableSeats > 0 && (
                <Button onClick={handleReservation}>
                  Réserver
                </Button>
              )}
              
              {userRole === 'driver' && trip.driverId === user?.id && (
                <Button variant="outline">
                  Modifier
                </Button>
              )}
              
              {userRole === 'admin' && (
                <Button variant="destructive">
                  Supprimer
                </Button>
              )}
            </div>
          )}
        </div>
      </div>
      
      <TripDetailsDialog
        trip={trip}
        isOpen={showDetails}
        onClose={() => setShowDetails(false)}
      />
    </>
  );
};

export default TripCard;
