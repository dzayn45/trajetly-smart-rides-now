
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { useToast } from '@/hooks/use-toast';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Mail, Lock, UserCheck } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const Auth = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const { toast } = useToast();
  
  // Login form state
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  
  // Register form state
  const [registerEmail, setRegisterEmail] = useState('');
  const [registerPassword, setRegisterPassword] = useState('');
  const [registerName, setRegisterName] = useState('');
  const [registerRole, setRegisterRole] = useState<'driver' | 'passenger'>('passenger');
  
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Simple validation
    if (!loginEmail || !loginPassword) {
      toast({
        title: "Erreur",
        description: "Veuillez remplir tous les champs",
        variant: "destructive",
      });
      return;
    }
    
    // For demo purposes, just check for driver@example.com / passenger@example.com
    if (loginEmail === 'driver@example.com') {
      login('driver');
      navigate('/driver/dashboard');
      toast({
        title: "Connexion réussie",
        description: "Bienvenue sur votre espace conducteur",
      });
    } else if (loginEmail === 'passenger@example.com') {
      login('passenger');
      navigate('/passenger/dashboard');
      toast({
        title: "Connexion réussie",
        description: "Bienvenue sur votre espace passager",
      });
    } else if (loginEmail === 'admin@example.com') {
      login('admin');
      navigate('/admin/dashboard');
      toast({
        title: "Connexion réussie",
        description: "Bienvenue sur votre espace administrateur",
      });
    } else {
      // In a real app, we would validate credentials with a backend
      toast({
        title: "Erreur de connexion",
        description: "Email ou mot de passe incorrect",
        variant: "destructive",
      });
    }
  };
  
  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Simple validation
    if (!registerEmail || !registerPassword || !registerName) {
      toast({
        title: "Erreur",
        description: "Veuillez remplir tous les champs",
        variant: "destructive",
      });
      return;
    }
    
    // In a real app, we would register with a backend
    // For demo purposes, just log in with the selected role
    login(registerRole);
    
    if (registerRole === 'driver') {
      navigate('/driver/dashboard');
    } else {
      navigate('/passenger/dashboard');
    }
    
    toast({
      title: "Inscription réussie",
      description: `Bienvenue ${registerName} sur votre espace ${registerRole === 'driver' ? 'conducteur' : 'passager'}`,
    });
  };
  
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      
      <main className="flex-grow py-12 bg-gray-50">
        <div className="container max-w-md mx-auto px-4">
          <Tabs defaultValue="login" className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-8">
              <TabsTrigger value="login">Connexion</TabsTrigger>
              <TabsTrigger value="register">Inscription</TabsTrigger>
            </TabsList>
            
            <TabsContent value="login">
              <Card>
                <CardHeader className="space-y-1">
                  <CardTitle className="text-2xl font-bold text-center">Connectez-vous</CardTitle>
                  <CardDescription className="text-center">
                    Entrez votre email et mot de passe pour vous connecter
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleLogin}>
                    <div className="grid gap-4">
                      <div className="grid gap-2">
                        <Label htmlFor="login-email">Email</Label>
                        <div className="relative">
                          <Mail className="absolute left-3 top-3 h-4 w-4 text-trajetly-400" />
                          <Input
                            id="login-email"
                            type="email"
                            placeholder="exemple@email.com"
                            className="pl-9"
                            value={loginEmail}
                            onChange={(e) => setLoginEmail(e.target.value)}
                          />
                        </div>
                      </div>
                      <div className="grid gap-2">
                        <div className="flex items-center justify-between">
                          <Label htmlFor="login-password">Mot de passe</Label>
                          <Button variant="link" className="h-auto p-0 text-xs text-trajetly-500">
                            Mot de passe oublié?
                          </Button>
                        </div>
                        <div className="relative">
                          <Lock className="absolute left-3 top-3 h-4 w-4 text-trajetly-400" />
                          <Input
                            id="login-password"
                            type="password"
                            className="pl-9"
                            value={loginPassword}
                            onChange={(e) => setLoginPassword(e.target.value)}
                          />
                        </div>
                      </div>
                      <Button type="submit" className="w-full">
                        Se connecter
                      </Button>
                    </div>
                  </form>
                </CardContent>
                <CardFooter className="flex flex-col space-y-4">
                  <div className="text-sm text-center text-gray-500">
                    <span>Démo: utilisez </span>
                    <code className="text-xs bg-gray-100 p-1 rounded">driver@example.com</code>
                    <span> ou </span>
                    <code className="text-xs bg-gray-100 p-1 rounded">passenger@example.com</code>
                  </div>
                </CardFooter>
              </Card>
            </TabsContent>
            
            <TabsContent value="register">
              <Card>
                <CardHeader className="space-y-1">
                  <CardTitle className="text-2xl font-bold text-center">Créez un compte</CardTitle>
                  <CardDescription className="text-center">
                    Entrez vos informations pour créer un compte
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleRegister}>
                    <div className="grid gap-4">
                      <div className="grid gap-2">
                        <Label htmlFor="register-name">Nom complet</Label>
                        <div className="relative">
                          <UserCheck className="absolute left-3 top-3 h-4 w-4 text-trajetly-400" />
                          <Input
                            id="register-name"
                            type="text"
                            placeholder="Jean Dupont"
                            className="pl-9"
                            value={registerName}
                            onChange={(e) => setRegisterName(e.target.value)}
                          />
                        </div>
                      </div>
                      <div className="grid gap-2">
                        <Label htmlFor="register-email">Email</Label>
                        <div className="relative">
                          <Mail className="absolute left-3 top-3 h-4 w-4 text-trajetly-400" />
                          <Input
                            id="register-email"
                            type="email"
                            placeholder="exemple@email.com"
                            className="pl-9"
                            value={registerEmail}
                            onChange={(e) => setRegisterEmail(e.target.value)}
                          />
                        </div>
                      </div>
                      <div className="grid gap-2">
                        <Label htmlFor="register-password">Mot de passe</Label>
                        <div className="relative">
                          <Lock className="absolute left-3 top-3 h-4 w-4 text-trajetly-400" />
                          <Input
                            id="register-password"
                            type="password"
                            className="pl-9"
                            value={registerPassword}
                            onChange={(e) => setRegisterPassword(e.target.value)}
                          />
                        </div>
                      </div>
                      <div className="grid gap-2">
                        <Label>Je souhaite m'inscrire en tant que</Label>
                        <div className="grid grid-cols-2 gap-4">
                          <Button
                            type="button"
                            variant={registerRole === 'passenger' ? 'default' : 'outline'}
                            className={registerRole === 'passenger' ? 'bg-trajetly-600' : ''}
                            onClick={() => setRegisterRole('passenger')}
                          >
                            Passager
                          </Button>
                          <Button
                            type="button"
                            variant={registerRole === 'driver' ? 'default' : 'outline'}
                            className={registerRole === 'driver' ? 'bg-trajetly-600' : ''}
                            onClick={() => setRegisterRole('driver')}
                          >
                            Conducteur
                          </Button>
                        </div>
                      </div>
                      <Button type="submit" className="w-full">
                        S'inscrire
                      </Button>
                    </div>
                  </form>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Auth;
