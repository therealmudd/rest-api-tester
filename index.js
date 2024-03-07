const express = require('express');
const axios = require('axios');
const cors = require('cors');
const path = require('path');

// Setup
const app = express();
const PORT = 5123;

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
  // try {
    const req_body = req.body;
    const { url, method, body, content_type } = req_body;

    try{
      const response = await axios({
        url: url,
        method: method,
        headers: {
          'Content-Type': content_type,
        },
        data: body 
      });
      return res.status(200).json({ 
        success: true, 
        response: {
        status: response.status,
        data: response.data
      }})
    }
    catch(err){
      console.log(err.message);
      const response = err.response;
      if (!response) {
        return res.status(200).json({ 
          sucess: false,
          message: err.message 
        });
      }
      
      return res.status(200).json({ 
        success: true, 
        response: {
        status: response.status,
        data: response.data
      }})
    }

    //console.log(response.status);


    // .then(response => {
    //   // Handle successful response
    //   res.status(response.status).json({success: true, data: response.data});
    // })
    // .catch(err => {
    //   console.log(response);
    //   // Handle network errors, timeouts, or other Axios-related errors
    //   console.error('Axios error: \nerror: ' + err.message);
    //   res.status(404).json({success: false, error: err.message});
    // });
  // } catch (err) {
  //   // Handle other synchronous errors
  //   console.error('Synchronous error');
  //   res.status(500).json({success: false, error: err.message});
  // }
});

// Used for testing
app.all('/test', (req, res) => {
  return res.status(200).json({message: "found worked!"});
});

app.all('/test/:id', (req, res) => {
  const { id } = req.params;
  if (id == 1){
    return res.status(200).json({message: "found worked!"});
  }
  else{
    return res.status(404).json({message: "not found worked"});
  }
})

app.put('/test-put', (req, res) => {
  return res.status(200).send(req.body);
});


// Start server
app.listen(PORT, () => {
  console.log(`App is listening on http://localhost:${PORT}`);
});
