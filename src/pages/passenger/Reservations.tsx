
import { useAuth } from '@/context/AuthContext';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Calendar, Bed } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const ReservationsPage = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  
  // Mock reservation data for hotel rooms
  const reservations = [
    {
      id: 'res1',
      roomId: '1',
      roomName: 'Deluxe Ocean View',
      roomImage: 'https://images.unsplash.com/photo-1566665797739-1674de7a421a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1074&q=80',
      checkInDate: '2025-04-18',
      checkOutDate: '2025-04-21',
      guests: 2,
      price: 199,
      status: 'confirmed',
      createdAt: '2025-04-15',
      totalPrice: 597
    },
    {
      id: 'res2',
      roomId: '3',
      roomName: 'Family Comfort Room',
      roomImage: 'https://images.unsplash.com/photo-1596394516093-501ba68a0ba6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1070&q=80',
      checkInDate: '2025-05-10',
      checkOutDate: '2025-05-15',
      guests: 3,
      price: 299,
      status: 'pending',
      createdAt: '2025-04-16',
      totalPrice: 1495
    }
  ];

  // Format date
  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { day: 'numeric', month: 'long', year: 'numeric' };
    return new Date(dateString).toLocaleDateString('fr-FR', options);
  };

  const handleCancelReservation = (reservationId: string) => {
    // In a real app, this would call an API to cancel the reservation
    console.log('Canceling reservation:', reservationId);
  };

  // Calculate nights
  const calculateNights = (checkIn: string, checkOut: string) => {
    const checkInDate = new Date(checkIn);
    const checkOutDate = new Date(checkOut);
    const diffTime = Math.abs(checkOutDate.getTime() - checkInDate.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      
      <main className="flex-grow bg-gray-50">
        {/* Page Header */}
        <div className="bg-blue-600 text-white py-8">
          <div className="container mx-auto px-4">
            <h1 className="text-2xl font-bold">My Reservations</h1>
            <p className="text-blue-100">Track the status of your current and past room reservations</p>
          </div>
        </div>
        
        {/* Reservations List */}
        <div className="container mx-auto px-4 py-8">
          {reservations.length > 0 ? (
            <div className="space-y-6">
              {reservations.map((reservation) => (
                <div key={reservation.id} className="bg-white rounded-lg shadow-md overflow-hidden">
                  <div className="p-4 bg-gray-50 border-b flex justify-between items-center">
                    <div className="flex items-center">
                      <Calendar className="h-5 w-5 text-blue-500 mr-2" />
                      <span className="text-sm text-gray-600">
                        Reservation made on {formatDate(reservation.createdAt)}
                      </span>
                    </div>
                    <div>
                      <span
                        className={`text-sm font-medium py-1 px-2 rounded-full ${
                          reservation.status === 'confirmed'
                            ? 'bg-green-100 text-green-800'
                            : reservation.status === 'pending'
                            ? 'bg-yellow-100 text-yellow-800'
                            : 'bg-red-100 text-red-800'
                        }`}
                      >
                        {reservation.status === 'confirmed'
                          ? 'Confirmed'
                          : reservation.status === 'pending'
                          ? 'Pending'
                          : 'Cancelled'}
                      </span>
                    </div>
                  </div>
                  <div className="p-4 md:p-6">
                    <div className="flex flex-col md:flex-row">
                      <div className="md:w-1/3 mb-4 md:mb-0">
                        <div className="h-48 md:h-32 overflow-hidden rounded-md">
                          <img
                            src={reservation.roomImage}
                            alt={reservation.roomName}
                            className="w-full h-full object-cover"
                          />
                        </div>
                      </div>
                      <div className="md:w-2/3 md:pl-6">
                        <h3 className="text-xl font-semibold mb-2">{reservation.roomName}</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <p className="text-sm text-gray-500">Check-in</p>
                            <p className="font-medium">{formatDate(reservation.checkInDate)}</p>
                          </div>
                          <div>
                            <p className="text-sm text-gray-500">Check-out</p>
                            <p className="font-medium">{formatDate(reservation.checkOutDate)}</p>
                          </div>
                          <div>
                            <p className="text-sm text-gray-500">Guests</p>
                            <p className="font-medium">{reservation.guests} person(s)</p>
                          </div>
                          <div>
                            <p className="text-sm text-gray-500">Length</p>
                            <p className="font-medium">{calculateNights(reservation.checkInDate, reservation.checkOutDate)} night(s)</p>
                          </div>
                        </div>
                        <div className="mt-4 pt-4 border-t border-gray-100">
                          <div className="flex justify-between items-center">
                            <div>
                              <p className="text-sm text-gray-500">Total Price</p>
                              <p className="text-lg font-semibold text-blue-600">${reservation.totalPrice}</p>
                              <p className="text-xs text-gray-500">(${reservation.price} x {calculateNights(reservation.checkInDate, reservation.checkOutDate)} nights)</p>
                            </div>
                            {reservation.status === 'pending' && (
                              <Button 
                                variant="outline" 
                                className="text-red-500 border-red-200 hover:bg-red-50"
                                onClick={() => handleCancelReservation(reservation.id)}
                              >
                                Cancel Reservation
                              </Button>
                            )}
                            {reservation.status === 'confirmed' && (
                              <Button>
                                View Details
                              </Button>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="bg-white rounded-lg shadow-md p-8 text-center">
              <Bed className="h-16 w-16 mx-auto text-gray-400 mb-4" />
              <h3 className="text-lg font-medium text-gray-800 mb-2">No Reservations</h3>
              <p className="text-gray-600 mb-6">
                You don't have any room reservations yet. Start by searching for a room that suits your needs.
              </p>
              <Button onClick={() => navigate('/search')}>
                Find a Room
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
