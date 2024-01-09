const express = require('express');
const multer = require('multer');
const { removeBackgroundFromImageFile } = require('remove.bg');

const app = express();
const port = 4000;

app.use(express.static('public'));

const upload = multer({
  dest: 'uploads/'
});

app.post('/upload', upload.single('image'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).send('No file uploaded.');
    }

    const result = await removeBackgroundFromImageFile({
      path: req.file.path,
      apiKey: 'wUBXkF6wWDnmPkkEkiEQrujE',
      size: 'regular',
      type: 'auto',
    });

    res.json({ result });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).send('An error occurred during background removal.');
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
