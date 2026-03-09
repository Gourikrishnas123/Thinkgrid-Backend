import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

import authRoutes from './routes/auth.js';
import userRoutes from './routes/users.js';
import roomRoutes from './routes/rooms.js';
import materialRoutes from './routes/materials.js';
import messageRoutes from './routes/messages.js';
import exploreRoutes from './routes/explore.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors({
  origin: process.env.CLIENT_URL || 'http://localhost:5173',
  credentials: true,
}));
app.use(express.json());

app.use('/api/auth',      authRoutes);
app.use('/api/users',     userRoutes);
app.use('/api/rooms',     roomRoutes);
app.use('/api/materials', materialRoutes);
app.use('/api/messages',  messageRoutes);
app.use('/api/explore',   exploreRoutes);

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'ThinkGrid API is running' });
});

app.use((req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Internal server error' });
});

app.listen(PORT, () => {
  console.log(`✅ ThinkGrid API running on http://localhost:${PORT}`);
});