
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { UserRole } from '@/types';
import { Bed, Search, Shield, Calendar, MapPin, Wifi, Coffee } from 'lucide-react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

const Index = () => {
  const {
    isAuthenticated,
    userRole
  } = useAuth();
  const navigate = useNavigate();
  const [showRoleSelector, setShowRoleSelector] = useState(false);

  // Mock featured rooms data
  const featuredRooms = [
    {
      id: '1',
      name: 'Deluxe Ocean View',
      description: 'Spacious room with breathtaking ocean views',
      price: 199,
      image: 'https://images.unsplash.com/photo-1566665797739-1674de7a421a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1074&q=80',
      amenities: ['King Bed', 'Ocean View', 'Free Wifi', 'Minibar']
    },
    {
      id: '2',
      name: 'Superior Garden Suite',
      description: 'Elegant suite with private garden access',
      price: 249,
      image: 'https://images.unsplash.com/photo-1590490360182-c33d57733427?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1074&q=80',
      amenities: ['Queen Bed', 'Garden View', 'Free Wifi', 'Bathtub']
    },
    {
      id: '3',
      name: 'Family Comfort Room',
      description: 'Perfect for families with spacious layout',
      price: 299,
      image: 'https://images.unsplash.com/photo-1596394516093-501ba68a0ba6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1070&q=80',
      amenities: ['2 Double Beds', 'City View', 'Free Wifi', 'Kids Area']
    },
  ];

  const handleRoleSelect = (role: UserRole) => {
    if (role === 'driver') {
      navigate('/driver/dashboard');
    } else if (role === 'passenger') {
      navigate('/passenger/dashboard');
    } else if (role === 'admin') {
      navigate('/admin/dashboard');
    }
  };
  
  const handleGetStarted = () => {
    setShowRoleSelector(true);
  };
  
  return <div className="flex flex-col min-h-screen">
      <Header />
      
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="hero-gradient text-white">
          <div className="container mx-auto px-4 py-16 md:py-24">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-4xl md:text-5xl font-bold mb-6">
                SkyView Hotel – Luxury Beyond Expectations
              </h1>
              <p className="text-xl md:text-2xl mb-8">
                Experience unparalleled comfort and service in our premium rooms and suites, tailored to exceed your every expectation.
              </p>
              
              {!isAuthenticated && (showRoleSelector ? <div>
                    <h2 className="text-2xl font-semibold mb-6">Choose your account type</h2>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                      <Button onClick={() => handleRoleSelect('passenger')} className="bg-white text-blue-600 hover:bg-gray-100">
                        Guest Account
                      </Button>
                      <Button onClick={() => handleRoleSelect('admin')} className="bg-white text-blue-600 hover:bg-gray-100">
                        Staff Account
                      </Button>
                    </div>
                  </div> : <button className="bg-white text-blue-600 font-semibold px-8 py-3 rounded-md shadow-lg hover:bg-gray-100 transition" onClick={handleGetStarted}>
                    Book Your Stay Now
                  </button>)}
              
              {isAuthenticated && <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                  <Button onClick={() => navigate(`/${userRole}/dashboard`)} className="bg-white text-blue-600 hover:bg-gray-100">
                    Go to my dashboard
                  </Button>
                  
                  {userRole === 'passenger' && <Button onClick={() => navigate('/search')} variant="outline" className="border-white text-white hover:bg-white/10">
                      Find a Room
                    </Button>}
                </div>}
            </div>
          </div>
        </section>
        
        {/* Search Box Section */}
        <section className="py-8 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-5xl mx-auto">
              <div className="bg-white rounded-lg shadow-lg p-6 -mt-12 relative z-10">
                <h2 className="text-xl font-semibold mb-4 text-center">Find Your Perfect Room</h2>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <div>
                    <Label htmlFor="check-in">Check-in Date</Label>
                    <Input 
                      id="check-in"
                      type="date"
                      className="w-full"
                      min={new Date().toISOString().split('T')[0]}
                    />
                  </div>
                  <div>
                    <Label htmlFor="check-out">Check-out Date</Label>
                    <Input 
                      id="check-out"
                      type="date"
                      className="w-full"
                      min={new Date().toISOString().split('T')[0]}
                    />
                  </div>
                  <div>
                    <Label htmlFor="guests">Guests</Label>
                    <Input 
                      id="guests"
                      type="number"
                      className="w-full"
                      placeholder="2"
                      min="1"
                      max="10"
                    />
                  </div>
                  <div className="flex items-end">
                    <Button className="w-full" onClick={() => navigate('/search')}>
                      Search Rooms
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* Featured Rooms Section */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <div className="inline-flex items-center justify-center h-16 w-16 rounded-full bg-blue-100 text-blue-600 mb-4">
                <Bed className="h-8 w-8" />
              </div>
              <h2 className="text-3xl font-bold mb-4">Featured Rooms</h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Discover our most popular accommodations, each designed for maximum comfort and satisfaction. Book quickly to secure your preferred stay.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {featuredRooms.map(room => (
                <Card key={room.id} className="overflow-hidden hover:shadow-lg transition-shadow duration-300">
                  <div className="h-48 overflow-hidden">
                    <img 
                      src={room.image} 
                      alt={room.name} 
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <CardHeader>
                    <CardTitle>{room.name}</CardTitle>
                    <CardDescription>{room.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {room.amenities.map((amenity, index) => (
                        <span 
                          key={index}
                          className="bg-blue-50 text-blue-700 text-xs px-2 py-1 rounded-full"
                        >
                          {amenity}
                        </span>
                      ))}
                    </div>
                    <p className="text-2xl font-bold text-blue-600">${room.price}<span className="text-sm text-gray-500 font-normal">/night</span></p>
                  </CardContent>
                  <CardFooter>
                    <Button className="w-full" onClick={() => navigate('/search')}>
                      Book Now
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
            
            <div className="text-center mt-8">
              <Button variant="outline" className="mt-4" onClick={() => navigate('/search')}>
                View All Available Rooms
              </Button>
            </div>
          </div>
        </section>
        
        {/* Features Section */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">Hotel Amenities</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-white p-8 rounded-lg shadow-md text-center">
                <div className="inline-flex items-center justify-center h-16 w-16 rounded-full bg-blue-100 text-blue-600 mb-6">
                  <Bed className="h-8 w-8" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Luxury Rooms</h3>
                <ul className="text-gray-600 space-y-2 text-left">
                  <li className="flex items-start">
                    <div className="min-w-2 h-2 rounded-full bg-blue-500 mt-2 mr-2"></div>
                    <span>Premium bedding and linens</span>
                  </li>
                  <li className="flex items-start">
                    <div className="min-w-2 h-2 rounded-full bg-blue-500 mt-2 mr-2"></div>
                    <span>Climate control system</span>
                  </li>
                  <li className="flex items-start">
                    <div className="min-w-2 h-2 rounded-full bg-blue-500 mt-2 mr-2"></div>
                    <span>Spacious bathrooms with toiletries</span>
                  </li>
                  <li className="flex items-start">
                    <div className="min-w-2 h-2 rounded-full bg-blue-500 mt-2 mr-2"></div>
                    <span>24-hour room service</span>
                  </li>
                </ul>
              </div>
              
              <div className="bg-white p-8 rounded-lg shadow-md text-center">
                <div className="inline-flex items-center justify-center h-16 w-16 rounded-full bg-blue-100 text-blue-600 mb-6">
                  <Coffee className="h-8 w-8" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Dining & Relaxation</h3>
                <ul className="text-gray-600 space-y-2 text-left">
                  <li className="flex items-start">
                    <div className="min-w-2 h-2 rounded-full bg-blue-500 mt-2 mr-2"></div>
                    <span>Gourmet restaurant and bar</span>
                  </li>
                  <li className="flex items-start">
                    <div className="min-w-2 h-2 rounded-full bg-blue-500 mt-2 mr-2"></div>
                    <span>Spa and wellness center</span>
                  </li>
                  <li className="flex items-start">
                    <div className="min-w-2 h-2 rounded-full bg-blue-500 mt-2 mr-2"></div>
                    <span>Outdoor and indoor pools</span>
                  </li>
                  <li className="flex items-start">
                    <div className="min-w-2 h-2 rounded-full bg-blue-500 mt-2 mr-2"></div>
                    <span>Fitness center with trainers</span>
                  </li>
                </ul>
              </div>
              
              <div className="bg-white p-8 rounded-lg shadow-md text-center">
                <div className="inline-flex items-center justify-center h-16 w-16 rounded-full bg-blue-100 text-blue-600 mb-6">
                  <Wifi className="h-8 w-8" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Services</h3>
                <ul className="text-gray-600 space-y-2 text-left">
                  <li className="flex items-start">
                    <div className="min-w-2 h-2 rounded-full bg-blue-500 mt-2 mr-2"></div>
                    <span>Complimentary high-speed WiFi</span>
                  </li>
                  <li className="flex items-start">
                    <div className="min-w-2 h-2 rounded-full bg-blue-500 mt-2 mr-2"></div>
                    <span>Concierge and valet parking</span>
                  </li>
                  <li className="flex items-start">
                    <div className="min-w-2 h-2 rounded-full bg-blue-500 mt-2 mr-2"></div>
                    <span>Business center and meeting rooms</span>
                  </li>
                  <li className="flex items-start">
                    <div className="min-w-2 h-2 rounded-full bg-blue-500 mt-2 mr-2"></div>
                    <span>Airport shuttle service</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>
            
        {/* Testimonials Section */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-4">Guest Testimonials</h2>
            <p className="text-gray-600 text-center mb-8 max-w-2xl mx-auto">
              Here's what our guests have to say about their experience at SkyView Hotel.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
              <div className="bg-gray-50 p-6 rounded-lg">
                <div className="flex items-center mb-4">
                  <div className="h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center mr-4">
                    <span className="text-blue-600 font-bold">JD</span>
                  </div>
                  <div>
                    <h4 className="font-semibold">John Doe</h4>
                    <div className="flex">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <svg key={star} className="h-4 w-4 text-yellow-400 fill-current" viewBox="0 0 24 24">
                          <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                        </svg>
                      ))}
                    </div>
                  </div>
                </div>
                <p className="text-gray-600 italic">"The rooms are spectacular and the service is impeccable. I couldn't have asked for a better stay. Will definitely return!"</p>
              </div>
              
              <div className="bg-gray-50 p-6 rounded-lg">
                <div className="flex items-center mb-4">
                  <div className="h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center mr-4">
                    <span className="text-blue-600 font-bold">JS</span>
                  </div>
                  <div>
                    <h4 className="font-semibold">Jane Smith</h4>
                    <div className="flex">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <svg key={star} className="h-4 w-4 text-yellow-400 fill-current" viewBox="0 0 24 24">
                          <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                        </svg>
                      ))}
                    </div>
                  </div>
                </div>
                <p className="text-gray-600 italic">"From check-in to check-out, everything was perfect. The spa facilities are world-class and the dining options are excellent."</p>
              </div>
              
              <div className="bg-gray-50 p-6 rounded-lg">
                <div className="flex items-center mb-4">
                  <div className="h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center mr-4">
                    <span className="text-blue-600 font-bold">RJ</span>
                  </div>
                  <div>
                    <h4 className="font-semibold">Robert Johnson</h4>
                    <div className="flex">
                      {[1, 2, 3, 4].map((star) => (
                        <svg key={star} className="h-4 w-4 text-yellow-400 fill-current" viewBox="0 0 24 24">
                          <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                        </svg>
                      ))}
                      <svg className="h-4 w-4 text-gray-300 fill-current" viewBox="0 0 24 24">
                        <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                      </svg>
                    </div>
                  </div>
                </div>
                <p className="text-gray-600 italic">"Centrally located with stunning views. The staff went above and beyond to make our anniversary special."</p>
              </div>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>;
};
export default Index;
