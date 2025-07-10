
import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';


const WriteBlog = () => {
  const [searchParams] = useSearchParams();
  const editId = searchParams.get('id');
  
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const blog = { title, content, date: new Date().toISOString() };

    try {
      const response = await fetch('/data/blogPosts.json');
      const existing = await response.json();
      const updated = [...existing, blog];
      await fetch('/api/save-blog', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updated),
      });
      setMessage('Blog posted successfully!');
      setTitle('');
      setContent('');
    } catch (err) {
      setMessage('Failed to post blog.');
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h2 className="text-2xl font-semibold mb-4">Write New Blog</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Title"
          className="w-full p-2 border rounded"
          required
        />
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Content"
          rows={6}
          className="w-full p-2 border rounded"
          required
        />
        <button type="submit" className="bg-blue-900 text-white px-4 py-2 rounded">
          Post Blog
        </button>
      </form>
      {message && <p className="mt-4 text-green-600">{message}</p>}
    </div>
  );
};

export default WriteBlog;
