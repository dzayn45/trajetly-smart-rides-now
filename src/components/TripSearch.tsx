
import { useState } from 'react';
import { SearchFilters, Trip } from '@/types';
import { Button } from '@/components/ui/button';
import { useTrip } from '@/context/TripContext';
import { Search, SlidersHorizontal, Calendar, MapPin } from 'lucide-react';
import TripCard from './TripCard';

const TripSearch = () => {
  const { searchTrips } = useTrip();
  const [searchResults, setSearchResults] = useState<Trip[]>([]);
  const [showResults, setShowResults] = useState(false);
  const [showAdvancedSearch, setShowAdvancedSearch] = useState(false);
  const [filters, setFilters] = useState<SearchFilters>({
    departureCity: '',
    arrivalCity: '',
    departureDate: '',
    allowPets: undefined,
    allowSmoking: undefined,
    maxPrice: undefined,
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target as HTMLInputElement;
    
    if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked;
      setFilters({ ...filters, [name]: checked });
    } else if (name === 'maxPrice') {
      setFilters({ ...filters, [name]: value ? Number(value) : undefined });
    } else {
      setFilters({ ...filters, [name]: value });
    }
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const results = searchTrips(filters);
    setSearchResults(results);
    setShowResults(true);
  };

  const resetSearch = () => {
    setFilters({
      departureCity: '',
      arrivalCity: '',
      departureDate: '',
      allowPets: undefined,
      allowSmoking: undefined,
      maxPrice: undefined,
    });
    setSearchResults([]);
    setShowResults(false);
  };

  const toggleAdvancedSearch = () => {
    setShowAdvancedSearch(!showAdvancedSearch);
  };

  return (
    <div className="w-full max-w-4xl mx-auto">
      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <form onSubmit={handleSearch}>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
            <div className="space-y-2">
              <label htmlFor="departureCity" className="block text-sm font-medium text-gray-700">
                Ville de départ
              </label>
              <div className="relative">
                <MapPin className="absolute top-2.5 left-3 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  id="departureCity"
                  name="departureCity"
                  value={filters.departureCity}
                  onChange={handleInputChange}
                  placeholder="Paris, Lyon, Marseille..."
                  className="form-input pl-10"
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <label htmlFor="arrivalCity" className="block text-sm font-medium text-gray-700">
                Ville d'arrivée
              </label>
              <div className="relative">
                <MapPin className="absolute top-2.5 left-3 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  id="arrivalCity"
                  name="arrivalCity"
                  value={filters.arrivalCity}
                  onChange={handleInputChange}
                  placeholder="Lyon, Paris, Lille..."
                  className="form-input pl-10"
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <label htmlFor="departureDate" className="block text-sm font-medium text-gray-700">
                Date de départ
              </label>
              <div className="relative">
                <Calendar className="absolute top-2.5 left-3 h-5 w-5 text-gray-400" />
                <input
                  type="date"
                  id="departureDate"
                  name="departureDate"
                  value={filters.departureDate}
                  onChange={handleInputChange}
                  className="form-input pl-10"
                />
              </div>
            </div>
          </div>
          
          {showAdvancedSearch && (
            <div className="border-t border-gray-200 pt-4 mt-4">
              <h3 className="text-lg font-medium text-gray-700 mb-4">Options avancées</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <label htmlFor="maxPrice" className="block text-sm font-medium text-gray-700">
                    Prix maximum (€)
                  </label>
                  <input
                    type="number"
                    id="maxPrice"
                    name="maxPrice"
                    value={filters.maxPrice || ''}
                    onChange={handleInputChange}
                    min="0"
                    className="form-input"
                  />
                </div>
                
                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id="allowPets"
                    name="allowPets"
                    checked={filters.allowPets || false}
                    onChange={handleInputChange}
                    className="h-4 w-4 rounded border-gray-300 text-trajetly-500 focus:ring-trajetly-500"
                  />
                  <label htmlFor="allowPets" className="text-sm font-medium text-gray-700">
                    Animaux acceptés
                  </label>
                </div>
                
                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id="allowSmoking"
                    name="allowSmoking"
                    checked={filters.allowSmoking || false}
                    onChange={handleInputChange}
                    className="h-4 w-4 rounded border-gray-300 text-trajetly-500 focus:ring-trajetly-500"
                  />
                  <label htmlFor="allowSmoking" className="text-sm font-medium text-gray-700">
                    Trajet fumeur
                  </label>
                </div>
              </div>
            </div>
          )}
          
          <div className="flex items-center justify-between mt-6">
            <Button
              type="button"
              variant="outline"
              onClick={toggleAdvancedSearch}
              className="text-gray-600"
            >
              <SlidersHorizontal className="h-4 w-4 mr-2" />
              {showAdvancedSearch ? 'Masquer les filtres' : 'Plus de filtres'}
            </Button>
            
            <div className="flex space-x-2">
              {(showResults || Object.values(filters).some(value => value !== '' && value !== undefined)) && (
                <Button
                  type="button"
                  variant="outline"
                  onClick={resetSearch}
                >
                  Réinitialiser
                </Button>
              )}
              
              <Button type="submit">
                <Search className="h-4 w-4 mr-2" />
                Rechercher
              </Button>
            </div>
          </div>
        </form>
      </div>

      {showResults && (
        <div>
          <h2 className="text-xl font-semibold mb-4">
            {searchResults.length > 0 
              ? `${searchResults.length} trajet${searchResults.length > 1 ? 's' : ''} trouvé${searchResults.length > 1 ? 's' : ''}`
              : 'Aucun trajet trouvé'}
          </h2>
          
          <div className="space-y-4">
            {searchResults.map(trip => (
              <TripCard key={trip.id} trip={trip} />
            ))}
            
            {searchResults.length === 0 && (
              <div className="bg-white rounded-lg shadow-md p-6 text-center">
                <p className="text-gray-600 mb-2">Aucun trajet ne correspond à vos critères de recherche.</p>
                <p className="text-gray-500">Essayez de modifier vos filtres ou de rechercher à une autre date.</p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default TripSearch;
