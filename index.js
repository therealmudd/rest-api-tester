const express = require('express');
const axios = require('axios');
const cors = require('cors');
const path = require('path');

// Setup
const app = express();
const PORT = 5001;

// Middleware

app.use(cors({
  origin: '*', 
  methods: ['POST'],
  allowedHeaders: ['Content-Type']
}));

app.use(express.json())

app.use(express.static(path.join(__dirname, 'public')));

// Request handlers

app.post('/make-request', async (req, res) => { 
  try {
    const req_body = req.body;
    const { url, method, body, content_type } = req_body;

    axios({
      url: url,
      method: method,
      headers: {
        'Content-Type': content_type,
      },
      data: body 
    })
    .then(response => {
      // Check if the response indicates an error (status code >= 400)
      if (response.status >= 400) {
        throw new Error('Request failed with status code ' + response.status);
      }
      // Handle successful response
      res.status(response.status).json({success: true, data: response.data});
    })
    .catch(err => {
      // Handle network errors, timeouts, or other Axios-related errors
      console.error('Axios error');
      res.status(404).json({success: false, error: err.message});
    });
  } catch (err) {
    // Handle other synchronous errors
    console.error('Synchronous error');
    res.status(500).json({success: false, error: err.message});
  }
});

// Used for testing
app.all('/test', (req, res) => {
  res.status(200).json({success: true});
});


// Start server
app.listen(PORT, () => {
  console.log(`App is listening on http://localhost:${PORT}`);
});
