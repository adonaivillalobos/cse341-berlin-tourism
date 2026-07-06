const swaggerAutogen = require('swagger-autogen')();

const doc = {
  info: {
    title: 'Berlin Tourism API',
    description: 'API documentation for the Berlin Tourism project'
  },
  host: 'cse341-berlin-tourism.onrender.com',
  schemes: ['https']
};

const outputFile = './swagger-output.json';
const endpointsFiles = ['./index.js'];

swaggerAutogen(outputFile, endpointsFiles, doc);