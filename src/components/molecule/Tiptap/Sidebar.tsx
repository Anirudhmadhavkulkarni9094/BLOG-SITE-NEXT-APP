import React, { useEffect, useState } from 'react';
import axios from 'axios';

interface Article {
  id: string;
  title: string;
}

interface SidebarProps {
  setData: (data: {
    title: string;
    excerpt: string;
    category: string;
    tags: string[];
    relatedArticles: { title: string; link: string }[];
    featuredImage?: { url: string } | null;
  }) => void;
  data: {
    title: string;
    excerpt: string;
    category: string;
    tags: string[];
    relatedArticles: { title: string; link: string }[];
    featuredImage?: { url: string } | null;
  };
}

function Sidebar({ setData, data }: SidebarProps) {
  const [title, setTitle] = useState('');
  const [excerpt, setExcerpt] = useState('');
  const [category, setCategory] = useState('tech');
  const [tags, setTags] = useState<string[]>([]);
  const [relatedArticles, setRelatedArticles] = useState<{ title: string; link: string }[]>([]);
  const [featuredImage, setFeaturedImage] = useState<string>('');
  const [allArticles, setAllArticles] = useState<Article[]>([]);
  const [selectedArticles, setSelectedArticles] = useState<Article[]>([]);

  const [searchTerm, setSearchTerm] = useState('');
  const [showDropdown, setShowDropdown] = useState(false);

  const filteredArticles = allArticles?.filter(
    (a) =>
      a.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
      !selectedArticles.some((sel) => sel.id === a.id)
  );

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        
        await axios.get(`/api/blog/${category}`).then(res=>{
          console.log(res.data)
          setAllArticles(res.data.blogs);
        })
      } catch (error) {
        console.error('Error fetching articles:', error);
      }
    };
  
    fetchArticles();
  }, [category]);

 const handleSelectArticle = (article: Article) => {
  if (!selectedArticles.some((a) => a.id === article.id)) {
    setSelectedArticles([...selectedArticles, article]);
    setRelatedArticles([
        ...relatedArticles,
      { title: article.title, link: `/blog/${article.id}` },
    ]);
    console.log(relatedArticles)
  }
  setSearchTerm('');
  setShowDropdown(false);
};

const handleRemoveArticle = (article: Article) => {
  setSelectedArticles(selectedArticles.filter((a) => a.id !== article.id));
  setRelatedArticles(relatedArticles.filter((ra) => ra.link !== `/blog/${article.id}`));
};

 

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    setShowDropdown(true);
  };

  useEffect(() => {
    if (
      title !== data.title ||
      excerpt !== data.excerpt ||
      category !== data.category ||
      JSON.stringify(tags) !== JSON.stringify(data.tags) ||
      JSON.stringify(relatedArticles) !== JSON.stringify(data.relatedArticles) ||
      featuredImage !== (data.featuredImage ? data.featuredImage.url : '')
    ) {
      setData({
        ...data,
        title,
        excerpt,
        category,
        tags,
        relatedArticles,
        featuredImage: featuredImage ? { url: featuredImage } : null,
      });
    }
  }, [title, excerpt, category, tags, relatedArticles, featuredImage, data, setData]);

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];

      const formData = new FormData();
      formData.append('file', file);

      try {
        const response = await axios.post('/api/upload', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });

        const uploadedImageUrl = response.data.url;
        setFeaturedImage(uploadedImageUrl);
      } catch (error) {
        console.error('Error uploading image:', error);
      }
    }
  };

  return (
    <div className="space-y-4 p-4 bg-white shadow rounded-lg w-full">
      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="w-full px-4 py-2 border border-gray-300 rounded-md"
      />

      <textarea
        placeholder="Excerpt"
        value={excerpt}
        onChange={(e) => setExcerpt(e.target.value)}
        className="w-full px-4 py-2 border border-gray-300 rounded-md"
      />

<select
  value={category}
  onChange={(e) => setCategory(e.target.value)}
  className="w-full px-4 py-2 border border-gray-300 rounded-md"
>
  <option value="">Select Category</option>
  <option value="ai">Artificial Intelligence</option>
  <option value="webdev">Web Development</option>
  <option value="mobile">Mobile App Development</option>
  <option value="cloud">Cloud & DevOps</option>
  <option value="cybersecurity">Cybersecurity</option>
  <option value="datascience">Data Science</option>
  <option value="programming">Programming</option>
  <option value="reviews">Tech Reviews</option>
  <option value="web3">Blockchain & Web3</option>
  <option value="career">Tech Careers</option>
</select>


      <input
        type="text"
        placeholder="Tags (comma-separated)"
        value={tags.join(', ')}
        onChange={(e) => setTags(e.target.value.split(',').map((tag) => tag.trim()))}
        className="w-full px-4 py-2 border border-gray-300 rounded-md"
      />

      <label className="block font-semibold">Upload Featured Image</label>
      <input
        type="file"
        onChange={handleImageUpload}
        accept="image/*"
        className="w-full px-4 py-2 border border-gray-300 rounded-md"
      />

      {featuredImage && (
        <div className="mt-2">
          <img
            src={featuredImage}
            alt="Featured"
            className="w-full h-40 object-cover rounded-md border"
          />
        </div>
      )}

      {/* Related Articles */}
      <div className="relative">
        <label className="text-sm font-medium block mb-1">🔗 Related Articles</label>
        <input
          type="text"
          placeholder="Search articles..."
          value={searchTerm}
          onChange={handleSearchChange}
          onFocus={() => setShowDropdown(true)}
          className="border p-2 rounded-md w-full"
        />

        {showDropdown && filteredArticles?.length > 0 && (
          <ul className="absolute w-full bg-white border rounded-md shadow-lg max-h-40 overflow-y-auto z-10">
            {filteredArticles.map((article) => (
              <li
                key={article.id}
                className="p-2 cursor-pointer hover:bg-gray-100"
                onClick={() => handleSelectArticle(article)}
              >
                {article.title}
              </li>
            ))}
          </ul>
        )}

        <div className="mt-2 space-y-1">
          {selectedArticles.map((article) => (
            <div
              key={article.id}
              className="flex justify-between items-center bg-gray-200 p-2 rounded-md"
            >
              <span>{article.title}</span>
              <button onClick={() => handleRemoveArticle(article)} className="text-sm text-red-500">
                ✕
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
