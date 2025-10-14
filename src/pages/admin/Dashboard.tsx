import { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Package, ShoppingCart, FolderTree } from 'lucide-react';

const AdminDashboard = () => {
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    checkAdmin();
  }, []);

  const checkAdmin = async () => {
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) {
      navigate('/auth');
      return;
    }

    const { data } = await supabase
      .from('user_roles')
      .select('role')
      .eq('user_id', session.user.id)
      .eq('role', 'admin')
      .single();

    if (!data) {
      navigate('/');
      return;
    }

    setIsAdmin(true);
    setLoading(false);
  };

  if (loading) return <div>Chargement...</div>;
  if (!isAdmin) return null;

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold mb-8">Admin Dashboard</h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Link to="/admin/products">
            <Card className="hover:shadow-lg transition-shadow cursor-pointer">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Package className="h-5 w-5" />
                  Produits
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">Gérer les produits</p>
              </CardContent>
            </Card>
          </Link>
          <Link to="/admin/categories">
            <Card className="hover:shadow-lg transition-shadow cursor-pointer">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FolderTree className="h-5 w-5" />
                  Catégories
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">Gérer les catégories</p>
              </CardContent>
            </Card>
          </Link>
          <Link to="/admin/orders">
            <Card className="hover:shadow-lg transition-shadow cursor-pointer">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <ShoppingCart className="h-5 w-5" />
                  Commandes
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">Voir les commandes</p>
              </CardContent>
            </Card>
          </Link>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default AdminDashboard;
