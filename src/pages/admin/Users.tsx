import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from '@/hooks/use-toast';

interface User {
  id: st;
  email: st;
  role: st;
  created_at: st;
}

export default function Users() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const { data, error } = await supabase
        .from('users')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setUsers(data || []);
    } catch (error) {
      console.error('Error fetching users:', error);
      toast({
        title: "Error loading users",
        description: "Failed to load users",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const updateUserRole = async (userId: st, newRole: st) => {
    try {
      const { error } = await supabase
        .from('users')
        .update({ role: newRole })
        .eq('id', userId);

      if (error) throw error;

      setUsers(users.map(user => 
        user.id === userId ? { ...user, role: newRole } : user
      ));

      toast({
        title: "Role updated",
        description: `User role has been updated to ${newRole}`
      });
    } catch (error) {
      console.error('Error updating user role:', error);
      toast({
        title: "Error",
        description: "Failed to update user role",
        variant: "destructive"
      });
    }
  };

  const getRoleBadgeVariant = (role: st) => {
    switch (role) {
      case 'admin':
        return 'destructive';
      case 'author':
        return 'default';
      default:
        return 'secondary';
    }
  };

  if (loading) {
    return (
      <div className="-md scale-105  -200 -out btn-hover:border flex items-center justify-center p-8">
        <div className="-md scale-105  -200 -out btn-hover:border animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="-md scale-105  -200 -out btn-hover:border space-y-6">
      <div>
        <h1 className="-md scale-105  -200 -out btn-hover:border text-3xl font-bold">Users</h1>
        <p className="-md scale-105  -200 -out btn-hover:border text-muted-foreground">Manage user roles and permissions</p>
      </div>

      <div className="-md scale-105  -200 -out btn-hover:border space-y-4">
        {users.map((user) => (
          <Card key={user.id}>
            <CardHeader>
              <div className="-md scale-105  -200 -out btn-hover:border flex justify-between items-center">
                <div>
                  <CardTitle className="-md scale-105  -200 -out btn-hover:border text-lg">{user.email}</CardTitle>
                  <p className="-md scale-105  -200 -out btn-hover:border text-sm text-muted-foreground">
                    Joined {new Date(user.created_at).toLocaleDateSt()}
                  </p>
                </div>
                <div className="-md scale-105  -200 -out btn-hover:border flex items-center gap-2">
                  <Badge variant={getRoleBadgeVariant(user.role)}>
                    {user.role}
                  </Badge>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="-md scale-105  -200 -out btn-hover:border flex items-center gap-2">
                <label className="-md scale-105  -200 -out btn-hover:border text-sm font-medium">Change Role:</label>
                <Select
                  value={user.role}
                  onValueChange={(value) => updateUserRole(user.id, value)}
                >
                  <SelectTrigger className="-md scale-105  -200 -out btn-hover:border w-32">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="viewer">Viewer</SelectItem>
                    <SelectItem value="author">Author</SelectItem>
                    <SelectItem value="admin">Admin</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}