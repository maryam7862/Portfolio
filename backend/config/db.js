/**
 * ===== DATABASE CONNECTION MODULE =====
 * 
 * Handles MongoDB connection setup and error handling.
 * Designed to be resilient - continues running even if database
 * connection fails (frontend still works, but contact form won't save).
 */

const mongoose = require('mongoose');

/**
 * Connect to MongoDB Database
 * 
 * This async function:
 * 1. Reads MONGO_URI from environment variables
 * 2. Attempts to establish connection with MongoDB
 * 3. Returns success/failure status
 * 4. Allows app to continue even if connection fails
 * 
 * @returns {Promise<boolean>} - true if connected, false if failed
 */
const connectDB = async () => {
  try {
    // Get MongoDB connection URI from environment variable
    const uri = process.env.MONGO_URI;

    // Check if MONGO_URI is defined
    if (!uri) {
      throw new Error('❌ MONGO_URI is not defined in .env');
    }

    // Establish connection to MongoDB database
    await mongoose.connect(uri, {
      useNewUrlParser: true,      // Use new URL string parser
      useUnifiedTopology: true,   // Use new connection management
    });

    // Success: Database connected
    console.log('✅ MongoDB connected successfully');
    return true;
  } catch (error) {
    // Error: Log the failure but don't stop the application
    console.error('❌ MongoDB connection failed:', error.message);
    console.warn('⚠️  Continuing without database connection. The frontend will still be served, but contact form submissions may fail.');
    
    // Return false to indicate connection failure
    // The app will continue running, just without database functionality
    return false;
  }
};

module.exports = connectDB;
