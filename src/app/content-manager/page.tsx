"use client";
import React, { useEffect, useState, useRef } from "react";
import { DragDropContext, Droppable, Draggable, DropResult } from "@hello-pangea/dnd";

interface ContentBlock {
  type: "text" | "image";
  value: string;
}

interface Article {
  title: string;
  link: string;
}

function Page() {
  const [content, setContent] = useState<ContentBlock[]>([]);
  const [title, setTitle] = useState<string>("");

  const [articles, setArticles] = useState<Article[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [filteredArticles, setFilteredArticles] = useState<Article[]>([]);
  const [showDropdown, setShowDropdown] = useState<boolean>(false);
  const [selectedArticles, setSelectedArticles] = useState<Article[]>([]);

  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    async function fetchArticles() {
      try {
        const res = await fetch("./articles.json");
        const data: Article[] = await res.json();
        setArticles(data);
        setFilteredArticles(data);
      } catch (error) {
        console.error("Error loading articles:", error);
      }
    }
    fetchArticles();
  }, []);

  // Close dropdown when clicking outside
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

  // Handle Reordering
  const onDragEnd = (result: DropResult<string>, type: "content" | "articles") => {
    if (!result.destination) return;

    if (type === "content") {
      const reorderedContent = [...content];
      const [movedItem] = reorderedContent.splice(result.source.index, 1);
      reorderedContent.splice(result.destination.index, 0, movedItem);
      setContent(reorderedContent);
    } else if (type === "articles") {
      const reorderedArticles = [...selectedArticles];
      const [movedItem] = reorderedArticles.splice(result.source.index, 1);
      reorderedArticles.splice(result.destination.index, 0, movedItem);
      setSelectedArticles(reorderedArticles);
    }
  };
  const [featuredImage, setFeaturedImage] = useState<string | null>(null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setFeaturedImage(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="p-6 flex gap-10">
      {/* Left: Content Blocks */}
      <div className="w-3/4">
        <h2 className="text-xl font-bold mb-4">Create Your Blog</h2>

        <DragDropContext onDragEnd={(result) => onDragEnd(result, "content")}>
          <Droppable droppableId="contentBlocks">
            {(provided) => (
              <div
                {...provided.droppableProps}
                ref={provided.innerRef}
                className="space-y-4"
              >
                {content.map((block, index) => (
                  <Draggable
                    key={index}
                    draggableId={String(index)}
                    index={index}
                  >
                    {(provided) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
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

                        {block.type === "text" ? (
                          <textarea
                            className="w-full p-2 rounded-md border focus:ring-2 focus:ring-blue-400"
                            placeholder="Enter text here..."
                            value={block.value}
                            onChange={(e) => {
                              const updatedContent = [...content];
                              updatedContent[index].value = e.target.value;
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
                                    updatedContent[index].value =
                                      reader.result as string;
                                    setContent(updatedContent);
                                  };
                                  reader.readAsDataURL(file);
                                }
                              }}
                            />
                            {block.value && (
                              <img
                                src={block.value}
                                alt="Uploaded Preview"
                                className="mt-2 rounded-md w-48"
                              />
                            )}
                          </div>
                        )}
                      </div>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>

        <div className="mt-4 flex gap-2">
          <button
            onClick={() =>
              setContent([...content, { type: "text", value: "" }])
            }
            className="bg-blue-500 text-white p-2 rounded-md cursor-pointer hover:bg-blue-600"
          >
            ➕ Add Text
          </button>
          <button
            onClick={() =>
              setContent([...content, { type: "image", value: "" }])
            }
            className="bg-green-500 text-white p-2 rounded-md cursor-pointer hover:bg-green-600"
          >
            🖼️ Add Image
          </button>
        </div>
      </div>

      {/* Right: Related Articles */}
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

          <DragDropContext
            onDragEnd={(result) => onDragEnd(result, "articles")}
          >
            <Droppable droppableId="selectedArticles">
              {(provided) => (
                <div ref={provided.innerRef} {...provided.droppableProps}>
                  {selectedArticles.map((article, index) => (
                    <Draggable
                      key={article.title}
                      draggableId={article.title}
                      index={index}
                    >
                      {(provided) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          className="p-2 flex justify-between m-2 bg-gray-200 rounded-md"
                        >
                          <a
                            href={article.link}
                            className="text-blue-500 underline"
                          >
                            {article.title}
                          </a>
                          <button onClick={() => handleRemoveArticle(article)} className="cursor-pointer">
                            ❌
                          </button>
                        </div>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </DragDropContext>
        </div>
      </div>
    </div>
  );
}

export default Page;
