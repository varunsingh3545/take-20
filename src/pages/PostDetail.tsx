
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';

type Blog = {
  id: number;
  title: string;
  content: string;
  created_at: string;
};

export default function PostDetail() {
  const { id } = useParams<{ id: string }>();
  const [post, setPost] = useState<Blog | null>(null);

  useEffect(() => {
    if (!id) return;
    supabase.from('blogs').select('*').eq('id', id).single()
      .then(({ data }) => setPost(data as Blog));
  }, [id]);

  if (!post) return <p className="p-6">Loading…</p>;

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-4">{post.title}</h1>
      <p className="text-sm text-gray-500 mb-6">
        {new Date(post.created_at).toLocaleString()}
      </p>
      <article className="prose">{post.content}</article>
    </div>
  );
}
