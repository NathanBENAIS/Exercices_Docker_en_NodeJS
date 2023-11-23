// server-ping.js
const express = require('express');
const app = express();
const axios = require('axios');

const PORT = 5372;
const REGISTRY_URL = 'http://server-registry:8080/register';
const MESSAGE_BROKER_URL = 'http://message-broker:5672/send';

app.get('/', async (req, res) => {
  try {
   
    await axios.post(REGISTRY_URL, { serverName: 'server-ping', serverAddress: `http://server-ping:${PORT}` });
    
  
    const message = await axios.post(MESSAGE_BROKER_URL, { destination: 'server-pong', message: 'ping' });
    
    res.send(message.data);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Error sending ping request.');
  }
});

app.listen(PORT, () => {
  console.log(`Server-ping listening on port ${PORT}`);
});
