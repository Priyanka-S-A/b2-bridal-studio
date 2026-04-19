const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema({
  category: { type: String, required: true }, // e.g., 'Beautician', 'Fashion'
  title: { type: String, required: true },    // e.g., 'Makeup Artist Course'
  duration: { type: String, required: true },
  description: { type: String },
  learnings: [{ type: String }],              // bullet points
});

module.exports = mongoose.model('Course', courseSchema);
