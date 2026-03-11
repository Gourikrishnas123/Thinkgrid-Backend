import mongoose from 'mongoose';

const materialSchema = new mongoose.Schema({
  title:       { type: String, required: true },
  description: { type: String, default: '' },
  type:        { type: String, enum: ['video', 'document', 'link', 'quiz'], required: true },
  url:         { type: String, required: true },
  uploadedBy:  { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // ✅ links to User
  room:        { type: mongoose.Schema.Types.ObjectId, ref: 'Room', required: true }, // ✅ links to Room
  tags:        { type: [String], default: [] },
  likes:       { type: Number, default: 0 },
  downloads:   { type: Number, default: 0 },
}, { timestamps: true }); // ✅ auto adds createdAt & updatedAt

export default mongoose.model('Material', materialSchema);



