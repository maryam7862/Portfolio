/**
 * ===== PORTFOLIO BACKEND SERVER =====
 * 
 * Main Express server that:
 * - Connects to MongoDB database
 * - Serves the frontend static files
 * - Provides REST API for contact form submissions
 * - Handles routing and error management
 */

const express = require("express");        // Web framework for Node.js
const cors = require("cors");              // Enable Cross-Origin Resource Sharing
const path = require("path");              // File path utilities
const dotenv = require("dotenv");          // Environment variables management
const connectDB = require("./config/db");  // MongoDB connection module
const contactRoutes = require("./routes/contactRoutes");  // Contact API routes

/**
 * Load environment variables from .env file
 * Must happen BEFORE server configuration to ensure all env vars are available
 * Looks for .env file in the root backend directory
 */
dotenv.config({ path: path.resolve(__dirname, ".env") });

// Initialize Express application
const app = express();

/**
 * ===== MIDDLEWARE SETUP =====
 * Configure middleware to process requests
 */

// Enable CORS - allows frontend to make requests to backend
app.use(cors());

// Parse incoming JSON request bodies
app.use(express.json());

/**
 * ===== STATIC FILE SERVING =====
 * Serve frontend files (HTML, CSS, JS) from the frontend directory
 * This allows the backend to serve the entire application
 */
const frontendPath = path.resolve(__dirname, '../frontend');
app.use(express.static(frontendPath));

/**
 * ===== DATABASE CONNECTION & ROUTE SETUP =====
 * Connect to MongoDB first, then setup routes
 * This ensures the database is ready before accepting API requests
 */
connectDB().finally(() => {
  /**
   * API Routes
   * POST /api/contact - Handle contact form submissions
   */
  app.use('/api/contact', contactRoutes);

  /**
   * Fallback Route - Serve index.html for all non-API routes
   * This enables client-side routing for single-page application (SPA)
   * Any route not matching /api/* will return the frontend's index.html
   */
  app.get('*', (req, res) => {
    res.sendFile(path.join(frontendPath, 'index.html'));
  });
});

/**
 * ===== SERVER STARTUP =====
 * Start the Express server with dynamic port fallback
 * Default port is 5000, but will auto-increment if port is in use
 */

// Get port from environment variable or use default 5000
const PORT = Number(process.env.PORT) || 5000;

/**
 * Recursive function to start server with port collision handling
 * If a port is already in use (EADDRINUSE error), tries the next port number
 * 
 * @param {number} port - The port number to attempt
 */
const startServer = (port) => {
  // Create server and listen on specified port
  const server = app.listen(port, () => {
    console.log(`Server running on port ${port}`);
  });

  /**
   * Handle server startup errors
   * Primarily used to handle port conflicts
   */
  server.on('error', (error) => {
    if (error.code === 'EADDRINUSE') {
      // Port is already in use, try next port number
      console.warn(`Port ${port} is already in use. Trying port ${port + 1}...`);
      startServer(port + 1);
    } else {
      // Other errors - log and exit
      console.error('Server failed to start:', error);
      process.exit(1);
    }
  });
};

// Initiate server startup
startServer(PORT);