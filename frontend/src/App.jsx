import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useParams } from 'react-router-dom';

const API_URL = '/api';

const PostList = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(`${API_URL}/posts`)
      .then(res => {
        if (!res.ok) throw new Error('Failed to fetch posts');
        return res.json();
      })
      .then(data => {
        setPosts(data);
        setLoading(false);
      })
      .catch(err => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  if (loading) return <div className="state-container">Loading amazing content...</div>;
  if (error) return <div className="state-container">Error: {error}</div>;

  return (
    <div className="container">
      <div className="blog-grid">
        {posts.map(post => (
          <Link to={`/posts/${post._id}`} key={post._id} className="blog-card glass">
            <div className="meta">{post.date} • By {post.author}</div>
            <h2>{post.title}</h2>
            <div className="excerpt">{post.excerpt}</div>
            <div className="read-more">Read Full Story</div>
          </Link>
        ))}
      </div>
    </div>
  );
};

const PostDetail = () => {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(`${API_URL}/posts/${id}`)
      .then(res => {
        if (!res.ok) throw new Error('Post not found');
        return res.json();
      })
      .then(data => {
        if (!data) throw new Error('Invalid post data');
        setPost(data);
        setLoading(false);
      })
      .catch(err => {
        setError(err.message);
        setLoading(false);
      });
  }, [id]);

  if (loading) return <div className="state-container">Fetching your story...</div>;
  if (error) return <div className="state-container">Error: {error}</div>;
  if (!post) return <div className="state-container">Post not found</div>;

  return (
    <div className="post-detail">
      <Link to="/" className="back-btn">← Back to Feed</Link>
      <div className="meta">{post.date} • By {post.author}</div>
      <h1>{post.title}</h1>
      <div className="post-content glass" style={{ padding: '2rem' }}>
        {post.content}
      </div>
    </div>
  );
};

function App() {
  return (
    <Router>
      <header>
        <div className="container">
          <h1>Modern Insights</h1>
          <p style={{ color: 'hsl(230, 15%, 50%)', fontWeight: '500', marginTop: '1rem' }}>
            Exploring the frontiers of technology and design.
          </p>
        </div>
      </header>
      
      <Routes>
        <Route path="/" element={<PostList />} />
        <Route path="/posts/:id" element={<PostDetail />} />
      </Routes>
      
      <footer style={{ textAlign: 'center', padding: '4rem 0', color: 'hsl(230, 15%, 70%)', fontSize: '0.9rem' }}>
        &copy; 2026 Premium Blog. All rights Reserved.
      </footer>
    </Router>
  );
}

export default App;
