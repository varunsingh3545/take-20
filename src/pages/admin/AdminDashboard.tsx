import { Link } from "react-router-dom";
import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { FileText, CheckCircle, Clock, Users } from 'lucide-react';

interface DashboardStats {
  totalPosts: number;
  pendingPosts: number;
  approvedPosts: number;
  totalUsers: number;
}

export default function AdminDashboard() {
  const [stats, setStats] = useState<DashboardStats>({
    totalPosts: 0,
    pendingPosts: 0,
    approvedPosts: 0,
    totalUsers: 0
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      // Get posts stats
      const [postsResult, usersResult] = await Promise.all([
        supabase.from('posts').select('status'),
        supabase.from('users').select('id', { count: 'exact' })
      ]);

      if (postsResult.data) {
        const totalPosts = postsResult.data.length;
        const pendingPosts = postsResult.data.filter(p => p.status === 'pending').length;
        const approvedPosts = postsResult.data.filter(p => p.status === 'approved').length;
        
        setStats({
          totalPosts,
          pendingPosts,
          approvedPosts,
          totalUsers: usersResult.count || 0
        });
      }
    } catch (error) {
      console.error('Error fetching stats:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {

return (
      <div className="-md scale-105  -200 -out btn-hover:border flex items-center justify-center p-8">
        <div className="-md scale-105  -200 -out btn-hover:border animate-spin rounded-full h-8 w-8 border-b-2 border-primary"><a href="/admin/write-blog" className="bg-blue-700 text-white px-4 py-2 rounded block text-center mt-4">Write Blog</a>
</div>
      <a href="/admin/write-blog" className="bg-blue-700 text-white px-4 py-2 rounded block text-center mt-4">Write Blog</a>
</div>
    );
  }

  const statCards = [
    {
      title: 'Total Posts',
      value: stats.totalPosts,
      icon: FileText,
      description: 'All blog posts'
    },
    {
      title: 'Pending Posts',
      value: stats.pendingPosts,
      icon: Clock,
      description: 'Awaiting approval'
    },
    {
      title: 'Approved Posts',
      value: stats.approvedPosts,
      icon: CheckCircle,
      description: 'Published posts'
    },
    {
      title: 'Total Users',
      value: stats.totalUsers,
      icon: Users,
      description: 'Registered users'
    }
  ];


return (
    <div className="-md scale-105  -200 -out btn-hover:border space-y-6">
      <div>
        <h1 className="-md scale-105  -200 -out btn-hover:border text-3xl font-bold">Dashboard</h1>
        <p className="-md scale-105  -200 -out btn-hover:border text-muted-foreground">Welcome to UFSBD Admin Dashboard</p>
      <a href="/admin/write-blog" className="bg-blue-700 text-white px-4 py-2 rounded block text-center mt-4">Write Blog</a>
</div>

      <div className="-md scale-105  -200 -out btn-hover:border grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {statCards.map((card) => (
          <Card key={card.title}>
            <CardHeader className="-md scale-105  -200 -out btn-hover:border flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="-md scale-105  -200 -out btn-hover:border text-sm font-medium">
                {card.title}
              </CardTitle>
              <card.icon className="-md scale-105  -200 -out btn-hover:border h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="-md scale-105  -200 -out btn-hover:border text-2xl font-bold">{card.value}<a href="/admin/write-blog" className="bg-blue-700 text-white px-4 py-2 rounded block text-center mt-4">Write Blog</a>
</div>
              <p className="-md scale-105  -200 -out btn-hover:border text-xs text-muted-foreground">
                {card.description}
              </p>
            </CardContent>
          </Card>
        ))}
      <a href="/admin/write-blog" className="bg-blue-700 text-white px-4 py-2 rounded block text-center mt-4">Write Blog</a>
</div>
    <a href="/admin/write-blog" className="bg-blue-700 text-white px-4 py-2 rounded block text-center mt-4">Write Blog</a>
</div>
  );
}