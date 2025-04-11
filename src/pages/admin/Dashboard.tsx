
import { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useTrip } from '@/context/TripContext';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import TripCard from '@/components/TripCard';
import { Button } from '@/components/ui/button';
import { Users, Route, Shield, AlertTriangle } from 'lucide-react';

const AdminDashboard = () => {
  const { user } = useAuth();
  const { trips } = useTrip();
  
  // Mock users for admin display
  const mockUsers = [
    { id: 'd1', name: 'Jean Dupont', email: 'jean@trajetly.com', role: 'driver', status: 'active' },
    { id: 'p1', name: 'Marie Laurent', email: 'marie@trajetly.com', role: 'passenger', status: 'active' },
    { id: 'd2', name: 'Thomas Martin', email: 'thomas@trajetly.com', role: 'driver', status: 'active' },
    { id: 'p2', name: 'Sophie Bernard', email: 'sophie@trajetly.com', role: 'passenger', status: 'warned' },
    { id: 'd3', name: 'Pierre Lefèvre', email: 'pierre@trajetly.com', role: 'driver', status: 'blocked' },
  ];
  
  // Mock reports for admin display
  const mockReports = [
    { id: 'r1', userId: 'p2', reason: 'Comportement inapproprié', date: '2025-04-05', status: 'pending' },
    { id: 'r2', userId: 'd3', reason: 'Annulations répétées', date: '2025-04-02', status: 'resolved' },
  ];
  
  // Active section state
  const [activeSection, setActiveSection] = useState<'users' | 'trips' | 'reports'>('users');

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      
      <main className="flex-grow bg-gray-50">
        {/* Dashboard Header */}
        <div className="bg-trajetly-600 text-white py-8">
          <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between">
              <div>
                <h1 className="text-2xl font-bold">Administration</h1>
                <p className="text-trajetly-100">Bienvenue, {user?.name}</p>
              </div>
            </div>
          </div>
        </div>
        
        {/* Dashboard Tabs */}
        <div className="border-b border-gray-200 bg-white">
          <div className="container mx-auto px-4">
            <nav className="flex space-x-8">
              <button
                className={`py-4 px-1 font-medium border-b-2 ${
                  activeSection === 'users'
                    ? 'border-trajetly-500 text-trajetly-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}
                onClick={() => setActiveSection('users')}
              >
                <Users className="h-5 w-5 inline mr-2" />
                Utilisateurs
              </button>
              
              <button
                className={`py-4 px-1 font-medium border-b-2 ${
                  activeSection === 'trips'
                    ? 'border-trajetly-500 text-trajetly-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}
                onClick={() => setActiveSection('trips')}
              >
                <Route className="h-5 w-5 inline mr-2" />
                Trajets
              </button>
              
              <button
                className={`py-4 px-1 font-medium border-b-2 ${
                  activeSection === 'reports'
                    ? 'border-trajetly-500 text-trajetly-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}
                onClick={() => setActiveSection('reports')}
              >
                <AlertTriangle className="h-5 w-5 inline mr-2" />
                Signalements
              </button>
            </nav>
          </div>
        </div>
        
        {/* Dashboard Content */}
        <div className="container mx-auto px-4 py-8">
          {activeSection === 'users' && (
            <div>
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold">Gestion des utilisateurs</h2>
                
                <div className="flex space-x-2">
                  <Button variant="outline">
                    <Shield className="h-4 w-4 mr-2" />
                    Exporter
                  </Button>
                </div>
              </div>
              
              <div className="bg-white rounded-lg shadow-md overflow-hidden">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Utilisateur
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Email
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Rôle
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Statut
                      </th>
                      <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {mockUsers.map((user) => (
                      <tr key={user.id}>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="font-medium text-gray-900">{user.name}</div>
                          <div className="text-sm text-gray-500">ID: {user.id}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">{user.email}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                            ${user.role === 'driver' ? 'bg-blue-100 text-blue-800' : 'bg-green-100 text-green-800'}`}
                          >
                            {user.role === 'driver' ? 'Conducteur' : 'Passager'}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                            ${user.status === 'active' 
                              ? 'bg-green-100 text-green-800' 
                              : user.status === 'warned' 
                              ? 'bg-yellow-100 text-yellow-800' 
                              : 'bg-red-100 text-red-800'}`}
                          >
                            {user.status === 'active' 
                              ? 'Actif' 
                              : user.status === 'warned' 
                              ? 'Averti' 
                              : 'Bloqué'}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                          <Button variant="ghost" className="text-trajetly-600 hover:text-trajetly-800" size="sm">
                            Détails
                          </Button>
                          {user.status !== 'blocked' && (
                            <Button variant="ghost" className="text-red-600 hover:text-red-800" size="sm">
                              Bloquer
                            </Button>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
          
          {activeSection === 'trips' && (
            <div>
              <h2 className="text-xl font-semibold mb-6">Tous les trajets</h2>
              
              <div className="space-y-6">
                {trips.map(trip => (
                  <TripCard key={trip.id} trip={trip} />
                ))}
              </div>
            </div>
          )}
          
          {activeSection === 'reports' && (
            <div>
              <h2 className="text-xl font-semibold mb-6">Signalements</h2>
              
              <div className="bg-white rounded-lg shadow-md overflow-hidden">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        ID
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Utilisateur signalé
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Raison
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Date
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Statut
                      </th>
                      <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {mockReports.map((report) => {
                      const reportedUser = mockUsers.find(u => u.id === report.userId);
                      return (
                        <tr key={report.id}>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-900">{report.id}</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="font-medium text-gray-900">{reportedUser?.name}</div>
                            <div className="text-sm text-gray-500">ID: {reportedUser?.id}</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-900">{report.reason}</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-900">{report.date}</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                              ${report.status === 'pending' ? 'bg-yellow-100 text-yellow-800' : 'bg-green-100 text-green-800'}`}
                            >
                              {report.status === 'pending' ? 'En attente' : 'Résolu'}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                            {report.status === 'pending' ? (
                              <Button variant="ghost" className="text-trajetly-600 hover:text-trajetly-800" size="sm">
                                Traiter
                              </Button>
                            ) : (
                              <Button variant="ghost" className="text-gray-500" size="sm" disabled>
                                Traité
                              </Button>
                            )}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default AdminDashboard;
