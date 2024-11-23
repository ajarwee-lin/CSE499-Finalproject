// Import required modules
const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');

// Initialize the Express app
const app = express();

// Middleware for parsing form data
app.use(bodyParser.urlencoded({ extended: true }));

// Serve static files (HTML, CSS, images, etc.)
app.use(express.static('frontend')); // Adjust 'frontend' to your actual folder name if necessary

// Define the POST route for handling form submissions
app.post('/send-email', (req, res) => {
  const { name, email, message } = req.body;

  // Configure Nodemailer transport
  const transporter = nodemailer.createTransport({
    service: 'gmail', // You can replace this with another service (e.g., Outlook, Yahoo)
    auth: {
      user: 'your-email@gmail.com', // Replace with your email
      pass: 'your-password', // Replace with your email password or app password
    },
  });

  // Set up email details
  const mailOptions = {
    from: email, // The sender's email
    to: 'your-email@gmail.com', // Replace with your recipient email
    subject: `New Contact Form Submission from ${name}`,
    text: message,
  };

  // Send the email
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error(error);
      res.status(500).send('Error sending email');
    } else {
      console.log('Email sent: ' + info.response);
      res.status(200).send('Email sent successfully');
    }
  });
});

// Start the server
const PORT = 3000; // Choose your preferred port
app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
