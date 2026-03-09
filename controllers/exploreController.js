const trendingTopics = [
  { id: 1, title: 'System Design Basics', category: 'Engineering', likes: 320 },
  { id: 2, title: 'LeetCode Patterns', category: 'DSA', likes: 280 },
  { id: 3, title: 'CSS Grid Mastery', category: 'Frontend', likes: 215 },
  { id: 4, title: 'TypeScript Tips', category: 'Frontend', likes: 190 },
  { id: 5, title: 'Docker for Devs', category: 'DevOps', likes: 175 },
];

const featuredRooms = [
  { id: 'room-001', title: 'React Deep Dive', members: 24, tags: ['React', 'Frontend'] },
  { id: 'room-002', title: 'DSA Study Group', members: 18, tags: ['DSA', 'Interview'] },
  { id: 'room-003', title: 'System Design Club', members: 35, tags: ['System Design'] },
];

export const getExplore = (req, res) => {
  res.json({ trendingTopics, featuredRooms });
};

export const search = (req, res) => {
  const { q } = req.query;
  if (!q) return res.status(400).json({ error: 'Query parameter q is required' });
  const query = q.toLowerCase();
  const topics = trendingTopics.filter(
    t => t.title.toLowerCase().includes(query) || t.category.toLowerCase().includes(query)
  );
  const rooms = featuredRooms.filter(
    r => r.title.toLowerCase().includes(query) || r.tags.some(tag => tag.toLowerCase().includes(query))
  );
  res.json({ topics, rooms });
};
