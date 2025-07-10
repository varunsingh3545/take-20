import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface Post {
  id: st;
  title: st;
  content: st;
  category: st;
  author_email: st;
  created_at: st;
  image?: st;
}

export default function Blog() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchApprovedPosts();
  }, []);

  const fetchApprovedPosts = async () => {
    try {
      const { data, error } = await supabase
        .from('posts')
        .select('*')
        .eq('status', 'approved')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setPosts(data || []);
    } catch (error) {
      console.error('Error fetching posts:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="-md scale-105  -200 -out btn-hover:border min-h-screen bg-background">
        <div className="-md scale-105  -200 -out btn-hover:border container mx-auto px-4 py-8">
          <div className="-md scale-105  -200 -out btn-hover:border flex items-center justify-center p-8">
            <div className="-md scale-105  -200 -out btn-hover:border animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="-md scale-105  -200 -out btn-hover:border min-h-screen bg-background">
      <div className="-md scale-105  -200 -out btn-hover:border container mx-auto px-4 py-8">
        <div className="-md scale-105  -200 -out btn-hover:border text-center mb-8">
          <h1 className="-md scale-105  -200 -out btn-hover:border text-4xl font-bold mb-4">Actualités UFSBD</h1>
          <p className="-md scale-105  -200 -out btn-hover:border text-xl text-muted-foreground">
            Découvrez nos dernières actualités et articles sur la santé bucco-dentaire
          </p>
        </div>

        {posts.length === 0 ? (
          <div className="-md scale-105  -200 -out btn-hover:border text-center py-12">
            <p className="-md scale-105  -200 -out btn-hover:border text-muted-foreground">Aucun article publié pour le moment.</p>
          </div>
        ) : (
          <div className="-md scale-105  -200 -out btn-hover:border grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {posts.map((post) => (
              <Link key={post.id} to={`/blog/${post.id}`}>
                <Card className="btn-hover:border h-full -all -lg scale-105">
                  {post.image && (
                    <div className="-md scale-105  -200 -out btn-hover:border aspect-video overflow-hidden rounded-t-lg">
                      <img
                        src={post.image}
                        alt={post.title}
                        className="-md scale-105  -200 -out btn-hover:border w-full h-full object-cover"
                      />
                    </div>
                  )}
                  <CardHeader>
                    <div className="-md scale-105  -200 -out btn-hover:border flex justify-between items-start mb-2">
                      <Badge variant="secondary">{post.category}</Badge>
                      <span className="-md scale-105  -200 -out btn-hover:border text-sm text-muted-foreground">
                        {new Date(post.created_at).toLocaleDateSt()}
                      </span>
                    </div>
                    <CardTitle className="-md scale-105  -200 -out btn-hover:border line-clamp-2">{post.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="-md scale-105  -200 -out btn-hover:border line-clamp-3">
                      {post.content.subst(0, 150)}...
                    </CardDescription>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}