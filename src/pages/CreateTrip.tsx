
import { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useTrip } from '@/context/TripContext';
import { useNavigate } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { Trip } from '@/types';

const CreateTripPage = () => {
  const { user } = useAuth();
  const { addTrip, getVehiclesByOwnerId } = useTrip();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const userVehicles = user ? getVehiclesByOwnerId(user.id) : [];
  
  const [tripData, setTripData] = useState<Omit<Trip, 'id'>>({
    driverId: user?.id || '',
    departureCity: '',
    arrivalCity: '',
    departureDate: '',
    departureTime: '',
    price: 0,
    availableSeats: 1,
    allowPets: false,
    allowSmoking: false,
    vehicleId: userVehicles.length > 0 ? userVehicles[0].id : undefined,
    description: '',
  });
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target as HTMLInputElement;
    
    if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked;
      setTripData({ ...tripData, [name]: checked });
    } else if (type === 'number') {
      setTripData({ ...tripData, [name]: Number(value) });
    } else {
      setTripData({ ...tripData, [name]: value });
    }
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic validation
    if (!tripData.departureCity || !tripData.arrivalCity || !tripData.departureDate || !tripData.departureTime) {
      toast({
        title: "Erreur",
        description: "Veuillez remplir tous les champs obligatoires",
        variant: "destructive",
      });
      return;
    }
    
    if (tripData.price <= 0) {
      toast({
        title: "Erreur",
        description: "Le prix doit être supérieur à 0",
        variant: "destructive",
      });
      return;
    }
    
    if (tripData.availableSeats <= 0) {
      toast({
        title: "Erreur",
        description: "Le nombre de places disponibles doit être supérieur à 0",
        variant: "destructive",
      });
      return;
    }
    
    // Add the trip
    addTrip(tripData);
    
    toast({
      title: "Trajet créé",
      description: "Votre trajet a été créé avec succès",
    });
    
    // Redirect to driver dashboard
    navigate('/driver/dashboard');
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      
      <main className="flex-grow bg-gray-50">
        {/* Page Header */}
        <div className="bg-trajetly-600 text-white py-8">
          <div className="container mx-auto px-4">
            <h1 className="text-2xl font-bold">Créer un trajet</h1>
            <p className="text-trajetly-100">Proposez un trajet aux passagers en quelques étapes</p>
          </div>
        </div>
        
        {/* Form */}
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-md p-6">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label htmlFor="departureCity" className="block text-sm font-medium text-gray-700">
                    Ville de départ*
                  </label>
                  <input
                    type="text"
                    id="departureCity"
                    name="departureCity"
                    value={tripData.departureCity}
                    onChange={handleInputChange}
                    className="form-input"
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <label htmlFor="arrivalCity" className="block text-sm font-medium text-gray-700">
                    Ville d'arrivée*
                  </label>
                  <input
                    type="text"
                    id="arrivalCity"
                    name="arrivalCity"
                    value={tripData.arrivalCity}
                    onChange={handleInputChange}
                    className="form-input"
                    required
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label htmlFor="departureDate" className="block text-sm font-medium text-gray-700">
                    Date de départ*
                  </label>
                  <input
                    type="date"
                    id="departureDate"
                    name="departureDate"
                    value={tripData.departureDate}
                    onChange={handleInputChange}
                    className="form-input"
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <label htmlFor="departureTime" className="block text-sm font-medium text-gray-700">
                    Heure de départ*
                  </label>
                  <input
                    type="time"
                    id="departureTime"
                    name="departureTime"
                    value={tripData.departureTime}
                    onChange={handleInputChange}
                    className="form-input"
                    required
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label htmlFor="price" className="block text-sm font-medium text-gray-700">
                    Prix par passager (€)*
                  </label>
                  <input
                    type="number"
                    id="price"
                    name="price"
                    value={tripData.price}
                    onChange={handleInputChange}
                    min="1"
                    step="0.5"
                    className="form-input"
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <label htmlFor="availableSeats" className="block text-sm font-medium text-gray-700">
                    Nombre de places disponibles*
                  </label>
                  <input
                    type="number"
                    id="availableSeats"
                    name="availableSeats"
                    value={tripData.availableSeats}
                    onChange={handleInputChange}
                    min="1"
                    max="8"
                    className="form-input"
                    required
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <label htmlFor="vehicleId" className="block text-sm font-medium text-gray-700">
                  Véhicule
                </label>
                {userVehicles.length > 0 ? (
                  <select
                    id="vehicleId"
                    name="vehicleId"
                    value={tripData.vehicleId}
                    onChange={handleInputChange}
                    className="form-input"
                  >
                    {userVehicles.map(vehicle => (
                      <option key={vehicle.id} value={vehicle.id}>
                        {vehicle.brand} {vehicle.model} ({vehicle.licensePlate})
                      </option>
                    ))}
                  </select>
                ) : (
                  <div className="text-sm text-gray-500">
                    Vous n'avez pas encore ajouté de véhicule. <a href="/driver/vehicles" className="text-trajetly-600 hover:underline">Ajouter un véhicule</a>
                  </div>
                )}
              </div>
              
              <div className="space-y-2">
                <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                  Description du trajet
                </label>
                <textarea
                  id="description"
                  name="description"
                  value={tripData.description}
                  onChange={handleInputChange}
                  rows={3}
                  className="form-input"
                  placeholder="Informations complémentaires sur le trajet, arrêts éventuels, etc."
                />
              </div>
              
              <div className="space-y-2">
                <span className="block text-sm font-medium text-gray-700">Options</span>
                <div className="mt-2 space-y-2">
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="allowPets"
                      name="allowPets"
                      checked={tripData.allowPets}
                      onChange={handleInputChange}
                      className="h-4 w-4 rounded border-gray-300 text-trajetly-500 focus:ring-trajetly-500"
                    />
                    <label htmlFor="allowPets" className="ml-2 text-sm text-gray-700">
                      Animaux autorisés
                    </label>
                  </div>
                  
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="allowSmoking"
                      name="allowSmoking"
                      checked={tripData.allowSmoking}
                      onChange={handleInputChange}
                      className="h-4 w-4 rounded border-gray-300 text-trajetly-500 focus:ring-trajetly-500"
                    />
                    <label htmlFor="allowSmoking" className="ml-2 text-sm text-gray-700">
                      Trajet fumeur
                    </label>
                  </div>
                </div>
              </div>
              
              <div className="pt-4 flex justify-end space-x-3">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => navigate('/driver/dashboard')}
                >
                  Annuler
                </Button>
                <Button type="submit">Créer le trajet</Button>
              </div>
            </form>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default CreateTripPage;
