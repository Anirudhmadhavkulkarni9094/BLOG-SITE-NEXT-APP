/* eslint-disable */
"use client";
import React, { useEffect, useState, useRef } from "react";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import axios from "axios";
import { upload } from "@vercel/blob/client";

interface ContentBlock {
  type: "CoreParagraph" | "CoreImage";
  content: string;
}

interface Article {
  title: string;
  link: string;
}

function Page() {
  const [content, setContent] = useState<ContentBlock[]>([]);
  const [title, setTitle] = useState<string>("");
  const router = useRouter();
  const [articles, setArticles] = useState<Article[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [filteredArticles, setFilteredArticles] = useState<Article[]>([]);
  const [showDropdown, setShowDropdown] = useState<boolean>(false);
  const [selectedArticles, setSelectedArticles] = useState<Article[]>([]);
  const [category, setCategory] = useState<string>("");
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    async function fetchArticles() {
      try {
        const res = await fetch("/articles.json");
        const data: Article[] = await res.json();
        setArticles(data);
        setFilteredArticles(data);
      } catch (error) {
        console.error("Error loading articles:", error);
      }
    }
    fetchArticles();
  }, []);

  const handleSavePost = async () => {
    let updatedContent = [...content];

    const uploadImage = async (base64: string) => {
      const blob = await fetch(base64);
      const file = await blob.blob();

      const formData = new FormData();
      formData.append("file", file);

      const response = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();
      return data.url;
    };

    updatedContent = await Promise.all(
      content.map(async (block) => {
        if (block.type === "CoreImage" && block.content.startsWith("data:image")) {
          const imageUrl = await uploadImage(block.content);
          return { ...block, content: imageUrl };
        }
        return block;
      })
    );

    const post = {
      title,
      category,
      featuredImage,
      content: updatedContent,
      relatedArticle: selectedArticles,
    };

    try {
      const { data } = await axios.post("/api/blog", post, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      toast.success("Post saved successfully!");
      router.push("/content-manager/posts");
      console.log("Post saved successfully:", data);
    } catch (error: any) {
      console.error("Error saving post:", error.response?.data || error.message);
      toast.error("Failed to save post!");
    }
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setShowDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value.toLowerCase();
    setSearchTerm(query);
    setShowDropdown(true);

    setFilteredArticles(
      query === ""
        ? articles
        : articles.filter((article) =>
            article.title.toLowerCase().includes(query)
          )
    );
  };

  const handleSelectArticle = (article: Article) => {
    if (!selectedArticles.some((a) => a.title === article.title)) {
      setSelectedArticles([...selectedArticles, article]);
    }
    setSearchTerm("");
    setShowDropdown(false);
  };

  const handleRemoveArticle = (articleToRemove: Article) => {
    setSelectedArticles(
      selectedArticles.filter(
        (article) => article.title !== articleToRemove.title
      )
    );
  };

  const [featuredImage, setFeaturedImage] = useState<string | null>(null);

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();
      setFeaturedImage(data.url);
      console.log("Image uploaded successfully:", data.url);
    } catch (err) {
      console.error("Error uploading featured image:", err);
    }
  };

  return (
    <div className="p-6 flex gap-10">
      <div className="w-3/4">
        <h2 className="text-xl font-bold mb-4">Create Your Blog</h2>

        <div className="space-y-4">
          {content.map((block, index) => (
            <div
              key={index}
              className="bg-gray-100 p-4 rounded-md relative"
            >
              <button
                className="absolute top-0 right-0 cursor-pointer bg-red-600 text-white p-2 rounded-lg text-sm"
                onClick={() =>
                  setContent(content.filter((_, i) => i !== index))
                }
              >
                ✕ Remove
              </button>

              {block.type === "CoreParagraph" ? (
                <textarea
                  className="w-full p-2 rounded-md border focus:ring-2 focus:ring-blue-400"
                  placeholder="Enter text here..."
                  value={block.content}
                  onChange={(e) => {
                    const updatedContent = [...content];
                    updatedContent[index].content = e.target.value;
                    setContent(updatedContent);
                  }}
                  autoFocus
                />
              ) : (
                <div className="flex flex-col items-center">
                  <input
                    type="file"
                    accept="image/*"
                    className="w-full border-2 p-2 rounded-md"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) {
                        const reader = new FileReader();
                        reader.onloadend = () => {
                          const updatedContent = [...content];
                          updatedContent[index].content =
                            reader.result as string;
                          setContent(updatedContent);
                        };
                        reader.readAsDataURL(file);
                      }
                    }}
                  />
                  {block.content && (
                    <img
                      src={block.content}
                      alt="Uploaded Preview"
                      className="mt-2 rounded-md w-48"
                    />
                  )}
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="mt-4 flex gap-2">
          <button
            onClick={() =>
              setContent([...content, { type: "CoreParagraph", content: "" }])
            }
            className="bg-blue-500 text-white p-2 rounded-md cursor-pointer hover:bg-blue-600"
          >
            ➕ Add Text
          </button>
          <button
            onClick={() =>
              setContent([...content, { type: "CoreImage", content: "" }])
            }
            className="bg-green-500 text-white p-2 rounded-md cursor-pointer hover:bg-green-600"
          >
            🖼️ Add Image
          </button>
          <div>
            <button
              className="bg-green-500 text-white p-2 rounded-md cursor-pointer hover:bg-green-600"
              onClick={handleSavePost}
            >
              Save
            </button>
          </div>
        </div>
      </div>

      <div className="w-1/4 space-y-4" ref={dropdownRef}>
        <div className="flex flex-col gap-2">
          <label>Title</label>
          <input
            placeholder="Enter post title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="border p-2 rounded-md focus:ring-2 focus:ring-blue-400"
          ></input>
        </div>
        <div className="flex flex-col gap-2">
          <label className="font-medium">Featured Image</label>
          <input
            type="file"
            accept="image/*"
            className="border p-2 rounded-md focus:ring-2 focus:ring-blue-400"
            onChange={handleImageChange}
          />
          {featuredImage && (
            <div className="relative w-fit">
              <img
                src={featuredImage}
                alt="Featured Preview"
                className="mt-2 rounded-md w-48"
              />
              <button
                onClick={() => {
                  setFeaturedImage(null);
                }}
                className="absolute top-0 right-0 bg-white rounded-full border-2 cursor-pointer"
              >
                ❌
              </button>
            </div>
          )}
        </div>
        <div>
          <label htmlFor="Category">Category name</label>
          <input
            placeholder="Enter Category"
            onChange={(e) => {
              setCategory(e.target.value);
            }}
            className="border p-2 rounded-md w-full focus:ring-2 focus:ring-blue-400"
          ></input>
        </div>
        <div>
          <label className="text-sm font-medium">🔗 Related Articles</label>
          <input
            type="text"
            placeholder="Search articles..."
            value={searchTerm}
            onChange={handleSearchChange}
            onFocus={() => setShowDropdown(true)}
            className="border p-2 rounded-md w-full focus:ring-2 focus:ring-blue-400"
          />

          {showDropdown && filteredArticles.length > 0 && (
            <ul className="absolute bg-white border rounded-md shadow-lg max-h-40 z-10">
              {filteredArticles.map((article, index) => (
                <li
                  key={index}
                  className="p-2 cursor-pointer hover:bg-gray-100"
                  onClick={() => handleSelectArticle(article)}
                >
                  {article.title}
                </li>
              ))}
            </ul>
          )}

          <div>
            {selectedArticles.map((article) => (
              <div
                key={article.title}
                className="p-2 flex justify-between m-2 bg-gray-200 rounded-md"
              >
                <a href={article.link} className="text-blue-500 underline">
                  {article.title}
                </a>
                <button
                  onClick={() => handleRemoveArticle(article)}
                  className="cursor-pointer"
                >
                  ❌
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Page;
