export const createRoom = ({ id, name, description, createdBy, category = 'General', isPrivate = false }) => ({
  id,
  name,
  description,
  createdBy,
  category,
  isPrivate,
  members: [createdBy],
  messages: [],
  createdAt: new Date().toISOString(),
});