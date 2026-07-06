const express = require('express');
const app = express();
const port = 8080;

app.get('/', (req, res) => {
  res.send('Berlin Tourism API');
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});