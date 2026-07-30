import "./BlogPost.css";

import { useParams, useNavigate, Link } from "react-router-dom";
import { FaArrowLeft, FaCalendarAlt, FaClock } from "react-icons/fa";

import blogPosts from "../../data/blogPosts";
import ShareDestination from "../../components/ShareDestination/ShareDestination";

function BlogPost() {

  const { slug } = useParams();
  const navigate = useNavigate();

  const post = blogPosts.find((p) => p.slug === slug);

  if (!post) {

    return (

      <section className="blogpost-page">

        <div className="blogpost-not-found">

          <h1>Article not found</h1>

          <Link to="/blog">Back to Blog</Link>

        </div>

      </section>

    );

  }

  return (

    <section className="blogpost-page">

      <div className="blogpost-container">

        <button className="back-btn" onClick={() => navigate(-1)}>
          <FaArrowLeft />
          Back
        </button>

        <img src={post.image} alt={post.title} className="blogpost-hero" />

        <span className="blog-category">{post.category}</span>

        <h1>{post.title}</h1>

        <div className="blogpost-meta">

          <span>
            <FaCalendarAlt />
            {post.date}
          </span>

          <span>
            <FaClock />
            {post.readTime}
          </span>

        </div>

        <ShareDestination title={post.title} />

        <div className="blogpost-content">

          {post.content.map((paragraph, index) => (
            <p key={index}>{paragraph}</p>
          ))}

        </div>

        <Link to="/blog" className="back-to-blog">
          <FaArrowLeft />
          Back to All Articles
        </Link>

      </div>

    </section>

  );

}

export default BlogPost;
