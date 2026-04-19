const mongoose = require('mongoose');

const attendanceSchema = new mongoose.Schema({
  staffId: { type: mongoose.Schema.Types.ObjectId, ref: 'Staff', required: true },
  date: { type: Date, required: true },
  checkInTime: { type: String },
  checkOutTime: { type: String }
});

module.exports = mongoose.model('Attendance', attendanceSchema);
