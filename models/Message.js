export const createMessage = ({ id, from, fromName, to, text }) => ({
  id,
  from,
  fromName,
  to,
  text,
  type: to === 'open-request' ? 'open' : 'direct',
  read: false,
  timestamp: new Date().toISOString(),
});