import Image from 'next/image';
import React from 'react';
import styled from 'styled-components';

const StyledDiv = styled.div`
  /* Container */
  max-width: 800px;
  margin: 0 auto;
  padding: 2rem;
  background-color: #fff; /* white background for high contrast */
  color: #212121; /* dark text for good contrast */

  /* Header */
  header {
    margin-bottom: 3rem;
    text-align: center;

   
    p.excerpt {
      font-size: 1.25rem;
      color: #555;
      margin-bottom: 1rem;
    }

    /* Responsive Image Styling */
    img {
      max-width: 100%;
      height: auto;
      border-radius: 8px;
      margin-top: 1rem;
    }

    /* Metadata styling */
    .metadata {
      font-size: 0.875rem;
      color: #424242;
      margin-top: 1rem;

      p {
        margin-bottom: 0.5rem;
      }
    }
  }

  /* Blog Content */
  .content {
    margin-top: 3rem;

    /* Ensure sequential heading usage: Use h2, h3, h4 as needed */
    h2 {
      font-size: 2.25rem;
      font-weight: 600;
      color: #212121;
      margin-bottom: 1rem;
    }
    h3 {
      font-size: 1.75rem;
      font-weight: 600;
      color: #212121;
      margin-bottom: 1rem;
    }
    h4 {
      font-size: 1.5rem;
      font-weight: 600;
      color: #212121;
      margin-bottom: 1rem;
    }

    p {
      font-size: 1.125rem;
      line-height: 1.8;
      color: #424242;
      margin-bottom: 1.5rem;
    }

    ul {
      list-style-type: disc;
      margin-left: 20px;
      padding-left: 10px;
      font-size: 1.1rem;
      color: #424242;
    }

    li {
      margin-bottom: 0.5rem;
    }

    a {
      color: blue;
      font-weight: 600;
      text-decoration: underline; /* underline by default for better recognition */
      transition: color 0.3s ease;
    }

    a:hover {
      color: blue;
    }

    blockquote {
      background: #f7f7f7;
      border-left: 5px solid #007bff;
      padding: 1rem;
      font-size: 1.125rem;
      font-style: italic;
      color: #424242;
      margin: 1.5rem 0;
      border-radius: 5px;
    }
  }

  /* Related Articles */
  .related-articles {
    margin-top: 4rem;

    h3 {
      font-size: 1.5rem;
      font-weight: 600;
      margin-bottom: 1rem;
      color: #212121;
    }

    ul {
      list-style-type: none;
      padding: 0;
    }

    li {
      margin-bottom: 0.75rem;
    }

    a {
      color: blue;
      text-decoration: underline;
      transition: color 0.3s ease;
    }

    a:hover {
      color: #0056b3;
    }
  }

  /* Author Bio */
  .author-bio {
    margin-top: 4rem;
    border-top: 1px solid #ddd;
    padding-top: 2rem;
    text-align: center;

    h3 {
      font-size: 1.5rem;
      font-weight: 600;
      color: #212121;
      margin-bottom: 1rem;
    }

    p {
      font-size: 1.125rem;
      color: #424242;
      margin-bottom: 1rem;
    }

    a {
      color: red;
      font-size: 1.125rem;
      font-weight: 600;
      text-decoration: underline;
    }
  }

  /* Mobile responsiveness */
  @media (max-width: 768px) {
    padding: 1.5rem;

   

    h2 {
      font-size: 1.75rem;
    }

    p, blockquote, li {
      font-size: 1rem;
    }

    .metadata {
      font-size: 0.75rem;
    }
  }
`;

interface BlogProps {
  blog: {
    title: string;
    excerpt: string;
    featuredImage?: string;
    category: string;
    readTime: string;
    author: {
      name: string;
      bio: string;
      profileLink: string;
    };
    content: { renderedContent: string }[];
    relatedArticles: { title: string; link: string }[];
  };
}

const BlogPost = ({ blog }: BlogProps) => {
  return (
    <StyledDiv>
      {/* Blog Header */}
      <header>
        <h1 className='text-3xl lg:text-3xl md:text-lg sm:text-sm'>{blog.title}</h1>
        <p className="excerpt">{blog.excerpt}</p>
        {blog.featuredImage && (
          <Image
            alt={blog.title}
            src={blog.featuredImage}
            width={800}
            height={400}
            layout="responsive"
          />
        )}
        <div className="metadata">
          <p>Category: {blog.category}</p>
          <p>Read time: {blog.readTime}</p>
          <p>
            By <a href={blog.author.profileLink}>{blog.author.name}</a>
          </p>
        </div>
      </header>

      {/* Blog Content */}
      <div className="content">
        {blog.content.map((section, index) => (
          <div key={index} dangerouslySetInnerHTML={{ __html: section.renderedContent }} />
        ))}
      </div>

      {/* Related Articles */}
      <section className="related-articles">
        <h3>Related Articles</h3>
        <ul>
          {blog.relatedArticles.map((article, index) => (
            <li key={index}>
              <a href={article.link}>{article.title}</a>
            </li>
          ))}
        </ul>
      </section>

      {/* Author Bio */}
      <section className="author-bio">
        <h3>About the Author</h3>
        <p>{blog.author.bio}</p>
        <a href={blog.author.profileLink}>Visit Profile</a>
      </section>
    </StyledDiv>
  );
};

export default BlogPost;
