const express = require('express');
const mongoose = require('mongoose');
const multer = require('multer');
const cors = require('cors');
const path = require('path');
const fs = require('fs');

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

mongoose.connect('mongodb://localhost:27017/formData')
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.log('Failed to connect to MongoDB', err));

const formDataSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true },
  contact: { type: String, required: true },
  gender: { type: String, required: true },
  subject: { type: String, required: true },
  url: { type: String, required: true },
  about: { type: String },
  resume: { type: String },
});

const FormData = mongoose.model('FormData', formDataSchema);

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const dir = 'uploads/';
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir);
    }
    cb(null, dir);
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
    res.status(200).json({
      message: 'Form data submitted successfully!',
      form: newFormData 
    });
  } catch (err) {
    res.status(500).json({ message: 'Error saving data to MongoDB', error: err });
  }
});

app.get('/api/forms', async (req, res) => {
  try {
    const forms = await FormData.find({});
    res.status(200).json(forms);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching data from MongoDB', error: err });
  }
});

app.listen(5000, () => {
  console.log('Server is running on port 5000');
});
