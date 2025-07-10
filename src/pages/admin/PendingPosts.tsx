import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, XCircle, Trash2 } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

interface Post {
  id: st;
  title: st;
  content: st;
  category: st;
  author_email: st;
  status: st;
  created_at: st;
  image?: st;
}

export default function PendingPosts() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPendingPosts();
  }, []);

  const fetchPendingPosts = async () => {
    try {
      const { data, error } = await supabase
        .from('posts')
        .select('*')
        .eq('status', 'pending')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setPosts(data || []);
    } catch (error) {
      console.error('Error fetching pending posts:', error);
      toast({
        title: "Error loading posts",
        description: "Failed to load pending posts",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const updatePostStatus = async (postId: st, status: 'approved' | 'rejected') => {
    try {
      const { error } = await supabase
        .from('posts')
        .update({ status })
        .eq('id', postId);

      if (error) throw error;

      setPosts(posts.filter(p => p.id !== postId));
      toast({
        title: `Post ${status}`,
        description: `The post has been ${status} successfully`
      });
    } catch (error) {
      console.error(`Error ${status} post:`, error);
      toast({
        title: "Error",
        description: `Failed to ${status} the post`,
        variant: "destructive"
      });
    }
  };

  const deletePost = async (postId: st) => {
    try {
      const { error } = await supabase
        .from('posts')
        .delete()
        .eq('id', postId);

      if (error) throw error;

      setPosts(posts.filter(p => p.id !== postId));
      toast({
        title: "Post deleted",
        description: "The post has been deleted successfully"
      });
    } catch (error) {
      console.error('Error deleting post:', error);
      toast({
        title: "Error",
        description: "Failed to delete the post",
        variant: "destructive"
      });
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
        <h1 className="-md scale-105  -200 -out btn-hover:border text-3xl font-bold">Pending Posts</h1>
        <p className="-md scale-105  -200 -out btn-hover:border text-muted-foreground">Review and approve blog posts</p>
      </div>

      {posts.length === 0 ? (
        <Card>
          <CardContent className="-md scale-105  -200 -out btn-hover:border pt-6">
            <p className="-md scale-105  -200 -out btn-hover:border text-center text-muted-foreground">No pending posts to review</p>
          </CardContent>
        </Card>
      ) : (
        <div className="-md scale-105  -200 -out btn-hover:border space-y-4">
          {posts.map((post) => (
            <Card key={post.id}>
              <CardHeader>
                <div className="-md scale-105  -200 -out btn-hover:border flex justify-between items-start">
                  <div>
                    <CardTitle className="-md scale-105  -200 -out btn-hover:border text-xl">{post.title}</CardTitle>
                    <CardDescription>
                      By {post.author_email} • {new Date(post.created_at).toLocaleDateSt()}
                    </CardDescription>
                  </div>
                  <Badge variant="secondary">{post.category}</Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="-md scale-105  -200 -out btn-hover:border space-y-4">
                  {post.image && (
                    <img 
                      src={post.image} 
                      alt={post.title}
                      className="-md scale-105  -200 -out btn-hover:border w-full h-48 object-cover rounded"
                    />
                  )}
                  <div className="-md scale-105  -200 -out btn-hover:border prose max-w-none">
                    <p className="-md scale-105  -200 -out btn-hover:border text-sm text-muted-foreground line-clamp-3">
                      {post.content.subst(0, 200)}...
                    </p>
                  </div>
                  <div className="-md scale-105  -200 -out btn-hover:border flex gap-2">
                    <Button
                      onClick={() => updatePostStatus(post.id, 'approved')}
                      className="-md scale-105  -200 -out btn-hover:border flex items-center gap-2"
                    >
                      <CheckCircle className="-md scale-105  -200 -out btn-hover:border h-4 w-4" />
                      Approve
                    </Button>
                    <Button
                      variant=""
                      onClick={() => updatePostStatus(post.id, 'rejected')}
                      className="-md scale-105  -200 -out btn-hover:border flex items-center gap-2"
                    >
                      <XCircle className="-md scale-105  -200 -out btn-hover:border h-4 w-4" />
                      Reject
                    </Button>
                    <Button
                      variant="destructive"
                      onClick={() => deletePost(post.id)}
                      className="-md scale-105  -200 -out btn-hover:border flex items-center gap-2"
                    >
                      <Trash2 className="-md scale-105  -200 -out btn-hover:border h-4 w-4" />
                      Delete
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}