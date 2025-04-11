
import { Trip } from '@/types';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/context/AuthContext';
import { useTrip } from '@/context/TripContext';
import { Calendar, Clock, MapPin, Users, DollarSign, Dog, Cigarette, Star } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useState } from 'react';
import TripDetailsDialog from './TripDetailsDialog';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useNavigate } from 'react-router-dom';

interface TripCardProps {
  trip: Trip;
  showActions?: boolean;
}

const TripCard = ({ trip, showActions = true }: TripCardProps) => {
  const { userRole, user, isAuthenticated } = useAuth();
  const { makeReservation, users } = useTrip();
  const { toast } = useToast();
  const [showDetails, setShowDetails] = useState(false);
  const navigate = useNavigate();

  // Find the driver for this trip
  const driver = users.find(u => u.id === trip.driverId);
  const driverRating = driver?.rating || 4.5; // Default to 4.5 if no rating
  
  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' };
    return new Date(dateString).toLocaleDateString('fr-FR', options);
  };

  const handleReservation = () => {
    if (!isAuthenticated) {
      toast({
        title: "Connexion requise",
        description: "Veuillez vous connecter pour réserver ce trajet",
        variant: "destructive",
      });
      navigate('/auth');
      return;
    }

    if (!user) {
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

  const renderStars = (rating: number) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;

    for (let i = 0; i < fullStars; i++) {
      stars.push(<Star key={`star-${i}`} className="h-4 w-4 fill-amber-400 text-amber-400" />);
    }
    
    if (hasHalfStar) {
      stars.push(
        <div key="half-star" className="relative">
          <Star className="h-4 w-4 text-amber-400" />
          <div className="absolute top-0 left-0 w-1/2 overflow-hidden">
            <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
          </div>
        </div>
      );
    }
    
    const emptyStars = 5 - stars.length;
    for (let i = 0; i < emptyStars; i++) {
      stars.push(<Star key={`empty-star-${i}`} className="h-4 w-4 text-gray-300" />);
    }

    return stars;
  };

  return (
    <>
      <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
        <div className="p-6">
          {/* Driver info */}
          {driver && (
            <div className="flex items-center mb-4">
              <Avatar className="h-10 w-10 border-2 border-trajetly-100">
                <AvatarImage 
                  src={`https://source.unsplash.com/featured/?portrait,person,${driver.id}`} 
                  alt={driver.name} 
                />
                <AvatarFallback className="bg-trajetly-100 text-trajetly-600">
                  {driver.name.substring(0, 2).toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <div className="ml-3">
                <p className="font-medium text-gray-800">{driver.name}</p>
                <div className="flex items-center">
                  {renderStars(driverRating)}
                  <span className="text-sm text-gray-600 ml-1">({driverRating.toFixed(1)})</span>
                </div>
              </div>
            </div>
          )}

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
                className="border-trajetly-300 hover:bg-trajetly-50 text-trajetly-700"
              >
                Voir détails
              </Button>
              
              {trip.availableSeats > 0 && (
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
