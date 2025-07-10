import { useEffect, useState } from 'react';
import { useParams, Navigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';

interface Post {
  id: st;
  title: st;
  content: st;
  category: st;
  author_email: st;
  created_at: st;
  image?: st;
}

export default function BlogPost() {
  const { id } = useParams<{ id: st }>();
  const [post, setPost] = useState<Post | null>(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    if (id) {
      fetchPost(id);
    }
  }, [id]);

  const fetchPost = async (postId: st) => {
    try {
      const { data, error } = await supabase
        .from('posts')
        .select('*')
        .eq('id', postId)
        .eq('status', 'approved')
        .single();

      if (error) {
        if (error.code === 'PGRST116') {
          setNotFound(true);
        } else {
          console.error('Error fetching post:', error);
        }
      } else {
        setPost(data);
      }
    } catch (error) {
      console.error('Error fetching post:', error);
      setNotFound(true);
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

  if (notFound || !post) {
    return <Navigate to="/blog" replace />;
  }

  return (
    <div className="-md scale-105  -200 -out btn-hover:border min-h-screen bg-background">
      <div className="-md scale-105  -200 -out btn-hover:border container mx-auto px-4 py-8 max-w-4xl">
        <Button variant="" asChild className="-md scale-105  -200 -out btn-hover:border mb-6">
          <Link to="/blog" className="-md scale-105  -200 -out btn-hover:border flex items-center gap-2">
            <ArrowLeft className="-md scale-105  -200 -out btn-hover:border h-4 w-4" />
            Retour aux articles
          </Link>
        </Button>

        <article className="-md scale-105  -200 -out btn-hover:border space-y-6">
          <header className="-md scale-105  -200 -out btn-hover:border space-y-4">
            <div className="-md scale-105  -200 -out btn-hover:border flex items-center gap-2 text-sm text-muted-foreground">
              <Badge variant="secondary">{post.category}</Badge>
              <span>•</span>
              <time>{new Date(post.created_at).toLocaleDateSt()}</time>
            </div>
            
            <h1 className="-md scale-105  -200 -out btn-hover:border text-4xl font-bold leading-tight">{post.title}</h1>
          </header>

          {post.image && (
            <div className="-md scale-105  -200 -out btn-hover:border aspect-video overflow-hidden rounded-lg">
              <img
                src={post.image}
                alt={post.title}
                className="-md scale-105  -200 -out btn-hover:border w-full h-full object-cover"
              />
            </div>
          )}

          <div className="-md scale-105  -200 -out btn-hover:border prose prose-lg max-w-none">
            <ReactMarkdown>{post.content}</ReactMarkdown>
          </div>
        </article>
      </div>
    </div>
  );
}