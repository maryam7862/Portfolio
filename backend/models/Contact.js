/**
 * ===== CONTACT DATABASE MODEL =====
 * 
 * Defines the schema for contact form submissions stored in MongoDB.
 * Each contact record includes the visitor's information and message,
 * plus automatic timestamp tracking for when the message was created/updated.
 */

const mongoose = require('mongoose');

/**
 * Contact Schema
 * 
 * Defines the structure of contact documents in the MongoDB database.
 * 
 * Fields:
 *   - name: User's full name (required, trimmed)
 *   - email: User's email address (required, lowercase, trimmed)
 *   - message: User's contact message (required, trimmed)
 *   - timestamps: Automatically adds createdAt and updatedAt fields
 */
const contactSchema = new mongoose.Schema(
  {
    // User's full name - must be provided
    name: {
      type: String,
      required: true,
      trim: true,  // Remove leading/trailing whitespace
    },
    
    // User's email address - must be provided and normalized
    email: {
      type: String,
      required: true,
      trim: true,      // Remove leading/trailing whitespace
      lowercase: true, // Convert to lowercase for consistency
    },
    
    // User's contact message content - must be provided
    message: {
      type: String,
      required: true,
      trim: true,  // Remove leading/trailing whitespace
    },
  },
  {
    // Automatically add createdAt and updatedAt timestamps
    timestamps: true,
  }
);

/**
 * Create and export the Contact model
 * 
 * This model can be used throughout the application to:
 * - Create new contact documents
 * - Query existing contacts
 * - Update or delete contacts
 */
module.exports = mongoose.model('Contact', contactSchema);
