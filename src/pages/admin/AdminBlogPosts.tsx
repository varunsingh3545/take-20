
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Link } from "react-router-dom";

type Blog = {
  id: number;
  title: string;
  created_at: string;
};

export default function AdminBlogPosts() {
  const [posts, setPosts] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);

  async function fetchPosts() {
    const { data } = await supabase.from("blogs").select("*").order("created_at",{ascending:false});
    setPosts(data as Blog[]);
    setLoading(false);
  }

  useEffect(()=>{fetchPosts();},[]);

  const handleDelete = async (id:number)=>{
    if(!confirm("Delete this post?")) return;
    await supabase.from("blogs").delete().eq("id",id);
    fetchPosts();
  }

  if(loading) return <p className="p-6">Loading…</p>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Manage Blog Posts</h1>
      <table className="min-w-full">
        <thead><tr><th className="text-left">Title</th><th>Date</th><th>Actions</th></tr></thead>
        <tbody>
          {posts.map(p=>(
            <tr key={p.id} className="border-b">
              <td>{p.title}</td>
              <td>{new Date(p.created_at).toLocaleDateString()}</td>
              <td className="space-x-2">
                <Link className="text-blue-600" to={'/admin/write?id='+p.id}>Edit</Link>
                <button onClick={()=>handleDelete(p.id)} className="text-red-600">Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
