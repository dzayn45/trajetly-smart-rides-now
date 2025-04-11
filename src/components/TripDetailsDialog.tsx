
import { Trip, Vehicle } from '@/types';
import { useTrip } from '@/context/TripContext';
import { 
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { 
  Car, 
  Calendar, 
  Clock, 
  MapPin, 
  DollarSign, 
  User, 
  Dog, 
  Cigarette,
  Shield,
  Star
} from 'lucide-react';
import { useState } from 'react';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

interface TripDetailsDialogProps {
  trip: Trip;
  isOpen: boolean;
  onClose: () => void;
}

const TripDetailsDialog = ({ trip, isOpen, onClose }: TripDetailsDialogProps) => {
  const { vehicles, users } = useTrip();
  const [imageError, setImageError] = useState(false);
  
  // Find the vehicle associated with this trip
  const vehicle = trip.vehicleId ? vehicles.find(v => v.id === trip.vehicleId) : undefined;
  
  // Find the driver for this trip
  const driver = users.find(u => u.id === trip.driverId);
  const driverRating = driver?.rating || 4.5; // Default to 4.5 if no rating
  
  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { 
      weekday: 'long', 
      day: 'numeric', 
      month: 'long', 
      year: 'numeric' 
    };
    return new Date(dateString).toLocaleDateString('fr-FR', options);
  };
  
  // Generate a placeholder image URL based on the vehicle model if available
  const getVehicleImageUrl = () => {
    if (imageError) {
      return 'https://placehold.co/600x400/9b87f5/ffffff?text=Véhicule';
    }
    return `https://source.unsplash.com/featured/?car,${vehicle?.brand},${vehicle?.model}`;
  };

  // Generate stars for rating
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
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">
            {trip.departureCity} → {trip.arrivalCity}
          </DialogTitle>
          <DialogDescription>
            Informations détaillées sur ce trajet
          </DialogDescription>
        </DialogHeader>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
          {/* Left column - Trip info */}
          <div className="space-y-5">
            {/* Driver information with photo and rating */}
            {driver && (
              <div className="bg-trajetly-50 p-4 rounded-lg">
                <h3 className="font-semibold text-lg mb-3">Conducteur</h3>
                <div className="flex items-center">
                  <Avatar className="h-14 w-14 border-2 border-trajetly-100">
                    <AvatarImage 
                      src={`https://source.unsplash.com/featured/?portrait,person,${driver.id}`} 
                      alt={driver.name} 
                    />
                    <AvatarFallback className="bg-trajetly-100 text-trajetly-600 text-xl">
                      {driver.name.substring(0, 2).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <div className="ml-4">
                    <p className="font-medium text-lg text-gray-800">{driver.name}</p>
                    <div className="flex items-center">
                      {renderStars(driverRating)}
                      <span className="text-sm text-gray-600 ml-1">({driverRating.toFixed(1)})</span>
                    </div>
                    <p className="text-sm text-gray-500 mt-1">Membre depuis {new Date(driver.memberSince || '2022-01-01').getFullYear()}</p>
                  </div>
                </div>
              </div>
            )}

            <div className="bg-trajetly-50 p-4 rounded-lg">
              <h3 className="font-semibold text-lg mb-3">Détails du trajet</h3>
              
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <MapPin className="h-5 w-5 text-trajetly-600" />
                  <div>
                    <p className="font-medium">De: <span className="text-gray-700">{trip.departureCity}</span></p>
                    <p className="font-medium">À: <span className="text-gray-700">{trip.arrivalCity}</span></p>
                  </div>
                </div>
                
                <div className="flex items-center gap-3">
                  <Calendar className="h-5 w-5 text-trajetly-600" />
                  <p className="text-gray-700">{formatDate(trip.departureDate)}</p>
                </div>
                
                <div className="flex items-center gap-3">
                  <Clock className="h-5 w-5 text-trajetly-600" />
                  <p className="text-gray-700">Départ à {trip.departureTime}</p>
                </div>
                
                <div className="flex items-center gap-3">
                  <DollarSign className="h-5 w-5 text-trajetly-600" />
                  <p className="text-gray-700 font-semibold">{trip.price} € par personne</p>
                </div>
                
                <div className="flex items-center gap-3">
                  <User className="h-5 w-5 text-trajetly-600" />
                  <p className="text-gray-700">
                    {trip.availableSeats} place{trip.availableSeats > 1 ? 's' : ''} disponible{trip.availableSeats > 1 ? 's' : ''}
                  </p>
                </div>
              </div>
            </div>
            
            {trip.description && (
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="font-semibold text-lg mb-2">Description</h3>
                <p className="text-gray-700">{trip.description}</p>
              </div>
            )}
            
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="font-semibold text-lg mb-3">Préférences</h3>
              <div className="flex flex-wrap gap-2">
                <Badge variant={trip.allowPets ? "default" : "outline"} className={trip.allowPets ? "bg-trajetly-600" : ""}>
                  <Dog className="h-4 w-4 mr-1" />
                  {trip.allowPets ? 'Animaux acceptés' : 'Pas d\'animaux'}
                </Badge>
                
                <Badge variant={trip.allowSmoking ? "default" : "outline"} className={trip.allowSmoking ? "bg-trajetly-600" : ""}>
                  <Cigarette className="h-4 w-4 mr-1" />
                  {trip.allowSmoking ? 'Fumeur autorisé' : 'Non-fumeur'}
                </Badge>
              </div>
            </div>
          </div>
          
          {/* Right column - Vehicle info */}
          <div className="space-y-5">
            <div className="rounded-lg overflow-hidden bg-white shadow-sm border">
              <img 
                src={getVehicleImageUrl()} 
                alt={vehicle ? `${vehicle.brand} ${vehicle.model}` : 'Véhicule'} 
                className="w-full h-48 object-cover"
                onError={() => setImageError(true)}
              />
              
              {vehicle && (
                <div className="p-4">
                  <h3 className="font-semibold text-lg flex items-center gap-2 mb-3">
                    <Car className="h-5 w-5 text-trajetly-600" />
                    Véhicule
                  </h3>
                  
                  <div className="space-y-2">
                    <p className="text-gray-700">
                      <span className="font-medium">Marque:</span> {vehicle.brand}
                    </p>
                    <p className="text-gray-700">
                      <span className="font-medium">Modèle:</span> {vehicle.model}
                    </p>
                    <p className="text-gray-700">
                      <span className="font-medium">Immatriculation:</span> {vehicle.licensePlate}
                    </p>
                    <p className="text-gray-700">
                      <span className="font-medium">Année:</span> {vehicle.year || '2020'}
                    </p>
                    <p className="text-gray-700">
                      <span className="font-medium">Couleur:</span> {vehicle.color || 'Blanc'}
                    </p>
                  </div>
                </div>
              )}
            </div>
            
            {/* Car gallery - additional photos */}
            <div className="bg-white p-4 rounded-lg shadow-sm border">
              <h3 className="font-semibold text-lg mb-3">Galerie du véhicule</h3>
              <div className="grid grid-cols-2 gap-2">
                {[1, 2, 3, 4].map((num) => (
                  <img 
                    key={`car-img-${num}`}
                    src={`https://source.unsplash.com/featured/?car,interior,${vehicle?.brand || 'auto'},${num}`}
                    alt={`Photo ${num} du véhicule`}
                    className="rounded-md h-24 w-full object-cover"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.src = 'https://placehold.co/600x400/9b87f5/ffffff?text=Photo';
                    }}
                  />
                ))}
              </div>
            </div>
            
            <div className="bg-trajetly-50 p-4 rounded-lg">
              <h3 className="font-semibold text-lg flex items-center gap-2 mb-3">
                <Shield className="h-5 w-5 text-trajetly-600" />
                Sécurité
              </h3>
              
              <div className="space-y-2">
                <p className="text-gray-700 text-sm">
                  • Les informations du conducteur ont été vérifiées
                </p>
                <p className="text-gray-700 text-sm">
                  • Paiement sécurisé via notre plateforme
                </p>
                <p className="text-gray-700 text-sm">
                  • Support client disponible 24/7
                </p>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default TripDetailsDialog;
