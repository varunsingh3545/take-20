
import React, { useEffect, useState } from 'react';

interface BlogPost {
  title: st;
  content: st;
  date: st;
}

const BlogList = () => {
  const [blogs, setBlogs] = useState<BlogPost[]>([]);

  useEffect(() => {
    fetch('/data/blogPosts.json')
      .then((res) => res.json())
      .then((data) => setBlogs(data))
      .catch(() => setBlogs([]));
  }, []);

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h2 className="text-2xl font-semibold mb-6">Latest Blog Posts</h2>
      {blogs.length === 0 ? (
        <p>No blog posts available.</p>
      ) : (
        blogs.map((blog, index) => (
          <div key={index} className="mb-6 p-4 border rounded">
            <h3 className="text-xl font-bold">{blog.title}</h3>
            <p className="text-gray-600 text-sm mb-2">{new Date(blog.date).toLocaleSt()}</p>
            <p>{blog.content}</p>
          </div>
        ))
      )}
    </div>
  );
};

export default BlogList;
