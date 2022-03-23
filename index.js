const express = require('express');
const axios = require('axios')
const bodyParser = require('body-parser');
require('dotenv').config()

const app = express();
const PORT = process.env.PORT || 5005

app.use(bodyParser.json())

const events = [];

app.post('/events', (req, res) => {
    const event = req.body;

    events.push(event);
    axios.post('http://posts-clusterip-srv:4000/events', event).catch(err => console.log(err));
    axios.post('http://comments-srv:4001/events', event).catch(err => console.log(err));
    axios.post('http://query-srv:4002/events', event).catch(err => console.log(err));
    axios.post('http://moderation-srv:4003/events', event).catch(err => console.log(err));

    res.send({ status: 'OK' });
})

app.get('/events', (req, res) => {
    res.send(events);
})

app.listen(PORT, () => {
    console.log(`this comments app is running on port ${PORT}`)
})
