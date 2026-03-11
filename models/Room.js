

import mongoose from 'mongoose';

const roomSchema = new mongoose.Schema({
  name:        { type: String, required: true },
  description: { type: String, required: true },
  createdBy:   { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // ✅ links to User
  category:    { type: String, default: 'General' },
  isPrivate:   { type: Boolean, default: false },
  members:     [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }], // ✅ array of Users
  messages:    [{ type: mongoose.Schema.Types.ObjectId, ref: 'Message' }], // ✅ links to Message
}, { timestamps: true });

export default mongoose.model('Room', roomSchema);