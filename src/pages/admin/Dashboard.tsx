import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import AdminLayout from '@/components/admin/AdminLayout';
import StatsCard from '@/components/admin/StatsCard';
import { Package, ShoppingCart, FolderTree, TrendingUp } from 'lucide-react';

interface DashboardStats {
  totalProducts: number;
  totalCategories: number;
  totalOrders: number;
  pendingOrders: number;
}

interface RecentOrder {
  id: string;
  customer_name: string;
  total: number;
  status: string;
  created_at: string;
}

const AdminDashboard = () => {
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState<DashboardStats>({
    totalProducts: 0,
    totalCategories: 0,
    totalOrders: 0,
    pendingOrders: 0,
  });
  const [recentOrders, setRecentOrders] = useState<RecentOrder[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    checkAdmin();
  }, []);

  const fetchDashboardData = async () => {
    // Fetch products count
    const { count: productsCount } = await supabase
      .from('products')
      .select('*', { count: 'exact', head: true });

    // Fetch categories count
    const { count: categoriesCount } = await supabase
      .from('categories')
      .select('*', { count: 'exact', head: true });

    // Fetch orders count and pending orders
    const { count: ordersCount } = await supabase
      .from('orders')
      .select('*', { count: 'exact', head: true });

    const { count: pendingCount } = await supabase
      .from('orders')
      .select('*', { count: 'exact', head: true })
      .eq('status', 'pending');

    // Fetch recent orders
    const { data: ordersData } = await supabase
      .from('orders')
      .select('id, customer_name, total, status, created_at')
      .order('created_at', { ascending: false })
      .limit(5);

    setStats({
      totalProducts: productsCount || 0,
      totalCategories: categoriesCount || 0,
      totalOrders: ordersCount || 0,
      pendingOrders: pendingCount || 0,
    });

    if (ordersData) setRecentOrders(ordersData);
  };

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
      .maybeSingle();

    if (!data) {
      navigate('/');
      return;
    }

    setIsAdmin(true);
    setLoading(false);
    fetchDashboardData();
  };

  if (loading) return <div className="flex items-center justify-center min-h-screen">Chargement...</div>;
  if (!isAdmin) return null;

  return (
    <AdminLayout>
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-bold mb-2">Dashboard</h1>
          <p className="text-muted-foreground">Vue d'ensemble de votre boutique</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatsCard
            title="Total Produits"
            value={stats.totalProducts}
            icon={Package}
            description="Produits dans le catalogue"
          />
          <StatsCard
            title="Total Catégories"
            value={stats.totalCategories}
            icon={FolderTree}
            description="Catégories actives"
          />
          <StatsCard
            title="Total Commandes"
            value={stats.totalOrders}
            icon={ShoppingCart}
            description="Commandes reçues"
          />
          <StatsCard
            title="Commandes en attente"
            value={stats.pendingOrders}
            icon={TrendingUp}
            description="À confirmer"
          />
        </div>

        {/* Recent Orders Table */}
        <Card>
          <CardHeader>
            <CardTitle>Commandes récentes</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Client</TableHead>
                  <TableHead>Total</TableHead>
                  <TableHead>Statut</TableHead>
                  <TableHead>Date</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {recentOrders.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={4} className="text-center text-muted-foreground">
                      Aucune commande pour le moment
                    </TableCell>
                  </TableRow>
                ) : (
                  recentOrders.map((order) => (
                    <TableRow key={order.id}>
                      <TableCell className="font-medium">{order.customer_name}</TableCell>
                      <TableCell>{order.total} MAD</TableCell>
                      <TableCell>
                        <Badge variant={order.status === 'pending' ? 'secondary' : 'default'}>
                          {order.status}
                        </Badge>
                      </TableCell>
                      <TableCell>{new Date(order.created_at).toLocaleDateString()}</TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
};

export default AdminDashboard;
