// 🔐 Code developed by Jay Rana © 26/09/2025. Not for reuse or redistribution.
// If you theft this code, you will be punished or may face legal action by the owner.

import mongoose from 'mongoose';

const blogSchema = new mongoose.Schema({
  title: { type: String, required: true, trim: true },
  content: { type: String, required: true },
  author: { type: String, required: true, trim: true },
  tags: { type: [String], default: [] },
  category: {
    type: String,
    enum: [
      'Puja',
      'Festival',
      'Aarti',
      'Religious Books',
      'Places',
      'Mandir',
      'Other Religious Blogs'
    ],
    
    required: true,
    default: 'Puja'
  },
  imageUrl: { type: String},
  publishedAt: { type: Date, default: Date.now },
  Comments: [{
    user: { type: String },
    comment: { type: String},
    createdAt: { type: Date, default: Date.now }
  }],
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },

  updatedBy: { type: String, required: false },

},
{
  timestamps: true,
  createdAt: { type: Date, default: Date.now },
  
});

const Blog = mongoose.model('Blog', blogSchema);

export default Blog;
