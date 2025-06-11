const nodemailer = require('nodemailer');
require('dotenv').config();

// Debug: Log environment variables (remove in production)
console.log('Email Config:', {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS ? 'Password is set' : 'Password is missing',
    admin: process.env.ADMIN_EMAIL
});

// Create a transporter using SMTP
const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    },
    tls: {
        rejectUnauthorized: false // Only for development
    }
});

// Verify transporter configuration
transporter.verify(function(error, success) {
    if (error) {
        console.log('Transporter verification error:', error);
    } else {
        console.log('Server is ready to take our messages');
    }
});

// Function to send contact form email
const sendContactEmail = async (contactData) => {
    try {
        const { FirstName, LastName, Email, Phone, HackerrankId, Message } = contactData;

        // Email to admin
        const adminMailOptions = {
            from: `"Shastra Contact Form" <${process.env.EMAIL_USER}>`,
            to: process.env.ADMIN_EMAIL,
            subject: 'New Contact Form Submission',
            html: `
                <h2>New Contact Form Submission</h2>
                <p><strong>Name:</strong> ${FirstName} ${LastName}</p>
                <p><strong>Email:</strong> ${Email}</p>
                <p><strong>Phone:</strong> ${Phone || 'Not provided'}</p>
                <p><strong>Hackerrank ID:</strong> ${HackerrankId || 'Not provided'}</p>
                <p><strong>Message:</strong></p>
                <p>${Message}</p>
            `
        };

        // Email to user
        const userMailOptions = {
            from: `"Shastra Team" <${process.env.EMAIL_USER}>`,
            to: Email,
            subject: 'Thank you for contacting Shastra',
            html: `
                <h2>Thank you for contacting Shastra!</h2>
                <p>Dear ${FirstName},</p>
                <p>We have received your message and will get back to you soon.</p>
                <p>Here's a copy of your message:</p>
                <p><strong>Your Message:</strong></p>
                <p>${Message}</p>
                <br>
                <p>Best regards,</p>
                <p>Team Shastra</p>
            `
        };

        // Send both emails
        const [adminResult, userResult] = await Promise.all([
            transporter.sendMail(adminMailOptions),
            transporter.sendMail(userMailOptions)
        ]);

        console.log('Email sent successfully:', {
            admin: adminResult.messageId,
            user: userResult.messageId
        });

        return true;
    } catch (error) {
        console.error('Error sending email:', error);
        throw error;
    }
};

module.exports = {
    sendContactEmail
}; 