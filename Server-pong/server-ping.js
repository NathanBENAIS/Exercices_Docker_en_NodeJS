// server-pong.js
const express = require('express');
const app = express();
const axios = require('axios');

const PORT = 4567;
const REGISTRY_URL = 'http://server-registry:8080/register';
const MESSAGE_BROKER_URL = 'http://message-broker:5672/send';

app.get('/', async (req, res) => {
  try {
    // Enregistrement de l'adresse du serveur-pong auprès du serveur d'annuaire
    await axios.post(REGISTRY_URL, { serverName: 'server-pong', serverAddress: `http://server-pong:${PORT}` });
    
    // Envoie du message "pong" au message broker
    await axios.post(MESSAGE_BROKER_URL, { destination: 'server-ping', message: 'pong' });
    
    res.send('pong successful!');
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Error sending pong request.');
  }
});

app.listen(PORT, () => {
  console.log(`Server-pong listening on port ${PORT}`);
});