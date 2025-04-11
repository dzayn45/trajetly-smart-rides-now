
import { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useToast } from '@/hooks/use-toast';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Card, CardHeader, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { UserRound, Mail, Calendar, Star, Edit, Save, X } from 'lucide-react';
import Header from '@/components/Header';

const ProfilePage = () => {
  const { user, isAuthenticated } = useAuth();
  const { toast } = useToast();
  const [isEditing, setIsEditing] = useState(false);
  const [editedUser, setEditedUser] = useState({
    name: user?.name || '',
    email: user?.email || '',
  });

  if (!isAuthenticated || !user) {
    return (
      <div className="container mx-auto px-4 py-8">
        <Header />
        <div className="flex flex-col items-center justify-center min-h-[60vh]">
          <h1 className="text-2xl font-semibold mb-4">Profil non disponible</h1>
          <p className="text-gray-500 mb-6">Veuillez vous connecter pour accéder à votre profil.</p>
          <Button asChild>
            <a href="/auth">Se connecter</a>
          </Button>
        </div>
      </div>
    );
  }

  const handleEditToggle = () => {
    if (isEditing) {
      // Cancel edit
      setEditedUser({
        name: user.name,
        email: user.email,
      });
    }
    setIsEditing(!isEditing);
  };

  const handleSaveProfile = () => {
    // In a real application, you would call an API to update the user profile
    // For this demo, we'll just show a toast notification
    toast({
      title: "Profil mis à jour",
      description: "Vos informations ont été enregistrées.",
    });
    setIsEditing(false);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setEditedUser(prev => ({ ...prev, [name]: value }));
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <Header />
      <div className="max-w-3xl mx-auto mt-8">
        <h1 className="text-3xl font-bold mb-8 text-trajetly-600">Mon Profil</h1>
        
        <Card className="shadow-md">
          <CardHeader className="flex flex-col sm:flex-row items-center gap-6 pb-6 border-b">
            <Avatar className="h-24 w-24">
              {user.avatar ? (
                <AvatarImage src={user.avatar} alt={user.name} />
              ) : (
                <AvatarFallback className="bg-trajetly-100 text-trajetly-600 text-2xl">
                  {user.name.substring(0, 2).toUpperCase()}
                </AvatarFallback>
              )}
            </Avatar>
            
            <div className="text-center sm:text-left">
              <h2 className="text-2xl font-bold">{user.name}</h2>
              <p className="text-gray-500">{user.role === 'driver' ? 'Conducteur' : user.role === 'passenger' ? 'Passager' : 'Administrateur'}</p>
              
              {user.rating && (
                <div className="flex items-center justify-center sm:justify-start mt-1">
                  <Star className="h-4 w-4 text-yellow-500 mr-1 fill-yellow-500" />
                  <span>{user.rating.toFixed(1)}</span>
                </div>
              )}
            </div>
            
            {!isEditing ? (
              <Button onClick={handleEditToggle} variant="outline" className="ml-auto">
                <Edit className="h-4 w-4 mr-2" />
                Modifier
              </Button>
            ) : (
              <div className="flex space-x-2 ml-auto">
                <Button onClick={handleSaveProfile} variant="default">
                  <Save className="h-4 w-4 mr-2" />
                  Enregistrer
                </Button>
                <Button onClick={handleEditToggle} variant="outline">
                  <X className="h-4 w-4 mr-2" />
                  Annuler
                </Button>
              </div>
            )}
          </CardHeader>
          
          <CardContent className="pt-6 space-y-6">
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="name" className="flex items-center gap-2 mb-2">
                    <UserRound className="h-4 w-4 text-trajetly-500" />
                    Nom
                  </Label>
                  {isEditing ? (
                    <Input 
                      id="name" 
                      name="name" 
                      value={editedUser.name} 
                      onChange={handleChange} 
                    />
                  ) : (
                    <p className="text-gray-800 py-2">{user.name}</p>
                  )}
                </div>
                
                <div>
                  <Label htmlFor="email" className="flex items-center gap-2 mb-2">
                    <Mail className="h-4 w-4 text-trajetly-500" />
                    Email
                  </Label>
                  {isEditing ? (
                    <Input 
                      id="email" 
                      name="email" 
                      type="email" 
                      value={editedUser.email} 
                      onChange={handleChange} 
                    />
                  ) : (
                    <p className="text-gray-800 py-2">{user.email}</p>
                  )}
                </div>
              </div>

              <div>
                <Label className="flex items-center gap-2 mb-2">
                  <Calendar className="h-4 w-4 text-trajetly-500" />
                  Membre depuis
                </Label>
                <p className="text-gray-800 py-2">
                  {new Date(user.memberSince || '').toLocaleDateString('fr-FR', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </p>
              </div>
            </div>
          </CardContent>
          
          <CardFooter className="border-t pt-6 flex justify-center md:justify-start">
            <p className="text-sm text-gray-500">
              Les informations fournies sont utilisées conformément à notre politique de confidentialité.
            </p>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default ProfilePage;
