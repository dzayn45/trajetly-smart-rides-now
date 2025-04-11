
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import TripSearch from '@/components/TripSearch';

const SearchPage = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      
      <main className="flex-grow bg-gray-50">
        {/* Page Header */}
        <div className="bg-trajetly-600 text-white py-8">
          <div className="container mx-auto px-4">
            <h1 className="text-2xl font-bold">Rechercher un trajet</h1>
            <p className="text-trajetly-100">Trouvez le trajet parfait adapté à vos besoins</p>
          </div>
        </div>
        
        {/* Search Form */}
        <div className="container mx-auto px-4 py-8">
          <TripSearch />
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default SearchPage;
