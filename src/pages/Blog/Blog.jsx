import "./Blog.css";

import { Link } from "react-router-dom";
import { FaCalendarAlt, FaClock, FaArrowRight } from "react-icons/fa";

import blogPosts from "../../data/blogPosts";

function Blog() {

  return (

    <section className="blog-page">

      <div className="blog-container">

        <div className="blog-intro">

          <h1>Latest Articles</h1>

          <p>Travel guides, tips, and inspiration from around the world.</p>

        </div>

        <div className="blog-grid">

          {blogPosts.map((post) => (

            <Link
              to={`/blog/${post.slug}`}
              className="blog-card"
              key={post.slug}
            >

              <img src={post.image} alt={post.title} />

              <div className="blog-card-content">

                <span className="blog-category">{post.category}</span>

                <h3>{post.title}</h3>

                <p>{post.excerpt}</p>

                <div className="blog-meta">

                  <span>
                    <FaCalendarAlt />
                    {post.date}
                  </span>

                  <span>
                    <FaClock />
                    {post.readTime}
                  </span>

                </div>

                <span className="read-more">
                  Read More
                  <FaArrowRight />
                </span>

              </div>

            </Link>

          ))}

        </div>

      </div>

    </section>

  );

}

export default Blog;
