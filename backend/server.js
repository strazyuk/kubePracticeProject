import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';

const app = express();
const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/blog';

app.use(cors());
app.use(express.json());

// MongoDB Connection
mongoose.connect(MONGO_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Could not connect to MongoDB', err));

// Define Post Schema
const postSchema = new mongoose.Schema({
  title: String,
  author: String,
  date: { type: String, default: () => new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }) },
  excerpt: String,
  content: String
});

const Post = mongoose.model('Post', postSchema);

// Seed data if empty
const seedData = async () => {
  const count = await Post.countDocuments();
  if (count === 0) {
    await Post.insertMany([
      {
        title: 'The Future of AI in Coding',
        author: 'Antigravity User',
        excerpt: 'AI is rapidly changing how we write and understand code...',
        content: 'Full content for AI in Coding...'
      },
      {
        title: 'Mastering Modern CSS Layouts',
        author: 'Design Guru',
        excerpt: 'Flexbox and Grid are powerful tools...',
        content: 'Full content for CSS Layouts...'
      }
    ]);
    console.log('Database seeded!');
  }
};
seedData();

app.get('/api/posts', async (req, res) => {
  try {
    const posts = await Post.find();
    res.json(posts);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

app.get('/api/posts/:id', async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (post) {
      res.json(post);
    } else {
      res.status(404).json({ message: 'Post not found' });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
