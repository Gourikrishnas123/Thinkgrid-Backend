let messages = [
  { id: 'msg-001', from: 'demo-001', to: 'user-002', text: 'Hey! Want to join our React room?', timestamp: new Date().toISOString(), read: false },
];

// ── GET /api/messages ────────────────────────────────────────
export const getMessages = (req, res) => {
  const userMessages = messages.filter(
    m => m.from === req.user.id || m.to === req.user.id || m.to === 'open-request'
  );
  res.json(userMessages);
};

// ── GET /api/messages/:userId ────────────────────────────────
export const getConversation = (req, res) => {
  const conversation = messages.filter(
    m =>
      (m.from === req.user.id && m.to === req.params.userId) ||
      (m.from === req.params.userId && m.to === req.user.id)
  );
  res.json(conversation);
};

// ── GET /api/messages/open ───────────────────────────────────
export const getOpenRequests = (req, res) => {
  const openRequests = messages.filter(m => m.to === 'open-request');
  res.json(openRequests);
};

// ── POST /api/messages ───────────────────────────────────────
export const sendMessage = (req, res) => {
  const { to, text } = req.body;

  if (!text) return res.status(400).json({ error: 'text is required' });

  const recipient = to || 'open-request';

  const message = {
    id: `msg-${Date.now()}`,
    from: req.user.id,
    fromName: req.user.name,
    to: recipient,
    text,
    timestamp: new Date().toISOString(),
    read: false,
    type: recipient === 'open-request' ? 'open' : 'direct',
  };

  messages.push(message);
  res.status(201).json({ success: true, message });
};

// ── PUT /api/messages/:id/read ───────────────────────────────
export const markRead = (req, res) => {
  const index = messages.findIndex(m => m.id === req.params.id && m.to === req.user.id);
  if (index === -1) return res.status(404).json({ error: 'Message not found' });

  messages[index].read = true;
  res.json(messages[index]);
};