/**
 * ===== ANIMATED 3D BACKGROUND (Vanta.NET) =====
 * 
 * Initializes and manages a beautiful 3D network animation
 * that creates an immersive background effect for the portfolio.
 * The animation creates floating network nodes with cyan/blue
 * connecting lines on a dark background.
 */

// Store the Vanta effect instance to avoid re-initialization
let vantaEffect = null;

/**
 * Initialize the Vanta.NET 3D background animation
 * 
 * Configuration:
 * - Color scheme: Cyan nodes (#3FE0FF) on dark background (#02010a)
 * - 24 nodes with max 30px distance between connections
 * - Smooth 1.8px line width with blur effect
 * - Disabled touch/gyro controls for better mobile experience
 */
function initVanta() {
  // Only initialize once to prevent duplicate effects
  if (window.VANTA && !vantaEffect) {
    vantaEffect = VANTA.NET({
      el: '#vanta-bg',                    // Target container for the animation
      mouseControls: false,               // Disable mouse interaction
      touchControls: false,               // Disable touch interaction
      gyroControls: false,                // Disable device gyroscope
      minHeight: 200.0,                   // Minimum canvas height
      minWidth: 200.0,                    // Minimum canvas width
      scale: 1.0,                         // Scale factor for desktop
      scaleMobile: 1.0,                   // Scale factor for mobile
      color: 0x3FE0FF,                    // Node color (cyan/blue)
      backgroundColor: 0x02010a,          // Background color (dark)
      points: 24.0,                       // Number of network nodes
      maxDistance: 30.0,                  // Max connection distance between nodes
      spacing: 18.0,                      // Spacing between node clusters
      showDots: true,                     // Display visible nodes
      size: 1.2,                          // Node size
      zoom: 0.96,                         // Camera zoom level
      lineWidth: 1.8,                     // Connection line thickness
      blurFactor: 0.35                    // Motion blur intensity
    });
  }
}

/**
 * Initialize Vanta effect when DOM is ready
 * Checks if document is already loaded (complete/interactive states)
 * or waits for DOMContentLoaded event
 */
if (document.readyState === 'complete' || document.readyState === 'interactive') {
  // Document already loaded, initialize immediately
  initVanta();
} else {
  // Wait for DOM to be ready before initializing
  document.addEventListener('DOMContentLoaded', initVanta);
}

/**
 * ===== CONTACT FORM HANDLER =====
 * 
 * Manages the contact form submission and communicates with
 * the backend API to save contact messages to the database.
 */

// API endpoint base URL (empty string means same origin)
const API_BASE_URL = '';

// Get references to form elements from the DOM
const contactForm = document.getElementById('contactForm');
const formStatus = document.getElementById('formStatus');

/**
 * Handle contact form submission
 * 
 * Process:
 * 1. Collect and trim form input data
 * 2. Send to backend via POST request
 * 3. Display user-friendly status messages
 * 4. Reset form on success or show error on failure
 */
if (contactForm) {
  contactForm.addEventListener('submit', async (event) => {
    // Prevent default form submission behavior
    event.preventDefault();
    
    // Extract form data and trim whitespace from all fields
    const formData = new FormData(contactForm);
    const payload = {
      name: formData.get('name')?.trim(),        // User's full name
      email: formData.get('email')?.trim(),      // User's email address
      message: formData.get('message')?.trim(),  // User's message content
    };

    // Show "Sending..." status in light color
    formStatus.textContent = 'Sending...';
    formStatus.style.color = '#f3f4ff';

    try {
      // Send form data to backend contact API endpoint
      const response = await fetch(`${API_BASE_URL}/api/contact`, {
        method: 'POST',                           // HTTP POST method
        headers: {
          'Content-Type': 'application/json',     // Send JSON data
        },
        body: JSON.stringify(payload),            // Convert data to JSON
      });

      // Parse the response as JSON
      const data = await response.json();

      // Check if the response indicates an error
      if (!response.ok) {
        throw new Error(data.error || 'Failed to send message');
      }

      // Success: Display confirmation message in green/cyan color
      formStatus.textContent = data.message || 'Message sent successfully!';
      formStatus.style.color = '#7dd3fc';
      
      // Clear all form fields for next submission
      contactForm.reset();
    } catch (error) {
      // Error: Display error message in red color
      formStatus.textContent = error.message || 'Error sending message. Please try again.';
      formStatus.style.color = '#fca5a5';
      
      // Log error to browser console for debugging
      console.error('Contact form error:', error);
    }
  });
}

/**
 * ===== SCROLL REVEAL ANIMATION =====
 * 
 * Uses the Intersection Observer API to trigger entrance animations
 * when project items and sections scroll into view. This creates a
 * dynamic, engaging experience as users browse the portfolio.
 */

// Select all elements that should animate on scroll
const revealTargets = document.querySelectorAll('.project-item, .reveal-on-scroll');

/**
 * Create an Intersection Observer to detect when elements enter the viewport
 * 
 * When an element becomes visible:
 * - Add 'visible' class to trigger CSS animation
 * - Stop observing that element (animation only happens once)
 */
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    // Check if the element has entered the visible viewport
    if (entry.isIntersecting) {
      // Add 'visible' class to trigger the CSS animation
      entry.target.classList.add('visible');
      
      // Stop watching this element (animation only triggers once)
      revealObserver.unobserve(entry.target);
    }
  });
}, {
  threshold: 0.2,           // Trigger when 20% of element is visible
  rootMargin: '0px 0px -10% 0px'  // Start animation 10% before element reaches bottom
});

/**
 * Observe all elements that should reveal on scroll
 * The observer will automatically trigger when they enter the viewport
 */
revealTargets.forEach((item) => revealObserver.observe(item));