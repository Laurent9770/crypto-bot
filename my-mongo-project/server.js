const express = require('express');
const multer = require('multer');
const cors = require('cors');
const path = require('path');
const fs = require('fs');
const nodemailer = require('nodemailer');

const app = express();
app.use(cors());

// Ensure uploads directory exists
const uploadDir = path.join(__dirname, 'uploads/receipts');
fs.mkdirSync(uploadDir, { recursive: true });

const upload = multer({ dest: uploadDir, limits: { fileSize: 10 * 1024 * 1024 } });

// Configure Nodemailer (replace with real SMTP credentials)
const transporter = nodemailer.createTransport({
  host: 'smtp.example.com', // e.g., smtp.gmail.com
  port: 587,
  secure: false,
  auth: {
    user: 'your_smtp_user@example.com',
    pass: 'your_smtp_password',
  },
});

app.post('/api/deposit/verify', upload.single('receipt'), async (req, res) => {
  try {
    const { plan, txId } = req.body;
    // Optionally: const userEmail = req.body.email;
    // Save to DB or log for now
    console.log('Deposit verification:', { plan, txId, file: req.file });

    // Send email notification to admin
    let mailOptions = {
      from: 'no-reply@cryptobot.com',
      to: 'kizzolaurent@gmail.com',
      subject: 'New Deposit Confirmation',
      text: `A new deposit confirmation was submitted.\n\nPlan: ${plan}\nTransaction ID: ${txId}\n${req.file ? `Receipt: ${req.file.path}` : ''}`,
      attachments: req.file ? [{ filename: req.file.originalname, path: req.file.path }] : [],
    };
    transporter.sendMail(mailOptions, (err, info) => {
      if (err) {
        console.error('Error sending admin email:', err);
      } else {
        console.log('Admin notified:', info.response);
      }
    });

    res.json({ success: true, message: 'Deposit confirmation received.' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: 'Server error.' });
  }
});

app.listen(5000, () => {
  console.log('Deposit verification server running on port 5000');
}); 