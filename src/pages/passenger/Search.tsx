
import { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { Bed, Calendar, Users, Search, Wifi, Coffee, Utensils, Dumbbell } from 'lucide-react';

const SearchPage = () => {
  const [checkInDate, setCheckInDate] = useState('');
  const [checkOutDate, setCheckOutDate] = useState('');
  const [guests, setGuests] = useState(2);
  const [priceRange, setPriceRange] = useState([0, 500]);
  const [amenities, setAmenities] = useState({
    wifi: false,
    breakfast: false,
    spa: false,
    gym: false
  });

  // Mock room data
  const rooms = [
    {
      id: '1',
      name: 'Deluxe Ocean View',
      description: 'Spacious room with breathtaking ocean views',
      price: 199,
      image: 'https://images.unsplash.com/photo-1566665797739-1674de7a421a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1074&q=80',
      amenities: ['King Bed', 'Ocean View', 'Free Wifi', 'Minibar'],
      maxGuests: 2
    },
    {
      id: '2',
      name: 'Superior Garden Suite',
      description: 'Elegant suite with private garden access',
      price: 249,
      image: 'https://images.unsplash.com/photo-1590490360182-c33d57733427?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1074&q=80',
      amenities: ['Queen Bed', 'Garden View', 'Free Wifi', 'Bathtub'],
      maxGuests: 2
    },
    {
      id: '3',
      name: 'Family Comfort Room',
      description: 'Perfect for families with spacious layout',
      price: 299,
      image: 'https://images.unsplash.com/photo-1596394516093-501ba68a0ba6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1070&q=80',
      amenities: ['2 Double Beds', 'City View', 'Free Wifi', 'Kids Area'],
      maxGuests: 4
    },
    {
      id: '4',
      name: 'Presidential Suite',
      description: 'Our most luxurious accommodation with panoramic views',
      price: 499,
      image: 'https://images.unsplash.com/photo-1578683010236-d716f9a3f461?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80',
      amenities: ['King Bed', 'Panoramic View', 'Free Wifi', 'Jacuzzi', 'Living Room'],
      maxGuests: 2
    },
    {
      id: '5',
      name: 'Economy Room',
      description: 'Comfortable and affordable accommodation',
      price: 129,
      image: 'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80',
      amenities: ['Queen Bed', 'City View', 'Free Wifi'],
      maxGuests: 2
    },
    {
      id: '6',
      name: 'Honeymoon Suite',
      description: 'Romantic suite perfect for couples',
      price: 399,
      image: 'https://images.unsplash.com/photo-1595576508898-0ad5c879a061?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1074&q=80',
      amenities: ['King Bed', 'Ocean View', 'Free Wifi', 'Jacuzzi', 'Champagne Service'],
      maxGuests: 2
    }
  ];

  // Filter rooms based on search criteria
  const filteredRooms = rooms.filter(room => {
    // Filter by price
    if (room.price < priceRange[0] || room.price > priceRange[1]) {
      return false;
    }
    
    // Filter by guests
    if (room.maxGuests < guests) {
      return false;
    }
    
    return true;
  });

  const handleAmenityChange = (amenity: keyof typeof amenities) => {
    setAmenities({
      ...amenities,
      [amenity]: !amenities[amenity]
    });
  };

  const toggleAmenity = (amenity: keyof typeof amenities) => {
    handleAmenityChange(amenity);
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      
      <main className="flex-grow bg-gray-50">
        {/* Page Header */}
        <div className="bg-blue-600 text-white py-8">
          <div className="container mx-auto px-4">
            <h1 className="text-2xl font-bold">Find Your Perfect Room</h1>
            <p className="text-blue-100">Search for the ideal accommodation for your stay</p>
          </div>
        </div>
        
        {/* Search Form */}
        <div className="container mx-auto px-4 py-8">
          <div className="bg-white rounded-lg shadow-md p-6 mb-8">
            <h2 className="text-xl font-semibold mb-4">Search Filters</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
              <div>
                <Label htmlFor="check-in">Check-in Date</Label>
                <div className="relative">
                  <Calendar className="absolute left-3 top-3 h-4 w-4 text-gray-500" />
                  <Input 
                    id="check-in"
                    type="date"
                    className="pl-9"
                    value={checkInDate}
                    onChange={(e) => setCheckInDate(e.target.value)}
                    min={new Date().toISOString().split('T')[0]}
                  />
                </div>
              </div>
              
              <div>
                <Label htmlFor="check-out">Check-out Date</Label>
                <div className="relative">
                  <Calendar className="absolute left-3 top-3 h-4 w-4 text-gray-500" />
                  <Input 
                    id="check-out"
                    type="date"
                    className="pl-9"
                    value={checkOutDate}
                    onChange={(e) => setCheckOutDate(e.target.value)}
                    min={checkInDate || new Date().toISOString().split('T')[0]}
                  />
                </div>
              </div>
              
              <div>
                <Label htmlFor="guests">Guests</Label>
                <div className="relative">
                  <Users className="absolute left-3 top-3 h-4 w-4 text-gray-500" />
                  <Input 
                    id="guests"
                    type="number"
                    className="pl-9"
                    placeholder="2"
                    min="1"
                    max="10"
                    value={guests}
                    onChange={(e) => setGuests(parseInt(e.target.value))}
                  />
                </div>
              </div>
              
              <div>
                <Label>Price Range: ${priceRange[0]} - ${priceRange[1]}</Label>
                <Slider
                  defaultValue={[0, 500]}
                  max={1000}
                  step={10}
                  value={priceRange}
                  onValueChange={setPriceRange}
                  className="mt-6"
                />
              </div>
            </div>
            
            <div className="mb-4">
              <Label className="mb-2 block">Amenities</Label>
              <div className="flex flex-wrap gap-2">
                <Button 
                  variant={amenities.wifi ? "default" : "outline"} 
                  size="sm"
                  onClick={() => toggleAmenity('wifi')}
                  className="flex items-center gap-1"
                >
                  <Wifi className="h-4 w-4" />
                  WiFi
                </Button>
                <Button 
                  variant={amenities.breakfast ? "default" : "outline"} 
                  size="sm"
                  onClick={() => toggleAmenity('breakfast')}
                  className="flex items-center gap-1"
                >
                  <Coffee className="h-4 w-4" />
                  Breakfast
                </Button>
                <Button 
                  variant={amenities.spa ? "default" : "outline"} 
                  size="sm"
                  onClick={() => toggleAmenity('spa')}
                  className="flex items-center gap-1"
                >
                  <Utensils className="h-4 w-4" />
                  Spa Access
                </Button>
                <Button 
                  variant={amenities.gym ? "default" : "outline"} 
                  size="sm"
                  onClick={() => toggleAmenity('gym')}
                  className="flex items-center gap-1"
                >
                  <Dumbbell className="h-4 w-4" />
                  Gym Access
                </Button>
              </div>
            </div>
            
            <Button className="w-full sm:w-auto">
              <Search className="mr-2 h-4 w-4" />
              Search Rooms
            </Button>
          </div>
          
          {/* Search Results */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredRooms.map(room => (
              <Card key={room.id} className="overflow-hidden hover:shadow-lg transition-shadow duration-300">
                <div className="h-48 overflow-hidden">
                  <img 
                    src={room.image} 
                    alt={room.name} 
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <CardHeader>
                  <CardTitle className="flex justify-between items-center">
                    <span>{room.name}</span>
                    <span className="text-blue-600">${room.price}<span className="text-sm text-gray-500 font-normal">/night</span></span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 mb-4">{room.description}</p>
                  <div className="flex flex-wrap gap-2 mb-2">
                    {room.amenities.map((amenity, index) => (
                      <span 
                        key={index}
                        className="bg-blue-50 text-blue-700 text-xs px-2 py-1 rounded-full"
                      >
                        {amenity}
                      </span>
                    ))}
                  </div>
                  <div className="flex items-center text-sm text-gray-500">
                    <Users className="h-4 w-4 mr-1" />
                    <span>Up to {room.maxGuests} guests</span>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button className="w-full">Book Now</Button>
                </CardFooter>
              </Card>
            ))}
          </div>
          
          {filteredRooms.length === 0 && (
            <div className="bg-white rounded-lg shadow-md p-8 text-center">
              <Bed className="h-16 w-16 mx-auto text-gray-400 mb-4" />
              <h3 className="text-lg font-medium text-gray-800 mb-2">No Rooms Found</h3>
              <p className="text-gray-600 mb-6">
                No rooms match your current search criteria. Try adjusting your filters.
              </p>
              <Button onClick={() => {
                setCheckInDate('');
                setCheckOutDate('');
                setGuests(2);
                setPriceRange([0, 500]);
                setAmenities({
                  wifi: false,
                  breakfast: false,
                  spa: false,
                  gym: false
                });
              }}>
                Reset Filters
              </Button>
            </div>
          )}
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default SearchPage;
