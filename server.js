//Install express server
const express = require('express');
const path = require('path');
const axios = require('axios');
const bodyparser = require('body-parser');

const app = express();
const appName = 'notify-me';
const port = process.env.PORT || 8080;
const notificationsUrl = process.env.ALERT_URL;
const historyUrl = process.env.HISTORY_URL
const configHeaders = process.env.REQ_HEADERS;
const isExternalApi = process.env.IS_EXTERNAL_API;

// Serve only the static files form the dist directory
app.use(express.static(__dirname + `/dist/${appName}`));
app.use(bodyparser.json());

app.get('/api/notifications', async (req, res) => {
  if (isExternalApi) {
    try {
      const response = await axios.get(notificationsUrl, {headers: configHeaders});
      return res.status(200).json(response.data);
    } catch (err) {
      return res.status(503).json({
        description: 'server error',
        data: err
      })
    }
  } else {
    try {
      return res.status(200).sendFile(path.join(__dirname + '/data/alerts.json'));
    } catch (err) {
      return res.status(500).json({
        description: 'server error',
        data: err
      })
    }
  }
})

app.get('/api/notifications-history', async (req, res) => {
  if (isExternalApi) {
    try {
      const response = await axios.get(historyUrl, {headers: configHeaders});
      return res.status(200).json(response.data);
    } catch (err) {
      return res.status(503).json({
        description: 'server error',
        data: err
      })
    }
  } else {
    try {
      return res.status(200).sendFile(path.join(__dirname + '/data/history.json'));
    } catch (err) {
      return res.status(500).json({
        description: 'server error',
        data: err
      })
    }
  }
})


app.get('/*', (req, res, next) => {
  res.sendFile(path.join(__dirname + `/dist/${appName}/index.html`));
  next();
});

// Start the app by listening on the default Heroku port
app.listen(port, () => console.log('server listening on', port));

