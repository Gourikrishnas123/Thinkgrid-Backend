let materials = [
  { id: 'mat-001', title: 'React Hooks Cheatsheet', type: 'pdf', tags: ['React'], uploadedBy: 'demo-001', likes: 42 },
  { id: 'mat-002', title: 'Big O Notation Guide', type: 'doc', tags: ['DSA'], uploadedBy: 'demo-001', likes: 31 },
];

export const getMaterials = (req, res) => {
  const { tag } = req.query;
  const result = tag ? materials.filter(m => m.tags.includes(tag)) : materials;
  res.json(result);
};

export const getMaterial = (req, res) => {
  const material = materials.find(m => m.id === req.params.id);
  if (!material) return res.status(404).json({ error: 'Material not found' });
  res.json(material);
};

export const createMaterial = (req, res) => {
  const { title, type, tags } = req.body;
  if (!title) return res.status(400).json({ error: 'Title is required' });
  const material = {
    id: `mat-${Date.now()}`,
    title,
    type: type || 'doc',
    tags: tags || [],
    uploadedBy: req.user.id,
    likes: 0,
  };
  materials.push(material);
  res.status(201).json(material);
};

export const deleteMaterial = (req, res) => {
  const index = materials.findIndex(m => m.id === req.params.id && m.uploadedBy === req.user.id);
  if (index === -1) return res.status(404).json({ error: 'Material not found or unauthorized' });
  materials.splice(index, 1);
  res.json({ message: 'Material deleted' });
};