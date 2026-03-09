let users = [
  { id: 'demo-001', name: 'Alex Smith', email: 'admin@thinkgrid.com', bio: 'ThinkGrid Admin', skills: ['React', 'Node.js'], followers: 128, following: 64 },
];

// Helper: find or create user from JWT
const findOrCreateUser = (jwtUser) => {
  let user = users.find(u => u.id === jwtUser.id || u.email === jwtUser.email);

  if (!user) {
    // Auto-create profile for Google login users
    user = {
      id: jwtUser.id,
      name: jwtUser.name,
      email: jwtUser.email,
      picture: jwtUser.picture || '',
      bio: '',
      skills: [],
      followers: 0,
      following: 0,
    };
    users.push(user);
  }

  return user;
};

// ── GET /api/users/profile ───────────────────────────────────
export const getProfile = (req, res) => {
  const user = findOrCreateUser(req.user);
  res.json(user);
};

// ── PUT /api/users/profile ───────────────────────────────────
export const updateProfile = (req, res) => {
  const { name, bio, skills } = req.body;
  const index = users.findIndex(u => u.id === req.user.id || u.email === req.user.email);

  if (index === -1) {
    const user = findOrCreateUser(req.user);
    const newIndex = users.findIndex(u => u.id === user.id);
    users[newIndex] = { ...users[newIndex], name, bio, skills };
    return res.json(users[newIndex]);
  }

  users[index] = { ...users[index], name, bio, skills };
  res.json(users[index]);
};

// ── GET /api/users ───────────────────────────────────────────
export const getAllUsers = (req, res) => {
  res.json(users.map(({ email, ...rest }) => rest));
};