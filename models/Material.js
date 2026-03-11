export const createMaterial = ({ id, title, description, fileUrl, uploadedBy, category = 'General', tags = [] }) => ({
  id,
  title,
  description,
  fileUrl,
  uploadedBy,
  category,
  tags,
  likes: 0,
  downloads: 0,
  createdAt: new Date().toISOString(),
});