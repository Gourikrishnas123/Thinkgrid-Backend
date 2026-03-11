import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  name:     { type: String, required: true },
  email:    { type: String, required: true, unique: true },
  picture:  { type: String, default: '' },
  bio:      { type: String, default: '' },
  skills:   { type: [String], default: [] },
  followers:{ type: Number, default: 0 },
  following:{ type: Number, default: 0 },
  points:   { type: Number, default: 0 },
  rank:     { type: String, default: 'Member' },
  streak:   { type: Number, default: 0 },
  verified: { type: Boolean, default: false },
}, { timestamps: true }); // ✅ auto adds createdAt & updatedAt

export default mongoose.model('User', userSchema);