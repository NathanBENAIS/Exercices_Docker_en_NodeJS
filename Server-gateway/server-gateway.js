const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const PORT = 8574;

app.use(bodyParser.json());

let pongServers = [];

app.post('/register-pong', (req, res) => {
  const pongServer = req.body;
  pongServers.push(pingServer);
  console.log(`Registered Pong Server: ${pongServer.address}`);
  res.send('Registered successfully');
});

app.post('/send-ping', (req, res) => {
  const pingMessage = req.body.message;
  const randomPingServer = pingServers[Math.floor(Math.random() * pingServers.length)];
  if (randomPingServer) {
    console.log(`Sending Ping to ${randomPingServer.address}`);
  }
  res.send('Pong sent successfully');
});

app.listen(PORT, () => {
  console.log(`Gateway Server is running on port ${PORT}`);
});
