
import React, { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';

interface ImageItem {
  id: string;
  url: string;
}

export default function Gallery() {
  const [images, setImages] = useState<ImageItem[]>([]);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    supabase.storage.from('gallery').list('').then(({ data }) => {
      if (!data) return;
      const files = data.map(item => ({
        id: item.id,
        url: supabase.storage.from('gallery').getPublicUrl(item.name).publicURL
      }));
      setImages(files);
    });
  }, []);

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    await supabase.storage.from('gallery').upload(file.name, file);
    setUploading(false);
    window.location.reload();
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Gallery Management</h1>
      <input type="file" onChange={handleUpload} disabled={uploading} />
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
        {images.map(img => (
          <img key={img.id} src={img.url} alt="" className="rounded-lg shadow" />
        ))}
      </div>
    </div>
  );
}
