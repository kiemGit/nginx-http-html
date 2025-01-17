// index.js
const express = require('express');
const path = require('path');

const app = express();
const PORT = 3003;

// Serve static files
app.use(express.static(path.join(__dirname, 'dash')));

// Route to serve HTML based on parameter
app.get('/:page', (req, res) => {
  const page = req.params.page;
  console.log(page);
  const filePath = path.join(__dirname, 'dash', `index.html`);

  // Check if the requested file exists
  res.sendFile(filePath, (err) => {
    if (err) {
      res.status(404).send("Page not found");
    }
  });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
