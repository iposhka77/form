const express = require('express');
const mongoose = require('mongoose');
const multer = require('multer');
const cors = require('cors');
const path = require('path');

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

mongoose.connect('mongodb://localhost:27017/formData')
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.log('Failed to connect to MongoDB', err));

const formDataSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  email: String,
  contact: String,
  gender: String,
  subject: String,
  url: String,
  about: String,
  resume: String,
});

const FormData = mongoose.model('FormData', formDataSchema);

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});
const upload = multer({ storage });

app.post('/api/submit', upload.single('resume'), async (req, res) => {
  const { firstName, lastName, email, contact, gender, subject, url, about } = req.body;
  const resume = req.file ? req.file.filename : null;

  const newFormData = new FormData({
    firstName,
    lastName,
    email,
    contact,
    gender,
    subject,
    url,
    about,
    resume,
  });

  try {
    await newFormData.save();
    res.status(200).json({ message: 'Form data submitted successfully!' });
  } catch (err) {
    res.status(500).json({ message: 'Error saving data to MongoDB', error: err });
  }
});

app.listen(5000, () => {
  console.log('Server is running on port 5000');
});
