import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { useToast } from '@/hooks/use-toast';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Pencil, Trash2, Plus } from 'lucide-react';

const AdminProducts = () => {
  const [products, setProducts] = useState<any[]>([]);
  const [categories, setCategories] = useState<any[]>([]);
  const [isAdmin, setIsAdmin] = useState(false);
  const [open, setOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<any>(null);
  const [formData, setFormData] = useState({ title: '', price: '', old_price: '', image_url: '', stock_status: 'En stock', category_id: '', popularity: 0 });
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    checkAdmin();
    fetchProducts();
    fetchCategories();
  }, []);

  const checkAdmin = async () => {
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) {
      navigate('/auth');
      return;
    }
    const { data } = await supabase.from('user_roles').select('role').eq('user_id', session.user.id).eq('role', 'admin').single();
    if (!data) {
      navigate('/');
      return;
    }
    setIsAdmin(true);
  };

  const fetchProducts = async () => {
    const { data } = await supabase.from('products').select('*').order('created_at', { ascending: false });
    if (data) setProducts(data);
  };

  const fetchCategories = async () => {
    const { data } = await supabase.from('categories').select('*');
    if (data) setCategories(data);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const submitData = {
        title: formData.title,
        price: parseFloat(formData.price),
        old_price: formData.old_price ? parseFloat(formData.old_price) : null,
        image_url: formData.image_url,
        stock_status: formData.stock_status,
        category_id: formData.category_id || null,
        popularity: formData.popularity
      };

      if (editingProduct) {
        const { error } = await supabase.from('products').update(submitData).eq('id', editingProduct.id);
        if (error) throw error;
        toast({ title: 'Produit mis à jour' });
      } else {
        const { error } = await supabase.from('products').insert(submitData);
        if (error) throw error;
        toast({ title: 'Produit créé' });
      }
      setOpen(false);
      setEditingProduct(null);
      setFormData({ title: '', price: '', old_price: '', image_url: '', stock_status: 'En stock', category_id: '', popularity: 0 });
      fetchProducts();
    } catch (error: any) {
      toast({ title: 'Erreur', description: error.message, variant: 'destructive' });
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Supprimer ce produit?')) return;
    const { error } = await supabase.from('products').delete().eq('id', id);
    if (error) {
      toast({ title: 'Erreur', description: error.message, variant: 'destructive' });
    } else {
      toast({ title: 'Produit supprimé' });
      fetchProducts();
    }
  };

  if (!isAdmin) return null;

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">Produits</h1>
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
              <Button onClick={() => { setEditingProduct(null); setFormData({ title: '', price: '', old_price: '', image_url: '', stock_status: 'En stock', category_id: '', popularity: 0 }); }}>
                <Plus className="h-4 w-4 mr-2" /> Nouveau
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>{editingProduct ? 'Modifier' : 'Créer'} Produit</DialogTitle>
              </DialogHeader>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <Label>Titre</Label>
                  <Input value={formData.title} onChange={(e) => setFormData({ ...formData, title: e.target.value })} required />
                </div>
                <div>
                  <Label>Prix</Label>
                  <Input type="number" step="0.01" value={formData.price} onChange={(e) => setFormData({ ...formData, price: e.target.value })} required />
                </div>
                <div>
                  <Label>Ancien Prix</Label>
                  <Input type="number" step="0.01" value={formData.old_price} onChange={(e) => setFormData({ ...formData, old_price: e.target.value })} />
                </div>
                <div>
                  <Label>Image URL</Label>
                  <Input value={formData.image_url} onChange={(e) => setFormData({ ...formData, image_url: e.target.value })} />
                </div>
                <div>
                  <Label>Catégorie</Label>
                  <select 
                    className="w-full p-2 border rounded" 
                    value={formData.category_id} 
                    onChange={(e) => setFormData({ ...formData, category_id: e.target.value })}
                  >
                    <option value="">Aucune catégorie</option>
                    {categories.map((cat) => (
                      <option key={cat.id} value={cat.id}>{cat.name}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <Label>Popularité</Label>
                  <Input type="number" value={formData.popularity} onChange={(e) => setFormData({ ...formData, popularity: parseInt(e.target.value) })} />
                </div>
                <Button type="submit" className="w-full">Enregistrer</Button>
              </form>
            </DialogContent>
          </Dialog>
        </div>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Titre</TableHead>
              <TableHead>Prix</TableHead>
              <TableHead>Stock</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {products.map((product) => (
              <TableRow key={product.id}>
                <TableCell>{product.title}</TableCell>
                <TableCell>{product.price} MAD</TableCell>
                <TableCell>{product.stock_status}</TableCell>
                <TableCell>
                <Button variant="ghost" size="icon" onClick={() => { 
                  setEditingProduct(product); 
                  setFormData({
                    title: product.title,
                    price: product.price?.toString() || '',
                    old_price: product.old_price?.toString() || '',
                    image_url: product.image_url || '',
                    stock_status: product.stock_status || 'En stock',
                    category_id: product.category_id || '',
                    popularity: product.popularity || 0
                  }); 
                  setOpen(true); 
                }}>
                  <Pencil className="h-4 w-4" />
                </Button>
                  <Button variant="ghost" size="icon" onClick={() => handleDelete(product.id)}>
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </main>
      <Footer />
    </div>
  );
};

export default AdminProducts;
