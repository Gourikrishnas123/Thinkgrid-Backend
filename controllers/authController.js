import axios from 'axios';
import jwt from 'jsonwebtoken';

const generateToken = (user) => {
  return jwt.sign(
    { id: user.id, email: user.email, name: user.name },
    process.env.JWT_SECRET,
    { expiresIn: '7d' }
  );
};

export const googleAuth = async (req, res) => {
  const { access_token } = req.body;

  if (!access_token) {
    return res.status(400).json({ error: 'access_token is required' });
  }

  try {
    const { data } = await axios.get(
      'https://www.googleapis.com/oauth2/v3/userinfo',
      { headers: { Authorization: `Bearer ${access_token}` } }
    );

    const user = {
      id:      data.sub,
      name:    data.name,
      email:   data.email,
      picture: data.picture,
    };

    const token = generateToken(user);
    res.json({ token, user });
  } catch (err) {
    console.error('Google auth error:', err.message);
    res.status(401).json({ error: 'Invalid Google token' });
  }
};

export const login = (req, res) => {
  const { email, password } = req.body;

  if (email === 'admin@thinkgrid.com' && password === 'tg2026') {
    const user = { id: 'demo-001', name: 'Alex Smith', email };
    const token = generateToken(user);
    return res.json({ token, user });
  }

  res.status(401).json({ error: 'Invalid credentials' });
};

export const register = (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  const user = { id: `user-${Date.now()}`, name, email };
  const token = generateToken(user);
  res.status(201).json({ token, user });
};

export const getMe = (req, res) => {
  res.json({ user: req.user });
};