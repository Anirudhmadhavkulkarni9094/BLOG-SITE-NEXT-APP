"use client"
import React, { useEffect, useState } from 'react';
import BlogPost from './BlogPost'; // Assuming BlogPost is in the same folder or adjust the path

function Page() {
  const [blog, setBlog] = useState(null); // State to store the blog data
  const [loading, setLoading] = useState(true); // Loading state

  // Fetch blog data from the API
  useEffect(() => {
    const fetchBlogData = async () => {
      try {
        const response = await fetch('/api/blog');
        const result = await response.json();
        if (result.success ) {
          setBlog(result.data[0]); // Assuming your API returns an array and you want the first blog
        }
      } catch (error) {
        console.error('Error fetching blog data:', error);
      } finally {
        setLoading(false); // Stop loading once the data is fetched
      }
    };

    fetchBlogData();
  }, []);

  // If the blog is still loading or no data is found
  if (loading) {
    return <div>Loading...</div>;
  }

  if (!blog) {
    return <div>No blog found.</div>;
  }

  // Render the BlogPost component once the data is fetched
  return <BlogPost blog={blog} />;
}

export default Page;
