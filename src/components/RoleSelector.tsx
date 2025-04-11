
import { Button } from '@/components/ui/button';
import { Car, User, UserCog } from 'lucide-react';
import { UserRole } from '@/types';
import { useAuth } from '@/context/AuthContext';

interface RoleSelectorProps {
  onRoleSelect: (role: UserRole) => void;
}

const RoleSelector = ({ onRoleSelect }: RoleSelectorProps) => {
  const { login } = useAuth();

  const handleRoleSelect = (role: UserRole) => {
    login(role);
    onRoleSelect(role);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
      <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
        <div className="hero-gradient p-6 flex justify-center">
          <Car className="h-16 w-16 text-white" />
        </div>
        <div className="p-6">
          <h3 className="text-xl font-semibold mb-2 text-center">Conducteur</h3>
          <p className="text-gray-600 mb-4 text-center">
            Proposez des trajets et gagnez de l'argent en partageant votre véhicule
          </p>
          <ul className="space-y-2 mb-6">
            <li className="flex items-center text-gray-700">
              <div className="w-2 h-2 rounded-full bg-trajetly-500 mr-2"></div>
              Créez vos propres trajets
            </li>
            <li className="flex items-center text-gray-700">
              <div className="w-2 h-2 rounded-full bg-trajetly-500 mr-2"></div>
              Gérez vos véhicules
            </li>
            <li className="flex items-center text-gray-700">
              <div className="w-2 h-2 rounded-full bg-trajetly-500 mr-2"></div>
              Acceptez les réservations
            </li>
          </ul>
          <Button 
            className="w-full" 
            onClick={() => handleRoleSelect('driver')}
          >
            Continuer comme conducteur
          </Button>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
        <div className="hero-gradient p-6 flex justify-center">
          <User className="h-16 w-16 text-white" />
        </div>
        <div className="p-6">
          <h3 className="text-xl font-semibold mb-2 text-center">Passager</h3>
          <p className="text-gray-600 mb-4 text-center">
            Trouvez des trajets qui correspondent à vos besoins et voyagez à moindre coût
          </p>
          <ul className="space-y-2 mb-6">
            <li className="flex items-center text-gray-700">
              <div className="w-2 h-2 rounded-full bg-trajetly-500 mr-2"></div>
              Recherchez des trajets disponibles
            </li>
            <li className="flex items-center text-gray-700">
              <div className="w-2 h-2 rounded-full bg-trajetly-500 mr-2"></div>
              Réservez en quelques clics
            </li>
            <li className="flex items-center text-gray-700">
              <div className="w-2 h-2 rounded-full bg-trajetly-500 mr-2"></div>
              Laissez des avis aux conducteurs
            </li>
          </ul>
          <Button 
            className="w-full" 
            onClick={() => handleRoleSelect('passenger')}
          >
            Continuer comme passager
          </Button>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
        <div className="hero-gradient p-6 flex justify-center">
          <UserCog className="h-16 w-16 text-white" />
        </div>
        <div className="p-6">
          <h3 className="text-xl font-semibold mb-2 text-center">Admin</h3>
          <p className="text-gray-600 mb-4 text-center">
            Gérez la plateforme et assurez son bon fonctionnement
          </p>
          <ul className="space-y-2 mb-6">
            <li className="flex items-center text-gray-700">
              <div className="w-2 h-2 rounded-full bg-trajetly-500 mr-2"></div>
              Gérez tous les utilisateurs
            </li>
            <li className="flex items-center text-gray-700">
              <div className="w-2 h-2 rounded-full bg-trajetly-500 mr-2"></div>
              Modérez les trajets et avis
            </li>
            <li className="flex items-center text-gray-700">
              <div className="w-2 h-2 rounded-full bg-trajetly-500 mr-2"></div>
              Bloquez les comptes malveillants
            </li>
          </ul>
          <Button 
            className="w-full" 
            onClick={() => handleRoleSelect('admin')}
          >
            Continuer comme admin
          </Button>
        </div>
      </div>
    </div>
  );
};

export default RoleSelector;
