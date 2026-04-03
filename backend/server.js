import express from 'express';
import cors from 'cors';

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

const posts = [
  {
    id: '1',
    title: 'The Future of AI in Coding',
    author: 'Antigravity User',
    date: 'April 3, 2026',
    excerpt: 'AI is rapidly changing how we write and understand code. From autocomplete to fully autonomous coding agents...',
    content: 'Full content for The Future of AI in Coding. AI models are becoming more sophisticated, allowing for complex reasoning and multi-step tasks in software development. This post explores the implications of these advancements.'
  },
  {
    id: '2',
    title: 'Mastering Modern CSS Layouts',
    author: 'Design Guru',
    date: 'April 2, 2026',
    excerpt: 'Flexbox and Grid are powerful tools for creating responsive and dynamic layouts. Learn how to use them effectively...',
    content: 'Full content for Mastering Modern CSS Layouts. Modern CSS has evolved significantly, offering native layout engines that make responsive design easier than ever. Grid and Flexbox are the pillars of current web layout design.'
  },
  {
    id: '3',
    title: 'Building Premium User Interfaces',
    author: 'UI/UX Specialist',
    date: 'April 1, 2026',
    excerpt: 'Great design is more than just colors. It\'s about transitions, HSL color harmony, and micro-animations...',
    content: 'Full content for Building Premium User Interfaces. Premium UI focuses on subtle interactions, clear typography, and harmonious color schemes. This post covers the fundamentals of modern design systems and how to implement them.'
  }
];

app.get('/api/posts', (req, res) => {
  res.json(posts);
});

app.get('/api/posts/:id', (req, res) => {
  const post = posts.find(p => p.id === req.params.id);
  if (post) {
    res.json(post);
  } else {
    res.status(404).json({ message: 'Post not found' });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
