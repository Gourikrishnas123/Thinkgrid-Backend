
let rooms = [
  { id: 'room-001', title: 'React Deep Dive', description: 'Advanced React patterns and performance', tags: ['React', 'Frontend'], members: 24, owner: 'demo-001', isPublic: true },
  { id: 'room-002', title: 'DSA Study Group', description: 'Data structures and algorithms prep', tags: ['DSA', 'Interview'], members: 18, owner: 'demo-001', isPublic: true },
];

export const getRooms = (req, res) => {
  res.json(rooms);
};

export const getMyRooms = (req, res) => {
  const myRooms = rooms.filter(r => r.owner === req.user.id);
  res.json(myRooms);
};

export const getRoom = (req, res) => {
  const room = rooms.find(r => r.id === req.params.id);
  if (!room) return res.status(404).json({ error: 'Room not found' });
  res.json(room);
};

export const createRoom = (req, res) => {
  const { title, description, tags, isPublic } = req.body;
  if (!title) return res.status(400).json({ error: 'Title is required' });
  const room = {
    id: `room-${Date.now()}`,
    title,
    description,
    tags: tags || [],
    members: 1,
    owner: req.user.id,
    isPublic: isPublic ?? true,
  };
  rooms.push(room);
  res.status(201).json(room);
};

export const updateRoom = (req, res) => {
  const index = rooms.findIndex(r => r.id === req.params.id && r.owner === req.user.id);
  if (index === -1) return res.status(404).json({ error: 'Room not found or unauthorized' });
  rooms[index] = { ...rooms[index], ...req.body };
  res.json(rooms[index]);
};

export const deleteRoom = (req, res) => {
  const index = rooms.findIndex(r => r.id === req.params.id && r.owner === req.user.id);
  if (index === -1) return res.status(404).json({ error: 'Room not found or unauthorized' });
  rooms.splice(index, 1);
  res.json({ message: 'Room deleted' });
};