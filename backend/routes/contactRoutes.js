/**
 * ===== CONTACT ROUTES API =====
 * 
 * Express router that handles all contact form submissions.
 * Validates incoming data, checks database connection,
 * and saves messages to MongoDB.
 */

const express = require('express');      // Express framework
const mongoose = require('mongoose');    // MongoDB object modeling
const Contact = require('../models/Contact');  // Contact schema model

const router = express.Router();

/**
 * POST /api/contact
 * 
 * Handles new contact form submissions
 * 
 * Request body should contain:
 *   - name: string (required) - User's full name
 *   - email: string (required) - User's email address
 *   - message: string (required) - Contact message content
 * 
 * Responses:
 *   - 201: Success - Message saved to database
 *   - 400: Bad Request - Missing required fields
 *   - 503: Service Unavailable - Database not connected
 *   - 500: Server Error - Failed to save message
 */
router.post('/', async (req, res) => {
  // Check if MongoDB connection is established
  // readyState: 0=disconnected, 1=connected, 2=connecting, 3=disconnecting
  if (mongoose.connection.readyState !== 1) {
    return res.status(503).json({ 
      error: 'Contact service unavailable. Database connection is not ready.' 
    });
  }

  // Extract form fields from request body
  const { name, email, message } = req.body;

  // Validate that all required fields are present and not empty
  if (!name || !email || !message) {
    return res.status(400).json({ 
      error: 'Please fill all required fields.' 
    });
  }

  try {
    // Create new contact document in MongoDB database
    const contact = await Contact.create({ name, email, message });
    
    // Return success response with saved contact data
    return res.status(201).json({ 
      message: 'Message sent successfully', 
      contact 
    });
  } catch (error) {
    // Log error to server console for debugging
    console.error('Error saving contact:', error.message);
    
    // Return error response to client
    return res.status(500).json({ 
      error: 'Failed to save message. Please try again.' 
    });
  }
});

module.exports = router;
