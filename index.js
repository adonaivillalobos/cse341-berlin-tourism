require('dotenv').config();
const express = require('express');
const { connectDB } = require('./db');
const attractionsRouter = require('./routes/attractions');
const toursRouter = require('./routes/tours');
const swaggerUi = require('swagger-ui-express');
const swaggerFile = require('./swagger-output.json');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerFile));

app.get('/', (req, res) => {
  res.send('Berlin Tourism API');
});

app.use('/attractions', attractionsRouter);
app.use('/tours', toursRouter);

connectDB().then(() => {
  const PORT = process.env.PORT || 8080;
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
});