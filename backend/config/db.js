const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI || 'mongodb+srv://duviduAF2:WN8NskqVqT7Wf9Z7@af-sec-proj.6yggwbn.mongodb.net/?retryWrites=true&w=majority&appName=Af-Sec-projc');
    console.log('MongoDB Connected...');
  } catch (err) {
    console.error('MongoDB connection error:', err.message);
    process.exit(1);
  }
};

module.exports = connectDB;