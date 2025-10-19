import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { Loader2 } from 'lucide-react';

const AdminSetup = () => {
  const [loading, setLoading] = useState(true);
  const [setupDone, setSetupDone] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    checkAndSetupAdmin();
  }, []);

  const checkAndSetupAdmin = async () => {
    try {
      // Check if admin user already exists
      const { data: existingRole } = await supabase
        .from('user_roles')
        .select('*')
        .eq('role', 'admin')
        .single();

      if (existingRole) {
        setSetupDone(true);
        setLoading(false);
        return;
      }

      // Try to sign up the admin user
      const { data: authData, error: signUpError } = await supabase.auth.signUp({
        email: 'adminbht@bhtechnology.local',
        password: 'adminbhtechnology',
        options: {
          emailRedirectTo: `${window.location.origin}/admin`
        }
      });

      if (signUpError) {
        // User might already exist, try to sign in
        const { data: signInData, error: signInError } = await supabase.auth.signInWithPassword({
          email: 'adminbht@bhtechnology.local',
          password: 'adminbhtechnology'
        });

        if (signInError) {
          throw signInError;
        }

        // Assign admin role if user exists
        if (signInData.user) {
          const { error: roleError } = await supabase
            .from('user_roles')
            .insert({ user_id: signInData.user.id, role: 'admin' })
            .select()
            .single();

          if (roleError && !roleError.message.includes('duplicate')) {
            throw roleError;
          }

          toast({ title: 'Admin configuré avec succès!' });
          setSetupDone(true);
          setTimeout(() => navigate('/admin'), 2000);
        }
      } else if (authData.user) {
        // New user created, assign admin role
        const { error: roleError } = await supabase
          .from('user_roles')
          .insert({ user_id: authData.user.id, role: 'admin' })
          .select()
          .single();

        if (roleError) {
          throw roleError;
        }

        toast({ title: 'Admin créé avec succès!' });
        setSetupDone(true);
        setTimeout(() => navigate('/admin'), 2000);
      }
    } catch (error: any) {
      toast({ 
        title: 'Erreur', 
        description: error.message, 
        variant: 'destructive' 
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Configuration Admin</CardTitle>
          <CardDescription>
            Configuration automatique du compte administrateur
          </CardDescription>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="flex flex-col items-center gap-4 py-8">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
              <p className="text-sm text-muted-foreground">Configuration en cours...</p>
            </div>
          ) : setupDone ? (
            <div className="space-y-4">
              <p className="text-sm text-green-600">✓ Admin configuré avec succès!</p>
              <div className="space-y-2 p-4 bg-muted rounded-lg">
                <p className="text-sm font-medium">Identifiants Admin:</p>
                <p className="text-xs">Email: adminbht@bhtechnology.local</p>
                <p className="text-xs">Mot de passe: adminbhtechnology</p>
              </div>
              <Button onClick={() => navigate('/admin')} className="w-full">
                Accéder au panel admin
              </Button>
            </div>
          ) : (
            <Button onClick={checkAndSetupAdmin} className="w-full">
              Réessayer
            </Button>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminSetup;
