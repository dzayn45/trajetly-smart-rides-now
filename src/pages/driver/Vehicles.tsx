
import { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useTrip } from '@/context/TripContext';
import { Vehicle } from '@/types';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Car, Plus, Edit, Trash } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const VehiclesPage = () => {
  const { user } = useAuth();
  const { vehicles, getVehiclesByOwnerId, addVehicle } = useTrip();
  const { toast } = useToast();
  
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [newVehicle, setNewVehicle] = useState<Omit<Vehicle, 'id'>>({
    brand: '',
    model: '',
    licensePlate: '',
    ownerId: user?.id || '',
  });
  
  const driverVehicles = user ? getVehiclesByOwnerId(user.id) : [];
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewVehicle({ ...newVehicle, [name]: value });
  };
  
  const handleAddVehicle = () => {
    if (!newVehicle.brand || !newVehicle.model || !newVehicle.licensePlate) {
      toast({
        title: "Erreur",
        description: "Veuillez remplir tous les champs",
        variant: "destructive",
      });
      return;
    }
    
    addVehicle({
      ...newVehicle,
      ownerId: user?.id || '',
      id: `v${vehicles.length + 1}`,
    });
    
    toast({
      title: "Véhicule ajouté",
      description: "Votre véhicule a été ajouté avec succès",
    });
    
    setNewVehicle({
      brand: '',
      model: '',
      licensePlate: '',
      ownerId: user?.id || '',
    });
    
    setIsDialogOpen(false);
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      
      <main className="flex-grow bg-gray-50">
        {/* Page Header */}
        <div className="bg-trajetly-600 text-white py-8">
          <div className="container mx-auto px-4">
            <h1 className="text-2xl font-bold">Mes véhicules</h1>
            <p className="text-trajetly-100">Gérez les véhicules que vous utilisez pour vos trajets</p>
          </div>
        </div>
        
        {/* Page Content */}
        <div className="container mx-auto px-4 py-8">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold">Véhicules enregistrés</h2>
            
            <Button onClick={() => setIsDialogOpen(true)}>
              <Plus className="h-4 w-4 mr-2" />
              Ajouter un véhicule
            </Button>
          </div>
          
          {driverVehicles.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {driverVehicles.map((vehicle) => (
                <div key={vehicle.id} className="bg-white rounded-lg shadow-md overflow-hidden">
                  <div className="p-6">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h3 className="text-lg font-semibold">
                          {vehicle.brand} {vehicle.model}
                        </h3>
                        <p className="text-gray-600">{vehicle.licensePlate}</p>
                      </div>
                      <Car className="h-10 w-10 text-trajetly-500" />
                    </div>
                    
                    <div className="flex justify-end space-x-2 mt-4">
                      <Button variant="outline" size="sm">
                        <Edit className="h-4 w-4 mr-1" />
                        Modifier
                      </Button>
                      <Button variant="outline" size="sm" className="text-red-500 border-red-200 hover:bg-red-50">
                        <Trash className="h-4 w-4 mr-1" />
                        Supprimer
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="bg-white rounded-lg shadow-md p-8 text-center">
              <Car className="h-16 w-16 mx-auto text-gray-400 mb-4" />
              <h3 className="text-lg font-medium text-gray-800 mb-2">Aucun véhicule enregistré</h3>
              <p className="text-gray-600 mb-6">
                Vous n'avez pas encore ajouté de véhicule. Ajoutez-en un pour pouvoir proposer des trajets.
              </p>
              <Button onClick={() => setIsDialogOpen(true)}>
                <Plus className="h-4 w-4 mr-2" />
                Ajouter un véhicule
              </Button>
            </div>
          )}
        </div>
      </main>
      
      <Footer />
      
      {/* Add Vehicle Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Ajouter un véhicule</DialogTitle>
            <DialogDescription>
              Renseignez les informations de votre véhicule pour pouvoir proposer des trajets.
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <label htmlFor="brand" className="text-sm font-medium text-gray-700">
                Marque
              </label>
              <input
                type="text"
                id="brand"
                name="brand"
                value={newVehicle.brand}
                onChange={handleInputChange}
                placeholder="Renault, Peugeot, Citroën..."
                className="form-input"
              />
            </div>
            
            <div className="space-y-2">
              <label htmlFor="model" className="text-sm font-medium text-gray-700">
                Modèle
              </label>
              <input
                type="text"
                id="model"
                name="model"
                value={newVehicle.model}
                onChange={handleInputChange}
                placeholder="Clio, 308, C3..."
                className="form-input"
              />
            </div>
            
            <div className="space-y-2">
              <label htmlFor="licensePlate" className="text-sm font-medium text-gray-700">
                Immatriculation
              </label>
              <input
                type="text"
                id="licensePlate"
                name="licensePlate"
                value={newVehicle.licensePlate}
                onChange={handleInputChange}
                placeholder="AB-123-CD"
                className="form-input"
              />
            </div>
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
              Annuler
            </Button>
            <Button onClick={handleAddVehicle}>
              Ajouter
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default VehiclesPage;
